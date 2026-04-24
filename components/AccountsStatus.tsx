import { CheckCircle2, XCircle } from "lucide-react";
import type { WorkspaceAccount } from "@/lib/types";

const PLATFORM_LABEL: Record<string, string> = {
  twitter: "X / Twitter",
  linkedin: "LinkedIn",
  threads: "Threads",
  instagram: "Instagram",
  tiktok: "TikTok",
  youtube: "YouTube",
};

const TEXT_PLATFORMS = new Set(["twitter", "linkedin", "threads"]);

export default function AccountsStatus({ accounts }: { accounts: WorkspaceAccount[] }) {
  return (
    <div className="card p-5">
      <div className="mb-4">
        <h3 className="text-sm font-semibold">Connected Accounts</h3>
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          {accounts.filter((a) => TEXT_PLATFORMS.has(a.platform)).length} text platforms active
        </p>
      </div>
      <div className="space-y-2">
        {accounts.map((a) => {
          const inRotation = TEXT_PLATFORMS.has(a.platform);
          return (
            <div
              key={a.id}
              className="flex items-center justify-between py-1.5"
            >
              <div className="flex items-center gap-2 min-w-0">
                {a.has_expired ? (
                  <XCircle size={14} color="var(--err)" />
                ) : (
                  <CheckCircle2 size={14} color={inRotation ? "var(--ok)" : "var(--text-dim)"} />
                )}
                <span className="text-sm">{PLATFORM_LABEL[a.platform] || a.platform}</span>
                {a.username && (
                  <span className="text-xs" style={{ color: "var(--text-dim)" }}>
                    @{a.username}
                  </span>
                )}
              </div>
              <div className="text-xs flex items-center gap-2">
                {a.is_verified && <span className="badge badge-info">verified</span>}
                {inRotation ? (
                  <span className="badge badge-ok">in rotation</span>
                ) : (
                  <span className="badge badge-muted">dormant</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
