export default function Roadmap() {
  return (
    <main className="page-wrap">
        <div className="container">
            <div className="page-header">
                <h1 className="page-header__title">DEPLOYMENT PHASES.</h1>
                <p className="page-header__sub">&gt; MASTER_PLAN_EXECUTION</p>
            </div>

            <div className="rm-timeline">
                {/*  Phase 1: Completed  */}
                <div className="rm-phase rm-phase--active">
                    <div className="rm-phase__node">■</div>
                    <div className="rm-phase__content">
                        <div className="hud-corner hud-corner--tl"></div>
                        <div className="hud-corner hud-corner--tr"></div>
                        <div className="hud-corner hud-corner--bl"></div>
                        <div className="hud-corner hud-corner--br"></div>
                        <div className="rm-phase__label">PHASE 01 // Q1 2026 — CURRENT</div>
                        <h3 className="rm-phase__title">PROTOCOL GENESIS</h3>
                        <ul className="rm-phase__list">
                            <li>✓ Smart contract development and initial CertiK audit</li>
                            <li>✓ Terminal-style UI/UX deployment</li>
                            <li>✓ dAppBay listing and BNB Chain integration</li>
                            <li>✓ Initial vault facility (Facility Alpha) secured in Geneva, CH</li>
                            <li>✓ Core authentication pipeline established with licensed appraisers</li>
                            <li>✓ Closed beta launch — invite-only access for early collectors</li>
                        </ul>
                    </div>
                </div>

                {/*  Phase 2  */}
                <div className="rm-phase">
                    <div className="rm-phase__node">[ ]</div>
                    <div className="rm-phase__content">
                        <div className="hud-corner hud-corner--tl"></div>
                        <div className="hud-corner hud-corner--tr"></div>
                        <div className="hud-corner hud-corner--bl"></div>
                        <div className="hud-corner hud-corner--br"></div>
                        <div className="rm-phase__label">PHASE 02 // Q2 2026</div>
                        <h3 className="rm-phase__title">ASSET ACQUISITION</h3>
                        <ul className="rm-phase__list">
                            <li>[ ] Source and vault first $1M in high-value luxury assets</li>
                            <li>[ ] Patek Philippe Nautilus, Off-White Jordan collaborations, Hermès Birkin bags</li>
                            <li>[ ] Begin fractional minting on mainnet</li>
                            <li>[ ] Launch first public share offerings</li>
                            <li>[ ] Partner with 3+ licensed horologists and gemologists</li>
                            <li>[ ] $RLQ governance token TGE (Token Generation Event)</li>
                        </ul>
                    </div>
                </div>

                {/*  Phase 3  */}
                <div className="rm-phase">
                    <div className="rm-phase__node">[ ]</div>
                    <div className="rm-phase__content">
                        <div className="hud-corner hud-corner--tl"></div>
                        <div className="hud-corner hud-corner--tr"></div>
                        <div className="hud-corner hud-corner--bl"></div>
                        <div className="hud-corner hud-corner--br"></div>
                        <div className="rm-phase__label">PHASE 03 // Q3 2026</div>
                        <h3 className="rm-phase__title">SECONDARY MARKET</h3>
                        <ul className="rm-phase__list">
                            <li>[ ] Launch ReliqueX P2P Trading Terminal</li>
                            <li>[ ] On-chain order book with instant settlement</li>
                            <li>[ ] Market maker integration for deep liquidity</li>
                            <li>[ ] Portfolio analytics dashboard V2</li>
                            <li>[ ] Mobile-optimized trading interface</li>
                            <li>[ ] Staking rewards program for $RLQ holders</li>
                        </ul>
                    </div>
                </div>

                {/*  Phase 4  */}
                <div className="rm-phase">
                    <div className="rm-phase__node">[ ]</div>
                    <div className="rm-phase__content">
                        <div className="hud-corner hud-corner--tl"></div>
                        <div className="hud-corner hud-corner--tr"></div>
                        <div className="hud-corner hud-corner--bl"></div>
                        <div className="hud-corner hud-corner--br"></div>
                        <div className="rm-phase__label">PHASE 04 // Q4 2026</div>
                        <h3 className="rm-phase__title">OMNICHAIN EXPANSION</h3>
                        <ul className="rm-phase__list">
                            <li>[ ] Cross-chain bridging via LayerZero (Ethereum, Solana)</li>
                            <li>[ ] Multi-chain vault receipt standard</li>
                            <li>[ ] Facility Beta — Second vault location (Dubai, UAE)</li>
                            <li>[ ] Fine art and rare collectibles category launch</li>
                            <li>[ ] DAO governance activation — community-driven decisions</li>
                            <li>[ ] Insurance fund expansion via Lloyd's syndicate partnership</li>
                        </ul>
                    </div>
                </div>

                {/*  Phase 5: Future  */}
                <div className="rm-phase">
                    <div className="rm-phase__node">[ ]</div>
                    <div className="rm-phase__content">
                        <div className="hud-corner hud-corner--tl"></div>
                        <div className="hud-corner hud-corner--tr"></div>
                        <div className="hud-corner hud-corner--bl"></div>
                        <div className="hud-corner hud-corner--br"></div>
                        <div className="rm-phase__label">PHASE 05 // 2027+</div>
                        <h3 className="rm-phase__title">INSTITUTIONAL GRADE</h3>
                        <ul className="rm-phase__list">
                            <li>[ ] Institutional API for fund managers and family offices</li>
                            <li>[ ] Real-time price oracle for vaulted assets</li>
                            <li>[ ] DeFi integration — use vault shares as collateral</li>
                            <li>[ ] Expansion to 50+ vaulted assets across 10+ categories</li>
                            <li>[ ] Regulatory licensing in US, EU, and APAC jurisdictions</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </main>
  );
}
