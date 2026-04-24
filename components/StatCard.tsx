import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  sublabel?: string;
  icon?: LucideIcon;
  trend?: "up" | "down" | "flat";
  tone?: "default" | "accent" | "ok" | "warn";
}

export default function StatCard({ label, value, sublabel, icon: Icon, tone = "default" }: StatCardProps) {
  const toneStyles: Record<string, { color: string; bg: string }> = {
    default: { color: "var(--text)", bg: "var(--bg-elev-2)" },
    accent: { color: "var(--accent)", bg: "var(--accent-soft)" },
    ok: { color: "var(--ok)", bg: "rgba(48, 209, 88, 0.12)" },
    warn: { color: "var(--warn)", bg: "rgba(255, 214, 10, 0.12)" },
  };

  const style = toneStyles[tone];

  return (
    <div className="card p-5">
      <div className="flex items-start justify-between">
        <div className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
          {label}
        </div>
        {Icon && (
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: style.bg }}
          >
            <Icon size={16} color={style.color} />
          </div>
        )}
      </div>
      <div className="mt-3 text-3xl font-semibold tracking-tight" style={{ color: style.color }}>
        {value}
      </div>
      {sublabel && (
        <div className="mt-1 text-xs" style={{ color: "var(--text-muted)" }}>
          {sublabel}
        </div>
      )}
    </div>
  );
}
