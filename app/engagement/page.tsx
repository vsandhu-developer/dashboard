export const dynamic = "force-dynamic";

export default function EngagementPage() {
  return (
    <div className="p-8 max-w-7xl">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Engagement</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
          Comments posted, reposts, DMs delivered
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="card p-5">
          <div className="text-xs uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
            Comments posted (7d)
          </div>
          <div className="mt-3 text-3xl font-semibold">0</div>
          <div className="text-xs mt-1" style={{ color: "var(--text-dim)" }}>
            Limit: 15/day
          </div>
        </div>
        <div className="card p-5">
          <div className="text-xs uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
            Reposts (7d)
          </div>
          <div className="mt-3 text-3xl font-semibold">0</div>
          <div className="text-xs mt-1" style={{ color: "var(--text-dim)" }}>
            Limit: 5/day
          </div>
        </div>
        <div className="card p-5">
          <div className="text-xs uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
            DMs delivered (7d)
          </div>
          <div className="mt-3 text-3xl font-semibold">0</div>
          <div className="text-xs mt-1" style={{ color: "var(--text-dim)" }}>
            Limit: 20/day
          </div>
        </div>
      </div>

      <div className="card p-12 text-center">
        <div className="text-sm" style={{ color: "var(--text-muted)" }}>
          No engagement activity yet.
        </div>
        <div className="text-xs mt-1" style={{ color: "var(--text-dim)" }}>
          Run <code style={{ color: "var(--accent)" }}>/engage</code> to start commenting on viral posts,
          reposting watchlist accounts, and replying to comments on your own posts.
        </div>
      </div>
    </div>
  );
}
