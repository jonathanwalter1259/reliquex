'use client';

import { useOnboardingCheck } from '@/lib/hooks/useOnboardingCheck';
import OnboardingModal from '@/components/onboarding/OnboardingModal';
import { ReactNode } from 'react';

export function OnboardingProvider({ children }: { children: ReactNode }) {
    const { isOnboardingRequired, refreshOnboarding } = useOnboardingCheck();

    const handleComplete = async (data: { name: string; email: string }) => {
        const res = await fetch('/api/auth/profile', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...data,
                onboardingCompleted: true,
            }),
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.error || 'Failed to save profile');
        }
        // NOTE: We do NOT call refreshOnboarding() here anymore.
        // We wait for the modal to call onFinalize after the blockchain step.
    };

    const handleFinalize = () => {
        refreshOnboarding();
    };

    return (
        <>
            {isOnboardingRequired && (
                <OnboardingModal onComplete={handleComplete} onFinalize={handleFinalize} />
            )}
            {children}
        </>
    );
}
