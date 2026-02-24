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
        <div className="vault-manager relative pt-16 md:pt-24 pb-24 text-[#00ff41] selection:bg-[#00ff41] selection:text-black min-h-screen">
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
                    text-shadow: 0 0 10px rgba(0, 255, 65, 0.8), 0 0 20px rgba(0, 255, 65, 0.4);
                }
                .box-glow {
                    box-shadow: 0 0 30px rgba(0, 255, 65, 0.1), inset 0 0 20px rgba(0, 255, 65, 0.05);
                }
            `}} />

            <div className="crt-overlay"></div>

            <div className="max-w-[90rem] mx-auto px-6 relative z-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-[#00ff41]/30 pb-6 relative">
                    <div className="absolute bottom-0 left-0 w-32 h-[1px] bg-[#00ff41] shadow-[0_0_10px_#00ff41]"></div>
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-[0.2em] mb-2 text-glow uppercase">
                            NEXUS_MARKET
                        </h1>
                        <h2 className="text-[#00ff41]/60 font-mono text-sm tracking-[0.3em] uppercase flex items-center gap-3">
                            <span className="w-2 h-2 bg-[#00ff41] animate-pulse"></span>
                            ACTIVE DIRECTORY :: {filteredAssets.length} PROTOCOLS ACCESSIBLE
                        </h2>
                    </div>
                </div>

                {/* Filter Bar */}
                <div className="flex flex-wrap gap-4 mb-8 font-mono text-xs tracking-widest uppercase">
                    <button className={`px-4 py-2 border transition-all ${activeFilter === 'ALL' ? 'border-[#00ff41] bg-[#00ff41]/20 text-glow' : 'border-[#00ff41]/30 text-[#00ff41]/60 hover:border-[#00ff41]/70 hover:text-[#00ff41]'}`} onClick={() => setActiveFilter('ALL')}>[ALL_ASSETS]</button>
                    <button className={`px-4 py-2 border transition-all ${activeFilter === 'STATUS_AUTHENTICATED' ? 'border-[#00ff41] bg-[#00ff41]/20 text-glow' : 'border-[#00ff41]/30 text-[#00ff41]/60 hover:border-[#00ff41]/70 hover:text-[#00ff41]'}`} onClick={() => setActiveFilter('STATUS_AUTHENTICATED')}>[AUTHENTICATED]</button>
                    <button className={`px-4 py-2 border transition-all ${activeFilter === 'STATUS_MINTED' ? 'border-[#00ff41] bg-[#00ff41]/20 text-glow' : 'border-[#00ff41]/30 text-[#00ff41]/60 hover:border-[#00ff41]/70 hover:text-[#00ff41]'}`} onClick={() => setActiveFilter('STATUS_MINTED')}>[MINTED]</button>
                    <button className={`px-4 py-2 border transition-all ${activeFilter === 'CAT_WATCHES' ? 'border-[#00ff41] bg-[#00ff41]/20 text-glow' : 'border-[#00ff41]/30 text-[#00ff41]/60 hover:border-[#00ff41]/70 hover:text-[#00ff41]'}`} onClick={() => setActiveFilter('CAT_WATCHES')}>[WATCHES]</button>
                    <button className={`px-4 py-2 border transition-all ${activeFilter === 'CAT_ART' ? 'border-[#00ff41] bg-[#00ff41]/20 text-glow' : 'border-[#00ff41]/30 text-[#00ff41]/60 hover:border-[#00ff41]/70 hover:text-[#00ff41]'}`} onClick={() => setActiveFilter('CAT_ART')}>[ART]</button>
                    <button className={`px-4 py-2 border transition-all ${activeFilter === 'CAT_JEWELRY' ? 'border-[#00ff41] bg-[#00ff41]/20 text-glow' : 'border-[#00ff41]/30 text-[#00ff41]/60 hover:border-[#00ff41]/70 hover:text-[#00ff41]'}`} onClick={() => setActiveFilter('CAT_JEWELRY')}>[JEWELRY]</button>
                    <button className={`px-4 py-2 border transition-all ${activeFilter === 'CAT_COLLECTIBLES' ? 'border-[#00ff41] bg-[#00ff41]/20 text-glow' : 'border-[#00ff41]/30 text-[#00ff41]/60 hover:border-[#00ff41]/70 hover:text-[#00ff41]'}`} onClick={() => setActiveFilter('CAT_COLLECTIBLES')}>[COLLECTIBLES]</button>
                </div>

                {/* Data Grid Section */}
                <div className="relative box-glow bg-black/40 backdrop-blur-xl border border-[#00ff41]/20">
                    <div className="absolute -top-[1px] -left-[1px] w-8 h-8 border-t-2 border-l-2 border-[#00ff41]"></div>
                    <div className="absolute -top-[1px] -right-[1px] w-8 h-8 border-t-2 border-r-2 border-[#00ff41]"></div>
                    <div className="absolute -bottom-[1px] -left-[1px] w-8 h-8 border-b-2 border-l-2 border-[#00ff41]"></div>
                    <div className="absolute -bottom-[1px] -right-[1px] w-8 h-8 border-b-2 border-r-2 border-[#00ff41]"></div>

                    <div className="overflow-x-auto p-1">
                        <table className="w-full text-left font-mono text-sm border-collapse uppercase">
                            <thead>
                                <tr className="bg-[#00ff41]/5 border-b-2 border-[#00ff41]/50">
                                    <th className="p-6 font-bold tracking-[0.2em] text-[#00ff41] text-xs">SYS_ID</th>
                                    <th className="p-6 font-bold tracking-[0.2em] text-[#00ff41] text-xs">NEXUS_DESIGNATION</th>
                                    <th className="p-6 font-bold tracking-[0.2em] text-[#00ff41] text-xs">CLASS</th>
                                    <th className="p-6 font-bold tracking-[0.2em] text-[#00ff41] text-xs">VALUATION</th>
                                    <th className="p-6 font-bold tracking-[0.2em] text-[#00ff41] text-xs text-right">ACTION</th>
                                </tr>
                            </thead>
                            <tbody className="text-[#eee]">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={5} className="p-16 text-center text-[#00ff41] animate-pulse tracking-widest">
                                            &gt; SYNCING_VAULT_PROTOCOL...
                                        </td>
                                    </tr>
                                ) : filteredAssets.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="p-16 text-center text-[#888] tracking-widest">
                                            NO ASSETS DETECTED MATCHING CURRENT FILTER.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredAssets.map((asset) => (
                                        <tr key={asset.id} className="border-b border-[#00ff41]/10 hover:bg-gradient-to-r hover:from-[#00ff41]/10 hover:to-transparent transition-all duration-200 group">
                                            <td className="p-6 text-[#00ff41]/50 text-xs w-40 truncate">
                                                {asset.id.slice(0, 8)}...
                                            </td>
                                            <td className="p-6">
                                                <div className="flex items-center gap-4">
                                                    {asset.imagePath ? (
                                                        <img src={asset.imagePath.split(',')[0]} alt="Asset" className="w-12 h-12 object-cover border border-[#00ff41]/30 group-hover:border-[#00ff41] transition-colors" />
                                                    ) : (
                                                        <div className="w-12 h-12 bg-black border border-[#00ff41]/20 flex items-center justify-center text-[8px] text-[#00ff41]/40">NO_IMG</div>
                                                    )}
                                                    <span className="font-bold tracking-wider group-hover:text-glow transition-all">{asset.name}</span>
                                                    {asset.status === 'MINTED' && <span className="ml-2 px-2 py-0.5 text-[10px] bg-yellow-500/20 text-yellow-500 border border-yellow-500/30">MINTED</span>}
                                                </div>
                                            </td>
                                            <td className="p-6 tracking-widest text-xs">
                                                <span className="px-3 py-1 border border-[#00ff41]/30 bg-[#00ff41]/5 text-[#00ff41]">
                                                    {asset.category}
                                                </span>
                                            </td>
                                            <td className="p-6 tracking-wider">
                                                {asset.pricePerShare ? <span className="text-white">${asset.pricePerShare.toFixed(2)}</span> : <span className="text-[#00ff41]/40">UNPRICED</span>}
                                            </td>
                                            <td className="p-6 text-right space-x-4">
                                                <Link
                                                    href={`/asset/${asset.id}`}
                                                    className="text-[#00ff41]/70 hover:text-white hover:text-glow transition-all tracking-[0.1em] text-xs relative before:content-['['] after:content-[']'] hover:before:text-[#00ff41] hover:after:text-[#00ff41] before:mr-1 after:ml-1 before:transition-colors after:transition-colors"
                                                >
                                                    VIEW_DATA
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
