import fs from 'fs';
import path from 'path';
import Link from 'next/link';

export default async function EditorialPage() {
  const contentDir = path.join(process.cwd(), 'content/editorials');
  const files = fs.existsSync(contentDir) ? fs.readdirSync(contentDir).filter(f => f.endsWith('.md')) : [];

  return (
    <div className="space-y-8 pb-24">
      <header className="border-b border-border pb-6">
        <h1 className="text-4xl font-bold text-accent">Editorial: Technical Biographies</h1>
        <p className="technical-text text-muted-foreground mt-4 text-lg max-w-3xl">
          Long-form, comprehensive technical analyses detailing the engineering breakthroughs behind foundational models. Each biography exceeds 1,500 words and documents the exact architectural milestones of the generative era.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {files.map(file => {
          const slug = file.replace('.md', '');
          const content = fs.readFileSync(path.join(contentDir, file), 'utf-8');
          const titleMatch = content.match(/^# (.*)/);
          const title = titleMatch ? titleMatch[1] : slug;

          return (
            <article key={slug} className="border border-border bg-muted/10 p-6 rounded-lg hover:border-accent/50 transition-colors">
              <h2 className="text-2xl font-bold text-foreground mb-2">{title}</h2>
              <p className="technical-text text-sm text-muted-foreground mb-6">
                Technical Biography • Human-in-the-loop insights included • AdSense Long-form Compliant
              </p>
              <Link 
                href={`/editorial/${slug}`}
                className="text-accent hover:text-foreground text-sm font-bold font-mono transition-colors"
              >
                [Read Full Biography →]
              </Link>
            </article>
          );
        })}
        {files.length === 0 && (
          <p className="text-muted-foreground technical-text">No editorial articles found.</p>
        )}
      </div>
    </div>
  );
}
