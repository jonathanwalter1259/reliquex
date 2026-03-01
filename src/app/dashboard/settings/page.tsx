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

    const [isAuthRequired, setIsAuthRequired] = useState(false);

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
                    setIsAuthRequired(false);
                } else if (res.status === 401) {
                    setIsAuthRequired(true);
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
            <main className="flex-1 pb-20 flex items-center justify-center">
                <div className="text-[#ff0033] font-mono tracking-[0.2em] animate-pulse">
                    &gt; ERROR: WALLET_DISCONNECTED_ACCESS_DENIED_
                </div>
            </main>
        );
    }

    return (
        <main className="flex-1 pb-20 bg-black font-mono">
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
                ) : isAuthRequired ? (
                    <div className="py-20 border border-[#ff0033]/20 bg-[#ff0033]/5 p-12 text-center relative group">
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#ff0033]"></div>
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#ff0033]"></div>

                        <h2 className="text-[#ff0033] text-xl font-black tracking-[0.4em] mb-6 uppercase">
                            AUTHENTICATION_REQUIRED_
                        </h2>
                        <p className="text-[#ff0033]/60 text-xs tracking-[0.2em] uppercase max-w-md mx-auto leading-loose mb-10">
                            VAULT ACCESS IS RESTRICTED TO VERIFIED SIGNATURE HOLDERS. PLEASE USE THE [AUTHENTICATE] COMMAND IN THE NAVIGATION TERMINAL TO INITIALIZE YOUR SESSION.
                        </p>

                        <div className="flex justify-center">
                            <div className="w-16 h-[1px] bg-[#ff0033]/30 animate-pulse"></div>
                        </div>
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
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
                                {/* Core Credentials Section */}
                                <div className="relative border border-[#00ff41]/20 bg-black/40 backdrop-blur-sm p-8 group transition-all duration-500 hover:border-[#00ff41]/40">
                                    <div className="absolute top-[-1px] left-[-1px] w-4 h-4 border-t-2 border-l-2 border-[#00ff41]"></div>
                                    <div className="absolute top-[-1px] right-[-1px] w-4 h-4 border-t-2 border-r-2 border-[#00ff41]/30"></div>
                                    <div className="absolute bottom-[-1px] left-[-1px] w-4 h-4 border-b-2 border-l-2 border-[#00ff41]/30"></div>
                                    <div className="absolute bottom-[-1px] right-[-1px] w-4 h-4 border-b-2 border-r-2 border-[#00ff41]/10"></div>

                                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.02)_1px,transparent_1px)] bg-[length:100%_3px] pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity"></div>

                                    <h3 className="text-[#00ff41] text-[11px] font-black tracking-[0.4em] mb-10 uppercase flex items-center gap-3">
                                        <span className="w-2 h-2 bg-[#00ff41] animate-pulse"></span>
                                        CORE_CREDENTIALS_
                                    </h3>

                                    <div className="space-y-8">
                                        <div className="relative">
                                            <label className="block text-[9px] text-[#555] mb-3 tracking-[0.2em] font-bold uppercase transition-colors group-hover:text-[#888]">
                                                [01] FULL_IDENTITY_NAME
                                            </label>
                                            <div className="relative">
                                                <input
                                                    {...register('name')}
                                                    className="w-full bg-[#080808] border border-[#1a1a1a] p-4 text-white text-sm font-mono tracking-wider outline-none focus:border-[#00ff41] focus:bg-[#0a110a] transition-all duration-300 relative z-10"
                                                />
                                                <div className="absolute inset-x-0 bottom-0 h-[1px] bg-[#00ff41]/20 scale-x-0 transition-transform duration-500 origin-left group-focus-within:scale-x-100"></div>
                                            </div>
                                            {errors.name && <p className="text-[#ff0033] text-[9px] mt-2 font-bold tracking-tighter uppercase italic">! ACCESS_FAULT: {errors.name.message}</p>}
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div>
                                                <label className="block text-[9px] text-[#555] mb-3 tracking-[0.2em] font-bold uppercase transition-colors group-hover:text-[#888]">
                                                    [02] NET_ALIAS_
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        {...register('username')}
                                                        className="w-full bg-[#080808] border border-[#1a1a1a] p-4 text-white text-sm font-mono tracking-wider outline-none focus:border-[#00ff41] focus:bg-[#0a110a] transition-all duration-300"
                                                    />
                                                </div>
                                                {errors.username && <p className="text-[#ff0033] text-[9px] mt-2 font-bold tracking-tighter uppercase italic">! ACCESS_FAULT: {errors.username.message}</p>}
                                            </div>
                                            <div>
                                                <label className="block text-[9px] text-[#555] mb-3 tracking-[0.2em] font-bold uppercase transition-colors group-hover:text-[#888]">
                                                    [03] COMM_LINK_
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        {...register('email')}
                                                        className="w-full bg-[#080808] border border-[#1a1a1a] p-4 text-white text-sm font-mono tracking-wider outline-none focus:border-[#00ff41] focus:bg-[#0a110a] transition-all duration-300"
                                                    />
                                                </div>
                                                {errors.email && <p className="text-[#ff0033] text-[9px] mt-2 font-bold tracking-tighter uppercase italic">! ACCESS_FAULT: {errors.email.message}</p>}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Signal Preferences Section */}
                                <div className="relative border border-[#00ff41]/20 bg-black/40 backdrop-blur-sm p-8 group transition-all duration-500 hover:border-[#00ff41]/40">
                                    <div className="absolute top-[-1px] left-[-1px] w-4 h-4 border-t-2 border-l-2 border-[#00ff41]/30"></div>
                                    <div className="absolute bottom-[-1px] right-[-1px] w-4 h-4 border-b-2 border-r-2 border-[#00ff41]"></div>

                                    <h3 className="text-[#00ff41] text-[11px] font-black tracking-[0.4em] mb-10 uppercase flex items-center gap-3">
                                        <span className="w-2 h-2 bg-[#00ff41]/50 border border-[#00ff41]"></span>
                                        SIGNAL_PREFERENCES_
                                    </h3>

                                    <div className="space-y-8">
                                        <div className="flex items-center justify-between p-4 border border-transparent hover:border-[#00ff41]/10 transition-colors">
                                            <div>
                                                <h4 className="text-[#fff] text-[10px] font-bold tracking-[0.2em] uppercase mb-1 flex items-center gap-2">
                                                    NEW_VAULT_DROPS
                                                    {notificationsNewDrops && <span className="text-[#00ff41] text-[8px]">[ACTIVE]</span>}
                                                </h4>
                                                <p className="text-[#666] text-[8px] tracking-[0.1em] uppercase">MONITOR_PHYSICAL_ASSET_MINTING_FLOW</p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => setValue('notificationsNewDrops', !notificationsNewDrops)}
                                                className={`w-14 h-7 border p-1 transition-all duration-500 ${notificationsNewDrops ? 'border-[#00ff41] shadow-[0_0_15px_rgba(0,255,65,0.1)]' : 'border-[#222]'}`}
                                            >
                                                <div className={`h-full w-1/2 transition-all duration-500 shadow-sm ${notificationsNewDrops ? 'translate-x-full bg-[#00ff41]' : 'translate-x-0 bg-[#222]'}`} />
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-between p-4 border border-transparent hover:border-[#00ff41]/10 transition-colors">
                                            <div>
                                                <h4 className="text-[#fff] text-[10px] font-bold tracking-[0.2em] uppercase mb-1 flex items-center gap-2">
                                                    SECURITY_ALERTS
                                                    {notificationsSecurity && <span className="text-[#00ff41] text-[8px]">[ACTIVE]</span>}
                                                </h4>
                                                <p className="text-[#666] text-[8px] tracking-[0.1em] uppercase">PROTOCOL_AUDITS_&_SMART_CONTRACT_VITALITY</p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => setValue('notificationsSecurity', !notificationsSecurity)}
                                                className={`w-14 h-7 border p-1 transition-all duration-500 ${notificationsSecurity ? 'border-[#00ff41] shadow-[0_0_15px_rgba(0,255,65,0.1)]' : 'border-[#222]'}`}
                                            >
                                                <div className={`h-full w-1/2 transition-all duration-500 shadow-sm ${notificationsSecurity ? 'translate-x-full bg-[#00ff41]' : 'translate-x-0 bg-[#222]'}`} />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {message && (
                                    <div className={`relative p-5 border text-[10px] font-bold tracking-[0.3em] uppercase overflow-hidden ${message.type === 'success' ? 'border-[#00ff41] bg-[#00ff41]/5 text-[#00ff41]' : 'border-[#ff0033] bg-[#ff0033]/5 text-[#ff0033]'}`}>
                                        <div className={`absolute top-0 left-0 w-1 h-full ${message.type === 'success' ? 'bg-[#00ff41]' : 'bg-[#ff0033]'}`}></div>
                                        <span className="flex items-center gap-3">
                                            <span className={`${message.type === 'success' ? 'text-[#00ff41]' : 'text-[#ff0033]'} animate-pulse`}>&gt;&gt;</span>
                                            {message.text}
                                        </span>
                                    </div>
                                )}

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`group relative w-full overflow-hidden py-5 text-[11px] font-black tracking-[0.5em] uppercase transition-all duration-500 border ${isSubmitting
                                            ? 'bg-black text-[#444] border-[#222] cursor-wait'
                                            : 'bg-[#00ff41] text-black border-[#00ff41] hover:bg-black hover:text-[#00ff41] hover:shadow-[0_0_30px_rgba(0,255,65,0.3)] shadow-[0_0_15px_rgba(0,255,65,0.1)] active:scale-[0.98]'
                                            }`}
                                    >
                                        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-white/20 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
                                        {isSubmitting ? (
                                            <span className="flex items-center justify-center gap-3">
                                                <span className="animate-spin h-3 w-3 border-2 border-[#444] border-t-transparent rounded-full font-mono"></span>
                                                SYNCING_WITH_DISTRIBUTED_CORE...
                                            </span>
                                        ) : (
                                            'COMMIT_PROFILE_MODS_'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
