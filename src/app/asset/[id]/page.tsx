"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Asset } from "@prisma/client";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import { reliqueXAddress, reliqueXABI } from '@/lib/web3/contract';

export default function AssetPage({ params }: { params: { id: string } }) {
    const [asset, setAsset] = useState<Asset | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeImage, setActiveImage] = useState<string>("");
    const [sharesToBuy, setSharesToBuy] = useState(1);

    const { isConnected } = useAccount();
    const { data: hash, isPending, writeContract, error: txError } = useWriteContract();

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
    });

    const handleAcquireShares = () => {
        if (!asset || asset.contractAssetId === null) return;

        // Approximate BNB cost from USD (assuming 1 BNB = $600 for prototype)
        const totalUsdCost = (asset.pricePerShare || 0) * sharesToBuy;
        const bnbAmount = (totalUsdCost / 600).toFixed(4);

        writeContract({
            address: reliqueXAddress,
            abi: reliqueXABI,
            functionName: 'buyShares',
            args: [BigInt(asset.contractAssetId), BigInt(sharesToBuy)],
            value: parseEther(bnbAmount)
        });
    };

    useEffect(() => {
        const fetchAsset = async () => {
            try {
                const res = await fetch(`/api/vault/${params.id}`);
                const data = await res.json();
                if (data.success) {
                    setAsset(data.asset);
                    if (data.asset.imagePath) {
                        setActiveImage(data.asset.imagePath);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch asset details:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAsset();
    }, [params.id]);

    if (isLoading) {
        return (
            <main className="min-h-screen pt-32 pb-20 flex items-center justify-center">
                <div className="font-mono text-[#00ff41] tracking-widest animate-pulse text-xl">
                    &gt; INTERROGATING_VAULT_PROTOCOL...
                </div>
            </main>
        );
    }

    if (!asset) {
        return (
            <main className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center">
                <div className="font-mono text-red-500 tracking-widest text-xl mb-4">
                    [ERR_404]: ASSET_NOT_FOUND_IN_VAULT
                </div>
                <Link href="/vaults" className="text-[#888] hover:text-white transition-colors underline uppercase tracking-widest">
                    Return to Marketplace
                </Link>
            </main>
        );
    }

    const sharePrice = asset.pricePerShare || 0;
    const totalShares = asset.totalShares || 0;
    const estimatedValue = sharePrice * totalShares;

    return (
        <main className="asset-page">
            <div className="container">

                {/*  Back Navigation  */}
                <Link href="/vaults" className="asset-back">&lt; RETURN TO VAULTS</Link>

                <div className="asset-layout">

                    {/*  ===== LEFT: Media Gallery =====  */}
                    <div className="asset-gallery">

                        {/*  Main Viewer  */}
                        <div className="asset-viewer">
                            <div className="hud-corner hud-corner--tl"></div>
                            <div className="hud-corner hud-corner--tr"></div>
                            <div className="hud-corner hud-corner--bl"></div>
                            <div className="hud-corner hud-corner--br"></div>
                            {activeImage ? (
                                <img src={activeImage} alt={asset.name} className="asset-viewer__img object-contain w-full h-[500px]" />
                            ) : (
                                <div className="w-full h-[500px] flex items-center justify-center text-[#333] font-mono tracking-widest border border-[#333]">
                                    [NO_IMAGE_DATA_AVAILABLE]
                                </div>
                            )}
                        </div>

                        {/*  Thumbnails  */}
                        {activeImage && (
                            <div className="asset-thumbs">
                                <button className="asset-thumb active border-[#00ff41]">
                                    <img src={activeImage} alt="Main View" className="w-full h-full object-cover" />
                                </button>
                                {/* Generating mock identical thumbnails to match UI layout */}
                                <button className="asset-thumb hover:border-[#333] opacity-50 hover:opacity-100 transition-opacity">
                                    <img src={activeImage} alt="View 2" className="w-full h-full object-cover grayscale" />
                                </button>
                                <button className="asset-thumb hover:border-[#333] opacity-50 hover:opacity-100 transition-opacity">
                                    <img src={activeImage} alt="View 3" className="w-full h-full object-cover grayscale" />
                                </button>
                                <button className="asset-thumb hover:border-[#333] opacity-50 hover:opacity-100 transition-opacity">
                                    <img src={activeImage} alt="View 4" className="w-full h-full object-cover grayscale" />
                                </button>
                            </div>
                        )}
                    </div>

                    {/*  ===== RIGHT: Data & Trading Terminal =====  */}
                    <div className="asset-data">

                        {/*  Header  */}
                        <div className="asset-header">
                            <div className="asset-tag uppercase">[SYS.CAT: {asset.category}] - [{asset.status}]</div>
                            <h1 className="asset-title text-4xl mb-4">{asset.name}</h1>
                            <p className="asset-desc text-[#888] mb-8">
                                {asset.description || "No specific provenance details have been injected into the terminal for this asset."}
                            </p>
                        </div>

                        {/*  Trading Terminal Widget  */}
                        <div className="trade-terminal">
                            <div className="hud-corner hud-corner--tl"></div>
                            <div className="hud-corner hud-corner--tr"></div>
                            <div className="hud-corner hud-corner--bl"></div>
                            <div className="hud-corner hud-corner--br"></div>

                            <div className="trade-header">
                                <span className="trade-header__label">// TRADING_TERMINAL</span>
                                <span className="trade-header__status">● LIVE</span>
                            </div>

                            {/*  Price Row  */}
                            <div className="trade-prices">
                                <div className="trade-price-block">
                                    <div className="trade-price-label">SHARE_PRICE:</div>
                                    <div className="trade-price-value text-[#00ff41]">{sharePrice ? `$${sharePrice.toLocaleString()}` : 'TBD'}</div>
                                    <div className="trade-price-crypto text-[#888]">≈ {sharePrice ? (sharePrice / 600).toFixed(4) : '0.000'} BNB</div>
                                </div>
                                <div className="trade-price-block">
                                    <div className="trade-price-label">CURRENT_VALUE:</div>
                                    <div className="trade-price-value text-white">{estimatedValue ? `$${estimatedValue.toLocaleString()}` : 'TBD'}</div>
                                    <div className="trade-price-crypto text-[#888]">≈ {estimatedValue ? (estimatedValue / 600).toFixed(2) : '0.00'} BNB</div>
                                </div>
                            </div>

                            {/*  Share Metrics  */}
                            <div className="trade-metrics">
                                <div className="trade-metric">
                                    <div className="trade-metric__label">TOTAL_SHARES:</div>
                                    <div className="trade-metric__value text-white">{totalShares ? totalShares.toLocaleString() : 'N/A'}</div>
                                </div>
                                <div className="trade-metric">
                                    <div className="trade-metric__label">AVAIL_SHARES:</div>
                                    <div className="trade-metric__value text-white">{totalShares ? totalShares.toLocaleString() : 'N/A'}</div>
                                </div>
                                <div className="trade-metric">
                                    <div className="trade-metric__label">VAULT_ID:</div>
                                    <div className="trade-metric__value text-[#888]">{asset.id.slice(0, 8)}</div>
                                </div>
                                <div className="trade-metric">
                                    <div className="trade-metric__label">CHAIN:</div>
                                    <div className="trade-metric__value text-[#888]">BNB Smart Chain</div>
                                </div>
                            </div>

                            {/*  Progress Bar  */}
                            <div className="trade-progress">
                                <div className="trade-progress__labels">
                                    <span>0 shares sold</span>
                                    <span>{totalShares ? totalShares.toLocaleString() : '0'} total</span>
                                </div>
                                <div className="trade-progress__track bg-[#111] h-1">
                                    <div className="trade-progress__fill bg-[#333] h-full transition-all" style={{ width: "0%" }}></div>
                                </div>
                            </div>

                            {/*  CTA  */}
                            {!isConnected ? (
                                <div className="mt-6 flex justify-center w-full">
                                    <appkit-button />
                                </div>
                            ) : asset.contractAssetId === null ? (
                                <button disabled className="trade-cta flex items-center justify-center gap-2 opacity-50 cursor-not-allowed">
                                    [ASSET_NOT_YET_MINTED_ONCHAIN]
                                </button>
                            ) : (
                                <div className="mt-6 w-full flex flex-col gap-3">
                                    <div className="flex justify-between items-center bg-[#111] border border-[#333] p-2">
                                        <span className="text-[#888] text-sm">QUANTITY:</span>
                                        <div className="flex items-center gap-4 text-white">
                                            <button onClick={() => setSharesToBuy(Math.max(1, sharesToBuy - 1))} className="hover:text-[#00ff41]">-</button>
                                            <span className="font-mono">{sharesToBuy}</span>
                                            <button onClick={() => setSharesToBuy(sharesToBuy + 1)} className="hover:text-[#00ff41]">+</button>
                                        </div>
                                    </div>
                                    <button
                                        className="trade-cta flex items-center justify-center gap-2 w-full"
                                        onClick={handleAcquireShares}
                                        disabled={isPending || isConfirming}
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                                            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                                            <path d="M16 7V5a4 4 0 0 0-8 0v2" />
                                        </svg>
                                        {isPending ? 'AWAITING WALLET SIGNATURE...' : isConfirming ? 'CONFIRMING TX ON BSC...' : 'ACQUIRE FRACTIONS'}
                                    </button>
                                </div>
                            )}

                            {/* Transaction Feedback */}
                            {hash && (
                                <div className="mt-4 p-3 bg-[#111] border border-[#333] text-xs font-mono text-[#888] break-all">
                                    TX_HASH: <a href={`https://testnet.bscscan.com/tx/${hash}`} target="_blank" rel="noreferrer" className="text-[#00ff41] hover:underline">{hash}</a>
                                </div>
                            )}
                            {isConfirmed && (
                                <div className="mt-2 text-[#00ff41] text-xs font-mono tracking-widest uppercase">
                                    &gt; SYSTEM: SHARES_ACQUIRED_SUCCESSFULLY
                                </div>
                            )}
                            {txError && (
                                <div className="mt-2 text-[#ff0033] text-[10px] font-mono tracking-widest uppercase bg-[#ff0033]/10 border border-[#ff0033]/30 p-3 shadow-[0_0_15px_rgba(255,0,51,0.2)]">
                                    &gt; [SYSTEM_FAULT]: TRANSACTION_REVERTED
                                    <div className="text-[#ff0033]/60 mt-1 truncate">:: {txError.message.split('\n')[0]}</div>
                                </div>
                            )}
                        </div>

                        {/*  Analytics Row  */}
                        <div className="asset-analytics">
                            <div className="analytics-card">
                                <div className="hud-corner hud-corner--tl"></div>
                                <div className="hud-corner hud-corner--tr"></div>
                                <div className="hud-corner hud-corner--bl"></div>
                                <div className="hud-corner hud-corner--br"></div>
                                <div className="analytics-card__label">APPRECIATION (1Y):</div>
                                <div className="analytics-card__value">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                                        <polyline points="17 6 23 6 23 12" />
                                    </svg>
                                    +0.0%
                                </div>
                            </div>
                            <div className="analytics-card">
                                <div className="hud-corner hud-corner--tl"></div>
                                <div className="hud-corner hud-corner--tr"></div>
                                <div className="hud-corner hud-corner--bl"></div>
                                <div className="hud-corner hud-corner--br"></div>
                                <div className="analytics-card__label">TOTAL_OWNERS:</div>
                                <div className="analytics-card__value analytics-card__value--white">1 (VAULT)</div>
                            </div>
                            <div className="analytics-card">
                                <div className="hud-corner hud-corner--tl"></div>
                                <div className="hud-corner hud-corner--tr"></div>
                                <div className="hud-corner hud-corner--bl"></div>
                                <div className="hud-corner hud-corner--br"></div>
                                <div className="analytics-card__label">MARKET_CAP:</div>
                                <div className="analytics-card__value analytics-card__value--white">{estimatedValue ? `$${estimatedValue.toLocaleString()}` : 'TBD'}</div>
                            </div>
                        </div>

                    </div>
                </div>

                {/*  Authenticity Ribbon  */}
                <div className="auth-ribbon">
                    <div className="hud-corner hud-corner--tl"></div>
                    <div className="hud-corner hud-corner--tr"></div>
                    <div className="hud-corner hud-corner--bl"></div>
                    <div className="hud-corner hud-corner--br"></div>
                    <div className="auth-ribbon__left">
                        <svg className="auth-ribbon__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            <polyline points="9 12 11 14 15 10" />
                        </svg>
                        <span className="auth-ribbon__text">[VERIFIED BASELAYER // SCORE: {asset.authenticityScore || 'PENDING'}/100]</span>
                    </div>
                    <div className="auth-ribbon__hash uppercase font-mono tracking-widest text-[#888]">{asset.contractAssetId ? `ONCHAIN_ID: ${asset.contractAssetId}` : 'PENDING_ONCHAIN_MINT'}</div>
                </div>

                {/*  Verification Ledger  */}
                <div className="verification-ledger">
                    <div className="hud-corner hud-corner--tl"></div>
                    <div className="hud-corner hud-corner--tr"></div>
                    <div className="hud-corner hud-corner--bl"></div>
                    <div className="hud-corner hud-corner--br"></div>
                    <div className="ledger-header">
                        <span className="ledger-header__title">// VERIFICATION_LEDGER</span>
                        <span className="ledger-header__status">● COMPLETED_RECORDS</span>
                    </div>
                    <div className="ledger-entries">
                        <div className="ledger-entry">
                            <span className="ledger-entry__key">DATE_INITIALIZED:</span>
                            <span className="ledger-entry__value">{new Date(asset.createdAt).toUTCString()}</span>
                        </div>
                        <div className="ledger-entry">
                            <span className="ledger-entry__key">LAST_UPDATED:</span>
                            <span className="ledger-entry__value">{new Date(asset.updatedAt).toUTCString()}</span>
                        </div>
                        <div className="ledger-entry">
                            <span className="ledger-entry__key">VAULT_LOCATION:</span>
                            <span className="ledger-entry__value ledger-entry__value--green uppercase">{asset.physicalLocation || 'PENDING_SECURE_TRANSPORT'}</span>
                        </div>
                        <div className="ledger-entry">
                            <span className="ledger-entry__key">AUTH_SCORE:</span>
                            <span className="ledger-entry__value ledger-entry__value--green uppercase">{asset.authenticityScore ? `${asset.authenticityScore}/100 [PASSED]` : 'PENDING'}</span>
                        </div>
                        <div className="ledger-entry">
                            <span className="ledger-entry__key">SUBMITTER_WALLET:</span>
                            <span className="ledger-entry__value font-mono tracking-widest">{asset.submitterWallet}</span>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}
