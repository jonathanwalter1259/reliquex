'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAccount, useSignMessage, useChainId } from 'wagmi';
import { SiweMessage } from 'siwe';

export default function NavBar() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const [authError, setAuthError] = useState<string | null>(null);

    // Wagmi hooks
    const { address, isConnected } = useAccount();
    const chainId = useChainId();
    const { signMessageAsync } = useSignMessage();

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
                        {isConnected && !isAuthenticated && (
                            <div className="flex flex-col items-end gap-1">
                                <button
                                    onClick={handleAuthenticate}
                                    disabled={isAuthenticating}
                                    className="font-mono text-xs tracking-widest px-4 py-2 border border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-colors"
                                >
                                    {isAuthenticating ? '[SIGNING...]' : 'AUTHENTICATE'}
                                </button>
                                {authError && <span className="text-red-500 text-[10px] uppercase font-mono absolute top-20 right-4">{authError}</span>}
                            </div>
                        )}
                        <appkit-button />
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
