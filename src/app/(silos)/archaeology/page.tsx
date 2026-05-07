import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prompt Archaeology | ReliqueX Archive",
  description: "Search and explore the ReliqueX Prompt Database. Discover cryptographically verified zero-shot inference prompts and their generative outputs.",
};

export default async function ArchaeologyPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const resolvedSearchParams = await searchParams;
  const q = resolvedSearchParams.q;
  const query = typeof q === 'string' ? q : '';
  
  const prompts = await prisma.historicalPrompt.findMany({
    where: {
      OR: [
        { title: { contains: query } },
        { promptText: { contains: query } },
        { modelVersion: { contains: query } }
      ]
    },
    orderBy: { dateOfFirstDiscovery: 'asc' }
  });

  return (
    <div className="space-y-12">
      <div className="border-b border-white/10 pb-8 text-center md:text-left flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-heading tracking-tight">Archaeology: Prompt Database</h1>
          <p className="text-gray-300 mb-8 max-w-2xl text-base leading-relaxed">
            A searchable index of historically significant AI prompts. Discover the 'breakthrough' spells that shaped early model reasoning.
          </p>
          
          {/* Search Bar */}
          <form className="flex flex-col sm:flex-row gap-4 max-w-2xl" action="/archaeology">
          <input 
            type="search" 
            name="q"
            defaultValue={query}
            placeholder="Search for 'Chain of Thought', 'DAN', 'Jailbreak'..." 
            className="flex-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg py-3 px-4 text-white font-mono focus:ring-2 focus:ring-fuchsia-500 focus:outline-none"
            aria-label="Search prompt database"
          />
          <button type="submit" className="px-8 py-3 bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white rounded-lg font-bold hover:opacity-90 transition-opacity">
            Search
          </button>
        </form>

        {/* AdSense for Search (AFS) Placeholder */}
        <div className="w-full max-w-2xl mt-6 p-4 border border-dashed border-white/20 bg-white/5 rounded-lg flex flex-col items-center justify-center text-center">
          <span className="text-gray-500 text-[10px] font-mono uppercase tracking-widest">[ AdSense for Search (AFS) Integration Placeholder ]</span>
        </div>
        </div>
        
        <div className="flex-1 w-full relative h-64 md:h-80 rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-cyan-500/20 hidden md:block">
          <Image src="/images/archaeology.png" alt="AI Archaeology Visualization" fill className="object-cover" priority />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {prompts.map(prompt => (
          <article key={prompt.id} className="relative group bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all duration-300 flex flex-col items-start overflow-hidden shadow-lg">
            {/* Top Icon */}
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center mb-6 shadow-lg shadow-fuchsia-500/20 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            
            <h2 className="text-xl font-bold mb-2 text-white font-heading">{prompt.title}</h2>
            <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-6 flex-1 font-mono bg-white/5 p-3 rounded border-l-2 border-fuchsia-500">
              {prompt.promptText}
            </p>
            
            <Link 
              href={`/archaeology/${prompt.id}`}
              className="text-fuchsia-400 hover:text-fuchsia-300 text-sm font-semibold transition-colors mt-auto flex items-center gap-2 group-hover:translate-x-1 duration-300"
            >
              Read Report
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </article>
        ))}
        {prompts.length === 0 && (
          <div className="col-span-full py-16 text-center text-gray-500 border border-dashed border-white/10 rounded-2xl">
            No historical prompts found matching your query.
          </div>
        )}
      </div>
    </div>
  );
}
