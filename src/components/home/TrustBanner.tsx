export default function TrustBanner() {
    return (
        <section className="trust-banner reveal">
            <div className="container">
                <p className="trust-banner__label">&gt; SYSTEM_TRUST_VERIFIED // FEATURED PROTOCOLS:</p>
                <div className="trust-banner__logos">
                    <a href="https://dappbay.bnbchain.org/detail/reliquex" target="_blank" rel="noopener noreferrer" className="trust-banner__logo trust-banner__logo--featured" style={{ textDecoration: 'none', color: 'inherit' }}>dAppBay</a>
                    <span className="trust-banner__logo">BNB Chain</span>
                    <a href="https://www.producthunt.com/products/reliquex?launch=reliquex" target="_blank" rel="noopener noreferrer" className="trust-banner__logo" style={{ textDecoration: 'none', color: 'inherit' }}>Product Hunt</a>
                    <a href="https://www.indiehackers.com/product/reliquex" target="_blank" rel="noopener noreferrer" className="trust-banner__logo" style={{ textDecoration: 'none', color: 'inherit' }}>Indie Hackers</a>
                    <span className="trust-banner__logo">CoinMarketCap</span>
                    <a href="https://www.orynth.dev/projects/reliquex" target="_blank" rel="noopener noreferrer" className="trust-banner__logo" style={{ textDecoration: 'none', color: 'inherit' }}>Orynth</a>
                </div>
            </div>
        </section>
    );
}
