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
        redirect('/');
    }
    const assets = await prisma.asset.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    });

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
