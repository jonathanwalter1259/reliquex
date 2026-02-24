export default function VerificationProtocol() {
    return (
        <section className="protocol reveal" id="protocol">
            <div className="container">
                <div className="protocol__header">
                    <h2 className="protocol__title">THE VERIFICATION PROTOCOL.</h2>
                    <p className="protocol__subtitle">&gt; SECURING THE BRIDGE BETWEEN PHYSICAL LUXURY AND ON-CHAIN ASSETS.</p>
                </div>

                <div className="protocol__grid">
                    {/* Step 1 */}
                    <div className="protocol__node">
                        <div className="hud-corner hud-corner--tl"></div>
                        <div className="hud-corner hud-corner--tr"></div>
                        <div className="hud-corner hud-corner--bl"></div>
                        <div className="hud-corner hud-corner--br"></div>
                        <div className="protocol__icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                                <line x1="12" y1="22.08" x2="12" y2="12" />
                            </svg>
                        </div>
                        <h3 className="protocol__step-title">[01] INITIATE TRANSFER</h3>
                        <p className="protocol__step-text">
                            Users submit asset details for preliminary approval. Once cleared, the physical
                            item is shipped via insured, armored transit to our central facility.
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="protocol__node">
                        <div className="hud-corner hud-corner--tl"></div>
                        <div className="hud-corner hud-corner--tr"></div>
                        <div className="hud-corner hud-corner--bl"></div>
                        <div className="hud-corner hud-corner--br"></div>
                        <div className="protocol__icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                <polyline points="9 12 11 14 15 10" />
                            </svg>
                        </div>
                        <h3 className="protocol__step-title">[02] PHYSICAL VERIFICATION</h3>
                        <p className="protocol__step-text">
                            World-class appraisers and horologists physically inspect the asset.
                            Authenticity, condition, and provenance are mathematically scored and verified.
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className="protocol__node">
                        <div className="hud-corner hud-corner--tl"></div>
                        <div className="hud-corner hud-corner--tr"></div>
                        <div className="hud-corner hud-corner--bl"></div>
                        <div className="hud-corner hud-corner--br"></div>
                        <div className="protocol__icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                        </div>
                        <h3 className="protocol__step-title">[03] SECURED VAULTING</h3>
                        <p className="protocol__step-text">
                            Upon passing authentication, the asset is permanently sealed in our
                            climate-controlled, highly secured physical vaults. The asset no longer circulates.
                        </p>
                    </div>

                    {/* Step 4 */}
                    <div className="protocol__node">
                        <div className="hud-corner hud-corner--tl"></div>
                        <div className="hud-corner hud-corner--tr"></div>
                        <div className="hud-corner hud-corner--bl"></div>
                        <div className="hud-corner hud-corner--br"></div>
                        <div className="protocol__icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                                <line x1="1" y1="10" x2="23" y2="10" />
                                <rect x="5" y="14" width="4" height="4" rx="0.5" />
                                <rect x="11" y="14" width="4" height="4" rx="0.5" />
                            </svg>
                        </div>
                        <h3 className="protocol__step-title">[04] ON-CHAIN MINTING</h3>
                        <p className="protocol__step-text">
                            The vault receipt is tokenized on the BNB Chain. Fractional shares are minted
                            and listed on the ReliqueX protocol for trading.
                        </p>
                    </div>
                </div>

                <div className="protocol__cta-wrap">
                    <a href="/submit" className="protocol__cta">Submit Asset for Review</a>
                </div>
            </div>
        </section>
    );
}
