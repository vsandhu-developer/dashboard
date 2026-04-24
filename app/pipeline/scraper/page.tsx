import RingCounter from "@/components/RingCounter";
import { Heart, MessageSquare, Zap, Camera, Video, AtSign, MessageCircle } from "lucide-react";

export const dynamic = "force-dynamic";

const PLATFORM_COUNTS = [
  { name: "Instagram", count: 48, color: "#e1306c", icon: Camera },
  { name: "Twitter / X", count: 55, color: "#1d9bf0", icon: AtSign },
  { name: "YouTube Shorts", count: 29, color: "#ff0000", icon: Video },
  { name: "Reddit", count: 48, color: "#ff4500", icon: MessageCircle },
];

const RECENT_SCRAPES = [
  {
    platform: "Instagram",
    platformColor: "#e1306c",
    text: "This is what coding with AI should feel like.",
    likes: "528",
    comments: "8.4K",
    velocity: "9.6",
  },
  {
    platform: "Twitter / X",
    platformColor: "#1d9bf0",
    text: "Tired of answering questions on Slack? Here's a smarter way.",
    likes: "2.3K",
    comments: "526",
    velocity: "8.7",
  },
  {
    platform: "YouTube Shorts",
    platformColor: "#ff0000",
    text: "I gave Claude Code 4 agents — scrape, validate, write, hook. 10 minutes.",
    likes: "12K",
    comments: "890",
    velocity: "9.2",
  },
  {
    platform: "Reddit",
    platformColor: "#ff4500",
    text: "r/ClaudeAI — How I cut my content creation time by 80% with 4 agents",
    likes: "1.8K",
    comments: "312",
    velocity: "8.1",
  },
];

export default function ScraperPage() {
  const totalScraped = PLATFORM_COUNTS.reduce((s, p) => s + p.count, 0);

  return (
    <div className="p-8 max-w-7xl neon-bg min-h-screen">
      <header className="mb-10">
        <div className="agent-badge mb-4" style={{ background: "rgba(168, 139, 250, 0.08)", borderColor: "rgba(168, 139, 250, 0.3)", color: "#c4b5fd" }}>
          <span className="status-dot" style={{ background: "#a78bfa" }} />
          Agent 01 / 04 · Scraper · Running
        </div>
        <h1 className="text-5xl font-bold tracking-tight mb-3">
          <span className="gradient-text-cyan">Scraping</span>{" "}
          <span className="gradient-text">Viral Content</span>
        </h1>
        <p className="text-base" style={{ color: "var(--text-muted)" }}>
          Pulling top posts from your niche across all platforms in real-time
        </p>
      </header>

      <section className="glow-card p-8 mb-8">
        <div className="flex items-center justify-around flex-wrap gap-8 mb-8">
          {PLATFORM_COUNTS.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.name} className="flex flex-col items-center">
                <div className="relative mb-3">
                  <RingCounter value={p.count} max={100} color={p.color} />
                </div>
                <div className="flex items-center gap-1.5">
                  <Icon size={12} color={p.color} />
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: p.color }}>
                    {p.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {RECENT_SCRAPES.slice(0, 2).map((post, i) => (
            <div
              key={i}
              className="rounded-xl p-4"
              style={{
                background: "rgba(30, 30, 36, 0.9)",
                border: `1px solid ${post.platformColor}30`,
              }}
            >
              <div
                className="text-[10px] font-bold uppercase tracking-widest mb-2"
                style={{ color: post.platformColor }}
              >
                {post.platform}
              </div>
              <p className="text-sm leading-snug mb-3" style={{ color: "var(--text)" }}>
                {post.text}
              </p>
              <div className="flex items-center gap-4 text-xs" style={{ color: "var(--text-muted)" }}>
                <span className="flex items-center gap-1">
                  <Heart size={11} /> {post.likes}
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquare size={11} /> {post.comments}
                </span>
                <span className="flex items-center gap-1 ml-auto" style={{ color: "#fbbf24" }}>
                  <Zap size={11} /> {post.velocity}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
          <div>
            <div className="text-2xl font-bold" style={{ color: "#a78bfa" }}>
              {totalScraped}
            </div>
            <div className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
              Total Scraped
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold" style={{ color: "#22d3ee" }}>
              7
            </div>
            <div className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
              Days Lookback
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold" style={{ color: "#fbbf24" }}>
              3
            </div>
            <div className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
              Posts / Set
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold" style={{ color: "#ec4899" }}>
              4
            </div>
            <div className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
              Platforms
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--text-muted)" }}>
          Recent Scrapes
        </h3>
        <div className="space-y-2">
          {RECENT_SCRAPES.map((post, i) => (
            <div
              key={i}
              className="rounded-lg p-4 flex items-start gap-4"
              style={{ background: "rgba(26, 26, 30, 0.6)", border: "1px solid rgba(255,255,255,0.04)" }}
            >
              <div
                className="w-1 rounded-full self-stretch flex-shrink-0"
                style={{ background: post.platformColor, boxShadow: `0 0 8px ${post.platformColor}` }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest"
                    style={{ color: post.platformColor }}
                  >
                    {post.platform}
                  </span>
                  <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.05)" }} />
                </div>
                <p className="text-sm" style={{ color: "var(--text)" }}>
                  {post.text}
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs flex-shrink-0" style={{ color: "var(--text-muted)" }}>
                <span>♥ {post.likes}</span>
                <span>💬 {post.comments}</span>
                <span style={{ color: "#fbbf24" }}>⚡ {post.velocity}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
