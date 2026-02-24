import { PrismaClient } from '@prisma/client';
import AssetRow from './AssetRow';

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
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
