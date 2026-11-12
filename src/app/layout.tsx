import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mastra Neural Research Agent // UE5 Interface",
  description: "Unreal Engine-inspired autonomous digital research intelligence powered by Mastra & Gemini",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen bg-[#05070f] ue-grid-bg text-slate-200 selection:bg-cyan-500/30 selection:text-cyan-200">
        {children}
      </body>
    </html>
  );
}
