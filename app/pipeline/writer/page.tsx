import { PenLine, Copy, CheckCircle2 } from "lucide-react";

export const dynamic = "force-dynamic";

const SCRIPTS = [
  {
    platform: "X / Twitter",
    platformColor: "#1d9bf0",
    topic: "Claude Code Skills",
    body: `SEO agency: $2-10K/mo, ~4 articles.
UpliftAI: $99/mo, 30 articles.

6 niched agents (Compass, Scout, Strategist, Quill, Sage, Ezra), each doing one job better than a generalist doing all six.

SEO pricing is about to look like stock brokerage in 2005.`,
    hookScore: 9.2,
    voiceScore: 8.8,
    funnel: "D",
  },
  {
    platform: "LinkedIn",
    platformColor: "#0a66c2",
    topic: "Multi-Agent Systems",
    body: `Most founders are building one big AI agent.

Last month we shipped a system for a GTA home services business that does the opposite: 6 specialised agents, each owning one job end-to-end.

Results in 90 days: $40K/mo → $1M ARR.

The lesson? Specialisation beats generalisation in AI the same way it does in hiring. Your agents don't need to be general-purpose. They need to be great at exactly one thing and talk to each other cleanly.

Architecture matters. Scope matters more.

Which agent in your stack is doing too many jobs?`,
    hookScore: 8.6,
    voiceScore: 9.1,
    funnel: "A",
  },
  {
    platform: "Threads",
    platformColor: "#f5f5f7",
    topic: "AI Coding / Vibe Coding",
    body: `The gap between "I vibe-coded a prototype" and "I shipped this to production" is 80% of the work.

Most content skips the 80%. That's why AI coding feels broken to everyone past month 3.`,
    hookScore: 8.4,
    voiceScore: 8.9,
    funnel: "D",
  },
];

export default function WriterPage() {
  return (
    <div className="p-8 max-w-7xl neon-bg min-h-screen">
      <header className="mb-10">
        <div className="agent-badge mb-4" style={{ background: "rgba(251, 191, 36, 0.08)", borderColor: "rgba(251, 191, 36, 0.3)", color: "#fcd34d" }}>
          <span className="status-dot" style={{ background: "#fbbf24" }} />
          Agent 03 / 04 · Writer · Ready
        </div>
        <h1 className="text-5xl font-bold tracking-tight mb-3">
          <span className="text-white">Writing</span>{" "}
          <span className="gradient-text">In Your Voice</span>
        </h1>
        <p className="text-base" style={{ color: "var(--text-muted)" }}>
          Top validated topics → posts written in your voice, scored, ready for hook generation
        </p>
      </header>

      <section className="space-y-4">
        {SCRIPTS.map((s, i) => (
          <div key={i} className="glow-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-2 h-10 rounded-full"
                  style={{ background: s.platformColor, boxShadow: `0 0 10px ${s.platformColor}` }}
                />
                <div>
                  <div
                    className="text-[10px] font-bold uppercase tracking-widest"
                    style={{ color: s.platformColor }}
                  >
                    {s.platform} · Funnel {s.funnel}
                  </div>
                  <div className="text-sm font-semibold mt-0.5">{s.topic}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--text-dim)" }}>
                    Hook
                  </div>
                  <div className="text-sm font-bold" style={{ color: "#fbbf24" }}>
                    {s.hookScore}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--text-dim)" }}>
                    Voice
                  </div>
                  <div className="text-sm font-bold" style={{ color: "#34d399" }}>
                    {s.voiceScore}
                  </div>
                </div>
                <button
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                  title="Copy"
                >
                  <Copy size={12} color="var(--text-muted)" />
                </button>
              </div>
            </div>

            <pre
              className="text-sm leading-relaxed whitespace-pre-wrap font-sans"
              style={{ color: "var(--text)" }}
            >
              {s.body}
            </pre>

            <div className="flex items-center gap-2 mt-4 pt-4 text-xs" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", color: "var(--text-muted)" }}>
              <CheckCircle2 size={12} color="#34d399" />
              <span>Voice-approved · ready for Hook Generator</span>
            </div>
          </div>
        ))}
      </section>

      <section className="mt-6 grid grid-cols-3 gap-4">
        <div className="glow-card p-4 text-center">
          <div className="text-2xl font-bold" style={{ color: "#fbbf24" }}>
            3
          </div>
          <div className="text-[10px] font-bold uppercase tracking-widest mt-1" style={{ color: "var(--text-muted)" }}>
            Scripts Ready
          </div>
        </div>
        <div className="glow-card p-4 text-center">
          <div className="text-2xl font-bold" style={{ color: "#34d399" }}>
            8.9
          </div>
          <div className="text-[10px] font-bold uppercase tracking-widest mt-1" style={{ color: "var(--text-muted)" }}>
            Avg Voice Score
          </div>
        </div>
        <div className="glow-card p-4 text-center">
          <div className="text-2xl font-bold" style={{ color: "#22d3ee" }}>
            18s
          </div>
          <div className="text-[10px] font-bold uppercase tracking-widest mt-1" style={{ color: "var(--text-muted)" }}>
            Generation Time
          </div>
        </div>
      </section>
    </div>
  );
}
