'use client';

import { useState } from 'react';

export default function Submit() {
    const [isLoading, setIsLoading] = useState(false);
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
                }),
            });

            if (res.ok) {
                alert('Asset submission received. You will be contacted within 48 hours for shipping instructions.');
                setFormData({ category: '', brand: '', modelRef: '', estimatedValue: '', description: '', walletAddress: '' });
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

                    {/* File Upload (UI Placeholder for now) */}
                    <label className="form-label">// PRELIMINARY_PHOTOS:</label>
                    <div className="dropzone">
                        <input type="file" multiple accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" style={{ position: 'absolute', opacity: 0, width: '100%', height: '100%', left: 0, top: 0, cursor: 'pointer' }} />
                        <svg className="dropzone__icon mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="17 8 12 3 7 8" />
                            <line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                        <p className="dropzone__text mt-4">Drag & drop images or click to browse</p>
                        <p className="dropzone__hint">PNG, JPG, WEBP — Max 10MB per file</p>
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
                    <button type="submit" className="form-submit" disabled={isLoading}>
                        {isLoading ? 'TRANSMITTING...' : 'SUBMIT ASSET FOR REVIEW'}
                    </button>
                </form>
            </div>
        </main>
    );
}
