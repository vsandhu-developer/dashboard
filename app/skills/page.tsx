import { Wrench, CheckCircle2, AlertTriangle, XCircle, Clock } from "lucide-react";
import { readSkillsRegistry } from "@/lib/content";
import type { SkillStatus } from "@/lib/types";

export const dynamic = "force-dynamic";

const STATUS_META: Record<SkillStatus, { label: string; icon: typeof CheckCircle2; color: string }> = {
  healthy: { label: "Healthy", icon: CheckCircle2, color: "var(--ok)" },
  degraded: { label: "Degraded", icon: AlertTriangle, color: "var(--warn)" },
  offline: { label: "Offline", icon: XCircle, color: "var(--err)" },
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

export default function SkillsPage() {
  const skills = readSkillsRegistry();

  const grouped = skills.reduce<Record<string, typeof skills>>((acc, s) => {
    acc[s.category] = acc[s.category] || [];
    acc[s.category].push(s);
    return acc;
  }, {});

  const categories = Object.keys(grouped).sort();
  const totals = {
    total: skills.length,
    healthy: skills.filter((s) => s.status === "healthy").length,
    degraded: skills.filter((s) => s.status === "degraded").length,
    runs7d: skills.reduce((s, sk) => s + sk.runs_7d, 0),
  };

  return (
    <div className="p-8 max-w-7xl">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Skills</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
          Registry of slash-commands the agents are authorised to run. Grouped by category, with 7-day health.
        </p>
      </header>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="card p-5">
          <div className="text-xs uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
            Skills registered
          </div>
          <div className="mt-3 text-3xl font-semibold">{totals.total}</div>
        </div>
        <div className="card p-5">
          <div className="text-xs uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
            Healthy
          </div>
          <div className="mt-3 text-3xl font-semibold" style={{ color: "var(--ok)" }}>
            {totals.healthy}
          </div>
        </div>
        <div className="card p-5">
          <div className="text-xs uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
            Degraded
          </div>
          <div className="mt-3 text-3xl font-semibold" style={{ color: "var(--warn)" }}>
            {totals.degraded}
          </div>
        </div>
        <div className="card p-5">
          <div className="text-xs uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
            Runs (7d)
          </div>
          <div className="mt-3 text-3xl font-semibold" style={{ color: "var(--accent)" }}>
            {totals.runs7d}
          </div>
        </div>
      </section>

      {categories.map((cat) => (
        <section key={cat} className="mb-8">
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--text-muted)" }}>
            {cat}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {grouped[cat].map((s) => {
              const meta = STATUS_META[s.status];
              const StatusIcon = meta.icon;
              return (
                <div key={s.slug} className="card p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Wrench size={14} color="var(--text-muted)" />
                      <code className="font-semibold text-sm" style={{ color: "var(--accent)" }}>
                        {s.name}
                      </code>
                    </div>
                    <span className="badge gap-1" style={{ color: meta.color, background: "transparent" }}>
                      <StatusIcon size={12} /> {meta.label}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--text-muted)" }}>
                    {s.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs pt-3 border-t" style={{ borderColor: "var(--border-subtle)", color: "var(--text-dim)" }}>
                    <span className="inline-flex items-center gap-1">
                      <Clock size={10} /> last run {formatTimestamp(s.last_run)}
                    </span>
                    <span>·</span>
                    <span>{s.runs_7d} runs / 7d</span>
                    <span>·</span>
                    <span>avg {s.avg_runtime_s}s</span>
                    <span className="ml-auto">owner: {s.owner_agent}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}

      {skills.length === 0 && (
        <div className="card p-12 text-center">
          <div className="text-sm" style={{ color: "var(--text-muted)" }}>
            No skills registered.
          </div>
        </div>
      )}
    </div>
  );
}
