import type { Metadata } from "next";

import { Geist, Geist_Mono, Fira_Sans} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import AssetChainBadge from "@/components/assetChainBadge";


const firaSans = Fira_Sans({
  subsets: ['latin'], 
  weight: ['400', '500', '600', '700'],
  variable: '--font-fira-sans', 
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Asset chain",
  description: "Africa's first blockchain",
  icons: {
    icon: "/assetChain.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${firaSans.variable} antialiased  flex flex-col`}
      >
        <AssetChainBadge/>
        <Navbar/>
        <main className="flex-grow overflow-y-auto">
        {children}
        </main>
        <footer className="bg-[#0B131E] text-white">
        <Footer/>
        </footer>
      </body>
    </html>
  );
}
