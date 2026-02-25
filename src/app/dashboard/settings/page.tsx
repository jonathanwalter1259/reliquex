'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const profileSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    username: z.string().min(3, 'Username must be at least 3 characters').optional().or(z.literal('')),
    notificationsNewDrops: z.boolean(),
    notificationsSecurity: z.boolean(),
});

type ProfileValues = z.infer<typeof profileSchema>;

export default function SettingsPage() {
    const { address, isConnected } = useAccount();
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm<ProfileValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            notificationsNewDrops: true,
            notificationsSecurity: true,
        }
    });

    const notificationsNewDrops = watch('notificationsNewDrops');
    const notificationsSecurity = watch('notificationsSecurity');

    useEffect(() => {
        const fetchProfile = async () => {
            if (!isConnected || !address) return;
            try {
                const res = await fetch('/api/auth/me');
                if (res.ok) {
                    const data = await res.json();
                    reset({
                        name: data.name || '',
                        email: data.email || '',
                        username: data.username || '',
                        notificationsNewDrops: data.notificationsNewDrops ?? true,
                        notificationsSecurity: data.notificationsSecurity ?? true,
                    });
                }
            } catch (error) {
                console.error('Failed to fetch profile', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProfile();
    }, [isConnected, address, reset]);

    const onSubmit = async (data: ProfileValues) => {
        setIsSubmitting(true);
        setMessage(null);
        try {
            const res = await fetch('/api/auth/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                setMessage({ type: 'success', text: 'SYSTEM_LOG: PROFILE_UPDATED_SUCCESSFULLY' });
                setTimeout(() => setMessage(null), 5000);
            } else {
                const err = await res.json();
                throw new Error(err.error || 'Update failed');
            }
        } catch (err: any) {
            setMessage({ type: 'error', text: `SYSTEM_FAULT: ${err.message}` });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isConnected) {
        return (
            <main className="min-h-screen pt-32 pb-20 flex items-center justify-center">
                <div className="text-[#ff0033] font-mono tracking-[0.2em] animate-pulse">
                    &gt; ERROR: WALLET_DISCONNECTED_ACCESS_DENIED_
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen pt-32 pb-20 bg-black font-mono">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="mb-12 border-b border-[#00ff41]/30 pb-6 relative">
                    <div className="absolute bottom-0 left-0 w-32 h-[1px] bg-[#00ff41] shadow-[0_0_10px_#00ff41]"></div>
                    <h1 className="text-4xl font-black tracking-[0.2em] text-[#fff] uppercase">USER_SETTINGS.</h1>
                    <p className="text-[#00ff41]/60 text-xs tracking-[0.3em] uppercase mt-2">
                        &gt; CONFIGURE_IDENTITY // NOTIFICATION_MATRICES_
                    </p>
                </div>

                {isLoading ? (
                    <div className="py-20 text-center text-[#00ff41]/50 tracking-[0.2em] animate-pulse">
                        &gt; DECRYPTING_USER_PROFILE...
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Sidebar / Info */}
                        <div className="md:col-span-1">
                            <div className="relative border border-[#1a1a1a] bg-[#050505] p-6 mb-6">
                                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00ff41]"></div>
                                <h3 className="text-[#00ff41] text-[10px] font-bold tracking-[0.2em] mb-4 uppercase">// CONNECTED_VAULT_KEY</h3>
                                <div className="text-white text-xs break-all opacity-80 mb-2">
                                    {address}
                                </div>
                                <div className="text-[#666] text-[9px] uppercase tracking-widest">
                                    STATUS: [ENCRYPTED_LIVE]
                                </div>
                            </div>

                            <div className="p-4 border border-[#00ff41]/10 text-[#666] text-[9px] leading-relaxed uppercase tracking-widest">
                                NOTICE: EMAIL VERIFICATION IS REQUIRED FOR SECURITY ALERTS REGARDING HIGH-VALUE ASSET WITHDRAWALS.
                            </div>
                        </div>

                        {/* Form */}
                        <div className="md:col-span-2">
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                                <div className="relative border border-[#1a1a1a] bg-[#050505] p-8">
                                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00ff41]"></div>
                                    <h3 className="text-[#00ff41] text-[10px] font-bold tracking-[0.2em] mb-8 uppercase">// CORE_CREDENTIALS</h3>

                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-[10px] text-[#888] mb-2 tracking-widest uppercase">FULL_NAME_</label>
                                            <input
                                                {...register('name')}
                                                className="w-full bg-black border border-[#222] p-4 text-white text-sm outline-none focus:border-[#00ff41] transition-colors"
                                            />
                                            {errors.name && <p className="text-[#ff0033] text-[9px] mt-1 uppercase">! {errors.name.message}</p>}
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-[10px] text-[#888] mb-2 tracking-widest uppercase">USERNAME_ALIAS</label>
                                                <input
                                                    {...register('username')}
                                                    className="w-full bg-black border border-[#222] p-4 text-white text-sm outline-none focus:border-[#00ff41] transition-colors"
                                                />
                                                {errors.username && <p className="text-[#ff0033] text-[9px] mt-1 uppercase">! {errors.username.message}</p>}
                                            </div>
                                            <div>
                                                <label className="block text-[10px] text-[#888] mb-2 tracking-widest uppercase">COMM_ENDPOINT (EMAIL)</label>
                                                <input
                                                    {...register('email')}
                                                    className="w-full bg-black border border-[#222] p-4 text-white text-sm outline-none focus:border-[#00ff41] transition-colors"
                                                />
                                                {errors.email && <p className="text-[#ff0033] text-[9px] mt-1 uppercase">! {errors.email.message}</p>}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative border border-[#1a1a1a] bg-[#050505] p-8">
                                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00ff41]"></div>
                                    <h3 className="text-[#00ff41] text-[10px] font-bold tracking-[0.2em] mb-8 uppercase">// SIGNAL_PREFERENCES</h3>

                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="text-white text-xs tracking-wider uppercase mb-1">New Vault Drops</h4>
                                                <p className="text-[#666] text-[9px]">NOTIFY WHEN NEW PHYSICAL ASSETS ARE TOKENIZED</p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => setValue('notificationsNewDrops', !notificationsNewDrops)}
                                                className={`w-12 h-6 border transition-colors ${notificationsNewDrops ? 'border-[#00ff41] bg-[#00ff41]/10' : 'border-[#333] bg-transparent'}`}
                                            >
                                                <div className={`w-4 h-4 m-0.5 transition-transform ${notificationsNewDrops ? 'translate-x-6 bg-[#00ff41]' : 'translate-x-0 bg-[#333]'}`} />
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="text-white text-xs tracking-wider uppercase mb-1">Security Alerts</h4>
                                                <p className="text-[#666] text-[9px]">CRITICAL UPDATES ON SMART CONTRACT AUDITS & PROTOCOL CHANGES</p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => setValue('notificationsSecurity', !notificationsSecurity)}
                                                className={`w-12 h-6 border transition-colors ${notificationsSecurity ? 'border-[#00ff41] bg-[#00ff41]/10' : 'border-[#333] bg-transparent'}`}
                                            >
                                                <div className={`w-4 h-4 m-0.5 transition-transform ${notificationsSecurity ? 'translate-x-6 bg-[#00ff41]' : 'translate-x-0 bg-[#333]'}`} />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {message && (
                                    <div className={`p-4 border text-[10px] tracking-widest uppercase ${message.type === 'success' ? 'border-[#00ff41] bg-[#00ff41]/5 text-[#00ff41]' : 'border-[#ff0033] bg-[#ff0033]/5 text-[#ff0033]'}`}>
                                        &gt; {message.text}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full py-4 text-[11px] font-bold tracking-[0.3em] uppercase transition-all duration-300 ${isSubmitting ? 'bg-black text-[#666] border border-[#222]' : 'bg-[#00ff41] text-black hover:bg-white'}`}
                                >
                                    {isSubmitting ? 'SYNCING_WITH_CORE...' : 'COMMIT_CHANGES_'}
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
