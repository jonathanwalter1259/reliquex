export default function Marketplace() {
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
                        <option value="Watches">Watches</option>
                        <option value="Sneakers">Sneakers</option>
                        <option value="Jewelry">Jewelry</option>
                        <option value="Bags">Bags</option>
                    </select>
                    <select className="marketplace__filter" defaultValue="Recently Listed">
                        <option value="Recently Listed">Recently Listed</option>
                        <option value="Price: Low → High">Price: Low → High</option>
                        <option value="Price: High → Low">Price: High → Low</option>
                        <option value="Most Shares Sold">Most Shares Sold</option>
                    </select>
                </div>

                {/* Vault Cards Grid */}
                <div className="marketplace__grid">
                    {/* Card 1 */}
                    <div className="vault-card">
                        <div className="hud-corner hud-corner--tl"></div>
                        <div className="hud-corner hud-corner--tr"></div>
                        <div className="hud-corner hud-corner--bl"></div>
                        <div className="hud-corner hud-corner--br"></div>
                        <div className="vault-card__img-wrapper">
                            <img src="/assets/rm-watch.png" alt="Richard Mille RM 011" className="vault-card__img" />
                        </div>
                        <div className="vault-card__body">
                            <div className="vault-card__badge">[STATUS: SECURED]</div>
                            <h3 className="vault-card__name">Richard Mille RM 011</h3>
                            <div className="vault-card__meta">
                                <span className="vault-card__label">VAULT_ID:</span>
                                <span className="vault-card__value">RM-011-X7</span>
                            </div>
                            <div className="vault-card__meta">
                                <span className="vault-card__label">TOTAL_VALUE:</span>
                                <span className="vault-card__value">$320,000</span>
                            </div>
                            <div className="vault-card__price">SHARE_PRICE: $3.20</div>
                            <div className="vault-card__shares">SHARES_AVAIL: 42,800 / 100,000</div>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="vault-card">
                        <div className="hud-corner hud-corner--tl"></div>
                        <div className="hud-corner hud-corner--tr"></div>
                        <div className="hud-corner hud-corner--bl"></div>
                        <div className="hud-corner hud-corner--br"></div>
                        <div className="vault-card__img-wrapper">
                            <img src="/assets/dior-sneakers.png" alt="Dior x Air Jordan 1" className="vault-card__img" />
                        </div>
                        <div className="vault-card__body">
                            <div className="vault-card__badge">[100 VERIFIED]</div>
                            <h3 className="vault-card__name">Dior x Air Jordan 1 High</h3>
                            <div className="vault-card__meta">
                                <span className="vault-card__label">VAULT_ID:</span>
                                <span className="vault-card__value">DJ-AJ1-04</span>
                            </div>
                            <div className="vault-card__meta">
                                <span className="vault-card__label">TOTAL_VALUE:</span>
                                <span className="vault-card__value">$18,500</span>
                            </div>
                            <div className="vault-card__price">SHARE_PRICE: $1.85</div>
                            <div className="vault-card__shares">SHARES_AVAIL: 6,200 / 10,000</div>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="vault-card">
                        <div className="hud-corner hud-corner--tl"></div>
                        <div className="hud-corner hud-corner--tr"></div>
                        <div className="hud-corner hud-corner--bl"></div>
                        <div className="hud-corner hud-corner--br"></div>
                        <div className="vault-card__img-wrapper">
                            <img src="/assets/necklace.png" alt="Emerald Diamond Necklace" className="vault-card__img" />
                        </div>
                        <div className="vault-card__body">
                            <div className="vault-card__badge">[STATUS: SECURED]</div>
                            <h3 className="vault-card__name">Emerald &amp; Diamond Rivière</h3>
                            <div className="vault-card__meta">
                                <span className="vault-card__label">VAULT_ID:</span>
                                <span className="vault-card__value">EM-RV-18</span>
                            </div>
                            <div className="vault-card__meta">
                                <span className="vault-card__label">TOTAL_VALUE:</span>
                                <span className="vault-card__value">$245,000</span>
                            </div>
                            <div className="vault-card__price">SHARE_PRICE: $2.45</div>
                            <div className="vault-card__shares">SHARES_AVAIL: 71,500 / 100,000</div>
                        </div>
                    </div>

                    {/* Card 4 */}
                    <div className="vault-card">
                        <div className="hud-corner hud-corner--tl"></div>
                        <div className="hud-corner hud-corner--tr"></div>
                        <div className="hud-corner hud-corner--bl"></div>
                        <div className="hud-corner hud-corner--br"></div>
                        <div className="vault-card__img-wrapper">
                            <img src="/assets/rolex-daytona.png" alt="Rolex Daytona Cosmograph" className="vault-card__img" />
                        </div>
                        <div className="vault-card__body">
                            <div className="vault-card__badge">[100 VERIFIED]</div>
                            <h3 className="vault-card__name">Rolex Daytona Cosmograph</h3>
                            <div className="vault-card__meta">
                                <span className="vault-card__label">VAULT_ID:</span>
                                <span className="vault-card__value">RX-DT-116</span>
                            </div>
                            <div className="vault-card__meta">
                                <span className="vault-card__label">TOTAL_VALUE:</span>
                                <span className="vault-card__value">$75,000</span>
                            </div>
                            <div className="vault-card__price">SHARE_PRICE: $2.00</div>
                            <div className="vault-card__shares">SHARES_AVAIL: 28,400 / 37,500</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
