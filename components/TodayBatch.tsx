"use client";

import { useState } from "react";
import { Clock, CheckCircle2, AlertCircle, MessageSquare, Tag } from "lucide-react";
import ChatDrawer from "./ChatDrawer";
import type { PostLog } from "@/lib/types";

const PLATFORM_META: Record<string, { label: string; color: string }> = {
  twitter: { label: "X", color: "#1d9bf0" },
  linkedin: { label: "in", color: "#0a66c2" },
  threads: { label: "@", color: "#f5f5f7" },
  instagram: { label: "ig", color: "#e1306c" },
  tiktok: { label: "tt", color: "#69c9d0" },
  youtube: { label: "yt", color: "#ff0000" },
};

export default function TodayBatch({ posts }: { posts: PostLog[] }) {
  const [selected, setSelected] = useState<PostLog | null>(null);

  const sorted = [...posts].sort((a, b) =>
    (a.scheduled || "").localeCompare(b.scheduled || "")
  );

  if (posts.length === 0) {
    return (
      <div
        className="text-center py-12 rounded-lg"
        style={{ background: "var(--bg-elev-2)", color: "var(--text-dim)" }}
      >
        <div className="text-sm mb-2" style={{ color: "var(--text-muted)" }}>
          No posts scheduled for today.
        </div>
        <div className="text-xs">
          Run <code style={{ color: "var(--accent)" }}>/daily</code> in Claude Code to generate today&apos;s batch.
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-2">
        {sorted.map((post, i) => {
          const meta = PLATFORM_META[post.platform] || { label: "?", color: "#888" };
          const time = post.scheduled
            ? new Date(post.scheduled).toLocaleTimeString("en-CA", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })
            : "--:--";
          const statusIcon =
            post.status === "published" ? (
              <CheckCircle2 size={12} />
            ) : post.status === "failed" ? (
              <AlertCircle size={12} />
            ) : (
              <Clock size={12} />
            );
          const statusClass =
            post.status === "published"
              ? "badge-ok"
              : post.status === "failed"
              ? "badge-err"
              : post.status === "draft"
              ? "badge-muted"
              : "badge-info";

          return (
            <div
              key={i}
              className="rounded-lg p-4 flex items-start gap-4"
              style={{
                background: "var(--bg-elev)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{ background: `${meta.color}22`, color: meta.color }}
              >
                {meta.label}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5 text-xs">
                  <span
                    className="font-semibold"
                    style={{ color: meta.color }}
                  >
                    {time}
                  </span>
                  <span style={{ color: "var(--text-dim)" }}>·</span>
                  <span style={{ color: "var(--text-muted)" }}>{post.type}</span>
                  {post.pillar && (
                    <>
                      <span style={{ color: "var(--text-dim)" }}>·</span>
                      <span className="badge badge-accent">
                        <Tag size={9} className="mr-1" /> {post.pillar}
                      </span>
                    </>
                  )}
                </div>

                {post.body_preview && (
                  <p
                    className="text-sm leading-relaxed whitespace-pre-wrap"
                    style={{
                      color: "var(--text)",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {post.body_preview}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <span className={`badge ${statusClass} gap-1`}>
                  {statusIcon}
                  {post.status || "scheduled"}
                </span>
                <button
                  onClick={() => setSelected(post)}
                  className="btn btn-secondary text-xs py-1.5"
                >
                  <MessageSquare size={12} />
                  Chat to revise
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <ChatDrawer
        post={selected}
        open={selected !== null}
        onClose={() => setSelected(null)}
        onApprove={async (body) => {
          await fetch("/api/revise", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              post_id: selected?.postsyncer_id,
              platform: selected?.platform,
              current_draft: body,
              feedback: "APPROVED",
            }),
          });
        }}
      />
    </>
  );
}
