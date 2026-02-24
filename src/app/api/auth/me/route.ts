import { NextResponse } from 'next/server';
import { getSession, destroySession } from '@/lib/session';

export async function GET() {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ address: null, role: null }, { status: 401 });
    }
    return NextResponse.json(session);
}

export async function DELETE() {
    await destroySession();
    return NextResponse.json({ success: true });
}
