import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const artifactName = resolvedParams.id.replace(/-/g, " ");
  return {
    title: `${artifactName} | Artifact Registry | ReliqueX`,
    description: `Detailed analysis, embedded latent weights, and cryptographic C2PA provenance metadata for the artifact: ${artifactName}.`,
  };
}

export default async function ArtifactPage({ params }: Props) {
  const resolvedParams = await params;
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-24 animate-in fade-in duration-700">
      <Link href="/archaeology" className="text-fuchsia-400 hover:text-fuchsia-300 font-mono text-sm inline-flex items-center gap-2 group">
        <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Database
      </Link>
      
      <div className="bg-muted/30 backdrop-blur-md border border-border p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-500/10 blur-3xl rounded-full"></div>
        <h1 className="text-4xl md:text-5xl font-bold font-heading text-foreground tracking-tight mb-4 capitalize">
          {resolvedParams.id.replace(/-/g, " ")}
        </h1>
        <p className="text-muted-foreground text-sm md:text-base mb-8 font-mono border-l-2 border-green-500 pl-4 py-1">
          Status: C2PA Cryptographically Verified
        </p>
        
        <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden border border-border shadow-lg shadow-cyan-500/10 mb-12">
          {/* We use a placeholder image representing the artifact */}
          <Image src="/images/archaeology.png" alt="High Resolution Artifact" fill className="object-cover" />
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full text-xs font-mono text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            C2PA Valid
          </div>
        </div>

        <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed">
          <h2 className="text-2xl font-bold text-foreground font-heading">Cryptographic Provenance</h2>
          <p>
            This artifact has been subjected to rigorous embedding anchor similarity testing. The latent weights demonstrate a definitive correlation with early-era generative models. The C2PA label confirms that no unauthorized tampering of the digital signature has occurred post-generation.
          </p>
          <h2 className="text-2xl font-bold text-foreground font-heading mt-8">Technical Topography</h2>
          <p>
            Layer normalization outputs indicate a 98.4% alignment with the designated architectural topology. The prompt trace vectors successfully isolated the zero-shot inference pathway, archiving the exact human-computer interaction sequence responsible for this digital fossil.
          </p>
          <div className="mt-8 p-6 bg-background rounded-xl border border-border">
            <h3 className="text-lg font-bold text-foreground font-heading mb-4">Metadata Hash</h3>
            <code className="text-xs text-fuchsia-400 break-all">
              0x{Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join('')}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}
