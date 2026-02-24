export default function RoadmapSection() {
    return (
        <section className="roadmap-section reveal">
            <div className="container">
                <div className="roadmap-section__header">
                    <h2 className="roadmap-section__title">DEPLOYMENT ROADMAP.</h2>
                    <p className="roadmap-section__sub">&gt; EXECUTING_MASTER_PLAN.SH</p>
                </div>
                <div className="roadmap-timeline">
                    {/* Phase 1: Active */}
                    <div className="roadmap-phase roadmap-phase--active">
                        <div className="roadmap-phase__node">■</div>
                        <div className="roadmap-phase__label">PHASE 01 // CURRENT</div>
                        <h3 className="roadmap-phase__title">PROTOCOL GENESIS</h3>
                        <p className="roadmap-phase__desc">
                            Smart contract audits, UI/UX terminal deployment, dAppBay integration, and
                            initial physical vault securing. Core authentication pipeline and BNB Chain deployment finalized.
                        </p>
                    </div>
                    {/* Phase 2 */}
                    <div className="roadmap-phase roadmap-phase--dim">
                        <div className="roadmap-phase__node">[ ]</div>
                        <div className="roadmap-phase__label">PHASE 02 // NEXT</div>
                        <h3 className="roadmap-phase__title">ASSET ACQUISITION</h3>
                        <p className="roadmap-phase__desc">
                            Sourcing and vaulting the first $1M in high-value luxury assets (Patek
                            Philippe, Off-White, Hermès). Fractional minting begins. First public share offerings go live.
                        </p>
                    </div>
                    {/* Phase 3 */}
                    <div className="roadmap-phase roadmap-phase--dim">
                        <div className="roadmap-phase__node">[ ]</div>
                        <div className="roadmap-phase__label">PHASE 03 // UPCOMING</div>
                        <h3 className="roadmap-phase__title">SECONDARY MARKET</h3>
                        <p className="roadmap-phase__desc">
                            Launch of the ReliqueX P2P trading terminal. Users can trade fractional shares
                            directly on-chain with instant settlement. Order book and market maker integration.
                        </p>
                    </div>
                    {/* Phase 4 */}
                    <div className="roadmap-phase roadmap-phase--dim">
                        <div className="roadmap-phase__node">[ ]</div>
                        <div className="roadmap-phase__label">PHASE 04 // FUTURE</div>
                        <h3 className="roadmap-phase__title">OMNICHAIN EXPANSION</h3>
                        <p className="roadmap-phase__desc">
                            Cross-chain bridging via LayerZero, allowing liquidity from Ethereum and Solana
                            to interact with the BNB Chain vaults. Multi-chain vault receipts and governance token launch.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
