import { generateNonce } from 'siwe';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
    const nonce = generateNonce();

    const cookieStore = await cookies();
    cookieStore.set('siwe_nonce', nonce, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/'
    });

    return new NextResponse(nonce, {
        status: 200,
        headers: {
            'Content-Type': 'text/plain',
        },
    });
}
