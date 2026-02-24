'use client';

import { useState } from 'react';

import { useWriteContract } from 'wagmi';
import { reliqueXAddress, reliqueXABI } from '@/lib/web3/contract';

// Using a generic type here because we just need to match the Prisma return payload
type Asset = {
    id: string;
    name: string;
    status: string;
    authenticityScore?: number | null;
    physicalLocation?: string | null;
    submitterWallet: string;
    contractAssetId?: number | null;
};

export default function AssetRow({ asset }: { asset: Asset }) {
    const [status, setStatus] = useState(asset.status);
    const [score, setScore] = useState(asset.authenticityScore || '');
    const [location, setLocation] = useState(asset.physicalLocation || '');
    const [isSaving, setIsSaving] = useState(false);

    const { writeContractAsync } = useWriteContract();

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const res = await fetch('/api/admin/asset', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: asset.id,
                    status,
                    authenticityScore: score ? parseInt(score.toString(), 10) : undefined,
                    physicalLocation: location,
                }),
            });

            if (res.ok) {
                alert('Asset updated successfully');
            } else {
                const data = await res.json();
                alert(`Error: ${data.error}`);
            }
        } catch (err) {
            console.error(err);
            alert('Failed to update asset');
        } finally {
            setIsSaving(false);
        }
    };

    const handleMint = async () => {
        setIsSaving(true);
        try {
            // Random ID for prototype demo
            const contractAssetId = Math.floor(Math.random() * 1000000);
            const totalShares = BigInt(100); // 100 fractional shares
            const pricePerShare = BigInt("10000000000000"); // 0.00001 ETH for testing

            const hash = await writeContractAsync({
                address: reliqueXAddress as `0x${string}`,
                abi: reliqueXABI,
                functionName: 'mintFractions',
                args: [BigInt(contractAssetId), totalShares, pricePerShare],
            });

            // Update database backend with successful mint
            const res = await fetch('/api/admin/asset', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: asset.id,
                    status: 'MINTED',
                    contractAssetId: contractAssetId
                }),
            });

            if (res.ok) {
                setStatus('MINTED');
                alert(`Asset Minted to Blockchain! Tx: ${hash}`);
            }
        } catch (err) {
            console.error(err);
            alert('Minting failed. Make sure your wallet is connected and on the local Hardhat network.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <tr>
            <td>
                <span className="asset-name" style={{ color: '#fff' }}>{asset.name}</span>
            </td>
            <td style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>
                {asset.submitterWallet.substring(0, 6)}...{asset.submitterWallet.slice(-4)}
            </td>
            <td>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    style={{ background: '#111', color: 'var(--neon)', border: '1px solid var(--glass-border)', padding: '0.3rem', fontSize: '0.85rem' }}
                >
                    <option value="PENDING_REVIEW">PENDING_REVIEW</option>
                    <option value="RECEIVED_IN_VAULT">RECEIVED_IN_VAULT</option>
                    <option value="AUTHENTICATED">AUTHENTICATED</option>
                    <option value="MINTED">MINTED</option>
                </select>
            </td>
            <td>
                <input
                    type="number"
                    value={score}
                    onChange={(e) => setScore(e.target.value)}
                    placeholder="—"
                    style={{ background: '#111', color: '#fff', border: '1px solid var(--glass-border)', padding: '0.3rem', width: '60px', textAlign: 'center' }}
                />
            </td>
            <td>
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Geneva Vault"
                    style={{ background: '#111', color: '#fff', border: '1px solid var(--glass-border)', padding: '0.3rem', width: '120px' }}
                />
            </td>
            <td style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    style={{
                        background: 'transparent',
                        color: 'var(--neon)',
                        border: '1px solid var(--neon)',
                        padding: '0.3rem 0.8rem',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.background = 'var(--neon)';
                        e.currentTarget.style.color = '#000';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = 'var(--neon)';
                    }}
                >
                    {isSaving ? '...' : 'SAVE'}
                </button>

                {status === 'AUTHENTICATED' && (
                    <button
                        onClick={handleMint}
                        disabled={isSaving}
                        style={{
                            background: 'var(--neon)',
                            color: '#000',
                            border: '1px solid var(--neon)',
                            padding: '0.3rem 0.8rem',
                            cursor: 'pointer',
                            fontSize: '0.8rem',
                            fontWeight: 'bold',
                        }}
                    >
                        {isSaving ? '...' : 'MINT'}
                    </button>
                )}
            </td>
        </tr>
    );
}
