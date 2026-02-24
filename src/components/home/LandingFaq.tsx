'use client';

import { useState } from 'react';

export default function LandingFaq() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = [
        {
            q: "How do I list an asset on ReliqueX?",
            a: "ReliqueX is a closed-curation protocol. You cannot simply list an asset. You must first submit your item through our \"Submit Asset\" portal. Our team will conduct a preliminary review of the asset's category, brand, and estimated value. If accepted, you'll receive detailed shipping instructions. Only items that pass our rigorous multi-point authentication will be vaulted and fractionalized on-chain."
        },
        {
            q: "Who authenticates the items?",
            a: "We employ a network of world-class, licensed appraisers and domain experts. This includes certified horologists for timepieces, sneaker authentication specialists with access to proprietary databases, certified gemologists for jewelry, and fine art authenticators. Each appraiser signs a cryptographic attestation recorded on the BNB Chain."
        },
        {
            q: "Where is the physical item stored?",
            a: "Once authenticated, the asset is permanently sealed in our climate-controlled, high-security vault in Geneva, Switzerland — \"Facility Alpha.\" Vaults have 24/7 armed security, biometric access, continuous environmental monitoring, and multi-layer insurance through Lloyd's syndicate coverage."
        },
        {
            q: "Can I ever claim the physical item?",
            a: "Yes. If a single wallet address acquires 100% of the fractional shares for a given vault, that wallet holder gains the exclusive right to initiate a \"Physical Redemption\" request. Upon burning the total token supply, we coordinate secure shipment from the vault. This is the only mechanism for physical extraction — the \"Burn & Claim\" process."
        }
    ];

    return (
        <section className="landing-faq reveal">
            <div className="container">
                <div className="landing-faq__header">
                    <h2 className="landing-faq__title">SYSTEM FAQ.</h2>
                    <p className="landing-faq__sub">&gt; QUERYING_DATABASE...</p>
                </div>
                <div className="faq-list">
                    {faqs.map((faq, index) => (
                        <div className={`faq-item ${openIndex === index ? 'active' : ''}`} key={index}>
                            <button className="faq-question" onClick={() => toggleFaq(index)}>
                                <span>&gt; [Q]: {faq.q}</span>
                                <span className="faq-toggle">{openIndex === index ? '[-]' : '[+]'}</span>
                            </button>
                            <div className="faq-answer" style={{ maxHeight: openIndex === index ? '500px' : '0' }}>
                                <p>&gt; [A]: {faq.a}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
