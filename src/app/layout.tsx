import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import RiskDisclosure from "@/components/layout/RiskDisclosure";
import ScrollObserver from "@/components/utils/ScrollObserver";
import { Web3Provider } from "@/lib/web3/Web3Provider";
import "./globals.css";
import "./pages.css";
import "./asset.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ReliqueX — Fractional Luxury on BNB Chain",
  description: "Transforming authenticated high-value assets into fractionalized tokens.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceMono.variable} antialiased`}
      >
        <Web3Provider>
          <ScrollObserver />
          <NavBar />
          {children}
          <RiskDisclosure />
          <Footer />
        </Web3Provider>
      </body>
    </html>
  );
}
