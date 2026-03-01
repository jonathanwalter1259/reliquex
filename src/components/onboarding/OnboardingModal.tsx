'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState, useEffect } from 'react';
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi';
import { reliqueXAddress, reliqueXABI } from '@/lib/web3/contract';

const onboardingSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
});

type OnboardingValues = z.infer<typeof onboardingSchema>;

interface OnboardingModalProps {
    onComplete: (data: OnboardingValues) => Promise<void>;
    onFinalize: () => void;
}

export default function OnboardingModal({ onComplete, onFinalize }: OnboardingModalProps) {
    const [step, setStep] = useState<'profile' | 'blockchain'>('profile');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { address } = useAccount();

    const { writeContract, data: hash, isPending: isTxPending, error: txError } = useWriteContract();
    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
    });

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
            setStep('blockchain');
        } catch (err: any) {
            setError(err.message || 'Failed to complete profile setup.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleRegisterOnChain = () => {
        setError(null);
        writeContract({
            address: reliqueXAddress,
            abi: reliqueXABI,
            functionName: 'registerUser',
        });
    };

    const displayError = error || txError?.message;

    // If registration is confirmed, we are done
    useEffect(() => {
        if (isConfirmed) {
            const timer = setTimeout(() => {
                onFinalize();
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [isConfirmed, onFinalize]);

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
                        &gt; {step === 'profile' ? 'INITIALIZING_PROFILE_' : 'ON-CHAIN_ACTIVATION_'}
                    </h2>
                    <p style={{
                        fontSize: '0.75rem',
                        color: '#666',
                        letterSpacing: '0.05em',
                        lineHeight: 1.6,
                    }}>
                        {step === 'profile'
                            ? 'SYSTEM REQUIRES USER IDENTIFICATION FOR SECURE VAULT ACCESS. PLEASE PROVIDE YOUR CREDENTIALS TO SYNC WITH THE RELIQUEX NETWORK.'
                            : 'TO SECURE YOUR IDENTITY ON THE RELIQUEX NETWORK AND ENABLE SMART-CONTRACT GOVERNANCE, YOU MUST ACTIVATE YOUR WALLET ON-CHAIN.'}
                    </p>
                </div>

                {step === 'profile' ? (
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

                        {displayError && (
                            <div style={{
                                backgroundColor: 'rgba(255,0,51,0.1)',
                                border: '1px solid rgba(255,0,51,0.3)',
                                padding: '0.75rem',
                                marginBottom: '1.5rem',
                                color: '#ff0033',
                                fontSize: '0.6rem',
                                textTransform: 'uppercase',
                                wordBreak: 'break-all',
                            }}>
                                &gt; [SYSTEM_FAULT]: {displayError}
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
                    </form>
                ) : (
                    <div>
                        <div style={{
                            backgroundColor: '#050505',
                            border: '1px solid #1a1a1a',
                            padding: '1rem',
                            fontSize: '0.65rem',
                            color: '#666',
                            marginBottom: '1.5rem',
                        }}>
                            &gt; WALLET: {address?.slice(0, 6)}...{address?.slice(-4)}<br />
                            &gt; PROTOCOL: ReliqueX_V1<br />
                            &gt; STATUS: {isConfirmed ? 'ACTIVATED' : isConfirming ? 'SYNCING_BLOCKS...' : isTxPending ? 'AWAITING_SIGNATURE...' : 'PENDING_REGISTRATION'}
                        </div>

                        {displayError && (
                            <div style={{
                                backgroundColor: 'rgba(255,0,51,0.1)',
                                border: '1px solid rgba(255,0,51,0.3)',
                                padding: '0.75rem',
                                marginBottom: '1.5rem',
                                color: '#ff0033',
                                fontSize: '0.6rem',
                                textTransform: 'uppercase',
                                wordBreak: 'break-all',
                            }}>
                                &gt; [BLOCKCHAIN_ERROR]: {displayError}
                            </div>
                        )}


                        {!isConfirmed && (
                            <button
                                onClick={handleRegisterOnChain}
                                disabled={isTxPending || isConfirming}
                                style={{
                                    width: '100%',
                                    backgroundColor: isTxPending || isConfirming ? '#1a1a1a' : '#00ff41',
                                    color: isTxPending || isConfirming ? '#444' : '#000',
                                    border: 'none',
                                    padding: '1.2rem',
                                    fontSize: '0.8rem',
                                    fontWeight: 700,
                                    letterSpacing: '0.2em',
                                    textTransform: 'uppercase',
                                    cursor: isTxPending || isConfirming ? 'wait' : 'pointer',
                                    transition: 'all 0.2s ease',
                                    boxShadow: isTxPending || isConfirming ? 'none' : '0 0 15px rgba(0, 255, 65, 0.2)',
                                }}
                            >
                                {isConfirming ? 'SYNCING_BLOCKS...' : isTxPending ? 'AWAITING_SIGNATURE...' : 'ACTIVATE_ON_CHAIN'}
                            </button>
                        )}

                        {isConfirmed && (
                            <div style={{
                                textAlign: 'center',
                                padding: '1.2rem',
                                border: '1px solid #00ff41',
                                color: '#00ff41',
                                fontSize: '0.8rem',
                                letterSpacing: '0.1em',
                            }}>
                                &gt; CONNECTION_ESTABLISHED. RELOADING...
                            </div>
                        )}
                    </div>
                )}

                <p style={{
                    marginTop: '1.5rem',
                    textAlign: 'center',
                    fontSize: '0.6rem',
                    color: '#444',
                    letterSpacing: '0.1em',
                }}>
                    ID: RELIQUEX_SYS_V1.0 // STATUS: {step === 'profile' ? 'AWAITING_INPUT' : 'BLOCKCHAIN_SYNC'}
                </p>
            </div>
        </div>
    );
}
