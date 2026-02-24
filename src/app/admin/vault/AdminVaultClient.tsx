'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Asset } from '@prisma/client';
import { supabase } from '@/lib/supabaseClient';

export type SerializedAsset = Omit<Asset, 'createdAt' | 'updatedAt'> & {
    createdAt: string | Date;
    updatedAt: string | Date;
};

export default function AdminVaultClient({ initialAssets }: { initialAssets: SerializedAsset[] }) {
    const router = useRouter();
    const [assets, setAssets] = useState<SerializedAsset[]>(initialAssets);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentAsset, setCurrentAsset] = useState<Partial<SerializedAsset>>({});
    const [systemLog, setSystemLog] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const openModal = (asset?: SerializedAsset) => {
        if (asset) {
            setIsEditMode(true);
            setCurrentAsset(asset);
        } else {
            setIsEditMode(false);
            setCurrentAsset({ category: 'WATCHES', status: 'AUTHENTICATED' });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentAsset({});
    };

    const triggerLog = (msg: string) => {
        setSystemLog(`> SYSTEM_LOG: ${msg}`);
        setTimeout(() => setSystemLog(null), 5000);
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        triggerLog('UPLOADING_IMAGE_TO_STORAGE...');

        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
            const filePath = `assets/${fileName}`;

            const { error: uploadError, data } = await supabase.storage
                .from('assets')
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            const { data: publicUrlData } = supabase.storage
                .from('assets')
                .getPublicUrl(filePath);

            setCurrentAsset({ ...currentAsset, imagePath: publicUrlData.publicUrl });
            triggerLog('IMAGE_UPLOAD_SUCCESSFUL');
        } catch (error: any) {
            console.error('Error uploading image:', error);
            alert(`File upload failed: ${error.message}`);
        } finally {
            setIsUploading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        const endpoint = isEditMode ? `/api/vault/${currentAsset.id}` : '/api/vault';
        const method = isEditMode ? 'PUT' : 'POST';

        // Provide a dummy wallet address for the admin creating the asset
        const payload = { ...currentAsset, walletAddress: '0xADMIN_WALLET' };

        try {
            const res = await fetch(endpoint, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const data = await res.json();

            if (data.success) {
                if (isEditMode) {
                    setAssets(assets.map(a => a.id === data.asset.id ? data.asset : a));
                    triggerLog(`ASSET_${data.asset.id}_UPDATED_SUCCESSFULLY`);
                } else {
                    setAssets([data.asset, ...assets]);
                    triggerLog(`NEW_ASSET_REGISTERED_SUCCESSFULLY`);
                }
                closeModal();
                router.refresh();
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsSaving(false);
        }
    };


    const handleDelete = async (id: string) => {
        const confirmPurge = window.prompt(`CRITICAL WARNING:\nYou are about to permanently delete this asset from the ReliqueX protocol and marketplace.\n\nType "PURGE_ASSET" to confirm deletion of ID: ${id}`);

        if (confirmPurge === "PURGE_ASSET") {
            try {
                const res = await fetch(`/api/vault/${id}`, { method: 'DELETE' });
                const data = await res.json();
                if (data.success) {
                    setAssets(assets.filter(a => a.id !== id));
                    triggerLog(`ASSET_${id}_DELETED_SUCCESSFULLY`);
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    if (!mounted) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <span className="text-[#00ff41] font-mono text-sm tracking-widest animate-pulse">
                    &gt; INITIATING_SECURE_VAULT_CONNECTION...
                </span>
            </div>
        );
    }

    return (
        <div className="vault-manager relative pt-16 md:pt-24 pb-24 text-[#00ff41] selection:bg-[#00ff41] selection:text-black">
            {/* Global CRT & Glow Styles */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .crt-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%);
                    background-size: 100% 3px;
                    pointer-events: none;
                    z-index: 9999;
                    opacity: 0.15;
                }
                .text-glow {
                    text-shadow: 0 0 10px rgba(0, 255, 65, 0.8), 0 0 20px rgba(0, 255, 65, 0.4);
                }
                .box-glow {
                    box-shadow: 0 0 30px rgba(0, 255, 65, 0.1), inset 0 0 20px rgba(0, 255, 65, 0.05);
                }
                .input-glow:focus {
                    box-shadow: 0 0 15px rgba(0, 255, 65, 0.4), inset 0 0 10px rgba(0, 255, 65, 0.1);
                    border-color: #00ff41;
                }
                .hud-border {
                    background: linear-gradient(90deg, #00ff41 50%, transparent 50%), linear-gradient(90deg, #00ff41 50%, transparent 50%), linear-gradient(0deg, #00ff41 50%, transparent 50%), linear-gradient(0deg, #00ff41 50%, transparent 50%);
                    background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
                    background-size: 15px 2px, 15px 2px, 2px 15px, 2px 15px;
                    background-position: left top, right bottom, left bottom, right top;
                    animation: border-dance 4s infinite linear;
                }
                @keyframes border-dance {
                    0% { background-position: left top, right bottom, left bottom, right top; }
                    100% { background-position: left 15px top, right 15px bottom, left bottom 15px, right top 15px; }
                }
            `}} />

            <div className="crt-overlay"></div>

            {systemLog && (
                <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-black/90 backdrop-blur-md border-l-4 border-r-4 border-[#00ff41] text-[#00ff41] font-mono px-8 py-4 z-50 animate-[pulse_2s_infinite] shadow-[0_0_40px_rgba(0,255,65,0.4)] tracking-widest text-sm uppercase">
                    {systemLog}
                </div>
            )}

            <div className="max-w-[90rem] mx-auto px-6 relative z-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-[#00ff41]/30 pb-6 relative">
                    <div className="absolute bottom-0 left-0 w-32 h-[1px] bg-[#00ff41] shadow-[0_0_10px_#00ff41]"></div>
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-[0.2em] mb-2 text-glow">
                            NEXUS_VAULT
                        </h1>
                        <h2 className="text-[#00ff41]/60 font-mono text-sm tracking-[0.3em] uppercase flex items-center gap-3">
                            <span className="w-2 h-2 bg-[#00ff41] animate-pulse"></span>
                            ACTIVE DIRECTORY :: {assets.length} PROTOCOLS ENCRYPTED
                        </h2>
                    </div>
                    <button
                        onClick={() => openModal()}
                        className="mt-6 md:mt-0 relative group bg-[#00ff41]/10 border border-[#00ff41] px-8 py-3 overflow-hidden transition-all duration-300 hover:bg-[#00ff41] hover:shadow-[0_0_30px_rgba(0,255,65,0.6)]"
                    >
                        <span className="font-mono tracking-[0.2em] font-bold text-[#00ff41] group-hover:text-black relative z-10 block transition-colors duration-300">
                            + INITIALIZE_ASSET
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite]"></div>
                    </button>
                </div>

                {/* Data Grid Section */}
                <div className="relative box-glow bg-black/40 backdrop-blur-xl border border-[#00ff41]/20">
                    {/* Corner accents */}
                    <div className="absolute -top-[1px] -left-[1px] w-8 h-8 border-t-2 border-l-2 border-[#00ff41]"></div>
                    <div className="absolute -top-[1px] -right-[1px] w-8 h-8 border-t-2 border-r-2 border-[#00ff41]"></div>
                    <div className="absolute -bottom-[1px] -left-[1px] w-8 h-8 border-b-2 border-l-2 border-[#00ff41]"></div>
                    <div className="absolute -bottom-[1px] -right-[1px] w-8 h-8 border-b-2 border-r-2 border-[#00ff41]"></div>

                    <div className="overflow-x-auto p-1">
                        <table className="w-full text-left font-mono text-sm border-collapse uppercase">
                            <thead>
                                <tr className="bg-[#00ff41]/5 border-b-2 border-[#00ff41]/50">
                                    <th className="p-6 font-bold tracking-[0.2em] text-[#00ff41] text-xs">SYS_ID</th>
                                    <th className="p-6 font-bold tracking-[0.2em] text-[#00ff41] text-xs">NEXUS_DESIGNATION</th>
                                    <th className="p-6 font-bold tracking-[0.2em] text-[#00ff41] text-xs">CLASS</th>
                                    <th className="p-6 font-bold tracking-[0.2em] text-[#00ff41] text-xs">VALUATION</th>
                                    <th className="p-6 font-bold tracking-[0.2em] text-[#00ff41] text-xs text-right">OVERRIDE</th>
                                </tr>
                            </thead>
                            <tbody className="text-[#eee]">
                                {assets.map((asset) => (
                                    <tr key={asset.id} className="border-b border-[#00ff41]/10 hover:bg-gradient-to-r hover:from-[#00ff41]/10 hover:to-transparent transition-all duration-200 group">
                                        <td className="p-6 text-[#00ff41]/50 text-xs w-40 truncate">
                                            {asset.id.slice(0, 8)}...
                                        </td>
                                        <td className="p-6">
                                            <div className="flex items-center gap-4">
                                                {asset.imagePath ? (
                                                    <img src={asset.imagePath} alt="Asset" className="w-12 h-12 object-cover border border-[#00ff41]/30 group-hover:border-[#00ff41] transition-colors" />
                                                ) : (
                                                    <div className="w-12 h-12 bg-black border border-[#00ff41]/20 flex items-center justify-center text-[8px] text-[#00ff41]/40">NO_IMG</div>
                                                )}
                                                <span className="font-bold tracking-wider group-hover:text-glow transition-all">{asset.name}</span>
                                            </div>
                                        </td>
                                        <td className="p-6 tracking-widest text-xs">
                                            <span className="px-3 py-1 border border-[#00ff41]/30 bg-[#00ff41]/5 text-[#00ff41]">
                                                {asset.category}
                                            </span>
                                        </td>
                                        <td className="p-6 tracking-wider">
                                            {asset.pricePerShare ? <span className="text-white">${asset.pricePerShare.toFixed(2)}</span> : <span className="text-[#00ff41]/40">UNPRICED</span>}
                                        </td>
                                        <td className="p-6 text-right space-x-4">
                                            <button
                                                onClick={() => openModal(asset)}
                                                className="text-[#00ff41]/70 hover:text-white hover:text-glow transition-all tracking-[0.1em] text-xs relative before:content-['['] after:content-[']'] hover:before:text-[#00ff41] hover:after:text-[#00ff41] before:mr-1 after:ml-1 before:transition-colors after:transition-colors"
                                            >
                                                EDIT
                                            </button>
                                            <button
                                                onClick={() => handleDelete(asset.id)}
                                                className="text-red-500/70 hover:text-red-400 hover:drop-shadow-[0_0_8px_rgba(255,0,0,0.8)] transition-all tracking-[0.1em] text-xs relative before:content-['['] after:content-[']'] hover:before:text-red-500 hover:after:text-red-500 before:mr-1 after:ml-1 before:transition-colors after:transition-colors"
                                            >
                                                PURGE
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {assets.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="p-8 md:p-16">
                                            <div className="relative border border-[#00ff41]/30 bg-[#00ff41]/5 backdrop-blur-md p-12 text-center flex flex-col items-center justify-center space-y-6 group hover:bg-[#00ff41]/10 transition-colors duration-500 overflow-hidden">
                                                {/* Scanline overlay for empty state */}
                                                <div className="absolute inset-0 w-full h-full bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-50"></div>

                                                {/* HUD crosshairs inside the empty box */}
                                                <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[#00ff41]"></div>
                                                <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[#00ff41]"></div>
                                                <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-[#00ff41]"></div>
                                                <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[#00ff41]"></div>

                                                <svg className="w-16 h-16 text-[#00ff41]/50 group-hover:text-[#00ff41] group-hover:drop-shadow-[0_0_15px_rgba(0,255,65,0.8)] transition-all duration-300 animate-[pulse_3s_infinite]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
                                                <span className="text-[#00ff41]/80 font-mono tracking-[0.3em] font-bold text-lg text-glow uppercase relative z-10 group-hover:text-white transition-colors duration-300">
                                                    [ DATABASE_EMPTY // WAITING_FOR_INPUT ]
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Cinematic Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pb-20">
                    {/* Deep Blur Backdrop */}
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={closeModal}></div>

                    <div className="w-full max-w-3xl bg-[#030303] border border-[#00ff41]/40 shadow-[0_0_60px_rgba(0,255,65,0.15)] relative z-10 flex flex-col max-h-[90vh]">

                        {/* Modal Header */}
                        <div className="bg-[#00ff41]/5 border-b border-[#00ff41]/30 p-6 flex justify-between items-center relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00ff41] to-transparent opacity-50"></div>
                            <h3 className="text-xl md:text-2xl font-black tracking-[0.3em] text-[#00ff41] text-glow uppercase flex items-center gap-4">
                                <span className="inline-block w-3 h-3 bg-[#00ff41] animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></span>
                                {isEditMode ? 'OVERRIDE_PROTOCOL' : 'INITIALIZE_PROTOCOL'}
                            </h3>
                            <button onClick={closeModal} className="text-[#00ff41]/50 hover:text-white transition-colors text-2xl font-bold hover:text-glow hover:rotate-90 duration-300 w-10 h-10 flex items-center justify-center border border-transparent hover:border-[#00ff41]/30 bg-black/20">
                                &times;
                            </button>
                        </div>

                        {/* Modal Body - Scrollable */}
                        <div className="p-8 overflow-y-auto custom-scrollbar">
                            <form onSubmit={handleSave} className="space-y-8 font-mono text-sm">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="block text-[10px] tracking-[0.2em] text-[#00ff41]/80">TARGET_DESIGNATION [NAME]</label>
                                        <input
                                            required
                                            type="text"
                                            value={currentAsset.name || ''}
                                            onChange={e => setCurrentAsset({ ...currentAsset, name: e.target.value })}
                                            className="w-full bg-black border border-[#00ff41]/30 text-white p-4 input-glow transition-all placeholder-[#333] tracking-wider"
                                            placeholder="e.g. PATEK PHILIPPE NAUTILUS"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-[10px] tracking-[0.2em] text-[#00ff41]/80">CLASSIFICATION</label>
                                        <div className="relative">
                                            <select
                                                value={currentAsset.category || 'WATCHES'}
                                                onChange={e => setCurrentAsset({ ...currentAsset, category: e.target.value as any })}
                                                className="w-full bg-black border border-[#00ff41]/30 text-[#00ff41] p-4 input-glow transition-all appearance-none cursor-pointer tracking-widest"
                                            >
                                                <option value="WATCHES">WATCHES</option>
                                                <option value="ART">ART</option>
                                                <option value="JEWELRY">JEWELRY</option>
                                                <option value="COLLECTIBLES">COLLECTIBLES</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#00ff41]/50">▼</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="block text-[10px] tracking-[0.2em] text-[#00ff41]/80">UNIT_VALUATION (USD)</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={currentAsset.pricePerShare || ''}
                                            onChange={e => setCurrentAsset({ ...currentAsset, pricePerShare: parseFloat(e.target.value) })}
                                            className="w-full bg-black border border-[#00ff41]/30 text-white p-4 input-glow transition-all placeholder-[#333] font-mono"
                                            placeholder="0.00"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-[10px] tracking-[0.2em] text-[#00ff41]/80">SUPPLY_MINT_COUNT</label>
                                        <input
                                            type="number"
                                            value={currentAsset.totalShares || ''}
                                            onChange={e => setCurrentAsset({ ...currentAsset, totalShares: parseInt(e.target.value) })}
                                            className="w-full bg-black border border-[#00ff41]/30 text-white p-4 input-glow transition-all placeholder-[#333] font-mono"
                                            placeholder="100"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-[10px] tracking-[0.2em] text-[#00ff41]/80">VISUAL_ENCRYPTION_PAYLOAD</label>
                                    <div className={`relative border border-[#00ff41]/30 ${isUploading ? 'bg-[#00ff41]/10 border-[#00ff41]' : 'bg-[#00ff41]/5 hover:bg-[#00ff41]/10 hover:border-[#00ff41]/60'} transition-all p-8 flex flex-col items-center justify-center text-center cursor-pointer min-h-[160px] group`}>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            disabled={isUploading}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-wait z-10"
                                        />

                                        {/* HUD Corner Decor within Dropzone */}
                                        <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#00ff41]/50 group-hover:border-[#00ff41] transition-colors"></div>
                                        <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#00ff41]/50 group-hover:border-[#00ff41] transition-colors"></div>

                                        {isUploading ? (
                                            <div className="w-full max-w-sm text-left relative z-20">
                                                <div className="flex justify-between items-end mb-2">
                                                    <div className="text-[#00ff41] animate-pulse uppercase tracking-widest text-xs font-bold text-glow">
                                                        [ UPLOADING_TO_SECURE_NODE ]
                                                    </div>
                                                    <div className="text-[#00ff41]/70 text-[10px] tracking-widest animate-pulse">
                                                        SYS.REROUTE...
                                                    </div>
                                                </div>
                                                <div className="w-full h-1 bg-[#111] overflow-hidden">
                                                    <div className="h-full bg-[#00ff41] shadow-[0_0_10px_#00ff41] animate-[progress_1s_ease-in-out_infinite] w-[40%]"></div>
                                                </div>
                                            </div>
                                        ) : currentAsset.imagePath ? (
                                            <div className="flex flex-col items-center relative z-20 w-full">
                                                <div className="relative p-2 border border-[#00ff41]/40 bg-black/50 backdrop-blur-sm mb-4">
                                                    <img
                                                        src={currentAsset.imagePath}
                                                        alt="Preview"
                                                        className="h-32 object-contain"
                                                    />
                                                </div>
                                                <span className="text-[#00ff41] uppercase tracking-[0.2em] text-[10px] bg-black px-4 py-1 border border-[#00ff41]/30">
                                                    [ OVERRIDE_MEDIA_PAYLOAD ]
                                                </span>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center space-y-4">
                                                <svg className="w-10 h-10 text-[#00ff41]/40 group-hover:text-[#00ff41] group-hover:drop-shadow-[0_0_8px_#00ff41] transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                                                <span className="text-[#00ff41]/60 uppercase tracking-[0.2em] group-hover:text-[#00ff41] transition-colors text-xs">
                                                    INPUT_DRAG_POINT :: CLICK_TO_INJECT
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-[10px] tracking-[0.2em] text-[#00ff41]/80">ARCHIVE_LOG_DATA [DESCRIPTION]</label>
                                    <textarea
                                        rows={4}
                                        value={currentAsset.description || ''}
                                        onChange={e => setCurrentAsset({ ...currentAsset, description: e.target.value })}
                                        className="w-full bg-black border border-[#00ff41]/30 text-[#ccc] p-4 input-glow transition-all placeholder-[#333] custom-scrollbar leading-relaxed"
                                        placeholder="Enter secure origin details and material composition..."
                                    />
                                </div>

                                <div className="pt-6 flex flex-col-reverse sm:flex-row justify-end space-y-4 space-y-reverse sm:space-y-0 sm:space-x-6">
                                    <button type="button" onClick={closeModal} className="text-[#00ff41]/60 hover:text-white px-8 py-4 tracking-[0.2em] transition-all bg-transparent border border-transparent hover:border-[#00ff41]/30 hover:bg-black uppercase text-xs">
                                        ABORT
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSaving || isUploading}
                                        className={`relative overflow-hidden group bg-black border border-[#00ff41] text-[#00ff41] px-12 py-4 tracking-[0.3em] font-black uppercase text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-wait ${isUploading || isSaving ? 'shadow-[0_0_20px_rgba(0,255,65,0.4)] animate-pulse' : 'hover:bg-[#00ff41] hover:text-black hover:shadow-[0_0_30px_rgba(0,255,65,0.8)]'}`}
                                    >
                                        <div className="absolute inset-0 w-full h-full border-[2px] border-[#00ff41]/20 hud-border pointer-events-none hidden group-hover:block opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        {isSaving ? (
                                            <span className="flex items-center gap-4 relative z-10">
                                                <div className="w-4 h-4 border-2 border-t-[#00ff41] border-r-transparent border-b-[#00ff41]/30 border-l-[#00ff41]/30 rounded-full animate-spin"></div>
                                                EXECUTING_
                                            </span>
                                        ) : (
                                            <span className="relative z-10">{isEditMode ? 'COMMIT_OVERRIDE' : 'EXECUTE_DEPLOY'}</span>
                                        )}
                                        {/* Glitch Overlay Effect */}
                                        <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:animate-[glitch_2s_infinite] opacity-0 group-hover:opacity-100 mix-blend-overlay pointer-events-none"></div>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Custom Scrollbar CSS for Modal */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #000;
                    border-left: 1px solid rgba(0,255,65,0.1);
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(0,255,65,0.3);
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(0,255,65,0.6);
                }
            `}} />
        </div>
    );
}
