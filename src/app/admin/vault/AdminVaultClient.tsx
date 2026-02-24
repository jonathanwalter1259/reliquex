'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Asset } from '@prisma/client';
import { supabase } from '@/lib/supabaseClient';
import { useWriteContract } from 'wagmi';
import { reliqueXAddress, reliqueXABI } from '@/lib/web3/contract';

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
    const [isMinting, setIsMinting] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);
    const { writeContractAsync } = useWriteContract();

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
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        setIsUploading(true);
        triggerLog(`UPLOADING_${files.length}_IMAGE_PAYLOADS...`);

        try {
            const newUrls = [];
            for (const file of files) {
                const fileExt = file.name.split('.').pop();
                const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
                const filePath = `assets/${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('assets')
                    .upload(filePath, file);

                if (uploadError) throw uploadError;

                const { data: publicUrlData } = supabase.storage
                    .from('assets')
                    .getPublicUrl(filePath);

                newUrls.push(publicUrlData.publicUrl);
            }

            const existingPath = currentAsset.imagePath ? currentAsset.imagePath + ',' : '';
            setCurrentAsset({ ...currentAsset, imagePath: existingPath + newUrls.join(',') });
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

    const handleMint = async (asset: SerializedAsset) => {
        setIsMinting(asset.id);
        triggerLog(`INITIATING_TIMELOCK_PROPOSAL_${asset.id.slice(0, 8)}`);
        try {
            const contractAssetId = Math.floor(Math.random() * 1000000);
            const totalShares = BigInt(asset.totalShares || 100);
            const pricePerShare = BigInt(asset.pricePerShare ? Math.floor(asset.pricePerShare * 1e18) : 10000000000000);
            const ipfsURI = `ipfs://pending/${contractAssetId}`;

            const hash = await writeContractAsync({
                address: reliqueXAddress as `0x${string}`,
                abi: reliqueXABI,
                functionName: 'proposeMint',
                args: [BigInt(contractAssetId), totalShares, pricePerShare, ipfsURI],
            });

            const res = await fetch(`/api/vault/${asset.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    status: 'MINTED',
                    contractAssetId: contractAssetId
                }),
            });

            const data = await res.json();
            if (data.success) {
                setAssets(assets.map(a => a.id === asset.id ? { ...a, status: 'MINTED', contractAssetId } : a));
                triggerLog(`TIMELOCK_PROPOSED_TX_${hash.substring(0, 10)}_24H_DELAY`);
                router.refresh();
            } else {
                throw new Error(data.error);
            }

        } catch (error: any) {
            console.error(error);
            alert(`Proposal failed: ${error.message}`);
        } finally {
            setIsMinting(null);
        }
    };

    if (!mounted) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <span className="text-[#00FF00] font-mono text-sm tracking-widest animate-pulse">
                    &gt; INITIATING_SECURE_VAULT_CONNECTION...
                </span>
            </div>
        );
    }

    return (
        <>
            {/* Scoped CSS — wins specificity vs pages.css / globals.css */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .admin-main {
                    min-height: 100vh !important;
                    background: #000 !important;
                    color: #00FF00 !important;
                    font-family: var(--font-space-mono), ui-monospace, monospace !important;
                    padding-top: 8rem !important;
                    padding-bottom: 5rem !important;
                    padding-left: 2rem !important;
                    padding-right: 2rem !important;
                    width: 100% !important;
                    display: flex !important;
                    flex-direction: column !important;
                    align-items: center !important;
                }
                .admin-inner {
                    width: 100% !important;
                    max-width: 80rem !important;
                    display: flex !important;
                    flex-direction: column !important;
                    gap: 1.5rem !important;
                }
                .admin-crt {
                    position: fixed;
                    top: 0; left: 0;
                    width: 100vw; height: 100vh;
                    background: linear-gradient(rgba(18,16,16,0) 50%, rgba(0,0,0,0.25) 50%);
                    background-size: 100% 3px;
                    pointer-events: none;
                    z-index: 9999;
                    opacity: 0.15;
                }
                .admin-header-row {
                    display: flex !important;
                    flex-wrap: wrap !important;
                    justify-content: space-between !important;
                    align-items: flex-end !important;
                    border-bottom: 1px solid #00FF00 !important;
                    padding-bottom: 1rem !important;
                    gap: 1rem !important;
                }
                .admin-header-row h1 {
                    font-size: 2.25rem !important;
                    font-weight: 700 !important;
                    color: #fff !important;
                    letter-spacing: 0.15em !important;
                    margin: 0 !important;
                    line-height: 1.2 !important;
                }
                .admin-header-row p {
                    font-size: 0.875rem !important;
                    color: #00FF00 !important;
                    margin: 0.5rem 0 0 0 !important;
                    letter-spacing: 0.05em !important;
                }
                .admin-add-btn {
                    padding: 0.5rem 1rem !important;
                    border: 1px solid #00FF00 !important;
                    background: #000 !important;
                    color: #00FF00 !important;
                    font-family: var(--font-space-mono), ui-monospace, monospace !important;
                    font-size: 0.875rem !important;
                    cursor: pointer !important;
                    transition: all 0.2s ease !important;
                    flex-shrink: 0 !important;
                    white-space: nowrap !important;
                }
                .admin-add-btn:hover {
                    background: #00FF00 !important;
                    color: #000 !important;
                }
                .admin-table-wrap {
                    width: 100% !important;
                    border: 1px solid #00FF00 !important;
                    background: #000 !important;
                    overflow-x: auto !important;
                }
                .admin-table {
                    width: 100% !important;
                    text-align: left !important;
                    border-collapse: collapse !important;
                    white-space: nowrap !important;
                    font-family: var(--font-space-mono), ui-monospace, monospace !important;
                }
                .admin-table th {
                    padding: 1rem !important;
                    border-bottom: 1px solid #00FF00 !important;
                    text-transform: uppercase !important;
                    font-size: 0.75rem !important;
                    letter-spacing: 0.1em !important;
                    color: #00FF00 !important;
                    font-weight: 700 !important;
                    background: rgba(0,255,0,0.03) !important;
                }
                .admin-table td {
                    padding: 1rem !important;
                    border-bottom: 1px solid rgba(0,255,0,0.15) !important;
                    font-size: 0.875rem !important;
                    vertical-align: middle !important;
                    color: #eee !important;
                }
                .admin-table tr:hover td {
                    background: rgba(0,255,0,0.05) !important;
                }
                .admin-table .admin-thumb {
                    width: 2.5rem !important;
                    height: 2.5rem !important;
                    object-fit: contain !important;
                    mix-blend-mode: screen !important;
                }
                .admin-actions {
                    display: flex !important;
                    align-items: center !important;
                    gap: 1rem !important;
                    justify-content: flex-end !important;
                }
                .admin-actions button {
                    font-family: var(--font-space-mono), ui-monospace, monospace !important;
                    font-size: 0.75rem !important;
                    letter-spacing: 0.05em !important;
                    background: none !important;
                    border: none !important;
                    cursor: pointer !important;
                    transition: color 0.2s ease !important;
                    padding: 0 !important;
                }
                .admin-act-mint { color: #facc15 !important; }
                .admin-act-mint:hover { color: #fef08a !important; }
                .admin-act-edit { color: #00FF00 !important; }
                .admin-act-edit:hover { color: #fff !important; }
                .admin-act-purge { color: #ef4444 !important; }
                .admin-act-purge:hover { color: #fca5a5 !important; }
                .admin-sys-log {
                    position: fixed !important;
                    top: 6rem !important;
                    left: 50% !important;
                    transform: translateX(-50%) !important;
                    background: rgba(0,0,0,0.9) !important;
                    border-left: 4px solid #00FF00 !important;
                    border-right: 4px solid #00FF00 !important;
                    color: #00FF00 !important;
                    font-family: var(--font-space-mono), ui-monospace, monospace !important;
                    padding: 1rem 2rem !important;
                    z-index: 50 !important;
                    font-size: 0.875rem !important;
                    letter-spacing: 0.1em !important;
                    text-transform: uppercase !important;
                }
                .admin-empty {
                    padding: 4rem 2rem !important;
                    text-align: center !important;
                    color: #00FF00 !important;
                    letter-spacing: 0.15em !important;
                    font-size: 0.875rem !important;
                }
                .admin-cat-badge {
                    padding: 0.25rem 0.75rem !important;
                    border: 1px solid rgba(0,255,0,0.3) !important;
                    background: rgba(0,255,0,0.05) !important;
                    color: #00FF00 !important;
                    font-size: 0.75rem !important;
                    letter-spacing: 0.1em !important;
                }
                .admin-no-thumb {
                    width: 2.5rem !important;
                    height: 2.5rem !important;
                    background: #000 !important;
                    border: 1px solid rgba(0,255,0,0.2) !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    font-size: 8px !important;
                    color: rgba(0,255,0,0.4) !important;
                }
                /* Modal focus glow */
                .input-glow:focus {
                    box-shadow: 0 0 15px rgba(0,255,0,0.4), inset 0 0 10px rgba(0,255,0,0.1) !important;
                    border-color: #00FF00 !important;
                }
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: #000; border-left: 1px solid rgba(0,255,0,0.1); }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,255,0,0.3); }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(0,255,0,0.6); }
            `}} />

            <main className="admin-main">
                <div className="admin-crt"></div>

                {/* System Log Toast */}
                {systemLog && (
                    <div className="admin-sys-log">{systemLog}</div>
                )}

                <div className="admin-inner">
                    {/* Terminal Header & Add Button */}
                    <div className="admin-header-row">
                        <div>
                            <h1>NEXUS_VAULT</h1>
                            <p>&gt; ACTIVE DIRECTORY :: {assets.length} PROTOCOLS ENCRYPTED</p>
                        </div>
                        <button onClick={() => openModal()} className="admin-add-btn">
                            &gt; + ADD_PRODUCT_
                        </button>
                    </div>

                    {/* Table Container */}
                    <div className="admin-table-wrap">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>SYS_ID</th>
                                    <th>NEXUS_DESIGNATION</th>
                                    <th>CLASS</th>
                                    <th>VALUATION</th>
                                    <th style={{ textAlign: 'right' }}>OVERRIDE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {assets.map((asset) => (
                                    <tr key={asset.id}>
                                        <td style={{ color: 'rgba(0,255,0,0.5)', fontSize: '0.75rem' }}>
                                            {asset.id.slice(0, 8)}...
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                {asset.imagePath ? (
                                                    <img
                                                        src={asset.imagePath.split(',')[0]}
                                                        alt="Asset"
                                                        className="admin-thumb"
                                                    />
                                                ) : (
                                                    <div className="admin-no-thumb">NO_IMG</div>
                                                )}
                                                <span style={{ fontWeight: 700, letterSpacing: '0.05em' }}>{asset.name}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="admin-cat-badge">{asset.category}</span>
                                        </td>
                                        <td>
                                            {asset.pricePerShare
                                                ? <span style={{ color: '#fff' }}>${asset.pricePerShare.toFixed(2)}</span>
                                                : <span style={{ color: 'rgba(0,255,0,0.4)' }}>UNPRICED</span>
                                            }
                                        </td>
                                        <td>
                                            <div className="admin-actions">
                                                {asset.status === 'AUTHENTICATED' && !asset.contractAssetId && (
                                                    <button
                                                        onClick={() => handleMint(asset)}
                                                        disabled={isMinting === asset.id}
                                                        className="admin-act-mint"
                                                    >
                                                        [{isMinting === asset.id ? 'PROPOSING...' : 'PROPOSE_MINT'}]
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => openModal(asset)}
                                                    className="admin-act-edit"
                                                >
                                                    [EDIT]
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(asset.id)}
                                                    className="admin-act-purge"
                                                >
                                                    [PURGE]
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {assets.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="admin-empty">
                                            [ DATABASE_EMPTY // WAITING_FOR_INPUT ]
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {/* Cinematic Modal — preserved from original */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pb-20">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={closeModal}></div>

                    <div className="w-full max-w-3xl bg-[#030303] border border-[#00FF00]/40 shadow-[0_0_60px_rgba(0,255,65,0.15)] relative z-10 flex flex-col max-h-[90vh]">
                        {/* Modal Header */}
                        <div className="bg-[#00FF00]/5 border-b border-[#00FF00]/30 p-6 flex justify-between items-center relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00FF00] to-transparent opacity-50"></div>
                            <h3 className="text-xl md:text-2xl font-black tracking-[0.3em] text-[#00FF00] uppercase flex items-center gap-4">
                                <span className="inline-block w-3 h-3 bg-[#00FF00] animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></span>
                                {isEditMode ? 'OVERRIDE_PROTOCOL' : 'INITIALIZE_PROTOCOL'}
                            </h3>
                            <button onClick={closeModal} className="text-[#00FF00]/50 hover:text-white transition-colors text-2xl font-bold duration-300 w-10 h-10 flex items-center justify-center border border-transparent hover:border-[#00FF00]/30 bg-black/20">
                                &times;
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-8 overflow-y-auto custom-scrollbar">
                            <form onSubmit={handleSave} className="space-y-8 font-mono text-sm">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="block text-[10px] tracking-[0.2em] text-[#00FF00]/80">TARGET_DESIGNATION [NAME]</label>
                                        <input
                                            required
                                            type="text"
                                            value={currentAsset.name || ''}
                                            onChange={e => setCurrentAsset({ ...currentAsset, name: e.target.value })}
                                            className="w-full bg-black border border-[#00FF00]/30 text-white p-4 input-glow transition-all placeholder-[#333] tracking-wider"
                                            placeholder="e.g. PATEK PHILIPPE NAUTILUS"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-[10px] tracking-[0.2em] text-[#00FF00]/80">CLASSIFICATION</label>
                                        <div className="relative">
                                            <select
                                                value={currentAsset.category || 'WATCHES'}
                                                onChange={e => setCurrentAsset({ ...currentAsset, category: e.target.value as any })}
                                                className="w-full bg-black border border-[#00FF00]/30 text-[#00FF00] p-4 input-glow transition-all appearance-none cursor-pointer tracking-widest"
                                            >
                                                <option value="WATCHES">WATCHES</option>
                                                <option value="ART">ART</option>
                                                <option value="JEWELRY">JEWELRY</option>
                                                <option value="COLLECTIBLES">COLLECTIBLES</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#00FF00]/50">▼</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="block text-[10px] tracking-[0.2em] text-[#00FF00]/80">UNIT_VALUATION (USD)</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={currentAsset.pricePerShare || ''}
                                            onChange={e => setCurrentAsset({ ...currentAsset, pricePerShare: parseFloat(e.target.value) })}
                                            className="w-full bg-black border border-[#00FF00]/30 text-white p-4 input-glow transition-all placeholder-[#333] font-mono"
                                            placeholder="0.00"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-[10px] tracking-[0.2em] text-[#00FF00]/80">SUPPLY_MINT_COUNT</label>
                                        <input
                                            type="number"
                                            value={currentAsset.totalShares || ''}
                                            onChange={e => setCurrentAsset({ ...currentAsset, totalShares: parseInt(e.target.value) })}
                                            className="w-full bg-black border border-[#00FF00]/30 text-white p-4 input-glow transition-all placeholder-[#333] font-mono"
                                            placeholder="100"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="block text-[10px] tracking-[0.2em] text-[#00FF00]/80">PROTOCOL_STATUS</label>
                                        <div className="relative">
                                            <select
                                                value={currentAsset.status || 'PENDING_REVIEW'}
                                                onChange={e => setCurrentAsset({ ...currentAsset, status: e.target.value as any })}
                                                className="w-full bg-black border border-[#00FF00]/30 text-[#00FF00] p-4 input-glow transition-all appearance-none cursor-pointer tracking-widest"
                                            >
                                                <option value="PENDING_REVIEW">PENDING_REVIEW</option>
                                                <option value="RECEIVED_IN_VAULT">RECEIVED_IN_VAULT</option>
                                                <option value="AUTHENTICATED">AUTHENTICATED</option>
                                                <option value="MINTED" disabled>MINTED (ON-CHAIN)</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#00FF00]/50">▼</div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-[10px] tracking-[0.2em] text-[#00FF00]/80">AUTHENTICITY_SCORE</label>
                                        <input
                                            type="number"
                                            min="0"
                                            max="100"
                                            value={currentAsset.authenticityScore || ''}
                                            onChange={e => setCurrentAsset({ ...currentAsset, authenticityScore: parseInt(e.target.value) || undefined })}
                                            className="w-full bg-black border border-[#00FF00]/30 text-white p-4 input-glow transition-all placeholder-[#333] font-mono"
                                            placeholder="Score 0-100"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-[10px] tracking-[0.2em] text-[#00FF00]/80">VISUAL_ENCRYPTION_PAYLOAD</label>
                                    <div className={`relative border border-[#00FF00]/30 ${isUploading ? 'bg-[#00FF00]/10 border-[#00FF00]' : 'bg-[#00FF00]/5 hover:bg-[#00FF00]/10 hover:border-[#00FF00]/60'} transition-all p-8 flex flex-col items-center justify-center text-center cursor-pointer min-h-[160px] group`}>
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            disabled={isUploading}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-wait z-10"
                                        />
                                        <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#00FF00]/50 group-hover:border-[#00FF00] transition-colors"></div>
                                        <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#00FF00]/50 group-hover:border-[#00FF00] transition-colors"></div>

                                        {isUploading ? (
                                            <div className="w-full max-w-sm text-left relative z-20">
                                                <div className="flex justify-between items-end mb-2">
                                                    <div className="text-[#00FF00] animate-pulse uppercase tracking-widest text-xs font-bold">
                                                        [ UPLOADING_TO_SECURE_NODE ]
                                                    </div>
                                                    <div className="text-[#00FF00]/70 text-[10px] tracking-widest animate-pulse">
                                                        SYS.REROUTE...
                                                    </div>
                                                </div>
                                                <div className="w-full h-1 bg-[#111] overflow-hidden">
                                                    <div className="h-full bg-[#00FF00] animate-pulse w-[40%]"></div>
                                                </div>
                                            </div>
                                        ) : currentAsset.imagePath ? (
                                            <div className="flex flex-col items-center relative z-20 w-full">
                                                <div className="flex flex-wrap justify-center gap-2 mb-4">
                                                    {currentAsset.imagePath.split(',').filter(Boolean).map((url, idx) => (
                                                        <div key={idx} className="relative p-1 border border-[#00FF00]/40 bg-black/50">
                                                            <img src={url} alt={`Preview ${idx + 1}`} className="h-20 w-20 object-cover" />
                                                        </div>
                                                    ))}
                                                </div>
                                                <span className="text-[#00FF00] uppercase tracking-[0.2em] text-[10px] bg-black px-4 py-1 border border-[#00FF00]/30 pointer-events-none">
                                                    [ APPEND_MORE_MEDIA ]
                                                </span>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center space-y-4">
                                                <svg className="w-10 h-10 text-[#00FF00]/40 group-hover:text-[#00FF00] transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                                                <span className="text-[#00FF00]/60 uppercase tracking-[0.2em] group-hover:text-[#00FF00] transition-colors text-xs">
                                                    INPUT_DRAG_POINT :: CLICK_TO_INJECT
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-[10px] tracking-[0.2em] text-[#00FF00]/80">ARCHIVE_LOG_DATA [DESCRIPTION]</label>
                                    <textarea
                                        rows={4}
                                        value={currentAsset.description || ''}
                                        onChange={e => setCurrentAsset({ ...currentAsset, description: e.target.value })}
                                        className="w-full bg-black border border-[#00FF00]/30 text-[#ccc] p-4 input-glow transition-all placeholder-[#333] custom-scrollbar leading-relaxed"
                                        placeholder="Enter secure origin details and material composition..."
                                    />
                                </div>

                                <div className="pt-6 flex flex-col-reverse sm:flex-row justify-end space-y-4 space-y-reverse sm:space-y-0 sm:space-x-6">
                                    <button type="button" onClick={closeModal} className="text-[#00FF00]/60 hover:text-white px-8 py-4 tracking-[0.2em] transition-all bg-transparent border border-transparent hover:border-[#00FF00]/30 hover:bg-black uppercase text-xs">
                                        ABORT
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSaving || isUploading}
                                        className={`bg-black border border-[#00FF00] text-[#00FF00] px-12 py-4 tracking-[0.3em] font-black uppercase text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-wait ${isUploading || isSaving ? 'animate-pulse' : 'hover:bg-[#00FF00] hover:text-black'}`}
                                    >
                                        {isSaving ? 'EXECUTING_...' : (isEditMode ? 'COMMIT_OVERRIDE' : 'EXECUTE_DEPLOY')}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
