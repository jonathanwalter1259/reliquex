'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';

const onboardingSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
});

type OnboardingValues = z.infer<typeof onboardingSchema>;

interface OnboardingModalProps {
    onComplete: (data: OnboardingValues) => Promise<void>;
}

export default function OnboardingModal({ onComplete }: OnboardingModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<OnboardingValues>({
        resolver: zodResolver(onboardingSchema),
    });

    const onSubmit = async (data: OnboardingValues) => {
        setIsSubmitting(true);
        setError(null);
        try {
            await onComplete(data);
        } catch (err: any) {
            setError(err.message || 'Failed to complete onboarding. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            fontFamily: 'var(--font-space-mono, monospace)',
        }}>
            {/* Scanline Effect */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 65, 0.03) 2px, rgba(0, 255, 65, 0.03) 4px)',
                pointerEvents: 'none',
                zIndex: 1,
            }} />

            <div style={{
                width: '100%',
                maxWidth: '500px',
                backgroundColor: '#000',
                border: '1px solid #00ff41',
                padding: '2.5rem',
                position: 'relative',
                zIndex: 2,
                boxShadow: '0 0 30px rgba(0, 255, 65, 0.15)',
            }}>
                {/* HUD Corners */}
                <div style={{ position: 'absolute', top: '-2px', left: '-2px', width: '20px', height: '20px', borderTop: '2px solid #00ff41', borderLeft: '2px solid #00ff41' }} />
                <div style={{ position: 'absolute', top: '-2px', right: '-2px', width: '20px', height: '20px', borderTop: '2px solid #00ff41', borderRight: '2px solid #00ff41' }} />
                <div style={{ position: 'absolute', bottom: '-2px', left: '-2px', width: '20px', height: '20px', borderBottom: '2px solid #00ff41', borderLeft: '2px solid #00ff41' }} />
                <div style={{ position: 'absolute', bottom: '-2px', right: '-2px', width: '20px', height: '20px', borderBottom: '2px solid #00ff41', borderRight: '2px solid #00ff41' }} />

                <div style={{ marginBottom: '2rem' }}>
                    <h2 style={{
                        fontSize: '1.25rem',
                        color: '#00ff41',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        marginBottom: '0.5rem',
                        fontWeight: 700,
                    }}>
                        &gt; INITIALIZING_PROFILE_
                    </h2>
                    <p style={{
                        fontSize: '0.75rem',
                        color: '#666',
                        letterSpacing: '0.05em',
                        lineHeight: 1.6,
                    }}>
                        SYSTEM REQUIRES USER IDENTIFICATION FOR SECURE VAULT ACCESS. PLEASE PROVIDE YOUR CREDENTIALS TO SYNC WITH THE RELIQUEX NETWORK.
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '0.7rem',
                            color: '#00ff41',
                            marginBottom: '0.5rem',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                        }}>
                            [ USERNAME / FULL_NAME ]
                        </label>
                        <input
                            {...register('name')}
                            placeholder="e.g. SATO_NAKAMOTO"
                            style={{
                                width: '100%',
                                backgroundColor: '#050505',
                                border: errors.name ? '1px solid #ff0033' : '1px solid #1a1a1a',
                                padding: '1rem',
                                color: '#fff',
                                fontFamily: 'inherit',
                                fontSize: '0.85rem',
                                outline: 'none',
                                transition: 'border-color 0.2s ease',
                            }}
                            onFocus={(e) => (e.target.style.borderColor = '#00ff41')}
                            onBlur={(e) => (e.target.style.borderColor = errors.name ? '#ff0033' : '#1a1a1a')}
                        />
                        {errors.name && (
                            <span style={{ color: '#ff0033', fontSize: '0.65rem', marginTop: '0.4rem', display: 'block' }}>
                                ! ERROR: {errors.name.message}
                            </span>
                        )}
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '0.7rem',
                            color: '#00ff41',
                            marginBottom: '0.5rem',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                        }}>
                            [ REGISTERED_EMAIL ]
                        </label>
                        <input
                            {...register('email')}
                            placeholder="NETWORK@RELIQUEX.COM"
                            style={{
                                width: '100%',
                                backgroundColor: '#050505',
                                border: errors.email ? '1px solid #ff0033' : '1px solid #1a1a1a',
                                padding: '1rem',
                                color: '#fff',
                                fontFamily: 'inherit',
                                fontSize: '0.85rem',
                                outline: 'none',
                                transition: 'border-color 0.2s ease',
                            }}
                            onFocus={(e) => (e.target.style.borderColor = '#00ff41')}
                            onBlur={(e) => (e.target.style.borderColor = errors.email ? '#ff0033' : '#1a1a1a')}
                        />
                        {errors.email && (
                            <span style={{ color: '#ff0033', fontSize: '0.65rem', marginTop: '0.4rem', display: 'block' }}>
                                ! ERROR: {errors.email.message}
                            </span>
                        )}
                    </div>

                    {error && (
                        <div style={{
                            backgroundColor: 'rgba(255,0,51,0.1)',
                            border: '1px solid rgba(255,0,51,0.3)',
                            padding: '0.75rem',
                            marginBottom: '1.5rem',
                            color: '#ff0033',
                            fontSize: '0.7rem',
                            textTransform: 'uppercase',
                        }}>
                            &gt; [SYSTEM_FAULT]: {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        style={{
                            width: '100%',
                            backgroundColor: '#00ff41',
                            color: '#000',
                            border: 'none',
                            padding: '1.2rem',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            cursor: isSubmitting ? 'wait' : 'pointer',
                            transition: 'all 0.2s ease',
                            opacity: isSubmitting ? 0.7 : 1,
                            boxShadow: '0 0 15px rgba(0, 255, 65, 0.2)',
                        }}
                        onMouseEnter={(e) => {
                            if (!isSubmitting) {
                                e.currentTarget.style.backgroundColor = '#fff';
                                e.currentTarget.style.boxShadow = '0 0 25px rgba(255, 255, 255, 0.3)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!isSubmitting) {
                                e.currentTarget.style.backgroundColor = '#00ff41';
                                e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 255, 65, 0.2)';
                            }
                        }}
                    >
                        {isSubmitting ? 'SYNCING_DATA...' : 'ESTABLISH_CONNECTION'}
                    </button>

                    <p style={{
                        marginTop: '1.5rem',
                        textAlign: 'center',
                        fontSize: '0.6rem',
                        color: '#444',
                        letterSpacing: '0.1em',
                    }}>
                        ID: RELIQUEX_SYS_V1.0 // STATUS: AWAITING_INPUT
                    </p>
                </form>
            </div>
        </div>
    );
}
