import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

function getSecretKey(): Uint8Array {
    const secret = process.env.SESSION_SECRET;
    if (!secret || secret.length < 32) {
        throw new Error(
            'SESSION_SECRET is required and must be at least 32 characters. Set it in your environment.'
        );
    }
    return new TextEncoder().encode(secret);
}

export async function encrypt(payload: unknown): Promise<string> {
    const key = getSecretKey();
    return await new SignJWT(payload as Record<string, unknown>)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h')
        .sign(key);
}

export async function decrypt(input: string): Promise<unknown> {
    const key = getSecretKey();
    const { payload } = await jwtVerify(input, key, {
        algorithms: ['HS256'],
    });
    return payload;
}

export type SessionPayload = { walletAddress: string; role: string; expires?: number };

export async function setSessionCookie(walletAddress: string, role: string) {
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const session = await encrypt({ walletAddress, role, expires });

    const cookieStore = await cookies();
    cookieStore.set('auth_session', session, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        expires
    });
}

export async function getSession(): Promise<SessionPayload | null> {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('auth_session');
    if (!sessionCookie) return null;

    try {
        const payload = await decrypt(sessionCookie.value) as SessionPayload;
        return payload;
    } catch (e) {
        return null;
    }
}

export async function destroySession() {
    const cookieStore = await cookies();
    cookieStore.delete('auth_session');
}
