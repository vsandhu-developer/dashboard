import { TrendingUp } from "lucide-react";

export const dynamic = "force-dynamic";

const TOPICS = [
  { rank: 1, name: "Prediction Market Data", posts: 7, avgViews: "318.4K", color: "#ec4899" },
  { rank: 2, name: "AI Coding / Vibe Coding", posts: 9, avgViews: "242.1K", color: "#a78bfa" },
  { rank: 3, name: "Claude vs Tools", posts: 76, avgViews: "189.7K", color: "#fbbf24" },
  { rank: 4, name: "Claude Code Skills", posts: 132, avgViews: "156.3K", color: "#22d3ee" },
  { rank: 5, name: "OpenClaude Agents", posts: 57, avgViews: "128.9K", color: "#34d399" },
  { rank: 6, name: "Multi-Agent Systems", posts: 88, avgViews: "104.4K", color: "#f87171" },
  { rank: 7, name: "AI Automation", posts: 194, avgViews: "88.2K", color: "#8b5cf6" },
];

const maxViews = 318.4;

function parseViews(v: string): number {
  const num = parseFloat(v);
  if (v.endsWith("M")) return num * 1000;
  return num;
}

export default function ValidatorPage() {
  const totalPosts = TOPICS.reduce((s, t) => s + t.posts, 0);

  return (
    <div className="p-8 max-w-7xl neon-bg min-h-screen">
      <header className="mb-10">
        <div className="agent-badge mb-4" style={{ background: "rgba(52, 211, 153, 0.08)", borderColor: "rgba(52, 211, 153, 0.3)", color: "#6ee7b7" }}>
          <span className="status-dot" style={{ background: "#34d399" }} />
          Validating · Agent 02 / 04 · Viral Content Validator
        </div>
        <h1 className="text-5xl font-bold tracking-tight mb-3">
          <span className="text-white">Which Topics</span>{" "}
          <span className="gradient-text">Go Viral</span>
        </h1>
        <p className="text-base" style={{ color: "var(--text-muted)" }}>
          Scored by avg views · likes · comments across your niche
        </p>
      </header>

      <section className="glow-card p-6 mb-6">
        <div
          className="grid grid-cols-12 gap-4 pb-3 mb-3 text-[10px] font-bold uppercase tracking-widest"
          style={{ color: "var(--text-dim)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
        >
          <div className="col-span-1">#</div>
          <div className="col-span-7">Topic</div>
          <div className="col-span-2">Posts</div>
          <div className="col-span-2 text-right">Avg Views</div>
        </div>

        <div className="space-y-2">
          {TOPICS.map((t) => {
            const views = parseViews(t.avgViews);
            const widthPct = (views / (maxViews * 1000)) * 100;
            return (
              <div
                key={t.rank}
                className="topic-row grid grid-cols-12 gap-4 items-center relative overflow-hidden"
                style={{ borderLeft: `3px solid ${t.color}` }}
              >
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `linear-gradient(90deg, ${t.color}10, transparent ${widthPct}%)`,
                  }}
                />
                <div
                  className="col-span-1 font-bold text-lg relative"
                  style={{ color: t.color }}
                >
                  {t.rank}
                </div>
                <div className="col-span-7 relative">
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {t.posts} posts analysed
                  </div>
                </div>
                <div className="col-span-2 text-sm relative" style={{ color: "var(--text-muted)" }}>
                  {t.posts}
                </div>
                <div className="col-span-2 text-sm text-right font-semibold relative">
                  <span style={{ color: t.color }}>{t.avgViews}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          className="rounded-xl p-5"
          style={{
            background: "linear-gradient(135deg, rgba(167, 139, 250, 0.1), rgba(167, 139, 250, 0.02))",
            border: "1px solid rgba(167, 139, 250, 0.25)",
          }}
        >
          <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "#c4b5fd" }}>
            Total Posts Scored
          </div>
          <div className="text-4xl font-bold" style={{ color: "#a78bfa" }}>
            {totalPosts}
          </div>
        </div>

        <div
          className="rounded-xl p-5"
          style={{
            background: "linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(236, 72, 153, 0.02))",
            border: "1px solid rgba(236, 72, 153, 0.25)",
          }}
        >
          <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "#f9a8d4" }}>
            Highest Avg Views
          </div>
          <div className="text-4xl font-bold flex items-center gap-2">
            <span className="gradient-text">318.4K</span>
            <TrendingUp size={20} color="#ec4899" />
          </div>
        </div>
      </section>
    </div>
  );
}
