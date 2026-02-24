export default function ProtocolInfra() {
    return (
        <section className="protocol-infra reveal">
            <div className="container">
                <div className="protocol-infra__header">
                    <h2 className="protocol-infra__title">PROTOCOL INFRASTRUCTURE.</h2>
                    <p className="protocol-infra__sub">&gt; BRIDGING PHYSICAL OPULENCE WITH ON-CHAIN LIQUIDITY.</p>
                </div>
                <div className="protocol-grid">
                    <div className="protocol-text">
                        <p>
                            ReliqueX is a decentralized Real-World Asset (RWA) protocol built exclusively on the BNB Chain. We
                            democratize access to ultra-high-net-worth collectibles by transforming them into fractionalized, tradeable
                            blockchain tokens.
                        </p>
                        <p>
                            Unlike traditional marketplaces, ReliqueX acts as the sole authenticator and custodian. Every asset listed
                            is physically verified by elite horologists and appraisers, then permanently sealed in our
                            climate-controlled, insured vaults in secure jurisdictions.
                        </p>
                    </div>
                    <div className="vault-visual">
                        <div className="hud-corner hud-corner--tl"></div>
                        <div className="hud-corner hud-corner--tr"></div>
                        <div className="hud-corner hud-corner--bl"></div>
                        <div className="hud-corner hud-corner--br"></div>
                        <div className="vault-visual__ascii">
                            {`┌─────────────────────────────────┐
│ ╔═══════════════════════════╗ │
│ ║ R E L I Q U E X ║ │
│ ║ VAULT_SYS v2.6 ║ │
│ ╠═══════════════════════════╣ │
│ ║ ▓▓▓▓▓▓▓▓▓▓░░░ 82% ║ │
│ ║ CAPACITY: NOMINAL ║ │
│ ╚═══════════════════════════╝ │
│ ┌──┐ ┌──┐ ┌──┐ ┌──┐ │
│ │▓▓│ │▓▓│ │▓▓│ │░░│ │
│ └──┘ └──┘ └──┘ └──┘ │
└─────────────────────────────────┘`}
                        </div>
                        <div className="vault-visual__data">
                            <div className="vault-visual__line">HASH: <span>0x9f3a...d7b2</span></div>
                            <div className="vault-visual__line">STATUS: <span>VAULTED</span></div>
                            <div className="vault-visual__line">VALUE: <span>SECURED</span></div>
                            <div className="vault-visual__line">LOCATION: <span>GENEVA, CH — FACILITY_ALPHA</span></div>
                            <div className="vault-visual__line">INSURANCE: <span>ACTIVE // LLOYD'S SYNDICATE</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
