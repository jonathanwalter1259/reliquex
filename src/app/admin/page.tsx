import { PrismaClient } from '@prisma/client';
import AssetRow from './AssetRow';
import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
    const session = await getSession();
    if (!session || session.role !== 'ADMIN') {
        return (
            <main className="page-wrap reveal">
                <div className="container" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                    <h1 style={{ color: '#ff0033', fontFamily: 'var(--mono)', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', letterSpacing: '0.1em', marginBottom: '1rem' }}>
                        &gt; [SYSTEM_ERROR]: 403 ACCESS DENIED
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontFamily: 'var(--mono)', fontSize: '0.9rem', maxWidth: '600px', lineHeight: '1.6' }}>
                        SECURITY PROTOCOL VIOLATION. Your connected wallet ({session?.walletAddress || 'UNAUTHENTICATED'}) does not possess 'ADMIN' clearance.
                        Further attempts to access restricted endpoints will be logged.
                    </p>
                </div>
            </main>
        );
    }
    // Fetch all assets, order by newest first
    const assets = await prisma.asset.findMany({
        orderBy: { createdAt: 'desc' },
        include: { submitter: true }
    });

    return (
        <main className="page-wrap reveal">
            <div className="container">
                <div className="page-header">
                    <h1 className="page-header__title">ADMINISTRATION PORTAL.</h1>
                    <p className="page-header__sub">&gt; CURATION AND AUTHENTICATION DASHBOARD // RESTRICTED ACCESS</p>
                </div>

                <div className="holdings-table-wrap" style={{ marginTop: '2rem' }}>
                    <div className="hud-corner hud-corner--tl"></div>
                    <div className="hud-corner hud-corner--tr"></div>
                    <div className="hud-corner hud-corner--bl"></div>
                    <div className="hud-corner hud-corner--br"></div>

                    <div className="holdings-header">
                        <span className="holdings-header__title">// ASSET_QUEUE</span>
                        <span className="holdings-header__status" style={{ color: 'var(--neon)' }}>● LIVE</span>
                    </div>

                    <div style={{ overflowX: 'auto' }}>
                        <table className="holdings-table">
                            <thead>
                                <tr>
                                    <th>ASSET NAME</th>
                                    <th>SUBMITTER</th>
                                    <th>STATUS</th>
                                    <th>SCORE (/100)</th>
                                    <th>LOCATION</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {assets.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>No assets pending review.</td>
                                    </tr>
                                ) : (
                                    assets.map((asset) => (
                                        <AssetRow key={asset.id} asset={asset} />
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    );
}
