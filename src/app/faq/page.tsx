"use client";

import { useState } from "react";

export default function Faq() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqItems = [
        {
            q: "How do I list an asset on ReliqueX?",
            a: "ReliqueX is a closed-curation protocol. You cannot simply list an asset. You must first submit your item through our \"Submit Asset\" portal. Our team will conduct a preliminary review of the asset's category, brand, and estimated value. If accepted, you'll receive detailed shipping instructions. Only items that pass our rigorous multi-point physical authentication process will be vaulted and fractionalized on-chain. This process typically takes 5–10 business days from the date we receive the asset."
        },
        {
            q: "Who authenticates the items?",
            a: "We employ a network of world-class, licensed appraisers and domain experts. This includes certified horologists for timepieces, sneaker authentication specialists with access to proprietary databases, certified gemologists for jewelry, and fine art authenticators. Each appraiser holds verifiable credentials and signs a cryptographic attestation upon completion, which is permanently recorded on the BNB Chain alongside the asset's vault receipt."
        },
        {
            q: "Where is the physical item stored?",
            a: "Once authenticated, the asset is permanently sealed in one of our partnered, climate-controlled, high-security physical vaults. Our primary facility, \"Facility Alpha,\" is located in Geneva, Switzerland — the gold standard for secure asset custody. Vaults are equipped with 24/7 armed security, biometric access, continuous environmental monitoring, and multi-layer insurance coverage. The asset does not circulate once vaulted."
        },
        {
            q: "What happens if an item fails authentication?",
            a: "We operate a zero-tolerance policy for counterfeit or misrepresented goods. If an item fails our authentication process, it will be returned to the submitter at their expense. No fractional shares will be minted. If the submission is determined to be intentionally fraudulent — for example, a known counterfeit — the submitter's wallet address will be permanently blacklisted from the protocol and reported to relevant authorities."
        },
        {
            q: "Can I ever claim the physical item?",
            a: "Yes. If a single wallet address acquires 100% of the fractional shares for a given vault, that wallet holder gains the exclusive, irrevocable right to initiate a \"Physical Redemption\" request. Upon burning the total token supply, the protocol will coordinate the secure shipment of the physical asset from the vault to the holder's designated address. Standard insurance and shipping fees apply. This is the only mechanism for physical asset extraction."
        }
    ];

    return (
        <main className="page-wrap">
            <div className="container">

                <div className="page-header">
                    <h1 className="page-header__title">THE VAULT PROTOCOL: FAQ</h1>
                    <p className="page-header__sub">&gt; QUERYING_SYSTEM_DATABASE... STATUS: ONLINE.</p>
                </div>

                <div className="faq-list">
                    {faqItems.map((item, index) => (
                        <div key={index} className={`faq-item ${openIndex === index ? 'open' : ''}`}>
                            <button className="faq-question" onClick={() => toggleFaq(index)}>
                                <span>&gt; [Q]: {item.q}</span>
                                <span className="faq-toggle">{openIndex === index ? '[-]' : '[+]'}</span>
                            </button>
                            <div className="faq-answer">
                                <p>&gt; [A]: {item.a}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </main>
    );
}
