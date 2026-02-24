export default function Privacy() {
  return (
    <main className="page-wrap">
        <div className="container">
            <div className="page-header">
                <h1 className="page-header__title">DATA PRIVACY MANDATE.</h1>
                <p className="page-header__sub">&gt; LOADING_PRIVACY_PROTOCOL...</p>
            </div>

            <div className="terms-window">
                <div className="hud-corner hud-corner--tl"></div>
                <div className="hud-corner hud-corner--tr"></div>
                <div className="hud-corner hud-corner--bl"></div>
                <div className="hud-corner hud-corner--br"></div>
                <div className="terms-window__bar">
                    <span className="terms-dot terms-dot--red"></span>
                    <span className="terms-dot terms-dot--yellow"></span>
                    <span className="terms-dot terms-dot--green"></span>
                    <span className="terms-window__filename">DATA_PRIVACY_MANDATE.log</span>
                </div>
                <div className="terms-window__body">
                    <div className="terms-clause">
                        <h3 className="terms-clause__title">// 1.0 — WALLET ANONYMITY</h3>
                        <p>ReliqueX does not collect, store, or process personally identifiable information (PII)
                            through on-chain interactions. Your wallet address is your identity on the protocol. We do
                            not link wallet addresses to real-world identities unless explicitly required by regulatory
                            compliance frameworks (e.g., KYC for physical asset redemption).</p>
                    </div>

                    <div className="terms-clause">
                        <h3 className="terms-clause__title">// 2.0 — ON-CHAIN DATA</h3>
                        <p>All transactions, share purchases, and governance votes are recorded immutably on the BNB
                            Chain. This data is publicly accessible via block explorers and cannot be modified or
                            deleted by ReliqueX or any third party. By using the protocol, you acknowledge that your
                            transaction history is permanently public.</p>
                    </div>

                    <div className="terms-clause">
                        <h3 className="terms-clause__title">// 3.0 — OFF-CHAIN DATA COLLECTION</h3>
                        <p>When you submit an asset for vaulting or initiate a Physical Redemption ("Burn & Claim"), we
                            collect limited off-chain information including: shipping address, contact email, and
                            identity verification documents. This data is encrypted using AES-256 and stored in
                            air-gapped, GDPR-compliant servers located in Switzerland.</p>
                    </div>

                    <div className="terms-clause">
                        <h3 className="terms-clause__title">// 4.0 — ENCRYPTION STANDARDS</h3>
                        <p>All off-chain data transmitted to ReliqueX is encrypted in transit (TLS 1.3) and at rest
                            (AES-256). Encryption keys are managed via hardware security modules (HSMs) and are rotated
                            every 90 days. No employee has unilateral access to decrypted user data — a minimum of
                            2-of-3 key holders are required.</p>
                    </div>

                    <div className="terms-clause">
                        <h3 className="terms-clause__title">// 5.0 — THIRD-PARTY SHARING</h3>
                        <p>ReliqueX does not sell, trade, or share user data with third parties for marketing or
                            commercial purposes. Data may be disclosed to: (a) Licensed appraisers during asset
                            authentication (limited to asset-specific data only), (b) Insurance providers for vault
                            coverage verification, (c) Law enforcement agencies when compelled by valid legal process.
                        </p>
                    </div>

                    <div className="terms-clause">
                        <h3 className="terms-clause__title">// 6.0 — COOKIES & ANALYTICS</h3>
                        <p>The ReliqueX website uses minimal, first-party cookies for session management and UI
                            preferences. We do not use third-party tracking pixels, Google Analytics, or social media
                            trackers. Anonymous, aggregate usage statistics may be collected to improve protocol
                            performance.</p>
                    </div>

                    <div className="terms-clause">
                        <h3 className="terms-clause__title">// 7.0 — DATA DELETION RIGHTS</h3>
                        <p>Users who have submitted off-chain data may request complete deletion by contacting
                            privacy@reliquex.io. Deletion requests are processed within 30 days. Note: On-chain
                            transaction data cannot be deleted as it is immutably recorded on the BNB Chain.</p>
                    </div>

                    <div className="terms-clause">
                        <h3 className="terms-clause__title">// 8.0 — UPDATES TO THIS MANDATE</h3>
                        <p>This privacy mandate may be updated to reflect changes in regulatory requirements or protocol
                            functionality. Users will be notified of material changes via on-chain announcement and the
                            ReliqueX Discord server. Continued use of the protocol constitutes acceptance of updated
                            terms.</p>
                        <p className="terms-clause__meta">&gt; LAST_UPDATED: 2026-02-24 // VERSION: 1.0</p>
                    </div>
                </div>
            </div>
        </div>
    </main>
  );
}
