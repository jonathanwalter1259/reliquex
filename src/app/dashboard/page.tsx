import Image from 'next/image';

export default function Dashboard() {
    return (
        <main className="page-wrap reveal">
            <div className="container">
                <div className="page-header">
                    <h1 className="page-header__title">PORTFOLIO DASHBOARD.</h1>
                    <p className="page-header__sub">&gt; WALLET: 0x8F9a...c4E7 // CONNECTION: ACTIVE</p>
                </div>

                {/* Portfolio Summary */}
                <div className="portfolio-summary">
                    <div className="portfolio-card">
                        <div className="hud-corner hud-corner--tl"></div>
                        <div className="hud-corner hud-corner--tr"></div>
                        <div className="hud-corner hud-corner--bl"></div>
                        <div className="hud-corner hud-corner--br"></div>
                        <div className="portfolio-card__label">PORTFOLIO_VALUE:</div>
                        <div className="portfolio-card__value">$4,280.00</div>
                    </div>
                    <div className="portfolio-card">
                        <div className="hud-corner hud-corner--tl"></div>
                        <div className="hud-corner hud-corner--tr"></div>
                        <div className="hud-corner hud-corner--bl"></div>
                        <div className="hud-corner hud-corner--br"></div>
                        <div className="portfolio-card__label">TOTAL_SHARES:</div>
                        <div className="portfolio-card__value portfolio-card__value--white">1,847</div>
                    </div>
                    <div className="portfolio-card">
                        <div className="hud-corner hud-corner--tl"></div>
                        <div className="hud-corner hud-corner--tr"></div>
                        <div className="hud-corner hud-corner--bl"></div>
                        <div className="hud-corner hud-corner--br"></div>
                        <div className="portfolio-card__label">UNREALIZED_PNL:</div>
                        <div className="portfolio-card__value">+$312.40</div>
                    </div>
                </div>

                {/* Holdings Table */}
                <div className="holdings-table-wrap">
                    <div className="hud-corner hud-corner--tl"></div>
                    <div className="hud-corner hud-corner--tr"></div>
                    <div className="hud-corner hud-corner--bl"></div>
                    <div className="hud-corner hud-corner--br"></div>

                    <div className="holdings-header">
                        <span className="holdings-header__title">// HOLDINGS_TERMINAL</span>
                        <span className="holdings-header__status">● SYNCED</span>
                    </div>

                    <table className="holdings-table">
                        <thead>
                            <tr>
                                <th>ASSET</th>
                                <th>TICKER</th>
                                <th>SHARES</th>
                                <th>AVG_BUY</th>
                                <th>MKT_PRICE</th>
                                <th>VALUE</th>
                                <th>P/L</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div className="asset-link">
                                        <Image src="/assets/jordan-main.png" alt="" width={40} height={40} />
                                        <span className="asset-name">Off-White Jordan 1</span>
                                    </div>
                                </td>
                                <td>$OW-CHI</td>
                                <td>520</td>
                                <td>$1.72</td>
                                <td>$2.00</td>
                                <td>$1,040.00</td>
                                <td className="profit">+$145.60 (+16.3%)</td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="asset-link">
                                        <Image src="/assets/rm-watch.png" alt="" width={40} height={40} />
                                        <span className="asset-name">Richard Mille RM 011</span>
                                    </div>
                                </td>
                                <td>$RM-011</td>
                                <td>300</td>
                                <td>$2.90</td>
                                <td>$3.20</td>
                                <td>$960.00</td>
                                <td className="profit">+$90.00 (+10.3%)</td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="asset-link">
                                        <Image src="/assets/necklace.png" alt="" width={40} height={40} />
                                        <span className="asset-name">Emerald Diamond Rivière</span>
                                    </div>
                                </td>
                                <td>$EM-RV</td>
                                <td>412</td>
                                <td>$2.20</td>
                                <td>$2.45</td>
                                <td>$1,009.40</td>
                                <td className="profit">+$103.00 (+11.4%)</td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="asset-link">
                                        <Image src="/assets/rolex-daytona.png" alt="" width={40} height={40} />
                                        <span className="asset-name">Rolex Daytona</span>
                                    </div>
                                </td>
                                <td>$RX-DT</td>
                                <td>250</td>
                                <td>$2.15</td>
                                <td>$2.00</td>
                                <td>$500.00</td>
                                <td className="loss">-$37.50 (-7.0%)</td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="asset-link">
                                        <Image src="/assets/dior-sneakers.png" alt="" width={40} height={40} />
                                        <span className="asset-name">Dior x Air Jordan 1</span>
                                    </div>
                                </td>
                                <td>$DJ-AJ1</td>
                                <td>365</td>
                                <td>$1.88</td>
                                <td>$1.85</td>
                                <td>$675.25</td>
                                <td className="loss">-$10.95 (-1.6%)</td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="asset-link">
                                        <Image src="/assets/ring.png" alt="" width={40} height={40} />
                                        <span className="asset-name">Onyx Diamond Ring</span>
                                    </div>
                                </td>
                                <td>$OD-RNG</td>
                                <td>0</td>
                                <td>—</td>
                                <td>$1.50</td>
                                <td>$0.00</td>
                                <td style={{ color: '#555' }}>—</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}
