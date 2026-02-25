'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAccount, useSignMessage, useChainId, useDisconnect } from 'wagmi';
import { SiweMessage } from 'siwe';
import { useAppKit } from '@reown/appkit/react';

export default function NavBar() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const [authError, setAuthError] = useState<string | null>(null);
    const [userRole, setUserRole] = useState<string | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Wagmi & AppKit hooks
    const { address, isConnected } = useAccount();
    const chainId = useChainId();
    const { signMessageAsync } = useSignMessage();
    const { disconnect } = useDisconnect();
    const { open } = useAppKit();

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => setIsScrolled(window.scrollY > 80);
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Check existing session on mount or connection change
    useEffect(() => {
        const checkExistingSession = async () => {
            if (isConnected && address) {
                try {
                    const meRes = await fetch('/api/auth/me');
                    if (meRes.ok) {
                        const meData = await meRes.json();
                        if (meData.walletAddress === address.toLowerCase()) {
                            setIsAuthenticated(true);
                            setUserRole(meData.role || 'USER');
                            return;
                        }
                    }
                } catch (error) {
                    console.error("Session check failed", error);
                }
            } else if (!isConnected && isAuthenticated) {
                // User disconnected their wallet, clear session
                setIsAuthenticated(false);
                setUserRole(null);
                fetch('/api/auth/me', { method: 'DELETE' }).catch(console.error);
            }
        };
        checkExistingSession();
    }, [isConnected, address]);

    // Manual Authentication Flow
    const handleAuthenticate = async () => {
        if (!isConnected || !address || isAuthenticating) return;
        setIsAuthenticating(true);
        setAuthError(null);
        try {
            const nonceRes = await fetch('/api/auth/nonce');
            const nonce = await nonceRes.text();

            const message = new SiweMessage({
                domain: window.location.host,
                address,
                statement: 'Sign in to securely authenticate your wallet for the ReliqueX protocol.',
                uri: window.location.origin,
                version: '1',
                chainId,
                nonce,
            }).prepareMessage();

            const signature = await signMessageAsync({ message });

            const verifyRes = await fetch('/api/auth/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message, signature })
            });

            if (verifyRes.ok) {
                const data = await verifyRes.json();
                setIsAuthenticated(true);
                setUserRole(data.user?.role || 'USER');
            } else {
                const errData = await verifyRes.json();
                setAuthError(errData.error || 'Verification failed');
            }
        } catch (error: any) {
            console.error("SIWE Manual Auth Failed:", error);
            setAuthError(error?.message || 'Signature rejected');
        } finally {
            setIsAuthenticating(false);
        }
    };

    // Disconnect Logic
    const handleDisconnect = async () => {
        try {
            await fetch('/api/auth/me', { method: 'DELETE' });
            disconnect();
            setIsAuthenticated(false);
            setUserRole(null);
            setIsDropdownOpen(false);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="navbar">
            <div className="container nav-container">
                <Link href="/" className="logo">
                    RELIQUE<span>X</span>
                </Link>

                <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`} id="navLinks">
                    <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>HOME</Link>
                    <Link href="/vaults" className={`nav-link ${pathname === '/vaults' ? 'active' : ''}`}>VAULTS</Link>
                    {mounted && isAuthenticated && (
                        <Link href="/submit" className={`nav-link ${pathname === '/submit' ? 'active' : ''}`}>SUBMIT ASSET</Link>
                    )}
                    <Link href="/whitepaper" className={`nav-link ${pathname === '/whitepaper' ? 'active' : ''}`}>WHITEPAPER</Link>
                    {mounted && isAuthenticated && (
                        <Link href="/dashboard" className={`nav-link ${pathname === '/dashboard' ? 'active' : ''}`}>DASHBOARD</Link>
                    )}
                    {mounted && isAuthenticated && userRole === 'ADMIN' && (
                        <Link href="/admin/vault" className={`nav-link text-[#00ff41] font-bold ${pathname === '/admin/vault' ? 'active shadow-[0_0_8px_rgba(0,255,0,0.4)]' : ''}`}>[ ADMIN_CONSOLE ]</Link>
                    )}
                </div>

                {/* Social Icons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginLeft: '0.5rem' }}>
                    <a href="https://x.com/reliquexbnb" target="_blank" rel="noopener noreferrer" title="Twitter / X" style={{ color: '#888', transition: 'color 0.2s' }} onMouseEnter={e => (e.currentTarget.style.color = '#00ff41')} onMouseLeave={e => (e.currentTarget.style.color = '#888')}>
                        <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                    </a>
                    <a href="https://t.me/reliquexbnb" target="_blank" rel="noopener noreferrer" title="Telegram" style={{ color: '#888', transition: 'color 0.2s' }} onMouseEnter={e => (e.currentTarget.style.color = '#00ff41')} onMouseLeave={e => (e.currentTarget.style.color = '#888')}>
                        <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></svg>
                    </a>
                    <a href="https://github.com/jonathanwalter1259/reliquex" target="_blank" rel="noopener noreferrer" title="GitHub" style={{ color: '#888', transition: 'color 0.2s' }} onMouseEnter={e => (e.currentTarget.style.color = '#00ff41')} onMouseLeave={e => (e.currentTarget.style.color = '#888')}>
                        <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                    </a>
                </div>

                {mounted && (
                    <div style={{ marginLeft: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        {isConnected ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                {/* Address Chip */}
                                <div style={{ position: 'relative' }}>
                                    <button
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        style={{
                                            fontFamily: 'var(--font-space-mono, monospace)',
                                            fontSize: '11px',
                                            letterSpacing: '0.08em',
                                            textTransform: 'uppercase',
                                            color: '#fff',
                                            background: '#0a0a0a',
                                            border: '1px solid #333',
                                            padding: '8px 14px',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                                        }}
                                        onMouseEnter={e => { e.currentTarget.style.borderColor = '#00ff41'; e.currentTarget.style.boxShadow = '0 0 8px rgba(0,255,65,0.15)'; }}
                                        onMouseLeave={e => { e.currentTarget.style.borderColor = '#333'; e.currentTarget.style.boxShadow = 'none'; }}
                                    >
                                        <span style={{ color: '#555' }}>●</span>
                                        <span style={{ color: '#888' }}>ID:</span>
                                        {address?.slice(0, 6)}...{address?.slice(-4)}
                                    </button>

                                    {isDropdownOpen && (
                                        <div className="absolute top-full right-0 mt-2 bg-[#000] border border-[#333] min-w-[150px] shadow-[0_0_15px_rgba(0,255,0,0.1)] z-50">
                                            <Link
                                                href="/dashboard/settings"
                                                onClick={() => setIsDropdownOpen(false)}
                                                className="w-full block text-left font-mono text-[11px] text-[#888] hover:text-[#00ff41] hover:bg-[#00ff41]/5 px-4 py-3 transition-colors tracking-widest uppercase border-l-2 border-transparent hover:border-[#00ff41]"
                                            >
                                                &gt; SETTINGS_
                                            </Link>
                                            <button
                                                onClick={handleDisconnect}
                                                className="w-full text-left font-mono text-[11px] text-[#ff0033] hover:text-[#000] hover:bg-[#ff0033] px-4 py-3 transition-colors tracking-widest uppercase border-l-2 border-transparent hover:border-[#fff]"
                                            >
                                                &gt; DISCONNECT_
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Auth Status/Button */}
                                {!isAuthenticated ? (
                                    <div style={{ position: 'relative' }}>
                                        <button
                                            onClick={handleAuthenticate}
                                            disabled={isAuthenticating}
                                            style={{
                                                fontFamily: 'var(--font-space-mono, monospace)',
                                                fontSize: '11px',
                                                letterSpacing: '0.1em',
                                                textTransform: 'uppercase',
                                                color: '#00ff41',
                                                background: 'transparent',
                                                border: '1px solid #00ff41',
                                                padding: '8px 16px',
                                                cursor: isAuthenticating ? 'wait' : 'pointer',
                                                transition: 'all 0.2s ease',
                                            }}
                                            onMouseEnter={e => { if (!isAuthenticating) { e.currentTarget.style.background = '#00ff41'; e.currentTarget.style.color = '#000'; } }}
                                            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#00ff41'; }}
                                        >
                                            {isAuthenticating ? '[SIGNING...]' : 'AUTHENTICATE'}
                                        </button>
                                        {authError && (
                                            <span className="text-[#ff0033] text-[9px] uppercase font-mono absolute top-[120%] right-0 whitespace-nowrap bg-[#ff0033]/10 border border-[#ff0033]/30 px-2 py-1 shadow-[0_0_10px_rgba(255,0,51,0.2)]">
                                                {(authError.includes('Prisma') || authError.includes('database'))
                                                    ? '> [SYSTEM_ERROR]: DBS_CONNECTION_FAILED'
                                                    : '> [SYSTEM_FAULT]: SIGNATURE_REJECTED'}
                                            </span>
                                        )}
                                    </div>
                                ) : (
                                    <div style={{
                                        fontFamily: 'var(--font-space-mono, monospace)',
                                        fontSize: '11px',
                                        letterSpacing: '0.1em',
                                        padding: '8px 14px',
                                        background: 'rgba(0,255,65,0.08)',
                                        color: '#00ff41',
                                        border: '1px solid rgba(0,255,65,0.3)',
                                        textTransform: 'uppercase',
                                    }}>
                                        [AUTHENTICATED]
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button
                                onClick={() => open()}
                                style={{
                                    fontFamily: 'var(--font-space-mono, monospace)',
                                    fontSize: '12px',
                                    fontWeight: 600,
                                    letterSpacing: '0.12em',
                                    textTransform: 'uppercase',
                                    color: '#00ff41',
                                    background: 'transparent',
                                    border: '1px solid #00ff41',
                                    padding: '10px 24px',
                                    cursor: 'pointer',
                                    transition: 'all 0.25s ease',
                                    boxShadow: '0 0 6px rgba(0,255,65,0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.background = '#00ff41';
                                    e.currentTarget.style.color = '#000';
                                    e.currentTarget.style.boxShadow = '0 0 16px rgba(0,255,65,0.3)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.background = 'transparent';
                                    e.currentTarget.style.color = '#00ff41';
                                    e.currentTarget.style.boxShadow = '0 0 6px rgba(0,255,65,0.1)';
                                }}
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                                    <path d="M16 7V5a4 4 0 0 0-8 0v2" />
                                </svg>
                                CONNECT WALLET
                            </button>
                        )}
                    </div>
                )}

                <div
                    className={`menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
                    id="menuToggle"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </nav>
    );
}
