export default function Terms() {
  return (
    <main className="page-wrap">
        <div className="container">

            <div className="page-header" >
                <h1 className="page-header__title">LEGAL MANDATE // TERMS OF SERVICE</h1>
                <p className="page-header__sub">&gt; EXECUTING_CUSTODY_AGREEMENT.EXE</p>
            </div>

            {/*  Terminal Window  */}
            <div className="terms-terminal">
                <div className="terms-terminal__bar">
                    <span className="terms-dot terms-dot--red"></span>
                    <span className="terms-dot terms-dot--yellow"></span>
                    <span className="terms-dot terms-dot--green"></span>
                    <span className="terms-terminal__filename">reliquex_tos_v2.6.sol</span>
                </div>
                <div className="terms-terminal__body">

                    <div className="terms-clause">
                        <div className="terms-clause__header"><span className="terms-line-num">01</span> [CLAUSE 01]:
                            TRANSFER_OF_CUSTODY</div>
                        <p className="terms-clause__text">By shipping an asset to the ReliqueX Vault, the Submitter agrees
                            to a full, unconditional transfer of physical custody to the ReliqueX Protocol for the
                            duration of the fractionalization period. The Submitter retains no right to recall, access,
                            or redirect the physical asset while fractional shares remain outstanding. This transfer is
                            initiated upon our confirmed receipt of the asset and is formalized upon the minting of the
                            corresponding vault receipt token on the BNB Chain. The Submitter acknowledges that this
                            custody transfer is a prerequisite for participation in the protocol and that any attempt to
                            circumvent or reverse this process may result in legal action.</p>
                    </div>

                    <div className="terms-clause">
                        <div className="terms-clause__header"><span className="terms-line-num">02</span> [CLAUSE 02]:
                            THE_AUTHENTICATION_MANDATE</div>
                        <p className="terms-clause__text">ReliqueX reserves the absolute, uncontestable right to reject any
                            submitted asset at any stage of the authentication pipeline. Our appraisal network operates
                            autonomously and is not subject to appeal. An asset may be rejected for, but not limited to,
                            the following reasons: failed authenticity check, condition below protocol standards,
                            insufficient provenance documentation, or market illiquidity concerns. Rejected assets will
                            be returned to the sender at the sender's cost. No explanation beyond the defined rejection
                            code is guaranteed. The protocol's decision is final and binding.</p>
                    </div>

                    <div className="terms-clause">
                        <div className="terms-clause__header"><span className="terms-line-num">03</span> [CLAUSE 03]:
                            VAULT_INSURANCE_AND_LIABILITY</div>
                        <p className="terms-clause__text">All vaulted assets are insured against theft, fire, water damage,
                            and natural disaster by a leading global specialty insurer up to the appraised value at the
                            time of vaulting. ReliqueX is not liable for market depreciation of the underlying physical
                            asset or the value of its corresponding fractional shares. Insurance claims are processed
                            through the insurer's standard protocol; ReliqueX acts as the administrative liaison but
                            makes no guarantee on claim timelines or outcomes. Force majeure events, acts of war,
                            regulatory seizure, or government confiscation are explicitly excluded from coverage under
                            this policy.</p>
                    </div>

                    <div className="terms-clause">
                        <div className="terms-clause__header"><span className="terms-line-num">04</span> [CLAUSE 04]:
                            FRAUD_AND_BLACKLISTING</div>
                        <p className="terms-clause__text">Attempting to submit known counterfeit, stolen, or encumbered
                            assets to the ReliqueX Vault constitutes a criminal offense and a fundamental breach of this
                            agreement. Upon detection — whether during preliminary review, physical authentication, or
                            post-vaulting audit — the offending wallet address and all associated addresses will be
                            permanently blacklisted from all ReliqueX protocol interactions. The protocol reserves the
                            right to share identifying information with law enforcement, partner protocols, and
                            blockchain forensic firms. All costs associated with investigation and asset recovery will
                            be pursued against the offender to the fullest extent of applicable law.</p>
                    </div>

                    <div className="terms-clause">
                        <div className="terms-clause__header"><span className="terms-line-num">05</span> [CLAUSE 05]:
                            GOVERNING_LAW</div>
                        <p className="terms-clause__text">This agreement is governed by the laws of the Swiss Confederation.
                            Any disputes arising from or in connection with this agreement shall be submitted to the
                            exclusive jurisdiction of the courts of Geneva Canton. The Submitter irrevocably consents to
                            this jurisdiction. Smart contract interactions on the BNB Chain are considered
                            self-executing and are not subject to reversal except as explicitly defined by the
                            protocol's governance mechanism.</p>
                    </div>

                    <div className="terms-footer">
                        <p>// END_OF_CONTRACT</p>
                        <p>// COMPILED: 2026-01-15 | VERSION: 2.6.0</p>
                        <p>// DEPLOYER: 0x8F9a...c4E7 | CHAIN_ID: 56 (BNB)</p>
                    </div>

                </div>
            </div>

        </div>
    </main>
  );
}
