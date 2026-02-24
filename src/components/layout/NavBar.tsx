'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAccount, useSignMessage, useChainId } from 'wagmi';
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

    // Wagmi & AppKit hooks
    const { address, isConnected } = useAccount();
    const chainId = useChainId();
    const { signMessageAsync } = useSignMessage();
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
                            return;
                        }
                    }
                } catch (error) {
                    console.error("Session check failed", error);
                }
            } else if (!isConnected && isAuthenticated) {
                // User disconnected their wallet, clear session
                setIsAuthenticated(false);
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
                setIsAuthenticated(true);
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
                </div>

                {mounted && (
                    <div style={{ marginLeft: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        {isConnected ? (
                            <div className="flex items-center gap-3">
                                {/* Address Display */}
                                <div className="font-mono text-[11px] border border-[#333] px-3 py-1.5 text-[#fff] bg-[#111] uppercase tracking-wider">
                                    <span className="text-[#888] mr-2">ID:</span>
                                    {address?.slice(0, 6)}...{address?.slice(-4)}
                                </div>

                                {/* Auth Status/Button */}
                                {!isAuthenticated ? (
                                    <div className="flex flex-col items-end gap-1 relative">
                                        <button
                                            onClick={handleAuthenticate}
                                            disabled={isAuthenticating}
                                            className="font-mono text-[11px] tracking-widest px-4 py-1.5 border border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-colors"
                                        >
                                            {isAuthenticating ? '[SIGNING...]' : 'AUTHENTICATE'}
                                        </button>
                                        {authError && (
                                            <span className="text-red-500 text-[10px] uppercase font-mono absolute top-full mt-1 right-0 whitespace-nowrap">
                                                {(authError.includes('Prisma') || authError.includes('database'))
                                                    ? '> [SYSTEM_ERROR]: DATABASE_CONNECTION_FAILED'
                                                    : `> ERR_MSG: ${authError}`}
                                            </span>
                                        )}
                                    </div>
                                ) : (
                                    <div className="font-mono text-[11px] tracking-widest px-4 py-1.5 bg-[rgba(0,255,0,0.1)] text-[#00ff41] border border-[#00ff41]">
                                        [AUTHENTICATED]
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button
                                onClick={() => open()}
                                className="font-mono text-xs tracking-widest px-6 py-2 border border-[#00ff41] text-[#00ff41] bg-transparent hover:bg-[#00ff41] hover:text-black transition-colors"
                            >
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
