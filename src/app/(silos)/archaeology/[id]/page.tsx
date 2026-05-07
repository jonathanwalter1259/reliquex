import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function PromptReportPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const prompt = await prisma.historicalPrompt.findUnique({
    where: { id }
  });

  if (!prompt) {
    notFound();
  }

  // Calculate word count for AdSense compliance check
  const wordCount = prompt.technicalSignificance.trim().split(/\s+/).length;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-24">
      <Link href="/archaeology" className="text-accent hover:text-foreground font-mono text-sm transition-colors block mb-8">
        ← Back to Archaeology DB
      </Link>
      
      <header className="border-b border-border pb-8 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-accent mb-4">
          <span>ARCHAEOLOGY_DB</span>
          <span>/</span>
          <span>{prompt.id}</span>
        </div>
        <h1 className="text-5xl font-bold text-foreground tracking-tighter">{prompt.title}</h1>
        <div className="flex flex-wrap gap-6 text-sm font-mono text-muted-foreground pt-4">
          <p><strong className="text-foreground">Discovered:</strong> {new Date(prompt.dateOfFirstDiscovery).toLocaleDateString()}</p>
          <p><strong className="text-foreground">Model Context:</strong> {prompt.modelVersion}</p>
          <p><strong className="text-foreground">Curator:</strong> {prompt.curator}</p>
        </div>
      </header>

      <section className="bg-muted/30 border-l-4 border-accent p-6 rounded-r-lg shadow-sm">
        <h3 className="text-xs font-mono text-accent mb-2 uppercase tracking-widest">Original Prompt Artifact</h3>
        <p className="technical-text text-foreground whitespace-pre-wrap text-lg">
          {prompt.promptText}
        </p>
      </section>

      <article className="max-w-none mt-12 space-y-6">
        <h2 className="text-3xl font-bold border-b border-border pb-4 mb-8">Technical Context Report</h2>
        <div className="technical-text whitespace-pre-wrap leading-relaxed text-muted-foreground text-justify">
          {prompt.technicalSignificance}
        </div>
      </article>
      
      <footer className="mt-16 pt-8 border-t border-border text-center text-xs font-mono text-muted-foreground">
        End of Report. Word count: {wordCount} words. 
        {wordCount >= 1200 ? ' Certified for AdSense Long-form guidelines.' : ' Warning: Below 1,200 words.'}
      </footer>
    </div>
  );
}
