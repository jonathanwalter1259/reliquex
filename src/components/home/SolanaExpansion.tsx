'use client';

import React from 'react';

export default function SolanaExpansion() {
    return (
        <section className="solana-expansion py-24 relative overflow-hidden bg-black border-y border-[#111]">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#9945FF] to-transparent"></div>
                <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#00FF41] to-transparent"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Visual Element: Stylized Solana Wireframe */}
                    <div className="w-full lg:w-1/2 flex justify-center">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-[#9945FF]/20 blur-[100px] rounded-full group-hover:bg-[#9945FF]/30 transition-all duration-700"></div>
                            <svg
                                viewBox="0 0 400 400"
                                className="w-64 h-64 lg:w-80 lg:h-80 relative z-10"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {/* Solana Abstract Wireframe Logo */}
                                <path
                                    d="M100 120 L300 120 L260 160 L60 160 Z"
                                    fill="url(#solana-gradient)"
                                    className="animate-pulse"
                                />
                                <path
                                    d="M100 180 L300 180 L260 220 L60 220 Z"
                                    fill="url(#solana-gradient)"
                                    style={{ animationDelay: '0.2s' }}
                                    className="animate-pulse"
                                />
                                <path
                                    d="M100 240 L300 240 L260 280 L60 280 Z"
                                    fill="url(#solana-gradient)"
                                    style={{ animationDelay: '0.4s' }}
                                    className="animate-pulse"
                                />

                                {/* HUD Intersections */}
                                <circle cx="100" cy="120" r="2" fill="#00FF41" />
                                <circle cx="300" cy="120" r="2" fill="#00FF41" />
                                <circle cx="260" cy="160" r="2" fill="#00FF41" />
                                <circle cx="60" cy="160" r="2" fill="#00FF41" />

                                <defs>
                                    <linearGradient id="solana-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#9945FF" />
                                        <stop offset="100%" stopColor="#14F195" />
                                    </linearGradient>
                                </defs>
                            </svg>

                            {/* Floating terminal data bits */}
                            <div className="absolute top-0 right-0 font-mono text-[10px] text-[#9945FF] animate-terminal-pulse">
                                [ SVM_EMULATOR: ACTIVE ]
                            </div>
                            <div className="absolute bottom-0 left-0 font-mono text-[10px] text-[#00FF41] animate-terminal-pulse">
                                [ LATENCY: 400MS ]
                            </div>
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="w-full lg:w-1/2">
                        <div className="inline-block border border-[#9945FF] text-[#9945FF] font-mono text-xs px-3 py-1 mb-6 animate-solana-pulse uppercase tracking-[0.2em]">
                            System Upgrade In Progress
                        </div>

                        <h2 className="text-3xl lg:text-5xl font-black text-white mb-6 uppercase tracking-tighter leading-none">
                            [ SYSTEM UPGRADE: <span className="text-solana">SOLANA SVM</span> EXPANSION ]
                        </h2>

                        <p className="font-mono text-sm lg:text-base text-[#888] mb-10 leading-relaxed max-w-xl">
                            High-frequency luxury demands high-frequency infrastructure. ReliqueX is bringing institutional-grade RWA fractionalization to the Solana network. Ultra-low latency, micro-cent gas fees, and seamless liquidity.
                        </p>

                        {/* Deployment Progress Bar */}
                        <div className="max-w-md">
                            <div className="flex justify-between items-end mb-2 font-mono text-xs">
                                <span className="text-[#00FF41] uppercase tracking-widest animate-pulse">
                                    &gt; Deploying Protocol...
                                </span>
                                <span className="text-[#9945FF]">89%</span>
                            </div>
                            <div className="h-1 w-full bg-[#111] relative">
                                <div
                                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#9945FF] to-[#00FF41]"
                                    style={{ width: '89%' }}
                                >
                                    <div className="absolute right-0 top-0 h-full w-4 bg-white blur-sm"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
