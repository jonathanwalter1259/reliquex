'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Submit() {
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [formData, setFormData] = useState({
        category: '',
        brand: '',
        modelRef: '',
        estimatedValue: '',
        description: '',
        walletAddress: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        setIsUploading(true);

        try {
            const newUrls: string[] = [];
            for (const file of files) {
                const fileExt = file.name.split('.').pop();
                const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
                const filePath = `submissions/${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('assets')
                    .upload(filePath, file);

                if (uploadError) throw uploadError;

                const { data: publicUrlData } = supabase.storage
                    .from('assets')
                    .getPublicUrl(filePath);

                newUrls.push(publicUrlData.publicUrl);
            }

            setImageUrls(prev => [...prev, ...newUrls]);
        } catch (error: any) {
            console.error('Error uploading image:', error);
            alert(`File upload failed: ${error.message}`);
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch('/api/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    category: formData.category,
                    brand: formData.brand,
                    model: formData.modelRef,
                    estimatedValue: parseInt(formData.estimatedValue, 10),
                    description: formData.description,
                    walletAddress: formData.walletAddress,
                    imagePath: imageUrls.join(','),
                }),
            });

            if (res.ok) {
                alert('Asset submission received. You will be contacted within 48 hours for shipping instructions.');
                setFormData({ category: '', brand: '', modelRef: '', estimatedValue: '', description: '', walletAddress: '' });
                setImageUrls([]);
            } else {
                const data = await res.json();
                alert(`Submission failed: ${data.error || 'Unknown error'}`);
            }
        } catch (error) {
            console.error(error);
            alert('A network error occurred while submitting.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="page-wrap reveal">
            <div className="container">
                <div className="page-header">
                    <h1 className="page-header__title">INITIATE ASSET VERIFICATION.</h1>
                    <p className="page-header__sub">&gt; Submit your luxury asset for curation, authentication, and on-chain fractionalization.</p>
                </div>

                <form className="submit-form" onSubmit={handleSubmit}>
                    {/* Row: Category + Brand */}
                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">// ASSET_CATEGORY:</label>
                            <select name="category" value={formData.category} onChange={handleChange} className="form-select" required>
                                <option value="" disabled>Select category...</option>
                                <option value="watches">Watches</option>
                                <option value="sneakers">Sneakers</option>
                                <option value="jewelry">Jewelry</option>
                                <option value="handbags">Handbags</option>
                                <option value="art">Fine Art</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">// BRAND:</label>
                            <input name="brand" value={formData.brand} onChange={handleChange} type="text" className="form-input" placeholder="e.g. Rolex, Nike, Hermès" required />
                        </div>
                    </div>

                    {/* Row: Model + Value */}
                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">// MODEL_REF:</label>
                            <input name="modelRef" value={formData.modelRef} onChange={handleChange} type="text" className="form-input" placeholder="e.g. RM 011 or Air Jordan 1 OG" required />
                        </div>
                        <div className="form-group">
                            <label className="form-label">// ESTIMATED_VALUE (USD):</label>
                            <input name="estimatedValue" value={formData.estimatedValue} onChange={handleChange} type="number" className="form-input" placeholder="e.g. 50000" min="1000" required />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="form-group">
                        <label className="form-label">// ASSET_DESCRIPTION:</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="form-textarea"
                            placeholder="Provide details about condition, provenance, serial numbers, and any documentation you possess..."
                            required
                        ></textarea>
                    </div>

                    {/* File Upload API Injection */}
                    <label className="form-label">// PRELIMINARY_PHOTOS:</label>
                    <div className={`dropzone relative ${isUploading ? 'opacity-50 cursor-wait' : ''}`}>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageUpload}
                            disabled={isUploading}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-wait z-10"
                        />

                        {isUploading ? (
                            <div className="flex flex-col items-center justify-center p-8">
                                <div className="text-[#00ff41] animate-pulse mb-2 tracking-widest">[ UPLOADING_MEDIA... ]</div>
                                <div className="w-full max-w-[200px] h-1 bg-[#111] overflow-hidden">
                                    <div className="h-full bg-[#00ff41] animate-[progress_1s_ease-in-out_infinite] w-[40%]"></div>
                                </div>
                            </div>
                        ) : imageUrls.length > 0 ? (
                            <div className="flex flex-col items-center justify-center w-full z-20 relative p-4">
                                <div className="flex flex-wrap justify-center gap-4 mb-4">
                                    {imageUrls.map((url, idx) => (
                                        <div key={idx} className="relative border border-[#00ff41]/40 bg-black p-1">
                                            <img src={url} alt={`Upload ${idx + 1}`} className="h-20 w-20 object-cover" />
                                        </div>
                                    ))}
                                </div>
                                <span className="text-[#00ff41] bg-black border border-[#00ff41]/30 px-4 py-1 text-xs tracking-widest uppercase">
                                    [ CLICK_TO_APPEND_MORE ]
                                </span>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center py-6">
                                <svg className="dropzone__icon mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                    <polyline points="17 8 12 3 7 8" />
                                    <line x1="12" y1="3" x2="12" y2="15" />
                                </svg>
                                <p className="dropzone__text mt-4 tracking-widest text-[#00ff41]/80 hover:text-[#00ff41] transition-colors">DRAG_&_DROP // BROWSE_FILES</p>
                                <p className="dropzone__hint text-[10px] uppercase mt-2">SECURE_UPLOAD_NODE (MAX 10MB)</p>
                            </div>
                        )}
                    </div>

                    {/* Wallet Address */}
                    <div className="form-group">
                        <label className="form-label">// WALLET_ADDRESS (BNB Chain):</label>
                        <input name="walletAddress" value={formData.walletAddress} onChange={handleChange} type="text" className="form-input" placeholder="0x..." required />
                    </div>

                    {/* Disclaimer */}
                    <div className="form-disclaimer">
             // NOTE: Submission does not guarantee fractionalization. Physical asset must be shipped to our vault for rigorous authentication. All assets undergo multi-point verification by licensed appraisers. Fraudulent submissions will result in permanent blacklisting from the protocol. Processing time: 5-10 business days upon receipt.
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="form-submit transition-all duration-300 relative group overflow-hidden" disabled={isLoading || isUploading}>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00ff41]/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            {isLoading ? (
                                <>
                                    <div className="w-3 h-3 border border-[#00ff41] border-t-transparent animate-spin rounded-full"></div>
                                    TRANSMITTING_PAYLOAD...
                                </>
                            ) : 'SUBMIT_ASSET_FOR_REVIEW'}
                        </span>
                    </button>
                </form>
            </div>
        </main>
    );
}
