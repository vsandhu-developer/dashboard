"use client";

import type { PillarCoverage } from "@/lib/types";

export default function PillarChart({ data }: { data: PillarCoverage[] }) {
  const maxVal = Math.max(...data.map((d) => Math.max(d.target, d.actual)), 40);

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold">Pillar Coverage (7 days)</h3>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Actual vs weighted target
          </p>
        </div>
      </div>
      <div className="space-y-3">
        {data.map((d) => {
          const actualPct = (d.actual / maxVal) * 100;
          const targetPct = (d.target / maxVal) * 100;
          const onTarget = Math.abs(d.actual - d.target) <= 5;
          return (
            <div key={d.pillar}>
              <div className="flex items-center justify-between text-xs mb-1">
                <span style={{ color: "var(--text)" }}>{d.pillar}</span>
                <span style={{ color: "var(--text-muted)" }}>
                  {d.posts} posts · {d.actual.toFixed(0)}% (target {d.target.toFixed(0)}%)
                </span>
              </div>
              <div
                className="relative h-2 rounded-full overflow-hidden"
                style={{ background: "var(--bg-elev-2)" }}
              >
                <div
                  className="absolute top-0 bottom-0 rounded-full"
                  style={{
                    width: `${actualPct}%`,
                    background: onTarget ? "var(--ok)" : "var(--accent)",
                    transition: "width 0.3s ease",
                  }}
                />
                <div
                  className="absolute top-0 bottom-0 w-px"
                  style={{
                    left: `${targetPct}%`,
                    background: "var(--text-muted)",
                    opacity: 0.5,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      {data.every((d) => d.posts === 0) && (
        <div className="mt-4 text-xs text-center py-8" style={{ color: "var(--text-dim)" }}>
          No posts logged yet. Run <code className="px-1" style={{ color: "var(--accent)" }}>/daily</code> to start tracking.
        </div>
      )}
    </div>
  );
}
