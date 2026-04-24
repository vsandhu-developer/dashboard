import type { CaseStudyUsageEntry } from "@/lib/types";
import { CheckCircle, AlertTriangle, Circle } from "lucide-react";

export default function CaseStudyUsage({ data }: { data: CaseStudyUsageEntry[] }) {
  return (
    <div className="card p-5">
      <div className="mb-4">
        <h3 className="text-sm font-semibold">Case Study Rotation</h3>
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          Rule: no case more than 2x per week (UpliftAI exception)
        </p>
      </div>
      <div className="space-y-2">
        {data.map((c) => {
          const overused = c.uses_this_week > 2 && c.case_slug !== "upliftai";
          const unused = c.uses_total === 0;
          const Icon = overused ? AlertTriangle : unused ? Circle : CheckCircle;
          const iconColor = overused ? "var(--err)" : unused ? "var(--text-dim)" : "var(--ok)";
          return (
            <div
              key={c.case_slug}
              className="flex items-center justify-between py-2 border-b last:border-0"
              style={{ borderColor: "var(--border-subtle)" }}
            >
              <div className="flex items-center gap-2 min-w-0">
                <Icon size={14} color={iconColor} />
                <span className="text-sm truncate" style={{ color: "var(--text)" }}>
                  {c.case_name}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs flex-shrink-0">
                <span style={{ color: c.uses_this_week > 2 && c.case_slug !== "upliftai" ? "var(--err)" : "var(--text-muted)" }}>
                  {c.uses_this_week} this week
                </span>
                <span style={{ color: "var(--text-dim)" }}>
                  {c.last_used ? `last: ${c.last_used}` : "never used"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
