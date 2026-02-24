import { PrismaClient } from '@prisma/client';
import AdminVaultClient from './AdminVaultClient';
import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';

export const dynamic = "force-dynamic";
const prisma = new PrismaClient();

// Server Component fetching the full vault inventory
export default async function AdminVaultManager() {
    const session = await getSession();
    if (!session || session.role !== 'ADMIN') {
        return (
            <main className="min-h-screen pt-32 pb-20 flex flex-col justify-center items-center text-center">
                <div className="container px-4 mx-auto max-w-2xl border border-red-900 bg-red-950/20 p-8 rounded-none relative">
                    <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-red-500"></div>
                    <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-red-500"></div>
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-red-500"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-red-500"></div>
                    <h1 className="text-2xl md:text-3xl font-mono text-red-500 mb-4 tracking-widest uppercase">
                        &gt; [SYSTEM_ERROR]: 403 ACCESS DENIED
                    </h1>
                    <p className="text-red-400/80 font-mono text-sm leading-relaxed">
                        SECURITY PROTOCOL VIOLATION. Your connected wallet ({session?.walletAddress || 'UNAUTHENTICATED'}) does not possess 'ADMIN' clearance.
                        Further attempts to access restricted endpoints will be logged.
                    </p>
                </div>
            </main>
        );
    }
    const rawAssets = await prisma.asset.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    });

    const assets = rawAssets.map(asset => ({
        ...asset,
        createdAt: asset.createdAt.toISOString(),
        updatedAt: asset.updatedAt.toISOString(),
    }));

    return (
        <main className="min-h-screen pt-32 pb-20">
            <div className="container px-4 mx-auto max-w-7xl">
                <div className="mb-12 border-b border-[#333] pb-6">
                    <h1 className="text-4xl uppercase tracking-[0.2em] font-light text-white mb-2">
                        &gt; VAULT_MANAGER_
                    </h1>
                    <p className="text-[#888] font-mono text-sm tracking-wider">
                        SECURE TERMINAL: CREATE, READ, UPDATE, AND DESTROY PROTOCOL ASSETS
                    </p>
                </div>

                <AdminVaultClient initialAssets={assets} />
            </div>
        </main>
    );
}
