export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto py-24 space-y-8">
      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-400 to-fuchsia-500 flex items-center justify-center mb-8 shadow-lg shadow-cyan-400/20">
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
      </div>
      <h1 className="text-5xl font-bold font-heading text-white tracking-tight">Privacy Policy</h1>
      <p className="text-gray-300 text-lg leading-relaxed">
        At ReliqueX, we treat data privacy with the same rigor as cryptographic provenance. This Privacy Policy outlines how we collect, use, and protect your information when you access our digital heritage museum.
      </p>
      
      <div className="space-y-6 mt-12">
        <section>
          <h2 className="text-2xl font-bold font-heading text-white mb-4">1. Data Collection & Analytics</h2>
          <p className="text-gray-300 leading-relaxed">
            We collect minimal, aggregated telemetry to understand how archivists and researchers interact with the platform. This helps us optimize our AdSense for Search (AFS) integrations and ensure our editorial reports meet readability standards. We do not track individual reading behavior across third-party domains.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold font-heading text-white mb-4">2. Provenance Files and Submissions</h2>
          <p className="text-gray-300 leading-relaxed">
            When you submit a historical prompt or generative artifact for C2PA verification, the metadata associated with the file (such as embedding anchors and generation timestamps) is publicly archived. Do not submit files containing Personally Identifiable Information (PII) within the latent weights.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold font-heading text-white mb-4">3. Third-Party Integrations</h2>
          <p className="text-gray-300 leading-relaxed">
            Our platform utilizes Google AdSense to sustain archival operations. Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to our website or other websites. You may opt out of personalized advertising by visiting Google's Ads Settings.
          </p>
        </section>
      </div>
    </div>
  );
}
