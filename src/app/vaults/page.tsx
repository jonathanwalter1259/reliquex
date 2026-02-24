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
        <div className="bg-black text-[#00FF00] selection:bg-[#00FF00] selection:text-black min-h-screen pt-24 pb-24 font-mono">
            {/* Global CRT & Glow Styles */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .crt-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%);
                    background-size: 100% 3px;
                    pointer-events: none;
                    z-index: 9999;
                    opacity: 0.15;
                }
                .text-glow {
                    text-shadow: 0 0 10px rgba(0, 255, 0, 0.8), 0 0 20px rgba(0, 255, 0, 0.4);
                }
            `}} />

            <div className="crt-overlay"></div>

            <div className="max-w-[1400px] mx-auto px-8 relative z-10">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-black mb-4 uppercase tracking-tighter" style={{ fontFamily: 'var(--font-cinzel)' }}>
                        EXPLORE SECURED VAULTS.
                    </h1>
                    <p className="text-[#00FF00] text-sm tracking-widest uppercase flex justify-center items-center gap-2">
                        <span className="text-[#00FF00] font-bold">&gt;</span> Browse verified luxury assets available for fractional investment.
                    </p>
                </div>

                {/* Filter Bar (Ghost Buttons) */}
                <div className="flex flex-wrap justify-center gap-4 mb-16 font-mono text-xs tracking-widest uppercase">
                    <button className={`px-4 py-2 border transition-all ${activeFilter === 'ALL' ? 'border-[#00FF00] text-[#00FF00] bg-[#00FF00]/10' : 'border-[#00FF00]/30 text-[#00FF00]/60 hover:border-[#00FF00]/70 hover:text-[#00FF00]'}`} onClick={() => setActiveFilter('ALL')}>ALL ASSETS</button>
                    <button className={`px-4 py-2 border transition-all ${activeFilter === 'STATUS_AUTHENTICATED' ? 'border-[#00FF00] text-[#00FF00] bg-[#00FF00]/10' : 'border-[#00FF00]/30 text-[#00FF00]/60 hover:border-[#00FF00]/70 hover:text-[#00FF00]'}`} onClick={() => setActiveFilter('STATUS_AUTHENTICATED')}>[STATUS: AUTHENTICATED]</button>
                    <button className={`px-4 py-2 border transition-all ${activeFilter === 'STATUS_MINTED' ? 'border-[#00FF00] text-[#00FF00] bg-[#00FF00]/10' : 'border-[#00FF00]/30 text-[#00FF00]/60 hover:border-[#00FF00]/70 hover:text-[#00FF00]'}`} onClick={() => setActiveFilter('STATUS_MINTED')}>[STATUS: MINTED]</button>
                    <button className={`px-4 py-2 border transition-all ${activeFilter === 'CAT_WATCHES' ? 'border-[#00FF00] text-[#00FF00] bg-[#00FF00]/10' : 'border-[#00FF00]/30 text-[#00FF00]/60 hover:border-[#00FF00]/70 hover:text-[#00FF00]'}`} onClick={() => setActiveFilter('CAT_WATCHES')}>[CATEGORY: WATCHES]</button>
                    <button className={`px-4 py-2 border transition-all ${activeFilter === 'CAT_COLLECTIBLES' ? 'border-[#00FF00] text-[#00FF00] bg-[#00FF00]/10' : 'border-[#00FF00]/30 text-[#00FF00]/60 hover:border-[#00FF00]/70 hover:text-[#00FF00]'}`} onClick={() => setActiveFilter('CAT_COLLECTIBLES')}>[CATEGORY: SNEAKERS]</button>
                    <button className={`px-4 py-2 border transition-all ${activeFilter === 'CAT_JEWELRY' ? 'border-[#00FF00] text-[#00FF00] bg-[#00FF00]/10' : 'border-[#00FF00]/30 text-[#00FF00]/60 hover:border-[#00FF00]/70 hover:text-[#00FF00]'}`} onClick={() => setActiveFilter('CAT_JEWELRY')}>[CATEGORY: JEWELRY]</button>
                </div>

                {/* Vault Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {isLoading ? (
                        <div className="col-span-full py-24 text-center font-mono text-[#00FF00] tracking-widest animate-pulse">
                            &gt; SYNCING_VAULT_PROTOCOL...
                        </div>
                    ) : filteredAssets.length === 0 ? (
                        <div className="col-span-full py-24 text-center font-mono text-[#888] tracking-widest">
                            NO ASSETS DETECTED MATCHING CURRENT FILTER.
                        </div>
                    ) : (
                        filteredAssets.map((asset) => (
                            <Link href={`/asset/${asset.id}`} key={asset.id} className="group relative bg-[#050505] border border-[#00FF00] p-6 hover:bg-[#0a0a0a] transition-colors overflow-hidden block">
                                {/* HUD Corners */}
                                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00FF00]"></div>
                                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#00FF00]"></div>
                                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#00FF00]"></div>
                                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#00FF00]"></div>

                                {/* Status Badge */}
                                <div className="text-[10px] tracking-widest mb-4 flex justify-between uppercase">
                                    <span className={asset.status === 'MINTED' ? 'text-yellow-400' : 'text-[#00FF00]'}>
                                        [STATUS: {asset.status}]
                                    </span>
                                    {asset.status === 'MINTED' && <span className="text-yellow-400">[100 VERIFIED]</span>}
                                </div>

                                {/* Image Centered */}
                                <div className="h-[250px] w-full flex items-center justify-center mb-6">
                                    {asset.imagePath ? (
                                        <img src={asset.imagePath.split(',')[0]} alt={asset.name} className="max-h-full max-w-full object-contain filter group-hover:brightness-110 transition-all drop-shadow-[0_0_15px_rgba(0,255,0,0.15)]" />
                                    ) : (
                                        <div className="text-[#333] text-xs tracking-widest">[NO_IMG_DATA]</div>
                                    )}
                                </div>

                                {/* Details */}
                                <div className="border-t border-[#333] pt-4">
                                    <h3 className="text-white text-sm font-bold tracking-wider mb-2 uppercase truncate" style={{ fontFamily: 'var(--font-inter)' }}>{asset.name}</h3>
                                    <div className="text-[#666] text-[10px] tracking-widest mb-4 uppercase">
                                        ${asset.category.slice(0, 2)}-{asset.id.slice(0, 3)}
                                    </div>

                                    <div className="flex justify-between items-end">
                                        <div className="text-[10px] tracking-widest text-[#666]">
                                            SHARE_PRICE:
                                        </div>
                                        <div className="text-lg font-bold text-[#00FF00]">
                                            {asset.pricePerShare ? `$${asset.pricePerShare.toFixed(2)}` : 'TBD'}
                                        </div>
                                    </div>

                                    {/* Fake Progress Bar to emulate the screenshot */}
                                    <div className="flex justify-between text-[8px] text-[#666] tracking-widest mt-4 mb-2 uppercase">
                                        <span>0 sold</span>
                                        <span>{asset.totalShares ? (asset.totalShares).toLocaleString() : 'N/A'} total</span>
                                    </div>
                                    <div className="w-full h-1 bg-[#111]">
                                        <div className="h-full bg-[#00FF00]" style={{ width: '5%' }}></div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
