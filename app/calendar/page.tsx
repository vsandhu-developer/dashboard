import CalendarGrid from "@/components/CalendarGrid";
import { fetchCalendarPosts } from "@/lib/postsyncer";
import { listDailyLogs } from "@/lib/content";
import type { CalendarPost } from "@/lib/postsyncer";

export const dynamic = "force-dynamic";

export default async function CalendarPage() {
  const remotePosts = await fetchCalendarPosts();

  // Merge in any locally-logged posts that might not have made it to Postsyncer yet
  const localLogs = listDailyLogs(60);
  const seen = new Set(remotePosts.map((p) => `${p.id}-${p.platform}`));
  const localExtra: CalendarPost[] = [];
  for (const log of localLogs) {
    for (const post of log.posts) {
      const key = `${post.postsyncer_id}-${post.platform}`;
      if (seen.has(key)) continue;
      const dt = new Date(post.scheduled);
      if (isNaN(dt.getTime())) continue;
      const date = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")}`;
      const time = `${String(dt.getHours()).padStart(2, "0")}:${String(dt.getMinutes()).padStart(2, "0")}`;
      localExtra.push({
        id: post.postsyncer_id,
        date,
        time,
        platform: post.platform,
        status: post.status || "scheduled",
        preview: post.body_preview || "",
      });
    }
  }

  const allPosts = [...remotePosts, ...localExtra];

  return (
    <div className="p-8 max-w-7xl">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Calendar</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
          All scheduled and published posts across platforms
        </p>
      </header>

      <CalendarGrid posts={allPosts} />
    </div>
  );
}
