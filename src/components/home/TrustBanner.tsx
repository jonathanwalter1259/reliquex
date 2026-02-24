export default function TrustBanner() {
    const logos = [
        { src: '/assets/logos/dappbay.png', alt: 'dAppBay', featured: true },
        { src: '/assets/logos/bnbchain.png', alt: 'BNB Chain' },
        { src: '/assets/logos/producthunt.png', alt: 'Product Hunt' },
        { src: '/assets/logos/coinmarketcap.png', alt: 'CoinMarketCap' },
        { src: '/assets/logos/orynth.png', alt: 'Orynth' },
    ];

    return (
        <section className="trust-banner reveal">
            <style dangerouslySetInnerHTML={{
                __html: `
                .trust-logos-strip {
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    flex-wrap: wrap !important;
                    gap: 3.5rem !important;
                    padding: 1.5rem 0 !important;
                    max-width: 100% !important;
                }
                .trust-logo-img {
                    height: 40px !important;
                    width: auto !important;
                    max-width: 180px !important;
                    object-fit: contain !important;
                    opacity: 0.8 !important;
                    transition: opacity 0.3s ease, transform 0.3s ease !important;
                    display: block !important;
                }
                .trust-logo-img:hover {
                    opacity: 1 !important;
                    transform: scale(1.08) !important;
                }
                .trust-logo-img.trust-logo-featured {
                    opacity: 1 !important;
                    height: 44px !important;
                }
                @media (max-width: 768px) {
                    .trust-logos-strip {
                        gap: 2rem !important;
                    }
                    .trust-logo-img {
                        height: 28px !important;
                        max-width: 130px !important;
                    }
                }
            ` }} />
            <div className="container">
                <p className="trust-banner__label">&gt; SYSTEM_TRUST_VERIFIED // FEATURED PROTOCOLS:</p>
                <div className="trust-logos-strip">
                    {logos.map((logo) => (
                        <img
                            key={logo.alt}
                            src={logo.src}
                            alt={logo.alt}
                            className={`trust-logo-img ${logo.featured ? 'trust-logo-featured' : ''}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
