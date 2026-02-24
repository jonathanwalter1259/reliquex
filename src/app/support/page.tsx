export default function Support() {
  return (
    <main className="page-wrap">
        <div className="container">
            <div className="page-header">
                <h1 className="page-header__title">SYSTEM SUPPORT.</h1>
                <p className="page-header__sub">&gt; INITIATE_DIAGNOSTIC_TICKET</p>
            </div>

            <div className="support-layout">
                <div className="support-form-wrap">
                    <div className="hud-corner hud-corner--tl"></div>
                    <div className="hud-corner hud-corner--tr"></div>
                    <div className="hud-corner hud-corner--bl"></div>
                    <div className="hud-corner hud-corner--br"></div>

                    <form className="support-form"
                        onsubmit="event.preventDefault(); alert('TRANSMISSION_SENT // Your ticket has been logged.');">
                        <div className="support-form__group">
                            <label className="support-form__label">&gt; WALLET_ADDRESS (OPTIONAL)</label>
                            <input type="text" className="support-form__input" placeholder="0x..." />
                        </div>

                        <div className="support-form__group">
                            <label className="support-form__label">&gt; INQUIRY_CATEGORY</label>
                            <select className="support-form__select">
                                <option value="">[ SELECT_CATEGORY ]</option>
                                <option value="auth">Authentication Issue</option>
                                <option value="vault">Vault / Custody Inquiry</option>
                                <option value="trading">Trading / Share Transfer</option>
                                <option value="wallet">Wallet Connection</option>
                                <option value="kyc">KYC / Compliance</option>
                                <option value="bug">Bug Report</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className="support-form__group">
                            <label className="support-form__label">&gt; SUBJECT_LINE</label>
                            <input type="text" className="support-form__input"
                                placeholder="Brief description of your issue..." />
                        </div>

                        <div className="support-form__group">
                            <label className="support-form__label">&gt; TRANSMISSION_MESSAGE</label>
                            <textarea className="support-form__textarea" rows="8"
                                placeholder="Describe your issue in detail. Include relevant transaction hashes, screenshots, or error codes..."></textarea>
                        </div>

                        <div className="support-form__group">
                            <label className="support-form__label">&gt; ATTACHMENT (OPTIONAL)</label>
                            <div className="support-form__upload">
                                <p>[ DRAG FILE HERE OR CLICK TO BROWSE ]</p>
                                <p className="support-form__upload-note">Max 10MB — .png, .jpg, .pdf accepted</p>
                            </div>
                        </div>

                        <button type="submit" className="support-form__submit">&gt; TRANSMIT_MESSAGE</button>
                    </form>
                </div>

                <div className="support-info">
                    <div className="support-info__block">
                        <div className="hud-corner hud-corner--tl"></div>
                        <div className="hud-corner hud-corner--tr"></div>
                        <div className="hud-corner hud-corner--bl"></div>
                        <div className="hud-corner hud-corner--br"></div>
                        <h3 className="support-info__title">&gt; RESPONSE_TIME</h3>
                        <p>Average response time: <span >24-48 hours</span></p>
                        <p>Critical issues (vault access, fund security): <span >&lt; 4
                                hours</span></p>
                    </div>
                    <div className="support-info__block">
                        <div className="hud-corner hud-corner--tl"></div>
                        <div className="hud-corner hud-corner--tr"></div>
                        <div className="hud-corner hud-corner--bl"></div>
                        <div className="hud-corner hud-corner--br"></div>
                        <h3 className="support-info__title">&gt; DIRECT_CHANNELS</h3>
                        <p>Discord: <span >discord.gg/reliquex</span></p>
                        <p>Telegram: <span >t.me/reliquex</span></p>
                        <p>Email: <span >support@reliquex.io</span></p>
                    </div>
                </div>
            </div>
        </div>
    </main>
  );
}
