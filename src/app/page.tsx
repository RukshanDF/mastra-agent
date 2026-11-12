"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  Cpu,
  Terminal,
  Activity,
  Zap,
  Globe,
  Radio,
  Copy,
  Check,
  RefreshCw,
  ExternalLink,
  ShieldAlert,
} from "lucide-react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const sampleNodes = [
    "Quantum Superposition & Qubits",
    "James Webb Deep Field Discoveries",
    "Artificial General Intelligence Timelines",
    "Thermonuclear Fusion Reactors",
  ];

  async function handleResearch(searchQuery?: string) {
    const q = searchQuery || query;
    if (!q.trim() || loading) return;

    setLoading(true);
    setError(null);
    setReport(null);

    try {
      const res = await fetch("/api/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Neural synthesis link aborted.");
      }

      setReport(data.text);
    } catch (err: any) {
      setError(err?.message || "Telemetry error during vector extraction.");
    } finally {
      setLoading(false);
    }
  }

  function copyToClipboard() {
    if (!report) return;
    navigator.clipboard.writeText(report);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="relative min-h-screen text-slate-200">
      {/* Top HUD Telemetry Ribbon */}
      <header className="border-b border-cyan-500/20 bg-black/40 backdrop-blur-md px-4 py-2 font-mono text-xs">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3 text-cyan-400/80">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="text-cyan-300 font-semibold tracking-wider">
                CORE // RUNTIME_ACTIVE
              </span>
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden sm:inline text-slate-400">
              FRAMEWORK: <span className="text-cyan-300">MASTRA v0.2</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>
              SYNAPSE: <span className="text-purple-400">GEMINI_FLASH</span>
            </span>
            <span className="text-slate-600">|</span>
            <span>
              ORACLE: <span className="text-emerald-400">WIKIPEDIA_DB</span>
            </span>
          </div>
        </div>
      </header>

      {/* Main Digital Interface Container */}
      <main className="max-w-5xl mx-auto px-4 py-10 sm:px-6">
        {/* Unreal Engine Brand Deck */}
        <div className="text-center space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-cyan-500/30 bg-cyan-950/30 text-cyan-400 text-xs font-mono tracking-widest uppercase">
            <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
            AUTONOMOUS RESEARCH PROTOCOL // MK-IV
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase font-mono">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-200 to-purple-400 glow-cyan">
              NEURAL RESEARCH
            </span>{" "}
            AGENT
          </h1>

          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base font-sans">
            Enter a target topic into the neural matrix. The Mastra agent
            autonomously dispatches real-time retrieval probes to Wikipedia,
            analyzes vector snippets, and compiles high-fidelity intelligence dossiers.
          </p>
        </div>

        {/* HUD Command Console / Input Deck */}
        <div className="hud-card rounded-xl p-5 mb-8 transition-all">
          {/* Card Corner Tech Decals */}
          <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20 mb-4 text-[11px] font-mono text-cyan-500/80">
            <span className="flex items-center gap-1.5 uppercase tracking-wider">
              <Terminal className="w-3.5 h-3.5" />
              QUERY_INJECTION_NODE
            </span>
            <span className="text-slate-500">[0x7F_ONLINE]</span>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleResearch();
            }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-1">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ENTER RESEARCH DIRECTIVE (E.G. 'NUCLEAR FUSION')..."
                className="w-full px-4 py-3.5 text-slate-100 placeholder-slate-500 bg-black/60 border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-mono text-sm tracking-wide transition shadow-inner"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="relative group px-6 py-3.5 rounded-lg font-mono text-sm uppercase tracking-wider font-bold transition-all overflow-hidden bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-black disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(6,182,212,0.4)]"
            >
              <span className="flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <Activity className="w-4 h-4 animate-spin" />
                    EXECUTING...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    DISPATCH PROBE
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Preset Intelligence Chips */}
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="text-slate-500 uppercase flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" /> DIRECTIVES:
            </span>
            {sampleNodes.map((node) => (
              <button
                key={node}
                type="button"
                onClick={() => {
                  setQuery(node);
                  handleResearch(node);
                }}
                disabled={loading}
                className="px-2.5 py-1 rounded bg-black/50 border border-slate-700/60 hover:border-cyan-500/50 hover:bg-cyan-950/30 text-slate-300 hover:text-cyan-300 transition text-[11px]"
              >
                + {node}
              </button>
            ))}
          </div>
        </div>

        {/* Loading / Compiling Visualizer */}
        {loading && (
          <div className="hud-card rounded-xl p-8 mb-8 text-center border-cyan-500/50 space-y-4 shadow-[0_0_35px_rgba(6,182,212,0.15)] animate-pulse">
            <div className="inline-flex p-4 rounded-xl bg-cyan-950/50 border border-cyan-500/40 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              <Activity className="w-8 h-8 animate-spin" />
            </div>
            <div className="space-y-1 font-mono">
              <div className="text-cyan-300 font-bold text-sm tracking-widest uppercase">
                // AGENT SYNAPSE ENGAGED
              </div>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                MASTRA CORE IS SEARCHING WIKIPEDIA NODES // COMPILING VECTOR KNOWLEDGE VIA GEMINI
              </p>
            </div>
            {/* Holographic Progress Bar */}
            <div className="w-48 mx-auto h-1 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 animate-[pulse_1s_infinite]"></div>
            </div>
          </div>
        )}

        {/* Diagnostic Error Deck */}
        {error && !loading && (
          <div className="rounded-xl bg-red-950/40 border border-red-500/50 p-4 mb-8 text-red-300 text-xs font-mono flex items-start gap-3 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
            <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold uppercase tracking-wider block mb-1">
                ERROR CODE: PROBE_TRANSMISSION_FAILED
              </span>
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Synthesized Intelligence Dossier */}
        {report && !loading && (
          <div className="hud-card rounded-xl overflow-hidden mb-8 border-cyan-500/40 shadow-[0_0_35px_rgba(6,182,212,0.12)]">
            {/* Dossier Header Decal */}
            <div className="flex items-center justify-between px-6 py-3.5 bg-black/60 border-b border-cyan-500/30 font-mono text-xs">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold tracking-wider">
                <Globe className="w-4 h-4 text-cyan-400" />
                <span>INTELLIGENCE_DOSSIER // DECLASSIFIED</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={copyToClipboard}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 hover:text-cyan-300 bg-slate-900/80 hover:bg-cyan-950/40 border border-slate-700/60 hover:border-cyan-500/40 rounded transition"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      BUFFER_COPIED
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      DUMP BUFFER
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setReport(null);
                    setQuery("");
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 hover:text-red-300 bg-slate-900/80 hover:bg-red-950/30 border border-slate-700/60 hover:border-red-500/40 rounded transition"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  PURGE
                </button>
              </div>
            </div>

            {/* Dossier Content / Markdown Reader */}
            <div className="p-6 sm:p-10 space-y-4 text-slate-300 leading-relaxed font-sans text-sm sm:text-base">
              <ReactMarkdown
                components={{
                  h2: ({ ...props }) => (
                    <h2
                      className="text-xl sm:text-2xl font-bold font-mono tracking-wide text-cyan-300 mt-8 mb-4 border-b border-cyan-500/20 pb-2 flex items-center gap-2 uppercase first:mt-0 glow-cyan"
                      {...props}
                    />
                  ),
                  h3: ({ ...props }) => (
                    <h3
                      className="text-lg font-semibold font-mono text-purple-300 mt-6 mb-2 flex items-center gap-1.5 uppercase"
                      {...props}
                    />
                  ),
                  p: ({ ...props }) => (
                    <p className="mb-4 leading-relaxed text-slate-300" {...props} />
                  ),
                  ul: ({ ...props }) => (
                    <ul
                      className="list-none pl-2 mb-5 space-y-2 text-slate-300 font-sans"
                      {...props}
                    />
                  ),
                  ol: ({ ...props }) => (
                    <ol
                      className="list-decimal pl-6 mb-5 space-y-2 text-slate-300"
                      {...props}
                    />
                  ),
                  li: ({ children, ...props }) => (
                    <li className="flex items-start gap-2" {...props}>
                      <span className="text-cyan-400 font-mono text-xs mt-1">▸</span>
                      <span className="flex-1">{children}</span>
                    </li>
                  ),
                  a: ({ href, children, ...props }) => (
                    <a
                      href={href}
                      className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-200 underline font-mono text-sm hover:glow-cyan transition"
                      target="_blank"
                      rel="noreferrer"
                      {...props}
                    >
                      {children}
                      <ExternalLink className="w-3 h-3 inline" />
                    </a>
                  ),
                  blockquote: ({ ...props }) => (
                    <blockquote
                      className="border-l-2 border-cyan-500/50 bg-cyan-950/20 px-4 py-2 my-4 italic text-cyan-200/90 rounded-r font-mono text-xs"
                      {...props}
                    />
                  ),
                }}
              >
                {report}
              </ReactMarkdown>
            </div>
          </div>
        )}

        {/* Idle Radar State */}
        {!report && !loading && !error && (
          <div className="border border-dashed border-cyan-500/20 rounded-xl p-12 text-center text-slate-500 bg-black/20 font-mono">
            <Radio className="w-8 h-8 mx-auto mb-3 text-cyan-500/40 animate-pulse" />
            <p className="text-xs uppercase tracking-widest text-slate-400">
              STANDBY // SYSTEM READY
            </p>
            <p className="text-[11px] text-slate-600 mt-1">
              Select a directive above or inject your own query into the neural engine.
            </p>
          </div>
        )}
      </main>

      {/* Cybernetic HUD Footer */}
      <footer className="border-t border-slate-900 bg-black/60 px-4 py-3 font-mono text-[11px] text-slate-600 text-center">
        <span>MASTRA AGENT ARCHITECTURE</span> •{" "}
        <span className="text-cyan-500/70">REACT 19</span> •{" "}
        <span className="text-purple-400/70">GEMINI LLM</span> •{" "}
        <span>UNREAL ENGINE HUD STYLING</span>
      </footer>
    </div>
  );
}
