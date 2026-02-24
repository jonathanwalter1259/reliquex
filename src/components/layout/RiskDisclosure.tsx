/**
 * RiskDisclosure — dAppBay Compliance Component
 * Permanent, un-hideable legal disclaimer regarding RWA volatility.
 * Injected into the global layout between {children} and <Footer />.
 */
export default function RiskDisclosure() {
    return (
        <div
            id="risk-disclosure-banner"
            className="w-full bg-[#0a0a0a] border-t border-b border-[#00FF00]/20 py-4 px-6 font-mono text-[10px] tracking-widest uppercase text-center relative overflow-hidden select-none"
        >
            {/* Scanline effect */}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.15)_50%)] bg-[length:100%_3px] pointer-events-none opacity-30"></div>

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 relative z-10">
                <span className="text-red-500 font-bold animate-pulse whitespace-nowrap">
                    ⚠ RISK_DISCLOSURE
                </span>
                <span className="text-[#888] leading-relaxed">
                    ReliqueX tokens represent fractional ownership of authenticated physical assets. Token values may fluctuate.
                    Past performance does not guarantee future results. This is NOT financial advice. Trade at your own risk.
                    All transactions are final and recorded on the BNB Smart Chain.
                </span>
                <span className="text-[#00FF00]/40 whitespace-nowrap hidden md:inline">
                    [DAPPBAY_COMPLIANT]
                </span>
            </div>
        </div>
    );
}
