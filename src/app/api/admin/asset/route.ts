import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(req: Request) {
    try {
        const body = await req.json();
        const { id, status, authenticityScore, physicalLocation, contractAssetId } = body;

        if (!id) {
            return NextResponse.json({ error: 'Asset ID is required' }, { status: 400 });
        }

        const dataToUpdate: any = {};
        if (status) dataToUpdate.status = status;
        if (authenticityScore !== undefined) dataToUpdate.authenticityScore = parseInt(authenticityScore, 10);
        if (physicalLocation) dataToUpdate.physicalLocation = physicalLocation;
        if (contractAssetId !== undefined) dataToUpdate.contractAssetId = parseInt(contractAssetId, 10);

        const updatedAsset = await prisma.asset.update({
            where: { id },
            data: dataToUpdate,
        });

        return NextResponse.json({ success: true, asset: updatedAsset });
    } catch (error) {
        console.error('Admin update error:', error);
        return NextResponse.json({ error: 'Failed to update asset' }, { status: 500 });
    }
}
