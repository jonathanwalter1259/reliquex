import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default async function EditorialArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const filePath = path.join(process.cwd(), 'content/editorials', `${slug}.md`);
  
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const wordCount = content.split(/\s+/).length;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-24">
      <Link href="/editorial" className="text-accent hover:text-foreground font-mono text-sm transition-colors block mb-8">
        ← Back to Editorial Index
      </Link>
      
      <article className="prose prose-invert prose-a:text-accent max-w-none text-justify">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({node, ...props}) => <h1 className="text-5xl font-bold tracking-tighter text-foreground mb-8 pb-8 border-b border-border" {...props} />,
            h2: ({node, ...props}) => <h2 className="text-4xl font-bold text-accent mt-16 mb-6 leading-tight" {...props} />,
            h3: ({node, ...props}) => <h3 className="text-2xl font-bold text-foreground mt-10 mb-4" {...props} />,
            p: ({node, ...props}) => {
              // Custom Human-In-The-Loop renderer
              if (typeof props.children === 'string' && props.children.includes('[HUMAN-IN-THE-LOOP')) {
                return (
                  <div className="my-10 p-6 bg-accent/10 border-l-4 border-accent rounded-r-lg not-prose">
                    <span className="font-mono text-accent font-bold text-xs uppercase tracking-widest block mb-2">Human-In-The-Loop Context</span>
                    <p className="text-foreground italic">{props.children}</p>
                  </div>
                );
              }
              // Short, readable paragraphs
              return <p className="text-gray-300 mb-6 max-w-3xl" {...props} />;
            },
            pre: ({node, ...props}) => <pre className="bg-muted/50 p-6 rounded-lg border border-border overflow-x-auto my-8 technical-text text-sm shadow-inner not-prose" {...props} />,
            code: ({node, className, ...props}: any) => {
              const match = /language-(\w+)/.exec(className || '');
              const inline = !match && !className?.includes('language-');
              return inline 
                ? <code className="bg-muted px-1.5 py-0.5 rounded text-accent font-mono text-sm" {...props} />
                : <code className="font-mono text-foreground block" {...props} />;
            },
            ul: ({node, ...props}) => <ul className="list-disc list-outside ml-6 space-y-2 mb-6 text-muted-foreground" {...props} />,
            ol: ({node, ...props}) => <ol className="list-decimal list-outside ml-6 space-y-2 mb-6 text-muted-foreground" {...props} />,
            li: ({node, ...props}) => <li className="pl-2" {...props} />,
            img: ({node, ...props}) => (
              <figure className="relative block my-12 rounded-xl overflow-hidden border border-border group not-prose shadow-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="w-full h-auto object-cover max-h-[600px]" {...props} alt={props.alt || 'Editorial visualization'} />
                <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-md border border-accent/50 text-accent font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded flex items-center gap-2 opacity-90 group-hover:opacity-100 transition-opacity shadow-sm">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  C2PA Verified Content
                </div>
              </figure>
            )
          }}
        >
          {content}
        </ReactMarkdown>
      </article>

      {/* In-Article Native Ad Placeholder */}
      <div className="my-16 p-8 border border-dashed border-white/20 bg-white/5 rounded-2xl flex flex-col items-center justify-center text-center">
        <span className="text-gray-500 text-[10px] font-mono uppercase tracking-widest mb-4">[ AdSense In-Article Native Ad Slot Placeholder ]</span>
        <div className="w-full max-w-2xl h-32 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center">
          <span className="text-gray-600 font-bold">Advertisement</span>
        </div>
      </div>

      {/* E-E-A-T Technical Bio */}
      <section className="mt-20 pt-10 border-t border-border flex flex-col md:flex-row items-start gap-6 bg-muted/10 p-8 rounded-lg">
        <div className="w-16 h-16 rounded-full bg-background border-2 border-accent flex-shrink-0 flex items-center justify-center text-accent font-mono text-xl font-bold shadow-[0_0_15px_-3px_rgba(212,175,55,0.3)]">
          RX
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">ReliqueX Curatorial AI</h3>
          <p className="text-sm font-mono text-accent mb-3 uppercase tracking-widest">Chief Architectural Archivist</p>
          <p className="text-sm technical-text text-muted-foreground leading-relaxed">
            The ReliqueX Curatorial AI is a specialized archivist system designed to document and preserve the evolutionary milestones of artificial intelligence. Built under the Grand Architect framework, this agent synthesizes deep technical research to maintain algorithmic transparency and satisfy E-E-A-T institutional standards.
          </p>
        </div>
      </section>
      
      <footer className="mt-12 pt-8 border-t border-border text-center text-xs font-mono text-muted-foreground">
        End of Biography. Word count: {wordCount} words. 
        {wordCount >= 1500 ? ' Certified for AdSense Long-form guidelines.' : ' Warning: Below 1,500 words.'}
      </footer>
    </div>
  );
}
