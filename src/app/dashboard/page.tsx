"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAccount, useReadContracts } from 'wagmi';
import { reliqueXAddress, reliqueXABI } from '@/lib/web3/contract';
import { Asset } from '@prisma/client';

export default function Dashboard() {
    const { address, isConnected } = useAccount();
    const [assets, setAssets] = useState<Asset[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMintedAssets = async () => {
            try {
                const res = await fetch('/api/vault');
                const data = await res.json();
                if (data.success) {
                    const mintedAssets = data.assets.filter((a: Asset) => a.status === 'MINTED' && a.contractAssetId !== null);
                    setAssets(mintedAssets);
                }
            } catch (error) {
                console.error("Failed to fetch assets", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchMintedAssets();
    }, []);

    // Create wagmi contract read hooks dynamically based on fetched assets
    const balanceContracts = assets.map((asset) => ({
        address: reliqueXAddress as `0x${string}`,
        abi: reliqueXABI,
        functionName: 'balanceOf',
        args: [address, asset.contractAssetId],
    }));

    const { data: balancesData } = useReadContracts({
        contracts: balanceContracts as any,
    });

    const holdings = assets.map((asset, index) => {
        const balance = balancesData?.[index]?.result;
        const sharesOwned = balance ? Number(balance) : 0;
        const value = sharesOwned * (asset.pricePerShare || 0);
        return {
            ...asset,
            sharesOwned,
            value
        };
    }).filter(h => h.sharesOwned > 0 || !isConnected); // Show empty placeholders if disconnected

    const totalPortfolioValue = holdings.reduce((sum, h) => sum + h.value, 0);
    const totalShares = holdings.reduce((sum, h) => sum + h.sharesOwned, 0);

    return (
        <main className="page-wrap reveal min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="page-header mb-12 border-b border-[#00ff41]/30 pb-6 relative">
                    <div className="absolute bottom-0 left-0 w-32 h-[1px] bg-[#00ff41] shadow-[0_0_10px_#00ff41]"></div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-[0.2em] mb-2 text-glow uppercase">PORTFOLIO DASHBOARD.</h1>
                    <p className="text-[#00ff41]/60 font-mono text-sm tracking-[0.3em] uppercase flex items-center gap-3">
                        <span className={`w-2 h-2 ${isConnected ? 'bg-[#00ff41] animate-pulse' : 'bg-red-500'} rounded-full`}></span>
                        &gt; WALLET: {isConnected ? `${address?.slice(0, 6)}...${address?.slice(-4)}` : 'DISCONNECTED'} // CONNECTION: {isConnected ? 'ACTIVE' : 'OFFLINE'}
                    </p>
                </div>

                {/* Portfolio Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="relative box-glow bg-black/40 backdrop-blur-xl border border-[#00ff41]/20 p-8 flex flex-col items-center text-center">
                        <div className="absolute -top-[1px] -left-[1px] w-4 h-4 border-t border-l border-[#00ff41]"></div>
                        <div className="absolute -top-[1px] -right-[1px] w-4 h-4 border-t border-r border-[#00ff41]"></div>
                        <div className="absolute -bottom-[1px] -left-[1px] w-4 h-4 border-b border-l border-[#00ff41]"></div>
                        <div className="absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b border-r border-[#00ff41]"></div>
                        <div className="text-[#00ff41]/60 tracking-[0.2em] text-xs mb-2">PORTFOLIO_VALUE:</div>
                        <div className="text-3xl font-mono text-[#00ff41] font-bold text-glow">${totalPortfolioValue.toFixed(2)}</div>
                    </div>
                    <div className="relative box-glow bg-black/40 backdrop-blur-xl border border-[#00ff41]/20 p-8 flex flex-col items-center text-center">
                        <div className="absolute -top-[1px] -left-[1px] w-4 h-4 border-t border-l border-[#00ff41]"></div>
                        <div className="absolute -top-[1px] -right-[1px] w-4 h-4 border-t border-r border-[#00ff41]"></div>
                        <div className="absolute -bottom-[1px] -left-[1px] w-4 h-4 border-b border-l border-[#00ff41]"></div>
                        <div className="absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b border-r border-[#00ff41]"></div>
                        <div className="text-[#00ff41]/60 tracking-[0.2em] text-xs mb-2">TOTAL_SHARES:</div>
                        <div className="text-3xl font-mono text-white font-bold">{totalShares}</div>
                    </div>
                    <div className="relative box-glow bg-black/40 backdrop-blur-xl border border-[#00ff41]/20 p-8 flex flex-col items-center text-center">
                        <div className="absolute -top-[1px] -left-[1px] w-4 h-4 border-t border-l border-[#00ff41]"></div>
                        <div className="absolute -top-[1px] -right-[1px] w-4 h-4 border-t border-r border-[#00ff41]"></div>
                        <div className="absolute -bottom-[1px] -left-[1px] w-4 h-4 border-b border-l border-[#00ff41]"></div>
                        <div className="absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b border-r border-[#00ff41]"></div>
                        <div className="text-[#00ff41]/60 tracking-[0.2em] text-xs mb-2">UNREALIZED_PNL:</div>
                        <div className="text-3xl font-mono text-[#00ff41] font-bold text-glow">+$0.00</div>
                    </div>
                </div>

                {/* Holdings Table */}
                <div className="relative box-glow bg-black/40 backdrop-blur-xl border border-[#00ff41]/20 overflow-x-auto p-1">
                    <div className="absolute -top-[1px] -left-[1px] w-8 h-8 border-t-2 border-l-2 border-[#00ff41]"></div>
                    <div className="absolute -top-[1px] -right-[1px] w-8 h-8 border-t-2 border-r-2 border-[#00ff41]"></div>
                    <div className="absolute -bottom-[1px] -left-[1px] w-8 h-8 border-b-2 border-l-2 border-[#00ff41]"></div>
                    <div className="absolute -bottom-[1px] -right-[1px] w-8 h-8 border-b-2 border-r-2 border-[#00ff41]"></div>

                    <div className="flex justify-between items-center p-6 border-b-2 border-[#00ff41]/50 bg-[#00ff41]/5">
                        <span className="font-bold tracking-[0.2em] text-[#00ff41] text-xs">// HOLDINGS_TERMINAL</span>
                        <span className="text-[#00ff41]/80 font-mono text-xs tracking-widest flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-[#00ff41] rounded-full animate-pulse"></span>
                            {isConnected ? 'SYNCED' : 'WAITING_AUTH'}
                        </span>
                    </div>

                    <table className="w-full text-left font-mono text-sm border-collapse uppercase min-w-[800px]">
                        <thead>
                            <tr className="bg-[#00ff41]/5 border-b border-[#00ff41]/20">
                                <th className="p-6 font-bold tracking-[0.2em] text-[#00ff41]/60 text-xs text-left">ASSET</th>
                                <th className="p-6 font-bold tracking-[0.2em] text-[#00ff41]/60 text-xs">CLASS</th>
                                <th className="p-6 font-bold tracking-[0.2em] text-[#00ff41]/60 text-xs text-right">SHARES</th>
                                <th className="p-6 font-bold tracking-[0.2em] text-[#00ff41]/60 text-xs text-right">MKT_PRICE</th>
                                <th className="p-6 font-bold tracking-[0.2em] text-[#00ff41]/60 text-xs text-right">VALUE</th>
                            </tr>
                        </thead>
                        <tbody className="text-[#eee]">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="p-16 text-center text-[#00ff41]/50 tracking-[0.2em] animate-pulse">
                                        &gt; FETCHING_BLOCKCHAIN_LEDGER...
                                    </td>
                                </tr>
                            ) : holdings.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-16 text-center text-[#00ff41]/50 tracking-[0.2em]">
                                        [ NO_ASSETS_DETECTED_IN_WALLET ]
                                    </td>
                                </tr>
                            ) : holdings.map((h, i) => (
                                <tr key={i} className="border-b border-[#00ff41]/10 hover:bg-[#00ff41]/5 transition-colors group">
                                    <td className="p-6">
                                        <Link href={`/asset/${h.id}`} className="flex items-center gap-4">
                                            {h.imagePath ? (
                                                <img src={h.imagePath.split(',')[0]} alt={h.name} className="w-10 h-10 object-cover border border-[#00ff41]/30 group-hover:border-[#00ff41]" />
                                            ) : (
                                                <div className="w-10 h-10 bg-[#333] border border-[#00ff41]/30"></div>
                                            )}
                                            <span className="font-bold tracking-wider group-hover:text-[#00ff41] group-hover:drop-shadow-[0_0_5px_#00ff41] transition-all">{h.name}</span>
                                        </Link>
                                    </td>
                                    <td className="p-6 text-[#00ff41]/70">{h.category}</td>
                                    <td className="p-6 text-right font-bold">{h.sharesOwned}</td>
                                    <td className="p-6 text-right">${h.pricePerShare?.toFixed(2) || '0.00'}</td>
                                    <td className="p-6 text-right font-bold text-[#00ff41]">${h.value.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}
