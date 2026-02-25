/**
 * RiskDisclosure — dAppBay Compliance Component
 * Permanent, un-hideable legal disclaimer regarding RWA volatility.
 * Injected into the global layout between {children} and <Footer />.
 */
export default function RiskDisclosure() {
    return (
        <div
            id="risk-disclosure-banner"
            style={{
                width: '100%',
                background: '#080808',
                borderTop: '1px solid rgba(255, 0, 51, 0.15)',
                borderBottom: '1px solid rgba(255, 0, 51, 0.15)',
                padding: '1.5rem 2rem',
                fontFamily: 'var(--font-space-mono, monospace)',
                position: 'relative',
                overflow: 'hidden',
                userSelect: 'none',
            }}
        >
            {/* Scanline overlay */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.12) 2px, rgba(0,0,0,0.12) 4px)',
                pointerEvents: 'none',
                opacity: 0.4,
            }} />

            <div style={{
                maxWidth: '64rem',
                margin: '0 auto',
                position: 'relative',
                zIndex: 10,
                textAlign: 'center',
            }}>
                {/* Label Row */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem',
                    marginBottom: '0.75rem',
                }}>
                    <span style={{
                        color: '#ff0033',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                    }}>
                        ⚠ RISK_DISCLOSURE
                    </span>
                    <span style={{
                        color: 'rgba(0,255,65,0.3)',
                        fontSize: '0.6rem',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                    }}>
                        [DAPPBAY_COMPLIANT]
                    </span>
                </div>

                {/* Disclosure Text */}
                <p style={{
                    color: '#666',
                    fontSize: '0.6rem',
                    lineHeight: 1.8,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    maxWidth: '52rem',
                    margin: '0 auto',
                }}>
                    ReliqueX tokens represent fractional ownership of authenticated physical assets. Token values may fluctuate.
                    Past performance does not guarantee future results. This is not financial advice. Trade at your own risk.
                    All transactions are final and recorded on the BNB Smart Chain.
                </p>
            </div>
        </div>
    );
}
