import { NextResponse } from 'next/server';
import { SiweMessage } from 'siwe';
import { cookies } from 'next/headers';
import { PrismaClient } from '@prisma/client';
import { setSessionCookie } from '@/lib/session';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { message, signature } = await req.json();
        const cookieStore = await cookies();
        const nonceCookie = cookieStore.get('siwe_nonce');

        if (!nonceCookie || !nonceCookie.value) {
            return NextResponse.json({ success: false, error: 'Nonce missing' }, { status: 422 });
        }

        const siweMessage = new SiweMessage(message);
        const { data, success, error } = await siweMessage.verify({
            signature,
            nonce: nonceCookie.value,
        });

        if (!success) {
            return NextResponse.json({ success: false, error: error?.type || 'Invalid signature' }, { status: 422 });
        }

        // Signature is valid! Let's find or create the user in our database
        // Also clean up the nonce
        cookieStore.delete('siwe_nonce');

        let user = await prisma.user.findUnique({
            where: { walletAddress: data.address.toLowerCase() }
        });

        if (!user) {
            user = await prisma.user.create({
                data: {
                    walletAddress: data.address.toLowerCase(),
                    role: 'USER' // By default, new users are standard
                }
            });
        }

        // Issue our encrypted JWT session indicating their DB roles
        await setSessionCookie(user.walletAddress, user.role);

        return NextResponse.json({ success: true, user });
    } catch (e: any) {
        return NextResponse.json({ success: false, error: e.message }, { status: 500 });
    }
}
