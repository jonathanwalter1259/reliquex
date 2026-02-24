'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Asset } from '@prisma/client';

export default function Vaults() {
    const [assets, setAssets] = useState<Asset[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState<string>('ALL');

    const filteredAssets = assets.filter(asset => {
        if (activeFilter === 'ALL') return true;
        if (activeFilter === 'STATUS_AUTHENTICATED') return asset.status === 'AUTHENTICATED';
        if (activeFilter === 'STATUS_MINTED') return asset.status === 'MINTED';
        if (activeFilter === 'CAT_WATCHES') return asset.category === 'WATCHES';
        if (activeFilter === 'CAT_ART') return asset.category === 'ART';
        if (activeFilter === 'CAT_JEWELRY') return asset.category === 'JEWELRY';
        if (activeFilter === 'CAT_COLLECTIBLES') return asset.category === 'COLLECTIBLES';
        return true;
    });

    useEffect(() => {
        const fetchAssets = async () => {
            try {
                const res = await fetch('/api/vault');
                const data = await res.json();
                if (data.success) {
                    setAssets(data.assets.filter((a: Asset) => a.status === 'AUTHENTICATED' || a.status === 'MINTED'));
                }
            } catch (error) {
                console.error('Failed to fetch marketplace assets:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAssets();
    }, []);

    const filters = [
        { key: 'ALL', label: 'ALL ASSETS' },
        { key: 'STATUS_AUTHENTICATED', label: '[STATUS: AUTHENTICATED]' },
        { key: 'STATUS_MINTED', label: '[STATUS: MINTED]' },
        { key: 'CAT_WATCHES', label: '[CATEGORY: WATCHES]' },
        { key: 'CAT_COLLECTIBLES', label: '[CATEGORY: SNEAKERS]' },
        { key: 'CAT_JEWELRY', label: '[CATEGORY: JEWELRY]' },
    ];

    return (
        <>
            {/* Scoped overrides — must win CSS specificity vs pages.css / globals.css */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .vaults-main {
                    min-height: 100vh !important;
                    background: #000 !important;
                    color: #fff !important;
                    padding-top: 8rem !important;
                    padding-bottom: 5rem !important;
                    padding-left: 1.5rem !important;
                    padding-right: 1.5rem !important;
                    width: 100% !important;
                    font-family: var(--font-space-mono), ui-monospace, monospace !important;
                }
                .vaults-crt {
                    position: fixed;
                    top: 0; left: 0;
                    width: 100vw; height: 100vh;
                    background: linear-gradient(rgba(18,16,16,0) 50%, rgba(0,0,0,0.25) 50%);
                    background-size: 100% 3px;
                    pointer-events: none;
                    z-index: 9999;
                    opacity: 0.15;
                }
                .vaults-header {
                    text-align: center !important;
                    margin-bottom: 2rem !important;
                }
                .vaults-header h1 {
                    font-size: clamp(2.5rem, 5vw, 3.75rem) !important;
                    font-weight: 900 !important;
                    text-transform: uppercase !important;
                    letter-spacing: -0.04em !important;
                    color: #00FF00 !important;
                    text-shadow: 0 0 10px rgba(0,255,0,0.8), 0 0 20px rgba(0,255,0,0.4) !important;
                    margin-bottom: 1rem !important;
                }
                .vaults-header p {
                    color: #00FF00 !important;
                    font-size: 0.875rem !important;
                    letter-spacing: 0.1em !important;
                    text-transform: uppercase !important;
                }
                .vaults-filters {
                    display: flex !important;
                    flex-wrap: wrap !important;
                    align-items: center !important;
                    justify-content: center !important;
                    gap: 1rem !important;
                    margin-top: 2rem !important;
                    margin-bottom: 3rem !important;
                }
                .vaults-filter-btn {
                    padding: 0.5rem 1rem !important;
                    background: #000 !important;
                    border: 1px solid #00FF00 !important;
                    color: #00FF00 !important;
                    font-family: var(--font-space-mono), ui-monospace, monospace !important;
                    font-size: 0.8rem !important;
                    text-transform: uppercase !important;
                    cursor: pointer !important;
                    transition: all 0.2s ease !important;
                }
                .vaults-filter-btn:hover,
                .vaults-filter-btn.active {
                    background: #00FF00 !important;
                    color: #000 !important;
                }
                .vaults-grid {
                    display: grid !important;
                    grid-template-columns: repeat(4, 1fr) !important;
                    gap: 2rem !important;
                    max-width: 80rem !important;
                    margin-left: auto !important;
                    margin-right: auto !important;
                    width: 100% !important;
                }
                @media (max-width: 1280px) {
                    .vaults-grid { grid-template-columns: repeat(3, 1fr) !important; }
                }
                @media (max-width: 1024px) {
                    .vaults-grid { grid-template-columns: repeat(2, 1fr) !important; }
                }
                @media (max-width: 640px) {
                    .vaults-grid { grid-template-columns: 1fr !important; }
                }
                .vault-card-link {
                    display: block !important;
                    text-decoration: none !important;
                }
                .vault-card-wrap {
                    position: relative !important;
                    display: flex !important;
                    flex-direction: column !important;
                    background: #000 !important;
                    border: 1px solid #00FF00 !important;
                    padding: 1rem !important;
                    overflow: hidden !important;
                    transition: background 0.2s ease !important;
                }
                .vault-card-wrap:hover {
                    background: #0a0a0a !important;
                }
                .vault-hud { position: absolute !important; width: 1rem !important; height: 1rem !important; }
                .vault-hud--tl { top: 0; left: 0; border-top: 2px solid #00FF00; border-left: 2px solid #00FF00; }
                .vault-hud--tr { top: 0; right: 0; border-top: 2px solid #00FF00; border-right: 2px solid #00FF00; }
                .vault-hud--bl { bottom: 0; left: 0; border-bottom: 2px solid #00FF00; border-left: 2px solid #00FF00; }
                .vault-hud--br { bottom: 0; right: 0; border-bottom: 2px solid #00FF00; border-right: 2px solid #00FF00; }
                .vault-card-badge {
                    font-size: 10px !important;
                    letter-spacing: 0.1em !important;
                    margin-bottom: 0.75rem !important;
                    display: flex !important;
                    justify-content: space-between !important;
                    text-transform: uppercase !important;
                }
                .vault-card-image {
                    width: 100% !important;
                    aspect-ratio: 1 / 1 !important;
                    background: transparent !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    overflow: hidden !important;
                    margin-bottom: 1rem !important;
                }
                .vault-card-image img {
                    object-fit: contain !important;
                    width: 100% !important;
                    height: 100% !important;
                    mix-blend-mode: screen !important;
                    transition: filter 0.2s ease !important;
                }
                .vault-card-wrap:hover .vault-card-image img {
                    filter: brightness(1.1) !important;
                }
                .vault-card-details {
                    display: flex !important;
                    flex-direction: column !important;
                    gap: 0.5rem !important;
                    font-family: var(--font-space-mono), ui-monospace, monospace !important;
                    font-size: 0.875rem !important;
                    border-top: 1px solid #333 !important;
                    padding-top: 1rem !important;
                }
                .vault-card-details h3 {
                    color: #fff !important;
                    font-weight: 700 !important;
                    letter-spacing: 0.05em !important;
                    text-transform: uppercase !important;
                    overflow: hidden !important;
                    text-overflow: ellipsis !important;
                    white-space: nowrap !important;
                    margin: 0 !important;
                }
                .vault-card-ticker {
                    color: #666 !important;
                    font-size: 10px !important;
                    letter-spacing: 0.1em !important;
                    text-transform: uppercase !important;
                }
                .vault-card-price-row {
                    display: flex !important;
                    justify-content: space-between !important;
                    align-items: flex-end !important;
                    margin-top: 0.5rem !important;
                }
                .vault-card-price-label {
                    font-size: 10px !important;
                    letter-spacing: 0.1em !important;
                    color: #666 !important;
                }
                .vault-card-price-value {
                    font-size: 1.125rem !important;
                    font-weight: 700 !important;
                    color: #00FF00 !important;
                }
                .vault-card-progress-labels {
                    display: flex !important;
                    justify-content: space-between !important;
                    font-size: 8px !important;
                    color: #666 !important;
                    letter-spacing: 0.1em !important;
                    margin-top: 0.5rem !important;
                    margin-bottom: 0.25rem !important;
                    text-transform: uppercase !important;
                }
                .vault-card-progress-track {
                    width: 100% !important;
                    height: 4px !important;
                    background: #111 !important;
                }
                .vault-card-progress-fill {
                    height: 100% !important;
                    background: #00FF00 !important;
                }
                .vault-card-empty {
                    grid-column: 1 / -1 !important;
                    padding: 6rem 0 !important;
                    text-align: center !important;
                    letter-spacing: 0.1em !important;
                }
            `}} />

            <main className="vaults-main">
                <div className="vaults-crt"></div>

                {/* Header */}
                <div className="vaults-header">
                    <h1>EXPLORE SECURED VAULTS.</h1>
                    <p>&gt; Browse verified luxury assets available for fractional investment.</p>
                </div>

                {/* Filter Bar */}
                <div className="vaults-filters">
                    {filters.map(f => (
                        <button
                            key={f.key}
                            onClick={() => setActiveFilter(f.key)}
                            className={`vaults-filter-btn ${activeFilter === f.key ? 'active' : ''}`}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>

                {/* Vault Grid */}
                <div className="vaults-grid">
                    {isLoading ? (
                        <div className="vault-card-empty" style={{ color: '#00FF00' }}>
                            &gt; SYNCING_VAULT_PROTOCOL...
                        </div>
                    ) : filteredAssets.length === 0 ? (
                        <div className="vault-card-empty" style={{ color: '#888' }}>
                            NO ASSETS DETECTED MATCHING CURRENT FILTER.
                        </div>
                    ) : (
                        filteredAssets.map((asset) => (
                            <Link href={`/asset/${asset.id}`} key={asset.id} className="vault-card-link">
                                <div className="vault-card-wrap">
                                    {/* HUD Corners */}
                                    <div className="vault-hud vault-hud--tl"></div>
                                    <div className="vault-hud vault-hud--tr"></div>
                                    <div className="vault-hud vault-hud--bl"></div>
                                    <div className="vault-hud vault-hud--br"></div>

                                    {/* Status Badge */}
                                    <div className="vault-card-badge">
                                        <span style={{ color: asset.status === 'MINTED' ? '#facc15' : '#00FF00' }}>
                                            [STATUS: {asset.status}]
                                        </span>
                                        {asset.authenticityScore && (
                                            <span style={{ color: '#facc15' }}>[{asset.authenticityScore} VERIFIED]</span>
                                        )}
                                    </div>

                                    {/* Image */}
                                    <div className="vault-card-image">
                                        {asset.imagePath ? (
                                            <img
                                                src={asset.imagePath.split(',')[0]}
                                                alt={asset.name}
                                            />
                                        ) : (
                                            <div style={{ color: '#333', fontSize: '12px', letterSpacing: '0.1em' }}>[NO_IMG_DATA]</div>
                                        )}
                                    </div>

                                    {/* Details */}
                                    <div className="vault-card-details">
                                        <h3>{asset.name}</h3>
                                        <div className="vault-card-ticker">
                                            ${asset.category.slice(0, 3)}-{asset.id.slice(0, 3).toUpperCase()}
                                        </div>

                                        <div className="vault-card-price-row">
                                            <span className="vault-card-price-label">SHARE_PRICE:</span>
                                            <span className="vault-card-price-value">
                                                {asset.pricePerShare ? `$${asset.pricePerShare.toFixed(2)}` : 'TBD'}
                                            </span>
                                        </div>

                                        <div className="vault-card-progress-labels">
                                            <span>0 SOLD</span>
                                            <span>{asset.totalShares ? asset.totalShares.toLocaleString() : 'N/A'} TOTAL</span>
                                        </div>
                                        <div className="vault-card-progress-track">
                                            <div className="vault-card-progress-fill" style={{ width: '5%' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </main>
        </>
    );
}
