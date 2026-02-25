import { NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import prisma from '@/lib/prisma';

export async function PUT(req: Request) {
    try {
        const session = await getSession();
        if (!session || !session.walletAddress) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const data = await req.json();
        const { name, email, username, notificationsNewDrops, notificationsSecurity, onboardingCompleted } = data;

        const updatedUser = await prisma.user.update({
            where: { walletAddress: session.walletAddress.toLowerCase() },
            data: {
                name,
                email,
                username,
                notificationsNewDrops,
                notificationsSecurity,
                onboardingCompleted,
            }
        });

        return NextResponse.json({ success: true, user: updatedUser });
    } catch (e: any) {
        return NextResponse.json({ success: false, error: e.message }, { status: 500 });
    }
}
