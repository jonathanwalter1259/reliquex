"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Asset() {
    const [activeImage, setActiveImage] = useState("/assets/jordan-main.png");

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
                            <Image src={activeImage} alt="Off-White x Nike Jordan 1 Chicago"
                                width={800} height={800} className="asset-viewer__img" id="mainImage" />
                        </div>

                        {/*  Thumbnails  */}
                        <div className="asset-thumbs">
                            <button
                                className={`asset-thumb ${activeImage === "/assets/jordan-main.png" ? "active" : ""}`}
                                onClick={() => setActiveImage("/assets/jordan-main.png")}
                            >
                                <Image src="/assets/jordan-main.png" alt="3/4 View" width={200} height={200} />
                            </button>
                            <button
                                className={`asset-thumb ${activeImage === "/assets/jordan-side.png" ? "active" : ""}`}
                                onClick={() => setActiveImage("/assets/jordan-side.png")}
                            >
                                <Image src="/assets/jordan-side.png" alt="Side Profile" width={200} height={200} />
                            </button>
                            <button
                                className={`asset-thumb ${activeImage === "/assets/jordan-top.png" ? "active" : ""}`}
                                onClick={() => setActiveImage("/assets/jordan-top.png")}
                            >
                                <Image src="/assets/jordan-top.png" alt="Top View" width={200} height={200} />
                            </button>
                            <button
                                className={`asset-thumb ${activeImage === "/assets/jordan-back.png" ? "active" : ""}`}
                                onClick={() => setActiveImage("/assets/jordan-back.png")}
                            >
                                <Image src="/assets/jordan-back.png" alt="Back View" width={200} height={200} />
                            </button>
                        </div>
                    </div>

                    {/*  ===== RIGHT: Data & Trading Terminal =====  */}
                    <div className="asset-data">

                        {/*  Header  */}
                        <div className="asset-header">
                            <div className="asset-tag">[SYS.CAT: SNEAKERS]</div>
                            <h1 className="asset-title">Off-White x Nike<br />Jordan 1 Chicago</h1>
                            <p className="asset-desc">
                                The Off-White x Air Jordan 1 "Chicago" is one of the most iconic sneaker collaborations ever
                                produced.
                                Designed by Virgil Abloh, this deconstructed masterpiece features exposed foam, inverted
                                Swooshes,
                                and the signature zip-tie. Vault-secured and blockchain-verified.
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
                                    <div className="trade-price-value">$2.00</div>
                                    <div className="trade-price-crypto">≈ 0.0033 BNB</div>
                                </div>
                                <div className="trade-price-block">
                                    <div className="trade-price-label">CURRENT_VALUE:</div>
                                    <div className="trade-price-value">$24,000</div>
                                    <div className="trade-price-crypto">≈ 39.6 BNB</div>
                                </div>
                            </div>

                            {/*  Share Metrics  */}
                            <div className="trade-metrics">
                                <div className="trade-metric">
                                    <div className="trade-metric__label">AVAIL_SHARES:</div>
                                    <div className="trade-metric__value">220</div>
                                </div>
                                <div className="trade-metric">
                                    <div className="trade-metric__label">OWNERSHIP:</div>
                                    <div className="trade-metric__value">82%</div>
                                </div>
                                <div className="trade-metric">
                                    <div className="trade-metric__label">VAULT_ID:</div>
                                    <div className="trade-metric__value">OW-AJ1-CH</div>
                                </div>
                                <div className="trade-metric">
                                    <div className="trade-metric__label">CHAIN:</div>
                                    <div className="trade-metric__value">BNB</div>
                                </div>
                            </div>

                            {/*  Progress Bar  */}
                            <div className="trade-progress">
                                <div className="trade-progress__labels">
                                    <span>980 shares sold</span>
                                    <span>1200 total</span>
                                </div>
                                <div className="trade-progress__track">
                                    <div className="trade-progress__fill" style={{ width: "82%" }}></div>
                                </div>
                            </div>

                            {/*  CTA  */}
                            <button className="trade-cta">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18"
                                    height="18">
                                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                                    <path d="M16 7V5a4 4 0 0 0-8 0v2" />
                                </svg>
                                Connect your wallet to purchase shares
                            </button>
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
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16"
                                        height="16">
                                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                                        <polyline points="17 6 23 6 23 12" />
                                    </svg>
                                    +11.9%
                                </div>
                            </div>
                            <div className="analytics-card">
                                <div className="hud-corner hud-corner--tl"></div>
                                <div className="hud-corner hud-corner--tr"></div>
                                <div className="hud-corner hud-corner--bl"></div>
                                <div className="hud-corner hud-corner--br"></div>
                                <div className="analytics-card__label">TOTAL_OWNERS:</div>
                                <div className="analytics-card__value analytics-card__value--white">294</div>
                            </div>
                            <div className="analytics-card">
                                <div className="hud-corner hud-corner--tl"></div>
                                <div className="hud-corner hud-corner--tr"></div>
                                <div className="hud-corner hud-corner--bl"></div>
                                <div className="hud-corner hud-corner--br"></div>
                                <div className="analytics-card__label">MARKET_CAP:</div>
                                <div className="analytics-card__value analytics-card__value--white">$24,000</div>
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
                        <svg className="auth-ribbon__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            strokeWidth="2">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            <polyline points="9 12 11 14 15 10" />
                        </svg>
                        <span className="auth-ribbon__text">[VERIFIED // AUTHENTICITY SCORE: 97/100]</span>
                    </div>
                    <div className="auth-ribbon__hash">0x8F9a...c4E7 // TX_HASH: 0xd3aB...3b2</div>
                </div>

                {/*  Verification Ledger  */}
                <div className="verification-ledger">
                    <div className="hud-corner hud-corner--tl"></div>
                    <div className="hud-corner hud-corner--tr"></div>
                    <div className="hud-corner hud-corner--bl"></div>
                    <div className="hud-corner hud-corner--br"></div>
                    <div className="ledger-header">
                        <span className="ledger-header__title">// VERIFICATION_LEDGER</span>
                        <span className="ledger-header__status">● COMPLETE</span>
                    </div>
                    <div className="ledger-entries">
                        <div className="ledger-entry">
                            <span className="ledger-entry__key">DATE_RECEIVED:</span>
                            <span className="ledger-entry__value">2025-11-14 09:23:41 UTC</span>
                        </div>
                        <div className="ledger-entry">
                            <span className="ledger-entry__key">DATE_AUTHENTICATED:</span>
                            <span className="ledger-entry__value">2025-11-18 14:07:12 UTC</span>
                        </div>
                        <div className="ledger-entry">
                            <span className="ledger-entry__key">DATE_VAULTED:</span>
                            <span className="ledger-entry__value">2025-11-19 08:00:00 UTC</span>
                        </div>
                        <div className="ledger-entry">
                            <span className="ledger-entry__key">VAULT_LOCATION:</span>
                            <span className="ledger-entry__value ledger-entry__value--green">Geneva, CH — Facility Alpha</span>
                        </div>
                        <div className="ledger-entry">
                            <span className="ledger-entry__key">AUDITOR_ID:</span>
                            <span className="ledger-entry__value">AUD-7721-CHRONO // Licensed Horologist</span>
                        </div>
                        <div className="ledger-entry">
                            <span className="ledger-entry__key">AUTH_SCORE:</span>
                            <span className="ledger-entry__value ledger-entry__value--green">97 / 100 [PASSED]</span>
                        </div>
                        <div className="ledger-entry">
                            <span className="ledger-entry__key">TX_HASH:</span>
                            <span className="ledger-entry__value">0xd3aB8c12...4f9e3b2</span>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}
