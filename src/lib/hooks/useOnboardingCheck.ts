'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';

export function useOnboardingCheck() {
    const { isConnected, address } = useAccount();
    const [isOnboardingRequired, setIsOnboardingRequired] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState<any>(null);

    const checkOnboarding = async () => {
        if (!isConnected || !address) {
            setIsOnboardingRequired(false);
            setIsLoading(false);
            return;
        }

        try {
            const res = await fetch('/api/auth/me');
            if (res.ok) {
                const data = await res.json();
                setUserData(data);

                // If data.walletAddress exists and data.onboardingCompleted is false, result is true
                // If no user record exists in DB, me route returns { address, role, onboardingCompleted: false }
                if (data.walletAddress && data.onboardingCompleted === false) {
                    setIsOnboardingRequired(true);
                } else {
                    setIsOnboardingRequired(false);
                }
            } else {
                // Not authenticated via SIWE yet or backend error
                setIsOnboardingRequired(false);
            }
        } catch (error) {
            console.error('Onboarding check failed:', error);
            setIsOnboardingRequired(false);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkOnboarding();
    }, [isConnected, address]);

    const refreshOnboarding = () => {
        checkOnboarding();
    };

    return {
        isOnboardingRequired,
        isLoading,
        userData,
        refreshOnboarding
    };
}
