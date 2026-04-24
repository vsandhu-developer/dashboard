import { ExternalLink } from "lucide-react";

export const dynamic = "force-dynamic";

const X_ACCOUNTS = [
  { handle: "irentdumpsters", why: "Niche SMB operator showing real ops with AI" },
  { handle: "bloggersarvesh", why: "SEO + content operator voice" },
  { handle: "neilpatel", why: "SEO industry heavyweight, viral marketing hooks" },
  { handle: "PrajwalTomar_", why: "AI agent builder, practical demos" },
];

const LINKEDIN = [
  { name: "Greg Isenberg", why: "Founder/operator long-form, community playbooks" },
  { name: "Justin Welsh", why: "Solopreneur building in public, clean structure" },
  { name: "Sahil Bloom", why: "Frameworks + mental models, viral carousels" },
  { name: "Jasmin Alić", why: "Copywriting + hook engineering" },
  { name: "Matt Gray", why: "SMB founder content, agency economics" },
];

const THREADS = [
  { handle: "gregisenberg", why: "Short-form observation posts" },
  { handle: "thejustinwelsh", why: "Founder lessons, cross-platform repurposing" },
  { handle: "alexhormozi", why: "Direct-hit proof-point posts" },
  { handle: "danmartell", why: "Coach / founder frameworks" },
  { handle: "garyvee", why: "High-volume reach plays" },
];

export default function WatchlistPage() {
  return (
    <div className="p-8 max-w-7xl">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Watchlist</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
          Accounts the researcher monitors for hook patterns, format inspiration, and viral signal
        </p>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card p-5">
          <h3 className="font-semibold text-sm mb-3">X / Twitter ({X_ACCOUNTS.length})</h3>
          <div className="space-y-3">
            {X_ACCOUNTS.map((a) => (
              <a
                key={a.handle}
                href={`https://x.com/${a.handle}`}
                target="_blank"
                rel="noreferrer"
                className="block hover:bg-white/[.02] -mx-2 px-2 py-1.5 rounded"
              >
                <div className="flex items-center justify-between">
                  <div className="font-medium text-sm">@{a.handle}</div>
                  <ExternalLink size={12} color="var(--text-dim)" />
                </div>
                <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                  {a.why}
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="card p-5">
          <h3 className="font-semibold text-sm mb-3">LinkedIn ({LINKEDIN.length})</h3>
          <div className="space-y-3">
            {LINKEDIN.map((a) => (
              <div key={a.name} className="-mx-2 px-2 py-1.5 rounded">
                <div className="font-medium text-sm">{a.name}</div>
                <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                  {a.why}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-5">
          <h3 className="font-semibold text-sm mb-3">Threads ({THREADS.length})</h3>
          <div className="space-y-3">
            {THREADS.map((a) => (
              <a
                key={a.handle}
                href={`https://threads.net/@${a.handle}`}
                target="_blank"
                rel="noreferrer"
                className="block hover:bg-white/[.02] -mx-2 px-2 py-1.5 rounded"
              >
                <div className="flex items-center justify-between">
                  <div className="font-medium text-sm">@{a.handle}</div>
                  <ExternalLink size={12} color="var(--text-dim)" />
                </div>
                <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                  {a.why}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
