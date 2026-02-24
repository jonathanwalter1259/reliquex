'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

export default function NavBar() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Wagmi hooks
    const { address, isConnected } = useAccount();
    const { connectors, connect } = useConnect();
    const { disconnect } = useDisconnect();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 80);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Check initial scroll position
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleConnectClick = () => {
        if (isConnected) {
            disconnect();
        } else {
            // Pick first available connector (usually injected/MetaMask)
            const connector = connectors[0];
            if (connector) {
                connect({ connector });
            }
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
                    <Link href="/submit" className={`nav-link ${pathname === '/submit' ? 'active' : ''}`}>SUBMIT ASSET</Link>
                    <Link href="/whitepaper" className={`nav-link ${pathname === '/whitepaper' ? 'active' : ''}`}>WHITEPAPER</Link>
                    <Link href="/dashboard" className={`nav-link ${pathname === '/dashboard' ? 'active' : ''}`}>DASHBOARD</Link>
                </div>

                <button className="btn-connect" id="connectWallet" onClick={handleConnectClick}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                        <line x1="1" y1="10" x2="23" y2="10" />
                    </svg>
                    {isConnected && address ? `${address.substring(0, 6)}...${address.slice(-4)}` : 'Connect Wallet'}
                </button>

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
