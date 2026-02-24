'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function Hero() {
    useEffect(() => {
        if (window.innerWidth > 768) {
            const cards = document.querySelectorAll<HTMLElement>('.float-card');
            const handleMouseMove = (e: MouseEvent) => {
                const x = (e.clientX / window.innerWidth - 0.5) * 2;
                const y = (e.clientY / window.innerHeight - 0.5) * 2;

                cards.forEach((card, i) => {
                    const factor = (i + 1) * 3;
                    card.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
                });
            };

            window.addEventListener('mousemove', handleMouseMove, { passive: true });
            return () => window.removeEventListener('mousemove', handleMouseMove);
        }
    }, []);
    return (
        <section className="hero" id="hero">
            {/* Floating HUD data nodes (desktop) */}
            <div className="floating-cards">
                {/* Ring Card — Top Left */}
                <div className="float-card float-card--ring">
                    <div className="hud-corner hud-corner--tl"></div>
                    <div className="hud-corner hud-corner--tr"></div>
                    <div className="hud-corner hud-corner--bl"></div>
                    <div className="hud-corner hud-corner--br"></div>
                    <img src="/assets/ring.png" alt="Onyx Diamond Ring" className="float-card__img" />
                    <div className="float-card__price">[$100K]</div>
                    <div className="float-card__name">Onyx Diamond Ring</div>
                    <div className="float-card__share">$50 / Share &bull; RM 35-02</div>
                </div>

                {/* Sneakers Card — Bottom Left */}
                <div className="float-card float-card--sneakers">
                    <div className="hud-corner hud-corner--tl"></div>
                    <div className="hud-corner hud-corner--tr"></div>
                    <div className="hud-corner hud-corner--bl"></div>
                    <div className="hud-corner hud-corner--br"></div>
                    <img src="/assets/sneakers.png" alt="Air Jordan Gold Edition" className="float-card__img" />
                    <div className="float-card__price">[$56K]</div>
                    <div className="float-card__name">Air Jordan Gold Ed.</div>
                    <div className="float-card__share">$28 / Share &bull; AJ-GLD</div>
                </div>

                {/* Bag Card — Top Right */}
                <div className="float-card float-card--bag">
                    <div className="hud-corner hud-corner--tl"></div>
                    <div className="hud-corner hud-corner--tr"></div>
                    <div className="hud-corner hud-corner--bl"></div>
                    <div className="hud-corner hud-corner--br"></div>
                    <img src="/assets/bag.png" alt="Emerald Birkin 35" className="float-card__img" />
                    <div className="float-card__price">[$82K]</div>
                    <div className="float-card__name">Emerald Birkin 35</div>
                    <div className="float-card__share">$41 / Share &bull; BK-35</div>
                </div>

                {/* Text Card — Bottom Right */}
                <div className="float-card float-card--text">
                    <div className="hud-corner hud-corner--tl"></div>
                    <div className="hud-corner hud-corner--tr"></div>
                    <div className="hud-corner hud-corner--bl"></div>
                    <div className="hud-corner hud-corner--br"></div>
                    <p>From iconic fashion to exquisite collectibles. <span>Indulge in a world where luxury never ends.</span></p>
                </div>
            </div>

            {/* Heading */}
            <h1 className="hero-heading">
                Fractional
                <span className="hero-heading-sub">Luxury</span>
            </h1>

            {/* Subheadline */}
            <p className="hero-subheadline">Transforming authenticated high-value assets into fractionalized tokens.</p>

            {/* Central Asset (Watch) */}
            <div className="hero-asset-wrapper">
                <img src="/assets/watch.png" alt="Luxury Patek Philippe Watch" className="hero-asset" />
                <div className="hero-pedestal"></div>
            </div>

            {/* CTA below the asset */}
            <div className="hero-cta">
                <Link href="/vaults" className="btn-explore">
                    Explore Vaults
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                    </svg>
                </Link>
            </div>
        </section>
    );
}
