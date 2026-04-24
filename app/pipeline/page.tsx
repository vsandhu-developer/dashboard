import Link from "next/link";
import { Radar, TrendingUp, PenLine, Sparkles, ArrowRight, Camera, Video, AtSign, MessageCircle } from "lucide-react";

export const dynamic = "force-dynamic";

const PIPELINE_AGENTS = [
  {
    num: "01",
    slug: "scraper",
    name: "Scraper",
    tagline: "Collects top-performing content",
    description: "Scrapes top posts from Instagram, Twitter/X, YouTube Shorts, and Reddit across your niche every day. Tracks views, comments, and engagement velocity.",
    cta: "View scraped data",
    color: "#a78bfa",
    accent: "rgba(167, 139, 250, 0.5)",
    icon: Radar,
    href: "/pipeline/scraper",
  },
  {
    num: "02",
    slug: "validator",
    name: "Validator",
    tagline: "Scores topics against real engagement",
    description: "Filters out low-performers. Only topics hitting your niche's top quartile on views and engagement move forward.",
    cta: "See winning topics",
    color: "#22d3ee",
    accent: "rgba(34, 211, 238, 0.5)",
    icon: TrendingUp,
    href: "/pipeline/validator",
  },
  {
    num: "03",
    slug: "writer",
    name: "Writer",
    tagline: "Writes the full script in your voice",
    description: "Takes the top validated topics and writes 4-5 posts a day in your voice — tight, specific, no AI-tells.",
    cta: "Read output",
    color: "#fbbf24",
    accent: "rgba(251, 191, 36, 0.5)",
    icon: PenLine,
    href: "/pipeline/writer",
  },
  {
    num: "04",
    slug: "hooks",
    name: "Hook Generator",
    tagline: "Generates 5 hooks per script",
    description: "Generates 5 variants for every post, scored against your best-performing reels. You pick the one that ships.",
    cta: "Generate hooks",
    color: "#ec4899",
    accent: "rgba(236, 72, 153, 0.5)",
    icon: Sparkles,
    href: "/pipeline/hooks",
  },
];

const SOURCE_PLATFORMS = [
  { name: "Instagram", icon: Camera, color: "#e1306c" },
  { name: "YouTube", icon: Video, color: "#ff0000" },
  { name: "Twitter / X", icon: AtSign, color: "#1d9bf0" },
  { name: "Reddit", icon: MessageCircle, color: "#ff4500" },
];

const READY_PLATFORMS = [
  "X / Threads",
  "LinkedIn Post",
  "Caption",
  "Hashtags",
  "Thumbnail / IG Story",
];

export default function PipelinePage() {
  return (
    <div className="p-8 max-w-7xl neon-bg min-h-screen">
      <header className="mb-10 text-center">
        <div className="inline-block agent-badge mb-4" style={{ background: "rgba(168, 139, 250, 0.08)", borderColor: "rgba(168, 139, 250, 0.3)", color: "#c4b5fd" }}>
          <span className="status-dot" style={{ background: "#a78bfa" }} />
          Phase 01 — Content Automation System
        </div>
        <h1 className="text-5xl font-bold tracking-tight mb-3">
          <span className="gradient-text">4-Agent Content Pipeline</span>
        </h1>
        <p className="text-base" style={{ color: "var(--text-muted)" }}>
          From raw data to ready-to-post content — fully automated
        </p>
      </header>

      <section className="mb-8">
        <div
          className="text-[10px] font-bold uppercase tracking-widest text-center mb-3"
          style={{ color: "var(--text-dim)" }}
        >
          ◦ Data Sources ◦ Live
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {SOURCE_PLATFORMS.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.name}
                className="flex items-center gap-2 px-4 py-2 rounded-lg"
                style={{
                  background: "rgba(30, 30, 36, 0.8)",
                  border: `1px solid ${p.color}33`,
                  boxShadow: `0 0 16px ${p.color}22`,
                }}
              >
                <Icon size={16} color={p.color} />
                <span className="text-sm font-medium">{p.name}</span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative">
          {PIPELINE_AGENTS.map((agent, i) => {
            const Icon = agent.icon;
            return (
              <div key={agent.slug} className="relative">
                <Link
                  href={agent.href}
                  className="agent-card block p-5 h-full relative"
                  style={{
                    boxShadow: `0 0 0 1px ${agent.accent}22, 0 4px 20px ${agent.color}11`,
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <span
                      className="agent-badge"
                      style={{
                        background: `${agent.color}15`,
                        borderColor: `${agent.color}40`,
                        color: agent.color,
                      }}
                    >
                      Agent {agent.num}
                    </span>
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{
                        background: `${agent.color}18`,
                        boxShadow: `inset 0 0 0 1px ${agent.color}30`,
                      }}
                    >
                      <Icon size={18} color={agent.color} />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-1">{agent.name}</h3>
                  <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>
                    {agent.tagline}
                  </p>
                  <p className="text-[13px] leading-relaxed mb-4" style={{ color: "var(--text)" }}>
                    {agent.description}
                  </p>

                  <div
                    className="text-xs font-semibold flex items-center gap-1.5 mt-auto"
                    style={{ color: agent.color }}
                  >
                    {agent.cta}
                    <ArrowRight size={12} />
                  </div>
                </Link>

                {i < PIPELINE_AGENTS.length - 1 && (
                  <div className="hidden md:flex absolute top-1/2 -right-2 -translate-y-1/2 z-10 pointer-events-none">
                    <div
                      className="w-4 h-4 rounded-full flex items-center justify-center"
                      style={{
                        background: "var(--bg)",
                        boxShadow: `0 0 12px ${agent.color}`,
                      }}
                    >
                      <ArrowRight size={10} color={agent.color} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <div
          className="text-[10px] font-bold uppercase tracking-widest text-center mb-3"
          style={{ color: "var(--text-dim)" }}
        >
          ◦ Output ◦ Ready to Post
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {READY_PLATFORMS.map((p) => (
            <span
              key={p}
              className="px-3 py-1.5 rounded-lg text-xs font-medium"
              style={{
                background: "rgba(236, 72, 153, 0.08)",
                border: "1px solid rgba(236, 72, 153, 0.25)",
                color: "#f9a8d4",
              }}
            >
              {p}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
