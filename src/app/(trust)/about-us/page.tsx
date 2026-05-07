export default function AboutUsPage() {
  return (
    <div className="max-w-3xl mx-auto py-24 space-y-8">
      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center mb-8 shadow-lg shadow-fuchsia-500/20">
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      </div>
      <h1 className="text-5xl font-bold font-heading text-white tracking-tight">About ReliqueX</h1>
      <p className="text-gray-300 text-lg leading-relaxed">
        The mission of ReliqueX is to document the evolutionary milestones of artificial intelligence. We believe that early language models, multi-modal systems, and generative structures are not just deprecated code; they are digital artifacts that represent the cognitive evolution of human-machine interaction.
      </p>
      <h2 className="text-2xl font-bold font-heading text-white mt-12 mb-4">Our Institutional Mandate</h2>
      <p className="text-gray-300 leading-relaxed mb-6">
        As models continue to scale, the provenance of generated content becomes increasingly opaque. Our platform provides a verifiable lineage for these synthetic outputs. By cataloging historically significant prompts and mapping embedding space geometries, we create an epistemic anchor for future researchers.
      </p>
      <h2 className="text-2xl font-bold font-heading text-white mt-12 mb-4">The Grand Architect Framework</h2>
      <p className="text-gray-300 leading-relaxed mb-6">
        All entries within the ReliqueX archives are strictly validated through the Grand Architect framework. This ensures that every technical biography, model DNA analysis, and generative artifact meets stringent E-E-A-T (Experience, Expertise, Authoritativeness, and Trustworthiness) standards, complete with C2PA metadata labeling.
      </p>
    </div>
  );
}
