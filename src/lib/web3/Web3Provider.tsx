'use client';

import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { createAppKit } from '@reown/appkit/react';
import { bsc, type AppKitNetwork } from '@reown/appkit/networks';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';

// Note: In production this should be in .env
const projectId = 'b56e18d47c72ab683b10817fe94163fd'; // Public tutorial Project ID

const networks: [AppKitNetwork, ...AppKitNetwork[]] = [bsc];

export const wagmiAdapter = new WagmiAdapter({
    networks,
    projectId
})

// Create modal instance
createAppKit({
    adapters: [wagmiAdapter],
    projectId,
    networks,
    features: {
        analytics: false
    },
    themeMode: 'dark',
    themeVariables: {
        '--w3m-accent': '#00ff41',
        '--w3m-border-radius-master': '0px',
        '--w3m-font-family': 'var(--font-space-mono)'
    }
});

export function Web3Provider({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <WagmiProvider config={wagmiAdapter.wagmiConfig}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </WagmiProvider>
    );
}
