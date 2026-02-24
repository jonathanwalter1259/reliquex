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

                {mounted && (
                    <div style={{ marginLeft: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        {isConnected ? (
                            <div className="flex items-center gap-3">
                                {/* Address Display & Dropdown */}
                                <div className="relative">
                                    <button
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className="font-mono text-[11px] border border-[#333] px-3 py-1.5 text-[#fff] bg-[#111] uppercase tracking-wider hover:border-[#00ff41] transition-colors cursor-pointer flex items-center gap-2"
                                    >
                                        <span className="text-[#888]">ID:</span>
                                        {address?.slice(0, 6)}...{address?.slice(-4)}
                                    </button>

                                    {isDropdownOpen && (
                                        <div className="absolute top-full right-0 mt-2 bg-[#000] border border-[#333] min-w-[150px] shadow-[0_0_15px_rgba(0,255,0,0.1)] z-50">
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
                                    <div className="flex flex-col items-end gap-1 relative">
                                        <button
                                            onClick={handleAuthenticate}
                                            disabled={isAuthenticating}
                                            className="font-mono text-[11px] tracking-widest px-4 py-1.5 border border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-colors"
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
