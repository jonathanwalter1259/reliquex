import Link from 'next/link';
import Image from 'next/image';

export default function Vaults() {
    return (
        <main className="page-wrap reveal">
            <div className="container">
                <div className="page-header">
                    <h1 className="page-header__title">EXPLORE SECURED VAULTS.</h1>
                    <p className="page-header__sub">&gt; Browse verified luxury assets available for fractional investment.</p>
                </div>

                {/* Filter Bar */}
                <div className="vault-filters">
                    <button className="vault-filter active">ALL ASSETS</button>
                    <button className="vault-filter">[STATUS: FUNDING]</button>
                    <button className="vault-filter">[STATUS: LIVE TRADING]</button>
                    <button className="vault-filter">[CATEGORY: WATCHES]</button>
                    <button className="vault-filter">[CATEGORY: SNEAKERS]</button>
                    <button className="vault-filter">[CATEGORY: JEWELRY]</button>
                </div>

                {/* Vault Grid */}
                <div className="vault-grid">
                    {/* Card 1 */}
                    <Link href="/asset" className="vault-card">
                        <div className="hud-corner hud-corner--tl"></div>
                        <div className="hud-corner hud-corner--tr"></div>
                        <div className="hud-corner hud-corner--bl"></div>
                        <div className="hud-corner hud-corner--br"></div>
                        <div className="vault-card__img-wrap">
                            <span className="vault-card__badge">[STATUS: SECURED]</span>
                            <Image src="/assets/jordan-main.png" alt="Off-White Jordan 1" width={400} height={400} className="vault-card__img" />
                        </div>
                        <div className="vault-card__body">
                            <div className="vault-card__name">Off-White x Jordan 1 Chicago</div>
                            <div className="vault-card__ticker">$OW-CHI</div>
                            <div className="vault-card__price-row">
                                <span className="vault-card__price-label">SHARE_PRICE:</span>
                                <span className="vault-card__price">$2.00</span>
                            </div>
                            <div className="vault-card__progress">
                                <div className="vault-card__progress-labels">
                                    <span>980 sold</span>
                                    <span>1200 total</span>
                                </div>
                                <div className="vault-card__progress-track">
                                    <div className="vault-card__progress-fill" style={{ width: '82%' }}></div>
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Card 2 */}
                    <Link href="/asset" className="vault-card">
                        <div className="hud-corner hud-corner--tl"></div>
                        <div className="hud-corner hud-corner--tr"></div>
                        <div className="hud-corner hud-corner--bl"></div>
                        <div className="hud-corner hud-corner--br"></div>
                        <div className="vault-card__img-wrap">
                            <span className="vault-card__badge">[100 VERIFIED]</span>
                            <Image src="/assets/rm-watch.png" alt="Richard Mille RM 011" width={400} height={400} className="vault-card__img" />
                        </div>
                        <div className="vault-card__body">
                            <div className="vault-card__name">Richard Mille RM 011</div>
                            <div className="vault-card__ticker">$RM-011</div>
                            <div className="vault-card__price-row">
                                <span className="vault-card__price-label">SHARE_PRICE:</span>
                                <span className="vault-card__price">$3.20</span>
                            </div>
                            <div className="vault-card__progress">
                                <div className="vault-card__progress-labels">
                                    <span>42,800 sold</span>
                                    <span>100,000 total</span>
                                </div>
                                <div className="vault-card__progress-track">
                                    <div className="vault-card__progress-fill" style={{ width: '43%' }}></div>
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Card 3 */}
                    <Link href="/asset" className="vault-card">
                        <div className="hud-corner hud-corner--tl"></div>
                        <div className="hud-corner hud-corner--tr"></div>
                        <div className="hud-corner hud-corner--bl"></div>
                        <div className="hud-corner hud-corner--br"></div>
                        <div className="vault-card__img-wrap">
                            <span className="vault-card__badge">[STATUS: SECURED]</span>
                            <Image src="/assets/necklace.png" alt="Emerald Diamond Rivière" width={400} height={400} className="vault-card__img" />
                        </div>
                        <div className="vault-card__body">
                            <div className="vault-card__name">Emerald & Diamond Rivière</div>
                            <div className="vault-card__ticker">$EM-RV</div>
                            <div className="vault-card__price-row">
                                <span className="vault-card__price-label">SHARE_PRICE:</span>
                                <span className="vault-card__price">$2.45</span>
                            </div>
                            <div className="vault-card__progress">
                                <div className="vault-card__progress-labels">
                                    <span>71,500 sold</span>
                                    <span>100,000 total</span>
                                </div>
                                <div className="vault-card__progress-track">
                                    <div className="vault-card__progress-fill" style={{ width: '72%' }}></div>
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Card 4 */}
                    <Link href="/asset" className="vault-card">
                        <div className="hud-corner hud-corner--tl"></div>
                        <div className="hud-corner hud-corner--tr"></div>
                        <div className="hud-corner hud-corner--bl"></div>
                        <div className="hud-corner hud-corner--br"></div>
                        <div className="vault-card__img-wrap">
                            <span className="vault-card__badge vault-card__badge--funding">[STATUS: FUNDING]</span>
                            <Image src="/assets/rolex-daytona.png" alt="Rolex Daytona" width={400} height={400} className="vault-card__img" />
                        </div>
                        <div className="vault-card__body">
                            <div className="vault-card__name">Rolex Daytona Cosmograph</div>
                            <div className="vault-card__ticker">$RX-DT</div>
                            <div className="vault-card__price-row">
                                <span className="vault-card__price-label">SHARE_PRICE:</span>
                                <span className="vault-card__price">$2.00</span>
                            </div>
                            <div className="vault-card__progress">
                                <div className="vault-card__progress-labels">
                                    <span>28,400 sold</span>
                                    <span>37,500 total</span>
                                </div>
                                <div className="vault-card__progress-track">
                                    <div className="vault-card__progress-fill" style={{ width: '76%' }}></div>
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Card 5 */}
                    <Link href="/asset" className="vault-card">
                        <div className="hud-corner hud-corner--tl"></div>
                        <div className="hud-corner hud-corner--tr"></div>
                        <div className="hud-corner hud-corner--bl"></div>
                        <div className="hud-corner hud-corner--br"></div>
                        <div className="vault-card__img-wrap">
                            <span className="vault-card__badge">[100 VERIFIED]</span>
                            <Image src="/assets/dior-sneakers.png" alt="Dior x Air Jordan 1" width={400} height={400} className="vault-card__img" />
                        </div>
                        <div className="vault-card__body">
                            <div className="vault-card__name">Dior x Air Jordan 1 High</div>
                            <div className="vault-card__ticker">$DJ-AJ1</div>
                            <div className="vault-card__price-row">
                                <span className="vault-card__price-label">SHARE_PRICE:</span>
                                <span className="vault-card__price">$1.85</span>
                            </div>
                            <div className="vault-card__progress">
                                <div className="vault-card__progress-labels">
                                    <span>6,200 sold</span>
                                    <span>10,000 total</span>
                                </div>
                                <div className="vault-card__progress-track">
                                    <div className="vault-card__progress-fill" style={{ width: '62%' }}></div>
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Card 6 */}
                    <Link href="/asset" className="vault-card">
                        <div className="hud-corner hud-corner--tl"></div>
                        <div className="hud-corner hud-corner--tr"></div>
                        <div className="hud-corner hud-corner--bl"></div>
                        <div className="hud-corner hud-corner--br"></div>
                        <div className="vault-card__img-wrap">
                            <span className="vault-card__badge vault-card__badge--funding">[STATUS: FUNDING]</span>
                            <Image src="/assets/watch.png" alt="Patek Philippe" width={400} height={400} className="vault-card__img" />
                        </div>
                        <div className="vault-card__body">
                            <div className="vault-card__name">Patek Philippe Nautilus 5711</div>
                            <div className="vault-card__ticker">$PP-5711</div>
                            <div className="vault-card__price-row">
                                <span className="vault-card__price-label">SHARE_PRICE:</span>
                                <span className="vault-card__price">$4.50</span>
                            </div>
                            <div className="vault-card__progress">
                                <div className="vault-card__progress-labels">
                                    <span>12,100 sold</span>
                                    <span>50,000 total</span>
                                </div>
                                <div className="vault-card__progress-track">
                                    <div className="vault-card__progress-fill" style={{ width: '24%' }}></div>
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Card 7 */}
                    <Link href="/asset" className="vault-card">
                        <div className="hud-corner hud-corner--tl"></div>
                        <div className="hud-corner hud-corner--tr"></div>
                        <div className="hud-corner hud-corner--bl"></div>
                        <div className="hud-corner hud-corner--br"></div>
                        <div className="vault-card__img-wrap">
                            <span className="vault-card__badge">[STATUS: SECURED]</span>
                            <Image src="/assets/ring.png" alt="Onyx Diamond Ring" width={400} height={400} className="vault-card__img" />
                        </div>
                        <div className="vault-card__body">
                            <div className="vault-card__name">Onyx Diamond Ring</div>
                            <div className="vault-card__ticker">$OD-RNG</div>
                            <div className="vault-card__price-row">
                                <span className="vault-card__price-label">SHARE_PRICE:</span>
                                <span className="vault-card__price">$1.50</span>
                            </div>
                            <div className="vault-card__progress">
                                <div className="vault-card__progress-labels">
                                    <span>58,000 sold</span>
                                    <span>66,000 total</span>
                                </div>
                                <div className="vault-card__progress-track">
                                    <div className="vault-card__progress-fill" style={{ width: '88%' }}></div>
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Card 8 */}
                    <Link href="/asset" className="vault-card">
                        <div className="hud-corner hud-corner--tl"></div>
                        <div className="hud-corner hud-corner--tr"></div>
                        <div className="hud-corner hud-corner--bl"></div>
                        <div className="hud-corner hud-corner--br"></div>
                        <div className="vault-card__img-wrap">
                            <span className="vault-card__badge">[100 VERIFIED]</span>
                            <Image src="/assets/bag.png" alt="Emerald Birkin 35" width={400} height={400} className="vault-card__img" />
                        </div>
                        <div className="vault-card__body">
                            <div className="vault-card__name">Hermès Birkin 35 Emerald</div>
                            <div className="vault-card__ticker">$HB-35E</div>
                            <div className="vault-card__price-row">
                                <span className="vault-card__price-label">SHARE_PRICE:</span>
                                <span className="vault-card__price">$3.80</span>
                            </div>
                            <div className="vault-card__progress">
                                <div className="vault-card__progress-labels">
                                    <span>19,200 sold</span>
                                    <span>25,000 total</span>
                                </div>
                                <div className="vault-card__progress-track">
                                    <div className="vault-card__progress-fill" style={{ width: '77%' }}></div>
                                </div>
                            </div>
                        </div>
                    </Link>

                </div>
            </div>
        </main>
    );
}
