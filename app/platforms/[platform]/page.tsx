import { notFound } from "next/navigation";
import { fetchCalendarPosts } from "@/lib/postsyncer";
import type { CalendarPost } from "@/lib/postsyncer";

export const dynamic = "force-dynamic";

const PLATFORM_META: Record<string, { name: string; color: string; handle: string; apiKey: string }> = {
  x: { name: "X / Twitter", color: "#1d9bf0", handle: "@Vishalaii", apiKey: "twitter" },
  threads: { name: "Threads", color: "#f5f5f7", handle: "@vishall.ai", apiKey: "threads" },
  linkedin: { name: "LinkedIn", color: "#0a66c2", handle: "Vishal Patel", apiKey: "linkedin" },
  instagram: { name: "Instagram", color: "#e1306c", handle: "@vishall.ai", apiKey: "instagram" },
  tiktok: { name: "TikTok", color: "#69c9d0", handle: "@vishall.ai", apiKey: "tiktok" },
  youtube: { name: "YouTube", color: "#ff0000", handle: "Vishal Patel", apiKey: "youtube" },
};

export default async function PlatformPage({
  params,
}: {
  params: Promise<{ platform: string }>;
}) {
  const { platform } = await params;
  const meta = PLATFORM_META[platform];
  if (!meta) notFound();

  const allPosts = await fetchCalendarPosts();
  const posts: CalendarPost[] = allPosts.filter((p) => p.platform === meta.apiKey);
  const sorted = [...posts].sort((a, b) => `${b.date} ${b.time}`.localeCompare(`${a.date} ${a.time}`));

  const stats = {
    total: posts.length,
    published: posts.filter((p) => p.status === "published").length,
    scheduled: posts.filter((p) => p.status === "scheduled").length,
    drafts: posts.filter((p) => p.status === "draft").length,
  };

  return (
    <div className="p-8 max-w-7xl">
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm"
            style={{ background: `${meta.color}22`, color: meta.color }}
          >
            {meta.name[0]}
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{meta.name}</h1>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              {meta.handle} · {stats.total} posts tracked
            </p>
          </div>
        </div>
      </header>

      <section className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total", value: stats.total, tone: "default" },
          { label: "Published", value: stats.published, tone: "ok" },
          { label: "Scheduled", value: stats.scheduled, tone: "info" },
          { label: "Drafts", value: stats.drafts, tone: "muted" },
        ].map((s) => (
          <div key={s.label} className="card p-5">
            <div
              className="text-xs font-medium uppercase tracking-wider"
              style={{ color: "var(--text-muted)" }}
            >
              {s.label}
            </div>
            <div
              className="mt-3 text-3xl font-semibold"
              style={{ color: s.tone === "ok" ? "var(--ok)" : s.tone === "info" ? "var(--info)" : meta.color }}
            >
              {s.value}
            </div>
          </div>
        ))}
      </section>

      <section>
        <h3 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--text-muted)" }}>
          Recent Posts
        </h3>
        {sorted.length === 0 ? (
          <div className="card p-8 text-center text-sm" style={{ color: "var(--text-muted)" }}>
            No posts on {meta.name} yet. Run <code style={{ color: "var(--accent)" }}>/daily</code> to
            schedule the first batch.
          </div>
        ) : (
          <div className="space-y-3">
            {sorted.slice(0, 25).map((post, i) => (
              <div key={i} className="card p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {post.date} · {post.time}
                  </div>
                  <span
                    className={`badge ${
                      post.status === "published"
                        ? "badge-ok"
                        : post.status === "scheduled"
                        ? "badge-info"
                        : "badge-muted"
                    }`}
                  >
                    {post.status}
                  </span>
                </div>
                {post.preview && (
                  <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: "var(--text)" }}>
                    {post.preview}
                    {post.preview.length >= 140 ? "…" : ""}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
