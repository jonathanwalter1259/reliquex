export default function Disclaimer() {
  return (
    <main className="page-wrap">
        <div className="container">
            <div className="page-header">
                <h1 className="page-header__title">RISK DISCLOSURE.</h1>
                <p className="page-header__sub">&gt; LOADING_RISK_DISCLOSURE_LOG...</p>
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
                    <span className="terms-window__filename">RISK_DISCLOSURE.log</span>
                </div>
                <div className="terms-window__body">
                    <div className="terms-clause">
                        <h3 className="terms-clause__title">// 1.0 — NOT FINANCIAL ADVICE</h3>
                        <p>Nothing on this website, within the ReliqueX protocol, or communicated through any official
                            ReliqueX channels (Discord, Telegram, X/Twitter) constitutes financial, investment, tax, or
                            legal advice. The purchase of fractional shares in luxury assets involves inherent risks.
                            You should consult a qualified financial advisor before making any investment decisions.</p>
                    </div>

                    <div className="terms-clause">
                        <h3 className="terms-clause__title">// 2.0 — CRYPTOCURRENCY VOLATILITY</h3>
                        <p>Cryptocurrency markets are inherently volatile. The value of BNB, $RLQ, and individual vault
                            share tokens can fluctuate significantly within short periods. You may lose some or all of
                            your invested capital. Past performance does not guarantee future returns. ReliqueX is not
                            responsible for losses incurred through market volatility.</p>
                    </div>

                    <div className="terms-clause">
                        <h3 className="terms-clause__title">// 3.0 — FRACTIONAL ASSET RISKS</h3>
                        <p>Fractional ownership of physical assets carries unique risks including: (a) illiquidity —
                            there may not be sufficient buyers for your shares at any given time, (b) valuation
                            fluctuations — the appraised value of physical assets may decrease, (c) damage or loss —
                            despite insurance and security, catastrophic events could affect vaulted items, (d)
                            regulatory changes — future regulations may impact the protocol's operations or token
                            classifications.</p>
                    </div>

                    <div className="terms-clause">
                        <h3 className="terms-clause__title">// 4.0 — SMART CONTRACT RISK</h3>
                        <p>While ReliqueX smart contracts are audited by CertiK and Hacken, no audit can guarantee the
                            absence of all vulnerabilities. Smart contracts may contain undiscovered bugs that could
                            result in loss of funds. Users interact with the protocol's smart contracts at their own
                            risk.</p>
                    </div>

                    <div className="terms-clause">
                        <h3 className="terms-clause__title">// 5.0 — CUSTODY & INSURANCE LIMITATIONS</h3>
                        <p>Physical assets are stored in insured, high-security vaults. However, insurance coverage has
                            limits and exclusions. In the event of an uninsured loss (e.g., acts of war, nuclear
                            incidents), the protocol may not be able to fully compensate token holders. The insurance
                            policies are underwritten by third parties and are subject to their terms and conditions.
                        </p>
                    </div>

                    <div className="terms-clause">
                        <h3 className="terms-clause__title">// 6.0 — JURISDICTIONAL RESTRICTIONS</h3>
                        <p>The ReliqueX protocol may not be available in all jurisdictions. It is your responsibility to
                            determine whether your use of the protocol complies with the laws and regulations of your
                            jurisdiction. Citizens or residents of sanctioned countries, or jurisdictions where
                            cryptocurrency trading or fractional asset ownership is prohibited, must not use this
                            protocol.</p>
                    </div>

                    <div className="terms-clause">
                        <h3 className="terms-clause__title">// 7.0 — NO WARRANTIES</h3>
                        <p>The protocol is provided "as-is" without warranties of any kind, express or implied. ReliqueX
                            makes no representations regarding the accuracy, completeness, or timeliness of information
                            provided. The protocol may experience downtime, bugs, or interruptions. Use at your own
                            risk.</p>
                    </div>

                    <div className="terms-clause">
                        <h3 className="terms-clause__title">// 8.0 — LIMITATION OF LIABILITY</h3>
                        <p>To the maximum extent permitted by applicable law, ReliqueX, its affiliates, directors,
                            employees, and agents shall not be liable for any indirect, incidental, special,
                            consequential, or punitive damages arising from your use of the protocol, including but not
                            limited to loss of profits, data, or digital assets.</p>
                        <p className="terms-clause__meta">&gt; LAST_UPDATED: 2026-02-24 // VERSION: 1.0</p>
                    </div>
                </div>
            </div>
        </div>
    </main>
  );
}
