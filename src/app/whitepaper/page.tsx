export default function Whitepaper() {
  return (
    <main className="page-wrap">
        <div className="container">
            <div className="page-header">
                <h1 className="page-header__title">PROTOCOL WHITEPAPER V1.0</h1>
                <p className="page-header__sub">&gt; READING_TECHNICAL_DOCUMENTATION...</p>
            </div>

            <div className="wp-layout">
                {/*  Sidebar TOC  */}
                <aside className="wp-sidebar">
                    <div className="wp-sidebar__inner">
                        <div className="hud-corner hud-corner--tl"></div>
                        <div className="hud-corner hud-corner--tr"></div>
                        <div className="hud-corner hud-corner--bl"></div>
                        <div className="hud-corner hud-corner--br"></div>
                        <h4 className="wp-sidebar__title">&gt; TABLE_OF_CONTENTS</h4>
                        <a href="#abstract" className="wp-sidebar__link wp-sidebar__link--active">1.0 Abstract</a>
                        <a href="#vaulting" className="wp-sidebar__link">2.0 The Vaulting Mechanism</a>
                        <a href="#tokenomics" className="wp-sidebar__link">3.0 Tokenomics</a>
                        <a href="#legal" className="wp-sidebar__link">4.0 Legal Framework</a>
                        <a href="#governance" className="wp-sidebar__link">5.0 Governance</a>
                        <a href="#security" className="wp-sidebar__link">6.0 Security Architecture</a>
                    </div>
                </aside>

                {/*  Main Content  */}
                <div className="wp-content">
                    <section id="abstract" className="wp-section">
                        <div className="hud-corner hud-corner--tl"></div>
                        <div className="hud-corner hud-corner--tr"></div>
                        <div className="hud-corner hud-corner--bl"></div>
                        <div className="hud-corner hud-corner--br"></div>
                        <h2 className="wp-section__title">1.0 // ABSTRACT</h2>
                        <p>ReliqueX is a decentralized Real-World Asset (RWA) protocol built exclusively on the BNB
                            Chain. The protocol enables fractional ownership of ultra-high-value physical collectibles
                            through tokenization, creating a new asset class that bridges traditional luxury markets
                            with decentralized finance (DeFi).</p>
                        <blockquote className="wp-quote">"The global luxury goods market is valued at over $350 billion, yet
                            less than 0.01% of these assets are accessible to average investors. ReliqueX changes this
                            equation."</blockquote>
                        <p>Each asset undergoes a rigorous multi-phase authentication and custody pipeline before being
                            minted as fractional BEP-20 tokens. This whitepaper details the technical architecture,
                            economic model, and governance framework that underpin the ReliqueX protocol.</p>
                    </section>

                    <section id="vaulting" className="wp-section">
                        <div className="hud-corner hud-corner--tl"></div>
                        <div className="hud-corner hud-corner--tr"></div>
                        <div className="hud-corner hud-corner--bl"></div>
                        <div className="hud-corner hud-corner--br"></div>
                        <h2 className="wp-section__title">2.0 // THE VAULTING MECHANISM</h2>
                        <p>The ReliqueX Vaulting Pipeline is a 5-stage process that transforms a physical luxury asset
                            into tradeable on-chain tokens:</p>
                        <div className="wp-steps">
                            <div className="wp-step"><span className="wp-step__num">[01]</span> SUBMISSION — Asset owner submits
                                item details via the secure portal.</div>
                            <div className="wp-step"><span className="wp-step__num">[02]</span> AUTHENTICATION — Licensed
                                experts conduct multi-point physical verification.</div>
                            <div className="wp-step"><span className="wp-step__num">[03]</span> CUSTODY TRANSFER — Asset is
                                shipped to Facility Alpha (Geneva, CH) under insured logistics.</div>
                            <div className="wp-step"><span className="wp-step__num">[04]</span> MINTING — Smart contract deploys
                                a new BEP-20 token representing fractional shares.</div>
                            <div className="wp-step"><span className="wp-step__num">[05]</span> LISTING — Fractional shares are
                                made available for purchase on the ReliqueX marketplace.</div>
                        </div>
                        <blockquote className="wp-quote">"Physical custody is non-negotiable. Every token on ReliqueX is
                            backed by a tangible, insured asset in our vault."</blockquote>
                    </section>

                    <section id="tokenomics" className="wp-section">
                        <div className="hud-corner hud-corner--tl"></div>
                        <div className="hud-corner hud-corner--tr"></div>
                        <div className="hud-corner hud-corner--bl"></div>
                        <div className="hud-corner hud-corner--br"></div>
                        <h2 className="wp-section__title">3.0 // TOKENOMICS</h2>
                        <p>Each vaulted asset generates its own unique BEP-20 token. The total supply is determined by
                            the appraised value divided by the share price. The protocol also maintains a governance
                            token: $RLQ.</p>
                        <table className="wp-table">
                            <thead>
                                <tr>
                                    <th>PARAMETER</th>
                                    <th>VALUE</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>TOKEN_NAME</td>
                                    <td>ReliqueX Governance ($RLQ)</td>
                                </tr>
                                <tr>
                                    <td>CHAIN</td>
                                    <td>BNB Chain (BEP-20)</td>
                                </tr>
                                <tr>
                                    <td>TOTAL_SUPPLY</td>
                                    <td>100,000,000 $RLQ</td>
                                </tr>
                                <tr>
                                    <td>TREASURY</td>
                                    <td>20% (Locked 24mo)</td>
                                </tr>
                                <tr>
                                    <td>TEAM</td>
                                    <td>15% (Vested 36mo)</td>
                                </tr>
                                <tr>
                                    <td>COMMUNITY</td>
                                    <td>30% (Staking + Rewards)</td>
                                </tr>
                                <tr>
                                    <td>PUBLIC_SALE</td>
                                    <td>25%</td>
                                </tr>
                                <tr>
                                    <td>LIQUIDITY</td>
                                    <td>10%</td>
                                </tr>
                            </tbody>
                        </table>
                        <p>Platform fees (1.5% on secondary market trades) are distributed to $RLQ stakers and the
                            insurance reserve fund.</p>
                    </section>

                    <section id="legal" className="wp-section">
                        <div className="hud-corner hud-corner--tl"></div>
                        <div className="hud-corner hud-corner--tr"></div>
                        <div className="hud-corner hud-corner--bl"></div>
                        <div className="hud-corner hud-corner--br"></div>
                        <h2 className="wp-section__title">4.0 // LEGAL FRAMEWORK</h2>
                        <p>ReliqueX operates under a dual-entity structure. The protocol's smart contracts are governed
                            by a decentralized autonomous organization (DAO), while physical vaulting and custody
                            operations are managed by ReliqueX Holdings AG, a Swiss-registered entity.</p>
                        <p>Fractional tokens represent economic interest in the underlying asset and do not constitute
                            securities under current Swiss regulatory guidance. The protocol is designed to comply with
                            MiCA (Markets in Crypto-Assets) regulation for EU jurisdictions.</p>
                        <blockquote className="wp-quote">"Regulatory compliance is not optional — it is foundational to the
                            trust architecture of ReliqueX."</blockquote>
                    </section>

                    <section id="governance" className="wp-section">
                        <div className="hud-corner hud-corner--tl"></div>
                        <div className="hud-corner hud-corner--tr"></div>
                        <div className="hud-corner hud-corner--bl"></div>
                        <div className="hud-corner hud-corner--br"></div>
                        <h2 className="wp-section__title">5.0 // GOVERNANCE</h2>
                        <p>$RLQ holders participate in on-chain governance through snapshot voting. Key decisions
                            governed by the DAO include:</p>
                        <div className="wp-steps">
                            <div className="wp-step"><span className="wp-step__num">[►]</span> New asset category approvals
                            </div>
                            <div className="wp-step"><span className="wp-step__num">[►]</span> Fee structure modifications</div>
                            <div className="wp-step"><span className="wp-step__num">[►]</span> Insurance fund allocations</div>
                            <div className="wp-step"><span className="wp-step__num">[►]</span> Cross-chain expansion decisions
                            </div>
                            <div className="wp-step"><span className="wp-step__num">[►]</span> Treasury deployment strategies
                            </div>
                        </div>
                    </section>

                    <section id="security" className="wp-section">
                        <div className="hud-corner hud-corner--tl"></div>
                        <div className="hud-corner hud-corner--tr"></div>
                        <div className="hud-corner hud-corner--bl"></div>
                        <div className="hud-corner hud-corner--br"></div>
                        <h2 className="wp-section__title">6.0 // SECURITY ARCHITECTURE</h2>
                        <p>All smart contracts are audited by CertiK and Hacken. The protocol employs a multi-signature
                            treasury (3-of-5 signers), time-locked admin functions (48hr delay), and circuit breakers
                            for emergency pausing. Physical security at Facility Alpha includes 24/7 armed guards,
                            biometric access, seismic sensors, and continuous environmental monitoring (temperature,
                            humidity, atmospheric composition).</p>
                    </section>
                </div>
            </div>
        </div>
    </main>
  );
}
