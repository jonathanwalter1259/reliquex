import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { brand, model, estimatedValue, description, walletAddress, imagePath, category } = body;

        if (!brand || !model || !description || !walletAddress) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Upsert the user (create if they don't exist yet based on walletAddress)
        const user = await prisma.user.upsert({
            where: { walletAddress },
            update: {},
            create: { walletAddress },
        });

        // Create the asset submission attached to this user
        const asset = await prisma.asset.create({
            data: {
                name: `${brand} ${model}`,
                description: description,
                category: category || 'COLLECTIBLES',
                imagePath: imagePath,
                submitterWallet: user.walletAddress,
            },
        });

        return NextResponse.json({ success: true, asset }, { status: 201 });
    } catch (error) {
        console.error('Submission error:', error);
        return NextResponse.json({ error: 'Failed to submit asset' }, { status: 500 });
    }
}
