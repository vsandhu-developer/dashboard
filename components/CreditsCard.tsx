import { Coins, AlertCircle } from "lucide-react";

export default function CreditsCard({ credits, workspaceName }: { credits: number; workspaceName: string }) {
  const low = credits < 30;
  const daysRemaining = credits > 0 ? Math.floor(credits / 4.5) : 0;

  return (
    <div className="card p-5">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
            Postsyncer Credits
          </div>
          <div className="mt-2 text-3xl font-semibold" style={{ color: low ? "var(--warn)" : "var(--text)" }}>
            {credits}
          </div>
          <div className="mt-1 text-xs" style={{ color: "var(--text-muted)" }}>
            ~{daysRemaining} days at 4-5 posts/day · {workspaceName}
          </div>
        </div>
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ background: low ? "rgba(255, 214, 10, 0.12)" : "var(--accent-soft)" }}
        >
          {low ? (
            <AlertCircle size={18} color="var(--warn)" />
          ) : (
            <Coins size={18} color="var(--accent)" />
          )}
        </div>
      </div>
      {low && (
        <div
          className="mt-3 text-xs px-3 py-2 rounded"
          style={{ background: "rgba(255, 214, 10, 0.08)", color: "var(--warn)" }}
        >
          Low credits. Top up at app.postsyncer.com.
        </div>
      )}
    </div>
  );
}
