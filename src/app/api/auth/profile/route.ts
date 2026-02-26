import { NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import prisma from '@/lib/prisma';

const MAX_NAME_LEN = 200;
const MAX_USERNAME_LEN = 100;
const MAX_EMAIL_LEN = 254;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(value: unknown): boolean {
    return typeof value === 'string' && value.length <= MAX_EMAIL_LEN && EMAIL_REGEX.test(value);
}

export async function PUT(req: Request) {
    try {
        const session = await getSession();
        if (!session || !session.walletAddress) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const data = await req.json();
        const {
            name,
            email,
            username,
            notificationsNewDrops,
            notificationsSecurity,
            onboardingCompleted,
        } = data;

        const updateData: {
            name?: string;
            email?: string | null;
            username?: string | null;
            notificationsNewDrops?: boolean;
            notificationsSecurity?: boolean;
            onboardingCompleted?: boolean;
        } = {};

        if (name !== undefined) {
            const s = typeof name === 'string' ? name.trim().slice(0, MAX_NAME_LEN) : '';
            updateData.name = s || null;
        }
        if (email !== undefined) {
            updateData.email = email === null || email === '' ? null : isValidEmail(email) ? String(email).slice(0, MAX_EMAIL_LEN) : undefined;
            if (email !== null && email !== '' && updateData.email === undefined) {
                return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
            }
        }
        if (username !== undefined) {
            const u = typeof username === 'string' ? username.trim().slice(0, MAX_USERNAME_LEN) : '';
            updateData.username = u || null;
        }
        if (typeof notificationsNewDrops === 'boolean') updateData.notificationsNewDrops = notificationsNewDrops;
        if (typeof notificationsSecurity === 'boolean') updateData.notificationsSecurity = notificationsSecurity;
        if (typeof onboardingCompleted === 'boolean') updateData.onboardingCompleted = onboardingCompleted;

        const updatedUser = await prisma.user.update({
            where: { walletAddress: session.walletAddress.toLowerCase() },
            data: updateData,
        });

        return NextResponse.json({ success: true, user: updatedUser });
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : 'Unknown error';
        return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
}
