'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAccount, useSignMessage } from 'wagmi';

export default function NavBar() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAuthenticating, setIsAuthenticating] = useState(false);

    // Wagmi hooks
    const { address, isConnected } = useAccount();
    const { signMessageAsync } = useSignMessage();

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => setIsScrolled(window.scrollY > 80);
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const checkAuth = async () => {
            if (isConnected && address && !isAuthenticated && !isAuthenticating) {
                setIsAuthenticating(true);
                try {
                    // 1. Check if session already active for this address
                    const meRes = await fetch('/api/auth/me');
                    if (meRes.ok) {
                        const meData = await meRes.json();
                        if (meData.walletAddress === address.toLowerCase()) {
                            setIsAuthenticated(true);
                            setIsAuthenticating(false);
                            return;
                        }
                    }

                    // 2. If not, trigger SIWE flow
                    const nonceRes = await fetch('/api/auth/nonce');
                    const nonce = await nonceRes.text();

                    const domain = window.location.host;
                    const origin = window.location.origin;

                    const message = `${domain} wants you to sign in with your Ethereum account:\n${address}\n\nSign in to securely authenticate your wallet for the ReliqueX protocol.\n\nURI: ${origin}\nVersion: 1\nChain ID: 56\nNonce: ${nonce}\nIssued At: ${new Date().toISOString()}`;

                    const signature = await signMessageAsync({ message });

                    const verifyRes = await fetch('/api/auth/verify', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ message, signature })
                    });

                    if (verifyRes.ok) {
                        setIsAuthenticated(true);
                    }
                } catch (error) {
                    console.error("SIWE Authentication failed:", error);
                } finally {
                    setIsAuthenticating(false);
                }
            } else if (!isConnected && isAuthenticated) {
                setIsAuthenticated(false);
                fetch('/api/auth/me', { method: 'DELETE' }).catch(console.error);
            }
        };

        checkAuth();
    }, [isConnected, address, isAuthenticated, signMessageAsync, isAuthenticating]);

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
                        {isAuthenticating && <span className="text-[#00ff41] text-xs font-mono animate-pulse uppercase tracking-widest">[AWAITING_SIG]</span>}
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
