import { loadConfig } from "@/lib/config";
import { fetchCurrentWorkspace } from "@/lib/postsyncer";
import { readIntegrations } from "@/lib/content";
import { CheckCircle2, XCircle, AlertTriangle, Plug } from "lucide-react";
import type { IntegrationStatus } from "@/lib/types";

export const dynamic = "force-dynamic";

const STATUS_META: Record<IntegrationStatus, { label: string; icon: typeof CheckCircle2; color: string }> = {
  connected: { label: "Connected", icon: CheckCircle2, color: "var(--ok)" },
  needs_attention: { label: "Needs attention", icon: AlertTriangle, color: "var(--warn)" },
  disconnected: { label: "Disconnected", icon: XCircle, color: "var(--text-dim)" },
};

function formatDate(iso: string): string {
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

export default async function SettingsPage() {
  const cfg = loadConfig();
  const workspace = await fetchCurrentWorkspace();
  const integrations = readIntegrations();

  const mask = (v: string) => (v ? `${v.slice(0, 6)}…${v.slice(-4)}` : "not set");

  const rows = [
    { label: "Postsyncer API Key", value: mask(cfg.postsyncerApiKey), ok: !!cfg.postsyncerApiKey },
    { label: "Workspace ID", value: cfg.postsyncerWorkspaceId || "not set", ok: !!cfg.postsyncerWorkspaceId },
    { label: "Timezone", value: cfg.postsyncerTimezone, ok: true },
    { label: "X / Twitter account", value: cfg.accountIds.twitter || "not set", ok: !!cfg.accountIds.twitter },
    { label: "LinkedIn account", value: cfg.accountIds.linkedin || "not set", ok: !!cfg.accountIds.linkedin },
    { label: "Threads account", value: cfg.accountIds.threads || "not set", ok: !!cfg.accountIds.threads },
    { label: "Instagram account", value: cfg.accountIds.instagram || "not set", ok: !!cfg.accountIds.instagram, optional: true },
    { label: "TikTok account", value: cfg.accountIds.tiktok || "not set", ok: !!cfg.accountIds.tiktok, optional: true },
    { label: "YouTube account", value: cfg.accountIds.youtube || "not set", ok: !!cfg.accountIds.youtube, optional: true },
  ];

  return (
    <div className="p-8 max-w-4xl">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
          Configuration loaded from <code>.env</code> in repo root
        </p>
      </header>

      <section className="card p-5 mb-6">
        <h3 className="text-sm font-semibold mb-4">API Connection</h3>
        <div className="divide-y" style={{ borderColor: "var(--border-subtle)" }}>
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between py-2.5"
              style={{ borderColor: "var(--border-subtle)" }}
            >
              <div className="flex items-center gap-2">
                {row.ok ? (
                  <CheckCircle2 size={14} color="var(--ok)" />
                ) : row.optional ? (
                  <XCircle size={14} color="var(--text-dim)" />
                ) : (
                  <XCircle size={14} color="var(--warn)" />
                )}
                <span className="text-sm">{row.label}</span>
                {row.optional && <span className="badge badge-muted">optional</span>}
              </div>
              <code className="text-xs" style={{ color: "var(--text-muted)" }}>
                {row.value}
              </code>
            </div>
          ))}
        </div>
      </section>

      {integrations.length > 0 && (
        <section className="card p-5 mb-6">
          <div className="mb-4">
            <h3 className="text-sm font-semibold">Integrations</h3>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              {integrations.filter((i) => i.status === "connected").length} connected ·{" "}
              {integrations.filter((i) => i.status === "needs_attention").length} need attention ·{" "}
              {integrations.filter((i) => i.status === "disconnected").length} disconnected
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {integrations.map((i) => {
              const meta = STATUS_META[i.status];
              const StatusIcon = meta.icon;
              return (
                <div
                  key={i.slug}
                  className="p-4 rounded-lg"
                  style={{ background: "var(--bg-elev-2)", border: "1px solid var(--border-subtle)" }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Plug size={14} color="var(--text-muted)" />
                      <span className="font-semibold text-sm">{i.name}</span>
                      <span className="badge badge-muted">{i.category}</span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs" style={{ color: meta.color }}>
                      <StatusIcon size={12} /> {meta.label}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed mb-2" style={{ color: "var(--text-muted)" }}>
                    {i.description}
                  </p>
                  <div className="flex items-center gap-3 text-[11px]" style={{ color: "var(--text-dim)" }}>
                    <span>last sync {formatDate(i.last_sync)}</span>
                    <span>·</span>
                    <span>{i.accounts_linked} linked</span>
                    <span>·</span>
                    <span>since {i.connected_at}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {workspace && (
        <section className="card p-5">
          <h3 className="text-sm font-semibold mb-4">Workspace</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span style={{ color: "var(--text-muted)" }}>Name</span>
              <span>{workspace.name}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: "var(--text-muted)" }}>Type</span>
              <span>{workspace.type}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: "var(--text-muted)" }}>Timezone</span>
              <span>{workspace.timezone}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: "var(--text-muted)" }}>Credits remaining</span>
              <span style={{ color: workspace.credits < 30 ? "var(--warn)" : "var(--text)" }}>
                {workspace.credits}
              </span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: "var(--text-muted)" }}>Connected accounts</span>
              <span>{workspace.accounts.length}</span>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
