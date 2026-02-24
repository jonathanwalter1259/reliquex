import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getSession } from '@/lib/session';

const prisma = new PrismaClient();

// GET all active vault assets for the homepage and marketplace
export async function GET() {
    try {
        const assets = await prisma.asset.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json({ success: true, assets }, { status: 200 });
    } catch (error) {
        console.error('Failed to fetch assets:', error);
        return NextResponse.json({ error: 'Failed to fetch vault assets' }, { status: 500 });
    }
}

// POST a new asset strictly for the Vault Admin Protocol
export async function POST(req: Request) {
    try {
        const session = await getSession();
        if (!session || session.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 403 });
        }

        const body = await req.json();
        const { name, description, category, pricePerShare, totalShares, imagePath } = body;

        if (!name || !category) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Upsert the Admin user if they don't exist
        const user = await prisma.user.upsert({
            where: { walletAddress: session.walletAddress },
            update: {},
            create: { walletAddress: session.walletAddress, role: "ADMIN" },
        });

        const asset = await prisma.asset.create({
            data: {
                name,
                description,
                category,
                pricePerShare: pricePerShare && !isNaN(parseFloat(pricePerShare)) ? parseFloat(pricePerShare) : null,
                totalShares: totalShares && !isNaN(parseInt(totalShares)) ? parseInt(totalShares) : null,
                imagePath,
                submitterWallet: user.walletAddress,
                status: 'AUTHENTICATED' // Direct vault imports are pre-authenticated
            },
        });

        return NextResponse.json({ success: true, asset }, { status: 201 });
    } catch (error) {
        console.error('Failed to create vault asset:', error);
        return NextResponse.json({ error: 'Failed to create vault asset' }, { status: 500 });
    }
}
