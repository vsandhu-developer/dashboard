import { MessageCircle, Repeat2, Send, CheckCircle2, ExternalLink } from "lucide-react";
import { readEngagementLog } from "@/lib/content";
import type { EngagementType, Platform } from "@/lib/types";

export const dynamic = "force-dynamic";

const TYPE_META: Record<EngagementType, { label: string; icon: typeof MessageCircle; color: string }> = {
  comment: { label: "Comment", icon: MessageCircle, color: "#22d3ee" },
  repost: { label: "Repost", icon: Repeat2, color: "#a78bfa" },
  dm: { label: "DM", icon: Send, color: "#ec4899" },
};

const PLATFORM_LABEL: Record<Platform, string> = {
  twitter: "X",
  linkedin: "LinkedIn",
  threads: "Threads",
  instagram: "Instagram",
  tiktok: "TikTok",
  youtube: "YouTube",
};

function formatTimestamp(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleString("en-CA", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export default function EngagementPage() {
  const log = readEngagementLog();

  const totals = log?.totals_7d || { comments: 0, reposts: 0, dms: 0, reply_rate_pct: 0 };
  const budgets = log?.budgets || { comments_per_day: 15, reposts_per_day: 5, dms_per_day: 20 };
  const recent = log?.recent || [];

  const weeklyBudgets = {
    comments: budgets.comments_per_day * 7,
    reposts: budgets.reposts_per_day * 7,
    dms: budgets.dms_per_day * 7,
  };

  return (
    <div className="p-8 max-w-7xl">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Engagement</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
          Comments posted, reposts, DMs delivered by the engager agent — budgeted per day.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="card p-5">
          <div className="flex items-center justify-between">
            <div className="text-xs uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
              Comments (7d)
            </div>
            <MessageCircle size={14} color="#22d3ee" />
          </div>
          <div className="mt-3 text-3xl font-semibold">{totals.comments}</div>
          <div className="text-xs mt-1" style={{ color: "var(--text-dim)" }}>
            budget {weeklyBudgets.comments} · {budgets.comments_per_day}/day
          </div>
        </div>
        <div className="card p-5">
          <div className="flex items-center justify-between">
            <div className="text-xs uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
              Reposts (7d)
            </div>
            <Repeat2 size={14} color="#a78bfa" />
          </div>
          <div className="mt-3 text-3xl font-semibold">{totals.reposts}</div>
          <div className="text-xs mt-1" style={{ color: "var(--text-dim)" }}>
            budget {weeklyBudgets.reposts} · {budgets.reposts_per_day}/day
          </div>
        </div>
        <div className="card p-5">
          <div className="flex items-center justify-between">
            <div className="text-xs uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
              DMs delivered (7d)
            </div>
            <Send size={14} color="#ec4899" />
          </div>
          <div className="mt-3 text-3xl font-semibold">{totals.dms}</div>
          <div className="text-xs mt-1" style={{ color: "var(--text-dim)" }}>
            budget {weeklyBudgets.dms} · {budgets.dms_per_day}/day
          </div>
        </div>
        <div className="card p-5">
          <div className="flex items-center justify-between">
            <div className="text-xs uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
              Reply rate
            </div>
            <CheckCircle2 size={14} color="var(--ok)" />
          </div>
          <div className="mt-3 text-3xl font-semibold" style={{ color: "var(--ok)" }}>
            {totals.reply_rate_pct}%
          </div>
          <div className="text-xs mt-1" style={{ color: "var(--text-dim)" }}>
            reader replies → agent follow-up
          </div>
        </div>
      </div>

      <section>
        <h3 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--text-muted)" }}>
          Recent Activity
        </h3>
        {recent.length === 0 ? (
          <div className="card p-12 text-center">
            <div className="text-sm" style={{ color: "var(--text-muted)" }}>
              No engagement activity yet.
            </div>
            <div className="text-xs mt-1" style={{ color: "var(--text-dim)" }}>
              Run <code style={{ color: "var(--accent)" }}>/engage</code> to start commenting on watchlist posts,
              reposting, and replying to inbound DMs.
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {recent.map((action, i) => {
              const meta = TYPE_META[action.type];
              const Icon = meta.icon;
              return (
                <div key={i} className="card p-4">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `${meta.color}18`, color: meta.color }}
                    >
                      <Icon size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap text-xs">
                        <span className="font-semibold" style={{ color: meta.color }}>
                          {meta.label}
                        </span>
                        <span style={{ color: "var(--text-dim)" }}>·</span>
                        <span style={{ color: "var(--text-muted)" }}>{PLATFORM_LABEL[action.platform]}</span>
                        <span style={{ color: "var(--text-dim)" }}>·</span>
                        <span style={{ color: "var(--text-muted)" }}>→ {action.target_account}</span>
                        <span style={{ color: "var(--text-dim)" }}>·</span>
                        <span style={{ color: "var(--text-dim)" }}>{formatTimestamp(action.timestamp)}</span>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--text)" }}>
                        {action.body}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="badge badge-ok">{action.status}</span>
                      {action.target_post_url && (
                        <a
                          href={action.target_post_url}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-secondary text-xs py-1.5"
                        >
                          <ExternalLink size={12} /> Source
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
