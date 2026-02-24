import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const secretKey = new TextEncoder().encode(process.env.SESSION_SECRET || 'super-secret-reliquex-key-12345!@#');

export async function encrypt(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h')
        .sign(secretKey);
}

export async function decrypt(input: string): Promise<any> {
    const { payload } = await jwtVerify(input, secretKey, {
        algorithms: ['HS256'],
    });
    return payload;
}

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

export async function getSession() {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('auth_session');
    if (!sessionCookie) return null;

    try {
        return await decrypt(sessionCookie.value);
    } catch (e) {
        return null;
    }
}

export async function destroySession() {
    const cookieStore = await cookies();
    cookieStore.delete('auth_session');
}
