'use client';

import { useState } from 'react';

type AnalysisResult = {
  embeddingSimilarity: number;
  normFingerprint: string;
  c2paSigned: boolean;
  provenanceScore: number;
  detectedModel: string;
};

export default function DNAAnalyzer() {
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    setIsAnalyzing(true);
    setResult(null);

    // Simulate backend analysis delay
    await new Promise(resolve => setTimeout(resolve, 2500));

    // Mock analysis logic based on text length/content
    const lengthSeed = text.length;
    const score = Math.min(99.9, Math.max(45.2, 85 + (lengthSeed % 15) - 5));
    
    setResult({
      embeddingSimilarity: Number((score - (lengthSeed % 5)).toFixed(2)),
      normFingerprint: `0x${Buffer.from(text.substring(0, 8)).toString('hex') || 'a1b2c3d4'}...`,
      c2paSigned: lengthSeed % 2 === 0,
      provenanceScore: score,
      detectedModel: score > 90 ? 'GPT-4 Architecture' : (score > 75 ? 'Claude 3 Family' : 'Unknown / Open Source'),
    });
    
    setIsAnalyzing(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto border border-border bg-muted/10 p-6 rounded-xl mt-12 mb-12 shadow-xl">
      <div className="border-b border-border pb-4 mb-6">
        <h2 className="text-2xl font-bold text-accent font-mono uppercase tracking-widest">Model DNA Analyzer</h2>
        <p className="text-sm technical-text text-muted-foreground mt-2">Upload text to perform Embedding Anchor Similarity and Norm Layer Fingerprinting.</p>
      </div>

      <form onSubmit={handleAnalyze} className="space-y-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste sample synthetic text here for provenance analysis..."
          className="w-full h-40 bg-muted/40 border border-border rounded-lg p-4 font-mono text-foreground focus:ring-2 focus:ring-accent focus:outline-none technical-text resize-none"
          required
        />
        <button 
          type="submit" 
          disabled={isAnalyzing}
          className="w-full py-3 bg-accent text-background font-bold rounded-lg hover:bg-accent-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-mono uppercase tracking-widest"
        >
          {isAnalyzing ? 'Running DNA Analysis Pipeline...' : 'Analyze DNA Signature'}
        </button>
      </form>

      {result && (
        <div className="mt-8 border-t border-border pt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h3 className="text-xl font-bold text-foreground mb-6">Provenance Score Dashboard</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-background border border-border p-4 rounded-lg flex flex-col items-center justify-center space-y-2">
              <span className="text-xs text-muted-foreground uppercase tracking-widest font-mono">Overall Score</span>
              <span className={`text-5xl font-bold ${result.provenanceScore > 85 ? 'text-green-500' : 'text-accent'}`}>
                {result.provenanceScore.toFixed(1)}
              </span>
              <span className="text-xs text-foreground font-mono">/ 100.0</span>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm font-mono border-b border-border pb-2">
                <span className="text-muted-foreground">Detected Lineage:</span>
                <span className="text-accent font-bold">{result.detectedModel}</span>
              </div>
              
              <div className="flex justify-between items-center text-sm font-mono border-b border-border pb-2">
                <span className="text-muted-foreground">Embedding Anchor Sim:</span>
                <span className="text-foreground">{result.embeddingSimilarity}%</span>
              </div>

              <div className="flex justify-between items-center text-sm font-mono border-b border-border pb-2">
                <span className="text-muted-foreground">Norm Layer Fingerprint:</span>
                <span className="text-foreground break-all">{result.normFingerprint}</span>
              </div>

              <div className="flex justify-between items-center text-sm font-mono">
                <span className="text-muted-foreground">C2PA Metadata Signing:</span>
                <span className={result.c2paSigned ? 'text-green-500 font-bold' : 'text-red-400 font-bold'}>
                  {result.c2paSigned ? 'VALID SIGNATURE' : 'NO SIGNATURE'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
