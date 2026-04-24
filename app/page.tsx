import { Send, Zap } from "lucide-react";
import StatCard from "@/components/StatCard";
import TodayBatch from "@/components/TodayBatch";
import CreditsCard from "@/components/CreditsCard";
import AccountsStatus from "@/components/AccountsStatus";
import { getTodayDate, readDailyLog } from "@/lib/content";
import { fetchCurrentWorkspace } from "@/lib/postsyncer";

export const dynamic = "force-dynamic";

export default async function TodaysAgenda() {
  const today = getTodayDate();
  const todayLog = readDailyLog(today);
  const workspace = await fetchCurrentWorkspace();

  const postsToday = todayLog?.posts.length || 0;

  const nowStr = new Date().toLocaleString("en-CA", {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="p-8 max-w-7xl">
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Today&apos;s Agenda</h1>
            <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
              {nowStr} · {workspace?.timezone || "America/Toronto"}
            </p>
          </div>
          <button className="btn btn-primary">
            <Zap size={14} /> Run /daily
          </button>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard
          label="Posts Today"
          value={postsToday}
          sublabel={postsToday === 0 ? "No batch run yet" : "across all 6 platforms"}
          icon={Send}
          tone={postsToday > 0 ? "accent" : "default"}
        />
        {workspace && (
          <CreditsCard credits={workspace.credits} workspaceName={workspace.name} />
        )}
        {workspace && <AccountsStatus accounts={workspace.accounts} />}
      </section>

      <section className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold">Today&apos;s Batch</h3>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              {todayLog?.anchor ? `Anchor: ${todayLog.anchor}` : "Every post scheduled for today, in order"}
            </p>
          </div>
          {todayLog?.top_score !== undefined && (
            <span className="badge badge-accent">Top score: {todayLog.top_score}/10</span>
          )}
        </div>
        <TodayBatch posts={todayLog?.posts || []} />
      </section>
    </div>
  );
}
