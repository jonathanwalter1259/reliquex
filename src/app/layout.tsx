import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ReliqueX | Digital Heritage",
  description: "AI heritage museum and prompt database.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border py-4 px-6 flex items-center justify-between shadow-lg">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-8 h-8 rounded-md overflow-hidden bg-muted border border-border group-hover:scale-105 transition-transform shadow-[0_0_15px_-3px_rgba(217,70,239,0.5)]">
                <Image src="/images/logo.png" alt="ReliqueX Logo" fill className="object-cover" />
              </div>
              <span className="font-mono text-xl tracking-tight text-foreground group-hover:text-accent transition-colors">ReliqueX</span>
            </Link>
            <nav className="flex items-center gap-6 text-sm font-mono text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <Link href="/archaeology" className="hover:text-foreground transition-colors">Archaeology</Link>
              <Link href="/lineage" className="hover:text-foreground transition-colors">Lineage</Link>
              <Link href="/artifacts" className="hover:text-foreground transition-colors">Artifacts</Link>
              <Link href="/editorial" className="hover:text-foreground transition-colors">Editorial</Link>
              <ThemeToggle />
            </nav>
          </header>
        <main className="flex-1 max-w-7xl mx-auto w-full p-6">
          {children}
        </main>
        <footer className="border-t border-border bg-muted/30 pt-20 pb-10 px-6 mt-24 text-sm font-sans text-muted-foreground">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
              {/* Brand */}
              <div className="col-span-1 md:col-span-2 space-y-6">
                <Link href="/" className="flex items-center gap-3 group w-fit">
                  <div className="relative w-8 h-8 rounded-md overflow-hidden bg-background border border-border group-hover:scale-105 transition-transform shadow-lg shadow-fuchsia-500/10">
                    <Image src="/images/logo.png" alt="ReliqueX Logo" fill className="object-cover" />
                  </div>
                  <span className="font-mono text-xl tracking-tight text-foreground group-hover:text-accent transition-colors">ReliqueX</span>
                </Link>
                <p className="max-w-sm text-muted-foreground leading-relaxed">
                  The definitive digital heritage museum. Preserving the evolutionary lineage, prompts, and cryptographic artifacts of artificial intelligence for future researchers.
                </p>
                <div className="flex gap-4 pt-2">
                  <a href="#" className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center hover:text-accent hover:border-accent transition-colors" aria-label="Twitter">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center hover:text-accent hover:border-accent transition-colors" aria-label="GitHub">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  </a>
                </div>
              </div>

              {/* Archives */}
              <div className="space-y-6">
                <h3 className="text-foreground font-bold font-heading tracking-tight">The Archives</h3>
                <ul className="space-y-4">
                  <li><Link href="/archaeology" className="hover:text-accent transition-colors block">Prompt Database</Link></li>
                  <li><Link href="/lineage" className="hover:text-accent transition-colors block">Model Lineage DNA</Link></li>
                  <li><Link href="/artifacts" className="hover:text-accent transition-colors block">Latent Space Artifacts</Link></li>
                  <li><Link href="/editorial" className="hover:text-accent transition-colors block">Curatorial Editorial</Link></li>
                </ul>
              </div>

              {/* Institution */}
              <div className="space-y-6">
                <h3 className="text-foreground font-bold font-heading tracking-tight">Institution</h3>
                <ul className="space-y-4">
                  <li><Link href="/about-us" className="hover:text-accent transition-colors block">About the Museum</Link></li>
                  <li><Link href="/contact-us" className="hover:text-accent transition-colors block">Contact Archivists</Link></li>
                  <li><Link href="/privacy-policy" className="hover:text-accent transition-colors block">Privacy & Telemetry</Link></li>
                  <li><Link href="#" className="hover:text-accent transition-colors block">C2PA Verification API</Link></li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <p>© {new Date().getFullYear()} ReliqueX Digital Heritage Museum. All rights reserved.</p>
              <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono">
                <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
                <Link href="#" className="hover:text-foreground transition-colors">Cookie Policy</Link>
                <div className="flex items-center gap-2 border border-border bg-background px-3 py-1.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
                  <span>All Systems Operational</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
