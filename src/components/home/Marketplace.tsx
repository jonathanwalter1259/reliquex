'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Asset } from '@prisma/client';

export default function Marketplace() {
    const [assets, setAssets] = useState<Asset[]>([]);
    const [isLoading, setIsLoading] = useState(true);

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

    return (
        <section className="marketplace reveal" id="daily-deals">
            <div className="container">
                <div className="marketplace__header">
                    <h2 className="marketplace__title">Explore luxury vaults.</h2>
                    <p className="marketplace__subtitle">Buy and sell fractional shares of authenticated luxury assets.</p>
                </div>

                {/* Search & Filter Bar */}
                <div className="marketplace__controls">
                    <div className="marketplace__search">
                        <svg className="marketplace__search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <input type="text" placeholder="Search vaults..." className="marketplace__search-input" />
                    </div>
                    <select className="marketplace__filter" defaultValue="All Categories">
                        <option value="All Categories">All Categories</option>
                        <option value="WATCHES">Watches</option>
                        <option value="SNEAKERS">Sneakers</option>
                        <option value="JEWELRY">Jewelry</option>
                        <option value="BAGS">Bags</option>
                    </select>
                </div>

                {/* Vault Cards Grid */}
                <div className="marketplace__grid">
                    {isLoading ? (
                        <div className="col-span-full py-12 text-center font-mono text-[#00ff41] tracking-widest animate-pulse">
                            &gt; SYNCING_VAULT_PROTOCOL...
                        </div>
                    ) : assets.length === 0 ? (
                        <div className="col-span-full py-12 text-center font-mono text-[#888] tracking-widest">
                            NO ACTIVE ASSETS DETECTED IN VAULT.
                        </div>
                    ) : (
                        assets.map((asset) => (
                            <Link href={`/asset/${asset.id}`} key={asset.id} className="vault-card block hover:cursor-pointer transition-transform hover:-translate-y-2">
                                <div className="hud-corner hud-corner--tl"></div>
                                <div className="hud-corner hud-corner--tr"></div>
                                <div className="hud-corner hud-corner--bl"></div>
                                <div className="hud-corner hud-corner--br"></div>
                                <div className="vault-card__img-wrapper border-b border-[#333]">
                                    {asset.imagePath ? (
                                        <img src={asset.imagePath} alt={asset.name} className="vault-card__img object-cover w-full h-full" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-[#333] font-mono text-sm tracking-widest">
                                            [NO_IMAGE_DATA]
                                        </div>
                                    )}
                                </div>
                                <div className="vault-card__body">
                                    <div className="vault-card__badge">[{asset.status}]</div>
                                    <h3 className="vault-card__name text-white">{asset.name}</h3>
                                    <div className="vault-card__meta">
                                        <span className="vault-card__label">VAULT_ID:</span>
                                        <span className="vault-card__value text-[#888]">{asset.id.slice(0, 8)}</span>
                                    </div>
                                    <div className="vault-card__meta">
                                        <span className="vault-card__label">CATEGORY:</span>
                                        <span className="vault-card__value text-[#888]">{asset.category}</span>
                                    </div>
                                    <div className="vault-card__price text-[#00ff41] mt-4">
                                        PRICE_PER_SHARE: {asset.pricePerShare ? `$${asset.pricePerShare.toFixed(2)}` : 'TBD'}
                                    </div>
                                    <div className="vault-card__shares text-[#888] mt-2">
                                        TOTAL_SHARES: {asset.totalShares ? asset.totalShares.toLocaleString() : 'N/A'}
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}
