export default function Lifestyle() {
    return (
        <section className="lifestyle reveal" id="brand-outlet">
            <div className="container">
                <div className="lifestyle__text">
                    <div className="lifestyle__label">The Prestige Collection</div>
                    <h2 className="lifestyle__heading">Where High Fashion Meets<br />Fractional Ownership</h2>
                    <p className="lifestyle__body">
                        From the runways of Milan to the ateliers of Paris — every piece in the ReliqueX vault
                        has been verified, authenticated, and secured. Own a share of history's most coveted
                        luxury assets, powered by the speed and security of BNB Chain.
                    </p>
                    <div className="bnb-badge">Built on BNB Chain</div>
                </div>
                <div className="lifestyle__img-wrapper">
                    <div className="hud-corner hud-corner--tl"></div>
                    <div className="hud-corner hud-corner--tr"></div>
                    <div className="hud-corner hud-corner--bl"></div>
                    <div className="hud-corner hud-corner--br"></div>
                    <img src="/assets/vault.png" alt="Neon green secured crypto vault" className="lifestyle__img" />
                </div>
            </div>
        </section>
    );
}
