"use client";

import { useState } from "react";
import { Clock, CheckCircle2, AlertCircle, Tag } from "lucide-react";
import type { PostLog } from "@/lib/types";

const PLATFORM_META: Record<string, { label: string; color: string }> = {
  twitter: { label: "X", color: "#1d9bf0" },
  linkedin: { label: "in", color: "#0a66c2" },
  threads: { label: "@", color: "#ffffff" },
  instagram: { label: "ig", color: "#e1306c" },
  tiktok: { label: "tt", color: "#ffffff" },
  youtube: { label: "yt", color: "#ff0000" },
};

const statusBadge = {
  draft: "badge-muted",
  scheduled: "badge-info",
  published: "badge-ok",
  failed: "badge-err",
};

export default function PostCard({ post }: { post: PostLog }) {
  const [open, setOpen] = useState(false);
  const platformMeta = PLATFORM_META[post.platform] || { label: "?", color: "#888" };
  const time = post.scheduled
    ? new Date(post.scheduled).toLocaleTimeString("en-CA", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    : "--:--";

  const statusClass = statusBadge[post.status || "scheduled"] || "badge-muted";
  const statusIcon =
    post.status === "published" ? (
      <CheckCircle2 size={12} />
    ) : post.status === "failed" ? (
      <AlertCircle size={12} />
    ) : (
      <Clock size={12} />
    );

  return (
    <div className="card p-4 transition-colors hover:border-opacity-50">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
            style={{ background: "var(--bg-elev-2)", color: platformMeta.color }}
          >
            {platformMeta.label}
          </div>
          <div>
            <div className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
              {post.type}
            </div>
            <div className="text-xs" style={{ color: "var(--text-dim)" }}>
              {post.platform} · {time}
            </div>
          </div>
        </div>
        <div className={`badge ${statusClass} gap-1`}>
          {statusIcon}
          {post.status || "scheduled"}
        </div>
      </div>

      {post.body_preview && (
        <div
          className="text-sm leading-relaxed mb-3 whitespace-pre-wrap"
          style={{
            color: "var(--text)",
            display: open ? "block" : "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {post.body_preview}
        </div>
      )}

      <div className="flex items-center flex-wrap gap-2 text-xs">
        {post.pillar && (
          <span className="badge badge-accent">
            <Tag size={10} className="mr-1" /> {post.pillar}
          </span>
        )}
        {post.funnel && (
          <span className="badge badge-muted">Funnel {post.funnel}</span>
        )}
        {post.funnel_keyword && (
          <span className="badge badge-info">{post.funnel_keyword}</span>
        )}
        {post.proof_point && (
          <span className="badge badge-muted">case: {post.proof_point}</span>
        )}
        {post.body_preview && (
          <button
            onClick={() => setOpen(!open)}
            className="ml-auto text-xs"
            style={{ color: "var(--text-muted)" }}
          >
            {open ? "collapse" : "expand"}
          </button>
        )}
      </div>
    </div>
  );
}
