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
        <div className="vault-manager">
            {systemLog && (
                <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-black border border-[#00ff41] text-[#00ff41] font-mono px-6 py-3 z-50 animate-pulse">
                    {systemLog}
                </div>
            )}

            <div className="flex justify-between items-center mb-8">
                <h2 className="text-[#888] font-mono text-xl tracking-widest uppercase">
                    PROTOCOL INVENTORY ({assets.length})
                </h2>
                <button
                    onClick={() => openModal()}
                    className="border border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41] hover:text-black font-mono tracking-widest px-6 py-2 transition-colors duration-300"
                >
                    + ADD_PRODUCT
                </button>
            </div>

            <div className="overflow-x-auto max-w-7xl mx-auto border-2 border-[#00ff41] bg-[#0a0a0a] p-8 relative shadow-[0_0_30px_rgba(0,255,65,0.1)]">
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#00ff41]"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#00ff41]"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#00ff41]"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#00ff41]"></div>

                <table className="w-full text-left font-mono text-sm border-collapse uppercase">
                    <thead>
                        <tr className="border-b border-[#00ff41] text-[#00ff41]">
                            <th className="p-4 font-normal tracking-wider">ASSET_ID</th>
                            <th className="p-4 font-normal tracking-wider">NAME</th>
                            <th className="p-4 font-normal tracking-wider">CATEGORY</th>
                            <th className="p-4 font-normal tracking-wider">PRICE_PER_SHARE</th>
                            <th className="p-4 font-normal tracking-wider text-right">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody className="text-[#ccc]">
                        {assets.map((asset) => (
                            <tr key={asset.id} className="border-b border-[#333] hover:bg-[#111] transition-colors">
                                <td className="p-4 text-[#888]">{asset.id}</td>
                                <td className="p-4 text-white">{asset.name}</td>
                                <td className="p-4">{asset.category}</td>
                                <td className="p-4">{asset.pricePerShare ? `$${asset.pricePerShare}` : 'TBD'}</td>
                                <td className="p-4 text-right space-x-4">
                                    <button
                                        onClick={() => openModal(asset)}
                                        className="text-[#888] hover:text-white transition-colors uppercase tracking-widest"
                                    >
                                        Modify
                                    </button>
                                    <button
                                        onClick={() => handleDelete(asset.id)}
                                        className="text-red-900 hover:text-red-500 transition-colors uppercase tracking-widest"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {assets.length === 0 && (
                            <tr>
                                <td colSpan={5} className="p-12 text-center">
                                    <span className="text-[#00ff41] font-mono tracking-widest uppercase animate-pulse">
                                        &gt; [SYSTEM_ERROR]: VAULT_EMPTY. INITIATE_ASSET_ENTRY_SEQUENCE.
                                    </span>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Crud Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
                    <div className="w-full max-w-2xl bg-[#0a0a0a] border-2 border-[#00ff41] p-10 shadow-[0_0_30px_rgba(0,255,65,0.2)] relative">
                        {/* Crosshairs */}
                        <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-[#00ff41]"></div>
                        <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-[#00ff41]"></div>
                        <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-[#00ff41]"></div>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-[#00ff41]"></div>
                        <div className="flex justify-between items-center mb-8 border-b border-[#333] pb-4">
                            <h3 className="text-2xl font-light tracking-[0.2em] text-white">
                                {isEditMode ? '> MODIFY_ASSET' : '> INITIALIZE_ASSET'}
                            </h3>
                            <button onClick={closeModal} className="text-[#888] hover:text-white text-2xl">&times;</button>
                        </div>

                        <form onSubmit={handleSave} className="space-y-6 font-mono text-sm">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[#888] tracking-widest mb-2">NAME</label>
                                    <input
                                        required
                                        type="text"
                                        value={currentAsset.name || ''}
                                        onChange={e => setCurrentAsset({ ...currentAsset, name: e.target.value })}
                                        className="w-full bg-transparent border border-[#00ff41] text-white p-3 focus:shadow-[0_0_10px_rgba(0,255,65,0.4)] focus:outline-none transition-all placeholder-[#333]"
                                        placeholder="e.g. Patek Philippe Nautilus"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[#888] tracking-widest mb-2">CATEGORY</label>
                                    <select
                                        value={currentAsset.category || 'WATCHES'}
                                        onChange={e => setCurrentAsset({ ...currentAsset, category: e.target.value as any })}
                                        className="w-full bg-[#0a0a0a] border border-[#00ff41] text-white p-3 focus:shadow-[0_0_10px_rgba(0,255,65,0.4)] focus:outline-none appearance-none transition-all"
                                    >
                                        <option value="WATCHES">WATCHES</option>
                                        <option value="ART">ART</option>
                                        <option value="JEWELRY">JEWELRY</option>
                                        <option value="COLLECTIBLES">COLLECTIBLES</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[#888] tracking-widest mb-2">PRICE_PER_SHARE (USD)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={currentAsset.pricePerShare || ''}
                                        onChange={e => setCurrentAsset({ ...currentAsset, pricePerShare: parseFloat(e.target.value) })}
                                        className="w-full bg-transparent border border-[#00ff41] text-white p-3 focus:shadow-[0_0_10px_rgba(0,255,65,0.4)] focus:outline-none transition-all placeholder-[#333]"
                                        placeholder="500.00"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[#888] tracking-widest mb-2">TOTAL_SHARES</label>
                                    <input
                                        type="number"
                                        value={currentAsset.totalShares || ''}
                                        onChange={e => setCurrentAsset({ ...currentAsset, totalShares: parseInt(e.target.value) })}
                                        className="w-full bg-transparent border border-[#00ff41] text-white p-3 focus:shadow-[0_0_10px_rgba(0,255,65,0.4)] focus:outline-none transition-all placeholder-[#333]"
                                        placeholder="1000"
                                    />
                                </div>
                            </div>

                            <div className="col-span-2">
                                <label className="block text-[#888] tracking-widest mb-2">ASSET_MEDIA</label>
                                <div className="relative border-2 border-dashed border-[#00ff41]/50 hover:border-[#00ff41] hover:shadow-[0_0_15px_rgba(0,255,65,0.2)] transition-all p-6 flex flex-col items-center justify-center text-center cursor-pointer min-h-[120px] bg-[#00ff41]/5">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        disabled={isUploading}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-wait z-10"
                                    />
                                    {isUploading ? (
                                        <div className="w-full max-w-xs text-left">
                                            <div className="text-[#00ff41] animate-pulse uppercase tracking-widest text-xs mb-2">
                                                &gt; TRANSMITTING_DATA_TO_SECURE_BUCKET...
                                            </div>
                                            <div className="w-full h-2 bg-black border border-[#00ff41] relative overflow-hidden">
                                                <div className="absolute top-0 left-0 h-full bg-[#00ff41] animate-[progress_1.5s_ease-in-out_infinite] w-[60%]"></div>
                                            </div>
                                        </div>
                                    ) : currentAsset.imagePath ? (
                                        <div className="flex flex-col items-center">
                                            <img
                                                src={currentAsset.imagePath}
                                                alt="Preview"
                                                className="h-20 object-contain mb-2 border border-[#333]"
                                            />
                                            <span className="text-[#00ff41] uppercase tracking-widest text-xs">
                                                [MEDIA_INJECTED_SUCCESSFULLY - CLICK TO REPLACE]
                                            </span>
                                        </div>
                                    ) : (
                                        <span className="text-[#888] uppercase tracking-widest pointer-events-none">
                                            [CLICK OR DRAG IMAGE TO INJECT MEDIA]
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-[#888] tracking-widest mb-2">DESCRIPTION</label>
                                <textarea
                                    rows={4}
                                    value={currentAsset.description || ''}
                                    onChange={e => setCurrentAsset({ ...currentAsset, description: e.target.value })}
                                    className="w-full bg-transparent border border-[#00ff41] text-white p-3 focus:shadow-[0_0_10px_rgba(0,255,65,0.4)] focus:outline-none transition-all placeholder-[#333]"
                                    placeholder="Asset provenance and details..."
                                />
                            </div>

                            <div className="pt-8 flex justify-end space-x-4">
                                <button type="button" onClick={closeModal} className="text-[#888] hover:text-white px-6 py-4 tracking-widest transition-colors border border-transparent hover:border-[#333]">
                                    CANCEL
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSaving || isUploading}
                                    className={`relative overflow-hidden group bg-[#000] border-2 border-[#00ff41] text-[#00ff41] px-10 py-4 tracking-[0.2em] font-bold hover:bg-[#00ff41] hover:text-black hover:shadow-[0_0_40px_rgba(0,255,65,0.8)] transition-all duration-300 disabled:opacity-50 disabled:cursor-wait ${isUploading || isSaving ? 'shadow-[0_0_30px_rgba(0,255,65,0.5)] animate-pulse' : ''}`}
                                >
                                    {isSaving ? (
                                        <span className="flex items-center gap-3">
                                            <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            PROCESSING_
                                        </span>
                                    ) : (
                                        isEditMode ? 'COMMIT_UPDATE' : 'DEPLOY_ASSET'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
