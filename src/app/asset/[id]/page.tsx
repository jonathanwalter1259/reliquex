"use client";

import { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { Asset } from "@prisma/client";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import { reliqueXAddress, reliqueXABI } from '@/lib/web3/contract';
const LAUNCH_DATE = new Date('2026-03-07T00:00:00+05:30');

function useCountdown(target: Date) {
    const [tl, setTl] = useState({ d: 0, h: 0, m: 0, s: 0, expired: false });
    useEffect(() => {
        const tick = () => {
            const diff = target.getTime() - Date.now();
            if (diff <= 0) { setTl({ d: 0, h: 0, m: 0, s: 0, expired: true }); return; }
            setTl({
                d: Math.floor(diff / 86400000),
                h: Math.floor((diff % 86400000) / 3600000),
                m: Math.floor((diff % 3600000) / 60000),
                s: Math.floor((diff % 60000) / 1000),
                expired: false,
            });
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, [target]);
    return tl;
}

export default function AssetPage(props: { params: Promise<{ id: string }> }) {
    const params = use(props.params);
    const id = params.id;

    const [asset, setAsset] = useState<Asset | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [images, setImages] = useState<string[]>([]);
    const [activeImage, setActiveImage] = useState<string>("");
    const [sharesToBuy, setSharesToBuy] = useState(1);
    const countdown = useCountdown(LAUNCH_DATE);

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
                const res = await fetch(`/api/vault/${id}`);
                const data = await res.json();
                if (data.success) {
                    setAsset(data.asset);
                    if (data.asset.imagePath) {
                        const urls = data.asset.imagePath.split(',');
                        setImages(urls);
                        setActiveImage(urls[0]);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch asset details:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAsset();
    }, [id]);

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
                        {images.length > 0 && (
                            <div className="asset-thumbs">
                                {images.map((url, idx) => (
                                    <button
                                        key={idx}
                                        className={`asset-thumb transition-opacity ${activeImage === url ? 'active border-[#00ff41]' : 'hover:border-[#333] opacity-50 hover:opacity-100'}`}
                                        onClick={() => setActiveImage(url)}
                                    >
                                        <img src={url} alt={`View ${idx + 1}`} className={`w-full h-full object-cover ${activeImage !== url ? 'grayscale' : ''}`} />
                                    </button>
                                ))}
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

                        {/* Launch Countdown */}
                        {!countdown.expired && (
                            <div style={{
                                border: '1px solid #00ff41',
                                padding: '1.25rem 1.5rem',
                                marginBottom: '1.5rem',
                                fontFamily: 'var(--font-space-mono, monospace)',
                                background: 'rgba(0, 255, 65, 0.04)',
                                position: 'relative',
                                overflow: 'hidden',
                            }}>
                                <div style={{
                                    position: 'absolute', inset: 0, opacity: 0.03,
                                    background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,65,0.1) 2px, rgba(0,255,65,0.1) 4px)',
                                    pointerEvents: 'none',
                                }} />
                                <div style={{
                                    color: '#00ff41', fontSize: '0.7rem', letterSpacing: '0.15em',
                                    textTransform: 'uppercase', marginBottom: '0.75rem', opacity: 0.7,
                                }}>
                                    &gt; VAULT_LAUNCH_COUNTDOWN // FIRST ASSET DROP
                                </div>
                                <div style={{
                                    display: 'flex', gap: '1.5rem', justifyContent: 'center',
                                    flexWrap: 'wrap',
                                }}>
                                    {[
                                        { val: countdown.d, label: 'DAYS' },
                                        { val: countdown.h, label: 'HRS' },
                                        { val: countdown.m, label: 'MIN' },
                                        { val: countdown.s, label: 'SEC' },
                                    ].map((u) => (
                                        <div key={u.label} style={{ textAlign: 'center', minWidth: '70px' }}>
                                            <div style={{
                                                fontSize: '2rem', fontWeight: 700, color: '#00ff41',
                                                lineHeight: 1.1,
                                                textShadow: '0 0 12px rgba(0,255,65,0.5)',
                                            }}>
                                                {String(u.val).padStart(2, '0')}
                                            </div>
                                            <div style={{
                                                fontSize: '0.6rem', color: '#888', letterSpacing: '0.2em',
                                                marginTop: '0.25rem',
                                            }}>
                                                {u.label}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div style={{
                                    color: '#888', fontSize: '0.65rem', textAlign: 'center',
                                    marginTop: '0.75rem', letterSpacing: '0.08em',
                                }}>
                                    MARCH 07, 2026 — 00:00 IST
                                </div>
                            </div>
                        )}

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

                {/*  Transparency Ledger — dAppBay Proof of Reserves  */}
                <div className="verification-ledger">
                    <div className="hud-corner hud-corner--tl"></div>
                    <div className="hud-corner hud-corner--tr"></div>
                    <div className="hud-corner hud-corner--bl"></div>
                    <div className="hud-corner hud-corner--br"></div>
                    <div className="ledger-header">
                        <span className="ledger-header__title">// TRANSPARENCY_LEDGER [PROOF_OF_RESERVES]</span>
                        <span className="ledger-header__status">● IMMUTABLE_RECORDS</span>
                    </div>
                    <div className="ledger-entries">
                        <div className="ledger-entry">
                            <span className="ledger-entry__key">IPFS_METADATA_CID:</span>
                            <span className="ledger-entry__value font-mono tracking-widest">
                                {asset.contractAssetId
                                    ? <a href={`https://ipfs.io/ipfs/pending/${asset.contractAssetId}`} target="_blank" rel="noopener noreferrer" className="text-[#00FF00] hover:underline">ipfs://pending/{asset.contractAssetId}</a>
                                    : <span className="text-[#888]">AWAITING_ON_CHAIN_MINT</span>
                                }
                            </span>
                        </div>
                        <div className="ledger-entry">
                            <span className="ledger-entry__key">SMART_CONTRACT:</span>
                            <span className="ledger-entry__value font-mono tracking-widest">
                                <a href={`https://bscscan.com/address/${reliqueXAddress}`} target="_blank" rel="noopener noreferrer" className="text-[#00FF00] hover:underline">{reliqueXAddress.slice(0, 6)}...{reliqueXAddress.slice(-4)}</a>
                                <span className="text-[#888] ml-2">[ERC-1155 // BNB_CHAIN]</span>
                            </span>
                        </div>
                        <div className="ledger-entry">
                            <span className="ledger-entry__key">ON_CHAIN_ASSET_ID:</span>
                            <span className="ledger-entry__value ledger-entry__value--green uppercase">{asset.contractAssetId || 'PENDING_ONCHAIN_MINT'}</span>
                        </div>
                        <div className="ledger-entry">
                            <span className="ledger-entry__key">PHYSICAL_RESERVE:</span>
                            <span className="ledger-entry__value ledger-entry__value--green uppercase">{asset.physicalLocation || 'PENDING_SECURE_TRANSPORT'}</span>
                        </div>
                        <div className="ledger-entry">
                            <span className="ledger-entry__key">AUTH_SCORE:</span>
                            <span className="ledger-entry__value ledger-entry__value--green uppercase">{asset.authenticityScore ? `${asset.authenticityScore}/100 [PASSED]` : 'PENDING'}</span>
                        </div>
                        <div className="ledger-entry">
                            <span className="ledger-entry__key">MINT_MECHANISM:</span>
                            <span className="ledger-entry__value text-yellow-400 uppercase">TIME-LOCKED (24H DELAY) — ANTI-RUG COMPLIANT</span>
                        </div>
                        <div className="ledger-entry">
                            <span className="ledger-entry__key">DATE_INITIALIZED:</span>
                            <span className="ledger-entry__value">{new Date(asset.createdAt).toUTCString()}</span>
                        </div>
                        <div className="ledger-entry">
                            <span className="ledger-entry__key">LAST_UPDATED:</span>
                            <span className="ledger-entry__value">{new Date(asset.updatedAt).toUTCString()}</span>
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
