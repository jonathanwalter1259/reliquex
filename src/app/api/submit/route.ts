import { NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import prisma from '@/lib/prisma';

const SUBMIT_RATE_LIMIT = 10;
const SUBMIT_RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

const submissionCounts = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(walletAddress: string): boolean {
    const now = Date.now();
    const entry = submissionCounts.get(walletAddress);
    if (!entry) {
        submissionCounts.set(walletAddress, { count: 1, resetAt: now + SUBMIT_RATE_WINDOW_MS });
        return true;
    }
    if (now >= entry.resetAt) {
        submissionCounts.set(walletAddress, { count: 1, resetAt: now + SUBMIT_RATE_WINDOW_MS });
        return true;
    }
    if (entry.count >= SUBMIT_RATE_LIMIT) return false;
    entry.count += 1;
    return true;
}

const VALID_CATEGORIES = ['WATCHES', 'ART', 'JEWELRY', 'CARS', 'REAL_ESTATE', 'COLLECTIBLES'] as const;

export async function POST(req: Request) {
    const session = await getSession();
    if (!session || !session.walletAddress) {
        return NextResponse.json({ error: 'Unauthorized: Please connect your wallet and sign in to submit' }, { status: 401 });
    }

    if (!checkRateLimit(session.walletAddress.toLowerCase())) {
        return NextResponse.json(
            { error: 'Too many submissions. Please try again later.' },
            { status: 429 }
        );
    }

    try {
        const body = await req.json();
        const { brand, model, estimatedValue, description, imagePath, category } = body;

        if (!brand || !model || !description) {
            return NextResponse.json({ error: 'Missing required fields: brand, model, description' }, { status: 400 });
        }

        const walletAddress = session.walletAddress.toLowerCase();
        const user = await prisma.user.upsert({
            where: { walletAddress },
            update: {},
            create: { walletAddress },
        });

        const categoryValue =
            category && VALID_CATEGORIES.includes(category as (typeof VALID_CATEGORIES)[number])
                ? (category as (typeof VALID_CATEGORIES)[number])
                : 'COLLECTIBLES';

        const asset = await prisma.asset.create({
            data: {
                name: `${String(brand).slice(0, 200)} ${String(model).slice(0, 200)}`,
                description: String(description).slice(0, 5000),
                category: categoryValue,
                imagePath: typeof imagePath === 'string' ? imagePath.slice(0, 2000) : null,
                submitterWallet: user.walletAddress,
            },
        });

        return NextResponse.json({ success: true, asset }, { status: 201 });
    } catch (error) {
        console.error('Submission error:', error);
        return NextResponse.json({ error: 'Failed to submit asset' }, { status: 500 });
    }
}
