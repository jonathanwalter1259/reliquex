import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getSession } from '@/lib/session';

const prisma = new PrismaClient();

// GET a specific vault asset by ID
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const resolvedParams = await params;
        const id = resolvedParams.id;
        const asset = await prisma.asset.findUnique({
            where: { id }
        });

        if (!asset) {
            return NextResponse.json({ error: 'Asset not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, asset }, { status: 200 });
    } catch (error) {
        console.error('Failed to fetch specific asset:', error);
        return NextResponse.json({ error: 'Failed to fetch vault asset' }, { status: 500 });
    }
}

// PUT update an existing vault asset
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getSession();
        if (!session || session.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 403 });
        }

        const resolvedParams = await params;
        const id = resolvedParams.id;
        const body = await req.json();
        const { name, description, category, pricePerShare, totalShares, imagePath, status, physicalLocation, authenticityScore, contractAssetId } = body;

        const asset = await prisma.asset.update({
            where: { id },
            data: {
                ...(name && { name }),
                ...(description && { description }),
                ...(category && { category }),
                ...(pricePerShare !== undefined && pricePerShare !== "" && !isNaN(parseFloat(pricePerShare)) && { pricePerShare: parseFloat(pricePerShare) }),
                ...(totalShares !== undefined && totalShares !== "" && !isNaN(parseInt(totalShares)) && { totalShares: parseInt(totalShares) }),
                ...(imagePath && { imagePath }),
                ...(status && { status }),
                ...(physicalLocation && { physicalLocation }),
                ...(authenticityScore !== undefined && authenticityScore !== "" && !isNaN(parseInt(authenticityScore)) && { authenticityScore: parseInt(authenticityScore) }),
                ...(contractAssetId !== undefined && { contractAssetId }),
            },
        });

        return NextResponse.json({ success: true, asset }, { status: 200 });
    } catch (error) {
        console.error('Failed to update asset:', error);
        return NextResponse.json({ error: 'Failed to update vault asset' }, { status: 500 });
    }
}

// DELETE an asset from the vault (Destructive)
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getSession();
        if (!session || session.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 403 });
        }

        const resolvedParams = await params;
        const id = resolvedParams.id;

        // Perform the deletion
        await prisma.asset.delete({
            where: { id },
        });

        return NextResponse.json({
            success: true,
            message: `SYSTEM_LOG: ASSET_${id}_DELETED_SUCCESSFULLY`
        }, { status: 200 });

    } catch (error) {
        console.error('Failed to delete asset:', error);
        return NextResponse.json({ error: 'Failed to delete vault asset' }, { status: 500 });
    }
}
