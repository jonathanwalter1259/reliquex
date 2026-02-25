export default function OrynthPartnership() {
    return (
        <section style={{
            padding: '5rem 1.5rem',
            background: '#000',
            borderTop: '1px solid #1a1a1a',
            borderBottom: '1px solid #1a1a1a',
            fontFamily: 'var(--font-space-mono, monospace)',
        }}>
            <div style={{ maxWidth: '56rem', margin: '0 auto', textAlign: 'center' }}>

                {/* Terminal Label */}
                <div style={{
                    color: '#00ff41', fontSize: '0.7rem', letterSpacing: '0.2em',
                    textTransform: 'uppercase', marginBottom: '1.5rem', opacity: 0.6,
                }}>
                    &gt; PARTNERSHIP_PROTOCOL // VERIFIED
                </div>

                {/* Heading */}
                <h2 style={{
                    fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                    fontWeight: 800,
                    color: '#fff',
                    letterSpacing: '-0.02em',
                    marginBottom: '0.5rem',
                    lineHeight: 1.1,
                }}>
                    ReliqueX <span style={{ color: '#00ff41' }}>×</span> Orynth
                </h2>

                <p style={{
                    color: '#888', fontSize: '0.95rem', lineHeight: 1.7,
                    maxWidth: '38rem', margin: '1rem auto 2.5rem',
                }}>
                    ReliqueX is officially featured on <span style={{ color: '#fff' }}>Orynth</span> — the curated discovery platform for innovative Web3 products and protocols. Our listing brings independent visibility and community-driven trust to the protocol.
                </p>

                {/* Stats / Info Row */}
                <div style={{
                    display: 'flex', justifyContent: 'center', gap: '3rem',
                    flexWrap: 'wrap', marginBottom: '2.5rem',
                }}>
                    {[
                        { label: 'STATUS', value: 'VERIFIED', color: '#00ff41' },
                        { label: 'CATEGORY', value: 'WEB3 / RWA', color: '#fff' },
                        { label: 'CHAIN', value: 'BNB CHAIN', color: '#F0B90B' },
                    ].map((item) => (
                        <div key={item.label} style={{ textAlign: 'center' }}>
                            <div style={{
                                fontSize: '0.6rem', color: '#555', letterSpacing: '0.2em',
                                textTransform: 'uppercase', marginBottom: '0.35rem',
                            }}>
                                {item.label}
                            </div>
                            <div style={{
                                fontSize: '0.95rem', fontWeight: 700, color: item.color,
                                letterSpacing: '0.05em',
                            }}>
                                {item.value}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Orynth Badge */}
                <a
                    href="https://www.orynth.dev/projects/reliquex"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: 'inline-block',
                        padding: '0.75rem 2rem',
                        border: '1px solid #00ff41',
                        color: '#00ff41',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease',
                        fontFamily: 'inherit',
                    }}
                    onMouseEnter={e => {
                        (e.currentTarget as HTMLAnchorElement).style.background = '#00ff41';
                        (e.currentTarget as HTMLAnchorElement).style.color = '#000';
                    }}
                    onMouseLeave={e => {
                        (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
                        (e.currentTarget as HTMLAnchorElement).style.color = '#00ff41';
                    }}
                >
                    VIEW ON ORYNTH →
                </a>
            </div>
        </section>
    );
}
