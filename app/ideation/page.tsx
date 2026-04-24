import { Lightbulb, Sparkles, Send, PenLine, MessageCircle, Bot, Wrench } from "lucide-react";
import { readIdeationQueue } from "@/lib/content";
import type { IdeaEntry, IdeaStatus, IdeaSource } from "@/lib/types";
import IdeaPromptBox from "@/components/IdeaPromptBox";

export const dynamic = "force-dynamic";

const STATUS_META: Record<IdeaStatus, { label: string; className: string }> = {
  queued: { label: "Queued", className: "badge-muted" },
  in_batch: { label: "In today's batch", className: "badge-accent" },
  shipped: { label: "Shipped", className: "badge-ok" },
  needs_rewrite: { label: "Needs rewrite", className: "badge-err" },
};

const SOURCE_META: Record<IdeaSource, { label: string; icon: typeof Lightbulb }> = {
  manual: { label: "Manual", icon: PenLine },
  scraper: { label: "Scraper", icon: Bot },
  reader_reply: { label: "Reader reply", icon: MessageCircle },
};

function scoreColor(score: number): string {
  if (score >= 8.5) return "#22c55e";
  if (score >= 7) return "#fbbf24";
  return "#f97316";
}

export default function IdeationPage() {
  const ideas = readIdeationQueue();

  const counts = {
    queued: ideas.filter((i) => i.status === "queued").length,
    in_batch: ideas.filter((i) => i.status === "in_batch").length,
    shipped: ideas.filter((i) => i.status === "shipped").length,
    needs_rewrite: ideas.filter((i) => i.status === "needs_rewrite").length,
  };

  const grouped: Record<IdeaStatus, IdeaEntry[]> = {
    in_batch: [],
    queued: [],
    needs_rewrite: [],
    shipped: [],
  };
  for (const i of [...ideas].sort((a, b) => b.score - a.score)) {
    grouped[i.status].push(i);
  }

  return (
    <div className="p-8 max-w-7xl">
      <header className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Ideation</h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
            The ranked queue feeding <code>/daily</code>. Scraper, reader replies, and manual drops all land here.
          </p>
        </div>
        <button className="btn btn-primary">
          <Sparkles size={14} /> Run /ideate
        </button>
      </header>

      <IdeaPromptBox />

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="card p-5">
          <div className="text-xs uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
            In today&apos;s batch
          </div>
          <div className="mt-3 text-3xl font-semibold" style={{ color: "var(--accent)" }}>
            {counts.in_batch}
          </div>
        </div>
        <div className="card p-5">
          <div className="text-xs uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
            Queued
          </div>
          <div className="mt-3 text-3xl font-semibold">{counts.queued}</div>
        </div>
        <div className="card p-5">
          <div className="text-xs uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
            Needs rewrite
          </div>
          <div className="mt-3 text-3xl font-semibold" style={{ color: "var(--err)" }}>
            {counts.needs_rewrite}
          </div>
        </div>
        <div className="card p-5">
          <div className="text-xs uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
            Shipped (30d)
          </div>
          <div className="mt-3 text-3xl font-semibold" style={{ color: "var(--ok)" }}>
            {counts.shipped}
          </div>
        </div>
      </section>

      {(["in_batch", "queued", "needs_rewrite", "shipped"] as IdeaStatus[]).map((status) => {
        const list = grouped[status];
        if (list.length === 0) return null;
        const meta = STATUS_META[status];
        return (
          <section key={status} className="mb-8">
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--text-muted)" }}>
              {meta.label} ({list.length})
            </h3>
            <div className="space-y-2">
              {list.map((idea) => {
                const SourceIcon = SOURCE_META[idea.source].icon;
                return (
                  <div key={idea.id} className="card p-4">
                    <div className="flex items-start gap-4">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-sm"
                        style={{
                          background: `${scoreColor(idea.score)}18`,
                          color: scoreColor(idea.score),
                        }}
                      >
                        {idea.score.toFixed(1)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h4 className="font-semibold text-sm">{idea.title}</h4>
                          <span className={`badge ${meta.className}`}>{meta.label}</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs mb-1.5 flex-wrap" style={{ color: "var(--text-muted)" }}>
                          <span className="inline-flex items-center gap-1">
                            <SourceIcon size={10} /> {SOURCE_META[idea.source].label}
                          </span>
                          <span>·</span>
                          <span className="badge badge-accent">{idea.pillar}</span>
                          {idea.proof_point && (
                            <>
                              <span>·</span>
                              <span>
                                proof: <code style={{ color: "var(--accent)" }}>{idea.proof_point}</code>
                              </span>
                            </>
                          )}
                          <span>·</span>
                          <span>
                            formats: {idea.target_formats.join(", ")}
                          </span>
                          {idea.shipped_on && (
                            <>
                              <span>·</span>
                              <span>shipped {idea.shipped_on}</span>
                            </>
                          )}
                        </div>
                        <p className="text-xs leading-relaxed" style={{ color: "var(--text-dim)" }}>
                          {idea.notes}
                        </p>
                      </div>
                      {status !== "shipped" && (
                        <button className="btn btn-secondary text-xs py-1.5 flex-shrink-0">
                          {status === "needs_rewrite" ? (
                            <>
                              <Wrench size={12} /> Rewrite
                            </>
                          ) : (
                            <>
                              <Send size={12} /> Draft
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}

      {ideas.length === 0 && (
        <div className="card p-12 text-center">
          <div className="text-sm" style={{ color: "var(--text-muted)" }}>
            No ideas in the queue.
          </div>
          <div className="text-xs mt-1" style={{ color: "var(--text-dim)" }}>
            Run <code style={{ color: "var(--accent)" }}>/ideate</code> to pull from the scraper and reader replies.
          </div>
        </div>
      )}
    </div>
  );
}
