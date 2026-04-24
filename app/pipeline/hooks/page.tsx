import { Sparkles, Clock, Award } from "lucide-react";

export const dynamic = "force-dynamic";

const HOOKS = [
  {
    num: "01",
    text: "\"Bhai, content creation aisi honi chahiye — Claude Code ka AI camera ke saamne aa.\"",
    pattern: "\"This is what X should feel like\"",
    metric: "1.98M views",
    niche: "tera niche",
    color: "#fbbf24",
  },
  {
    num: "02",
    text: "\"Har baar script likhne mein 4-5 ghante waste karte the? Yeh agents ne 10 minute mein kar diya — tera awaaz mein.\"",
    pattern: "Pain + solution",
    metric: "1.27M views",
    niche: "match",
    color: "#34d399",
  },
  {
    num: "03",
    text: "\"90% creators nahi jaante — Claude Code se ek aisa system bana sakte ho jo khud hi viral topics dhundhe aur script bhi likhe.\"",
    pattern: "\"Log nahi jaante\"",
    metric: "241K avg views",
    niche: "",
    color: "#a78bfa",
  },
  {
    num: "04",
    text: "\"Maine Claude Code ko 4 agents diye — scrape karo, validate karo, likho, hook banao. Mera pura content kaam, 10 minute mein.\"",
    pattern: "Time saving claim",
    metric: "416K views",
    niche: "match",
    color: "#ec4899",
  },
  {
    num: "05",
    text: "\"Tu abhi bhi ChatGPT se post likhwa raha hai? Yeh pipeline dekh — 4 agents, 10 minute, 4-5 posts a day, teri awaaz mein.\"",
    pattern: "Contrarian direct",
    metric: "—",
    niche: "",
    color: "#22d3ee",
  },
];

const BEST_HOOK = HOOKS[0];

export default function HooksPage() {
  return (
    <div className="p-8 max-w-7xl neon-bg min-h-screen">
      <header className="mb-10">
        <div className="agent-badge mb-4" style={{ background: "rgba(236, 72, 153, 0.08)", borderColor: "rgba(236, 72, 153, 0.3)", color: "#f9a8d4" }}>
          <span className="status-dot" style={{ background: "#ec4899" }} />
          Agent 04 / 04 · Hook Generator
        </div>
        <h1 className="text-5xl font-bold tracking-tight mb-3">
          <span className="text-white">5 Hooks</span> <span className="gradient-text">Bana Raha Hai</span>
        </h1>
        <p className="text-base" style={{ color: "var(--text-muted)" }}>
          Tere best performing reels se match karke
        </p>
      </header>

      <section className="space-y-3 mb-8">
        {HOOKS.map((hook) => (
          <div
            key={hook.num}
            className="hook-card"
            style={{
              borderLeftColor: hook.color,
              boxShadow: `0 0 0 1px ${hook.color}15, -3px 0 20px ${hook.color}20`,
            }}
          >
            <div className="flex items-center gap-3 mb-2">
              <span
                className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded"
                style={{
                  background: `${hook.color}20`,
                  color: hook.color,
                }}
              >
                Hook {hook.num}
              </span>
            </div>
            <p className="text-base leading-relaxed mb-2" style={{ color: "var(--text)" }}>
              {hook.text}
            </p>
            <div className="flex items-center gap-3 text-xs flex-wrap" style={{ color: "var(--text-muted)" }}>
              <span>
                Pattern: <span style={{ color: "var(--text)" }}>{hook.pattern}</span>
              </span>
              <span>·</span>
              <span>
                <span style={{ color: hook.color }}>{hook.metric}</span>
                {hook.niche && <span> {hook.niche}</span>}
              </span>
            </div>
          </div>
        ))}
      </section>

      <section
        className="glow-card p-6 mb-6"
        style={{
          background: "linear-gradient(135deg, rgba(251, 191, 36, 0.08), rgba(236, 72, 153, 0.08))",
          borderColor: "rgba(251, 191, 36, 0.3)",
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Award size={16} color="#fbbf24" />
          <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#fbbf24" }}>
            Best Hook · Recommended
          </span>
        </div>
        <p className="text-lg leading-relaxed mb-3" style={{ color: "var(--text)" }}>
          {BEST_HOOK.text}
        </p>
        <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
          <Sparkles size={11} color="#fbbf24" />
          <span>
            <span style={{ color: "#fbbf24" }}>1.98M views</span> pattern — tera sabse strong hook format
          </span>
        </div>
      </section>

      <section className="flex items-center gap-4 text-xs" style={{ color: "var(--text-muted)" }}>
        <div className="flex items-center gap-2">
          <Clock size={12} color="#22d3ee" />
          <span>
            <span className="text-3xl font-bold" style={{ color: "#22d3ee" }}>
              10s
            </span>
            <span className="ml-2 text-[10px] uppercase tracking-widest font-semibold">
              Total Generation Time
            </span>
          </span>
        </div>
      </section>
    </div>
  );
}
