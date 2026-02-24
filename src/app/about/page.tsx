export default function About() {
  return (
    <main className="page-wrap">
        <div className="container">
            <div className="page-header">
                <h1 className="page-header__title">ABOUT RELIQUEX.</h1>
                <p className="page-header__sub">&gt; DECRYPTING_OUR_MISSION.EXE</p>
            </div>

            <div className="about-split">
                {/*  Left: Mission text  */}
                <div className="about-text">
                    <div className="about-block">
                        <div className="hud-corner hud-corner--tl"></div>
                        <div className="hud-corner hud-corner--tr"></div>
                        <div className="hud-corner hud-corner--bl"></div>
                        <div className="hud-corner hud-corner--br"></div>
                        <h3 className="about-block__title">&gt; MISSION_STATEMENT</h3>
                        <p>ReliqueX exists to bridge the gap between physical opulence and on-chain liquidity. We
                            believe that the world's most valuable physical collectibles — from rare timepieces to fine
                            jewelry — should not be locked in private vaults accessible only to the ultra-wealthy.</p>
                        <p>Through our proprietary closed-curation protocol, each asset undergoes rigorous multi-point
                            authentication by licensed domain experts before being permanently sealed in our
                            climate-controlled, insured facility in Geneva, Switzerland.</p>
                    </div>
                    <div className="about-block">
                        <div className="hud-corner hud-corner--tl"></div>
                        <div className="hud-corner hud-corner--tr"></div>
                        <div className="hud-corner hud-corner--bl"></div>
                        <div className="hud-corner hud-corner--br"></div>
                        <h3 className="about-block__title">&gt; CORE_PRINCIPLES</h3>
                        <p>► CLOSED CURATION — Only assets that meet our strict quality and provenance criteria are
                            admitted into the protocol.</p>
                        <p>► PHYSICAL CUSTODY — Every tokenized asset has a real-world counterpart locked in our vaults.
                            Ownership is backed by tangible value.</p>
                        <p>► ON-CHAIN TRANSPARENCY — All authentication records, vault confirmations, and fractional
                            ownership changes are immutably recorded on the BNB Chain.</p>
                        <p>► BURN & CLAIM — The only mechanism for physical extraction. Acquire 100% of shares, burn the
                            total supply, and claim the underlying asset.</p>
                    </div>
                    <div className="about-block">
                        <div className="hud-corner hud-corner--tl"></div>
                        <div className="hud-corner hud-corner--tr"></div>
                        <div className="hud-corner hud-corner--bl"></div>
                        <div className="hud-corner hud-corner--br"></div>
                        <h3 className="about-block__title">&gt; THE_TEAM</h3>
                        <p>Founded by a team of blockchain engineers, luxury goods specialists, and certified
                            appraisers. We operate from Singapore, Switzerland, and Dubai — strategically positioned at
                            the intersection of Web3 innovation and the global luxury market.</p>
                    </div>
                </div>

                {/*  Right: ASCII Visual  */}
                <div className="about-visual">
                    <div className="hud-corner hud-corner--tl"></div>
                    <div className="hud-corner hud-corner--tr"></div>
                    <div className="hud-corner hud-corner--bl"></div>
                    <div className="hud-corner hud-corner--br"></div>
                    <div className="about-visual__ascii">
                        ╔══════════════════════╗
                        ║ R E L I Q U E X ║
                        ║ PROTOCOL NODE ║
                        ╠══════════════════════╣
                        ║ ║
                        ║ ◆ ◆ ◆ ║
                        ║ ◆ ◆ ║
                        ║ ◆ ███ ◆ ║
                        ║ ◆ █████ ◆ ║
                        ║ ◆ ███ ◆ ║
                        ║ ◆ ◆ ║
                        ║ ◆ ◆ ◆ ║
                        ║ ║
                        ╠══════════════════════╣
                        ║ NODE: ACTIVE ║
                        ║ PEERS: 14,892 ║
                        ║ LATENCY: 12ms ║
                        ║ CHAIN: BNB_MAINNET ║
                        ╚══════════════════════╝</div>
                    <div className="about-visual__stats">
                        <div className="about-visual__stat">
                            <span className="about-visual__stat-label">TOTAL_VALUE_LOCKED:</span>
                            <span className="about-visual__stat-value">$4,200,000</span>
                        </div>
                        <div className="about-visual__stat">
                            <span className="about-visual__stat-label">VAULTED_ASSETS:</span>
                            <span className="about-visual__stat-value">24</span>
                        </div>
                        <div className="about-visual__stat">
                            <span className="about-visual__stat-label">UNIQUE_HOLDERS:</span>
                            <span className="about-visual__stat-value">3,847</span>
                        </div>
                        <div className="about-visual__stat">
                            <span className="about-visual__stat-label">PROTOCOL_STATUS:</span>
                            <span className="about-visual__stat-value" >OPERATIONAL</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
  );
}
