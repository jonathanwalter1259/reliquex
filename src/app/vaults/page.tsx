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

    return (
        <main className="page-wrap reveal">
            <div className="container">
                <div className="page-header">
                    <h1 className="page-header__title">EXPLORE SECURED VAULTS.</h1>
                    <p className="page-header__sub">&gt; Browse verified luxury assets available for fractional investment.</p>
                </div>

                {/* Filter Bar */}
                <div className="vault-filters">
                    <button className={`vault-filter ${activeFilter === 'ALL' ? 'active border-[#00ff41] text-[#00ff41]' : ''}`} onClick={() => setActiveFilter('ALL')}>ALL ASSETS</button>
                    <button className={`vault-filter ${activeFilter === 'STATUS_AUTHENTICATED' ? 'active border-[#00ff41] text-[#00ff41]' : ''}`} onClick={() => setActiveFilter('STATUS_AUTHENTICATED')}>[STATUS: AUTHENTICATED]</button>
                    <button className={`vault-filter ${activeFilter === 'STATUS_MINTED' ? 'active border-[#00ff41] text-[#00ff41]' : ''}`} onClick={() => setActiveFilter('STATUS_MINTED')}>[STATUS: MINTED]</button>
                    <button className={`vault-filter ${activeFilter === 'CAT_WATCHES' ? 'active border-[#00ff41] text-[#00ff41]' : ''}`} onClick={() => setActiveFilter('CAT_WATCHES')}>[CATEGORY: WATCHES]</button>
                    <button className={`vault-filter ${activeFilter === 'CAT_ART' ? 'active border-[#00ff41] text-[#00ff41]' : ''}`} onClick={() => setActiveFilter('CAT_ART')}>[CATEGORY: ART]</button>
                    <button className={`vault-filter ${activeFilter === 'CAT_JEWELRY' ? 'active border-[#00ff41] text-[#00ff41]' : ''}`} onClick={() => setActiveFilter('CAT_JEWELRY')}>[CATEGORY: JEWELRY]</button>
                    <button className={`vault-filter ${activeFilter === 'CAT_COLLECTIBLES' ? 'active border-[#00ff41] text-[#00ff41]' : ''}`} onClick={() => setActiveFilter('CAT_COLLECTIBLES')}>[CATEGORY: COLLECTIBLES]</button>
                </div>

                {/* Vault Grid */}
                <div className="vault-grid">
                    {isLoading ? (
                        <div className="col-span-full py-12 text-center font-mono text-[#00ff41] tracking-widest animate-pulse">
                            &gt; SYNCING_VAULT_PROTOCOL...
                        </div>
                    ) : filteredAssets.length === 0 ? (
                        <div className="col-span-full py-12 text-center font-mono text-[#888] tracking-widest">
                            NO ASSETS DETECTED MATCHING CURRENT FILTER.
                        </div>
                    ) : (
                        filteredAssets.map((asset) => (
                            <Link href={`/asset/${asset.id}`} key={asset.id} className="vault-card block hover:cursor-pointer transition-transform hover:-translate-y-2">
                                <div className="hud-corner hud-corner--tl"></div>
                                <div className="hud-corner hud-corner--tr"></div>
                                <div className="hud-corner hud-corner--bl"></div>
                                <div className="hud-corner hud-corner--br"></div>
                                <div className="vault-card__img-wrap border-b border-[#333]">
                                    <span className="vault-card__badge">[{asset.status}]</span>
                                    {asset.imagePath ? (
                                        <img src={asset.imagePath.split(',')[0]} alt={asset.name} className="vault-card__img object-cover w-full h-full" style={{ maxHeight: '300px' }} />
                                    ) : (
                                        <div className="w-full h-[300px] flex items-center justify-center text-[#333] font-mono text-sm tracking-widest">
                                            [NO_IMAGE_DATA]
                                        </div>
                                    )}
                                </div>
                                <div className="vault-card__body">
                                    <div className="vault-card__name text-white">{asset.name}</div>
                                    <div className="vault-card__ticker text-[#888]">${asset.category.slice(0, 3)}-{asset.id.slice(0, 4)}</div>
                                    <div className="vault-card__price-row mt-4">
                                        <span className="vault-card__price-label text-[#888]">SHARE_PRICE:</span>
                                        <span className="vault-card__price text-[#00ff41]">{asset.pricePerShare ? `$${asset.pricePerShare.toFixed(2)}` : 'TBD'}</span>
                                    </div>
                                    <div className="vault-card__progress mt-4">
                                        <div className="vault-card__progress-labels text-[#888] text-xs">
                                            <span>0 sold</span>
                                            <span>{asset.totalShares ? asset.totalShares.toLocaleString() : 'N/A'} total</span>
                                        </div>
                                        <div className="vault-card__progress-track mt-2 h-1 bg-[#111]">
                                            <div className="vault-card__progress-fill h-full bg-[#333]" style={{ width: '0%' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </main>
    );
}
