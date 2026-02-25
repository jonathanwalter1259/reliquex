import { NextResponse } from 'next/server';
import { getSession, destroySession } from '@/lib/session';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    const session = await getSession();
    if (!session || !session.walletAddress) {
        return NextResponse.json({ address: null, role: null, onboardingCompleted: false }, { status: 401 });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { walletAddress: session.walletAddress.toLowerCase() }
        });

        if (!user) {
            return NextResponse.json({ address: session.walletAddress, role: session.role, onboardingCompleted: false });
        }

        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
}

export async function DELETE() {
    await destroySession();
    return NextResponse.json({ success: true });
}
