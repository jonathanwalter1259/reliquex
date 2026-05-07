import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ReliqueX | Digital Heritage Museum & AI Archive",
  description: "ReliqueX is the definitive digital heritage museum. Explore our cryptographic provenance database, model lineage DNA, and C2PA-verified generative artifacts.",
};

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen space-y-24 py-12">
      {/* Premium Dark SaaS Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between gap-12 w-full max-w-6xl mx-auto py-12 lg:py-24 relative overflow-hidden">
        {/* Left Side: Typography */}
        <div className="flex-1 space-y-8 z-10 text-left">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white font-heading leading-[1.1]">
            The Digital Heritage<br/>in seconds
          </h1>
          <p className="text-base text-gray-300 max-w-lg font-sans leading-relaxed">
            Preserving the lineage of artificial intelligence through curated prompt databases, generational models, and verifiable artifacts.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link href="/editorial" className="px-6 py-3 rounded-full bg-transparent border border-white/20 text-white font-semibold text-sm hover:bg-white/5 transition-colors">
              FREE TRIAL
            </Link>
            <Link href="/archaeology" className="px-6 py-3 rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white font-semibold text-sm hover:opacity-90 transition-opacity">
              SIGN UP WITH GOOGLE
            </Link>
          </div>
        </div>

        {/* Right Side: Floating Gradient Blob & Cards */}
        <div className="flex-1 relative w-full h-[400px] flex items-center justify-center lg:justify-end mt-12 lg:mt-0">
          {/* Gradient Blobs */}
          <div className="absolute right-0 lg:right-10 w-64 h-72 md:w-80 md:h-96 bg-gradient-to-br from-cyan-400 via-fuchsia-500 to-purple-600 rounded-3xl opacity-80 blur-2xl animate-pulse mix-blend-screen"></div>
          <div className="absolute right-0 lg:right-10 w-56 h-64 md:w-72 md:h-80 bg-gradient-to-br from-cyan-400 via-fuchsia-500 to-purple-600 rounded-[30px] opacity-100 shadow-[0_0_40px_-10px_rgba(217,70,239,0.4)]"></div>
          
          {/* Floating Cards (Glassmorphism) */}
          <div className="relative z-10 flex flex-col gap-4 w-64 translate-x-4 lg:-translate-x-12">
            <div className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-2xl flex items-center gap-4 transform hover:-translate-y-1 transition-transform">
              <div className="w-6 h-6 rounded-full bg-cyan-400 flex items-center justify-center text-background text-xs font-bold">✓</div>
              <span className="text-white text-sm font-semibold">GPT-3 from OpenAI</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-2xl flex items-center gap-4 transform translate-x-8 hover:-translate-y-1 transition-transform">
              <div className="w-6 h-6 rounded-full bg-fuchsia-500 flex items-center justify-center text-background text-xs font-bold">✓</div>
              <span className="text-white text-sm font-semibold">30+ AI Models</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-2xl flex items-center gap-4 transform hover:-translate-y-1 transition-transform">
              <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-background text-xs font-bold">✓</div>
              <span className="text-white text-sm font-semibold">C2PA Verified</span>
            </div>
          </div>
        </div>
      </section>

      {/* Global Search Bar (AFS Optimized) */}
      <section className="w-full max-w-6xl mx-auto flex flex-col items-center">
        <form 
          action="/archaeology" 
          method="GET"
          className="w-full max-w-3xl relative group"
          role="search"
          aria-label="Sitewide search"
        >
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400 group-focus-within:text-fuchsia-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="search"
            name="q"
            className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all shadow-inner"
            placeholder="Search artifacts, prompts, or neural fossils..."
            required
          />
          <button 
            type="submit"
            className="absolute inset-y-2 right-2 px-6 bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white font-semibold text-sm rounded-lg hover:opacity-90 transition-opacity"
          >
            Query
          </button>
        </form>
      </section>

      {/* Informative Article Section for AdSense Compliance */}
      <section className="w-full max-w-6xl mx-auto py-16 px-6 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white font-heading tracking-tight border-b border-white/10 pb-4">
              The Critical Need for AI Provenance
            </h2>
            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
              <p>
                As artificial intelligence continues to scale exponentially, the boundaries between human-generated and machine-generated content have become increasingly indistinguishable. In the early 2020s, foundational models like <span className="bg-white/10 text-fuchsia-400 px-1.5 py-0.5 rounded font-mono text-sm tracking-tight border border-white/20">GPT-3</span>, <span className="bg-white/10 text-fuchsia-400 px-1.5 py-0.5 rounded font-mono text-sm tracking-tight border border-white/20">Claude</span>, and early iterations of <span className="bg-white/10 text-cyan-400 px-1.5 py-0.5 rounded font-mono text-sm tracking-tight border border-white/20">Stable Diffusion</span> introduced a paradigm shift in generative computation. However, this rapid advancement brought forth a critical epistemic crisis: the loss of digital provenance.
              </p>
              <p>
                ReliqueX was established to solve this architectural dilemma. We operate as a digital heritage museum, dedicated to the rigorous preservation, cataloging, and cryptographic verification of AI artifacts. Unlike traditional code repositories that merely store weights and biases, our platform is designed to archive the <em>prompts</em>—the human-computer interaction layer that dictates model reasoning.
              </p>
              <h3 className="text-2xl font-bold text-white font-heading mt-8">Cryptographic Verification and C2PA</h3>
              <p>
                Every artifact stored within the ReliqueX silos undergoes strict verification through the Coalition for Content Provenance and Authenticity (C2PA) standards. This open technical standard allows publishers, creators, and consumers to trace the origin of different types of media. When an artifact is ingested into our system, we parse its latent metadata to extract the exact generative lineage. 
              </p>
              <p>
                This ensures that historians and researchers can conclusively identify whether a specific logical output was the result of a proprietary LLM's zero-shot inference or a highly fine-tuned open-source derivative. Without these immutable cryptographic hashes, the historical context of AI's evolutionary tree would be lost to data decay.
              </p>
              <h3 className="text-2xl font-bold text-white font-heading mt-8">Embedding Anchor Topologies</h3>
              <p>
                Beyond cryptographic signatures, our proprietary DNA Analyzer utilizes embedding anchor similarities to fingerprint model outputs. By mapping the high-dimensional latent space of generated text, we can construct topological representations of a model's 'reasoning' pathways. Different architectures distribute token probabilities distinctly; the layer normalization techniques (such as RMSNorm) leave a microscopic watermark on the output distribution.
              </p>
              <p>
                The ReliqueX Grand Architect framework synthesizes this complex matrix of statistical behaviors to grant every artifact a definitive 'Provenance Score'. This methodology is not merely an academic exercise—it is the foundational infrastructure required to govern the future epistemic web.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold text-white font-heading mb-4 border-b border-white/10 pb-2">Featured Archives</h3>
              <ul className="space-y-4 pt-2">
                <li>
                  <Link href="/editorial/gpt-2-to-gpt-4o" className="block group">
                    <h4 className="text-fuchsia-400 font-semibold group-hover:text-fuchsia-300 transition-colors">The Evolution to GPT-4o</h4>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">A comprehensive technical breakdown of OpenAI's architectural shifts and tokenizer optimizations.</p>
                  </Link>
                </li>
                <li className="border-t border-white/10 pt-4">
                  <Link href="/editorial/diffusion-models" className="block group">
                    <h4 className="text-fuchsia-400 font-semibold group-hover:text-fuchsia-300 transition-colors">DDPM & Stable Diffusion</h4>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">Analyzing the latent space denoising equations that birthed the modern generative art era.</p>
                  </Link>
                </li>
                <li className="border-t border-white/10 pt-4">
                  <Link href="/lineage" className="block group">
                    <h4 className="text-cyan-400 font-semibold group-hover:text-cyan-300 transition-colors">Model DNA Fingerprinting</h4>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">Access the DNA Analyzer to reverse-engineer embedding anchor similarities.</p>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Sidebar Ad Placeholder */}
            <div className="w-full h-[400px] border border-dashed border-white/20 bg-white/5 rounded-2xl flex flex-col items-center justify-center text-center p-4">
              <span className="text-gray-500 text-[10px] font-mono uppercase tracking-widest mb-4">[ AdSense Vertical Banner Placeholder ]</span>
              <span className="text-gray-600 font-bold">Advertisement</span>
            </div>
          </div>
        </div>
      </section>

      {/* Try out for free now (Gradient CTA Box) */}
      <section className="w-full max-w-4xl mx-auto mt-24 mb-12 px-6 lg:px-0">
        <div className="relative bg-gradient-to-r from-purple-600 via-fuchsia-500 to-cyan-400 p-1 rounded-[2rem] overflow-hidden shadow-[0_0_50px_-10px_rgba(217,70,239,0.5)]">
          <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full"></div>
          <div className="relative bg-[#0a0a0c]/80 backdrop-blur-xl rounded-[1.8rem] p-12 md:p-16 text-center space-y-6">
            <h2 className="text-4xl font-bold text-white font-heading tracking-tight">Try out for free now</h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-base leading-relaxed">
              Tailor your vehicle with clicks. By being able to update your fund documents in Real-Time, you make investors negotiations last hours instead of months.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <button className="w-full sm:w-auto px-8 py-3 rounded-full bg-transparent border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors text-sm">
                SIGN UP WITH EMAIL
              </button>
              <button className="w-full sm:w-auto px-8 py-3 rounded-full bg-cyan-500 text-white font-semibold hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/30 text-sm">
                SIGN UP WITH GOOGLE
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
