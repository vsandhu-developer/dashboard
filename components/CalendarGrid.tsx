"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { CalendarPost } from "@/lib/postsyncer";

const PLATFORM_COLOR: Record<string, string> = {
  twitter: "#1d9bf0",
  linkedin: "#0a66c2",
  threads: "#f5f5f7",
  instagram: "#e1306c",
  tiktok: "#69c9d0",
  youtube: "#ff0000",
};

const PLATFORM_LABEL: Record<string, string> = {
  twitter: "X",
  linkedin: "in",
  threads: "@",
  instagram: "ig",
  tiktok: "tt",
  youtube: "yt",
};

function monthDays(year: number, month: number) {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const leading = first.getDay();
  const total = last.getDate();
  const cells: { date: string; inMonth: boolean; day: number }[] = [];
  for (let i = 0; i < leading; i++) {
    const d = new Date(year, month, -leading + i + 1);
    cells.push({
      date: fmt(d),
      inMonth: false,
      day: d.getDate(),
    });
  }
  for (let d = 1; d <= total; d++) {
    const date = new Date(year, month, d);
    cells.push({ date: fmt(date), inMonth: true, day: d });
  }
  while (cells.length % 7 !== 0) {
    const last = new Date(cells[cells.length - 1].date);
    last.setDate(last.getDate() + 1);
    cells.push({ date: fmt(last), inMonth: false, day: last.getDate() });
  }
  return cells;
}

function fmt(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function monthName(m: number): string {
  return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][m];
}

export default function CalendarGrid({ posts }: { posts: CalendarPost[] }) {
  const today = new Date();
  const [cursor, setCursor] = useState({ year: today.getFullYear(), month: today.getMonth() });
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const cells = monthDays(cursor.year, cursor.month);
  const todayStr = fmt(today);

  const byDate = new Map<string, CalendarPost[]>();
  for (const p of posts) {
    if (!byDate.has(p.date)) byDate.set(p.date, []);
    byDate.get(p.date)!.push(p);
  }

  const selectedPosts = selectedDate ? byDate.get(selectedDate) || [] : [];

  function prev() {
    setCursor((c) => (c.month === 0 ? { year: c.year - 1, month: 11 } : { year: c.year, month: c.month - 1 }));
  }
  function next() {
    setCursor((c) => (c.month === 11 ? { year: c.year + 1, month: 0 } : { year: c.year, month: c.month + 1 }));
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2">
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold">
                {monthName(cursor.month)} {cursor.year}
              </h3>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                {posts.length} scheduled · {posts.filter((p) => p.status === "published").length} published
              </p>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={prev}
                className="w-8 h-8 rounded flex items-center justify-center"
                style={{ background: "var(--bg-elev-2)" }}
              >
                <ChevronLeft size={14} />
              </button>
              <button
                onClick={() => {
                  const n = new Date();
                  setCursor({ year: n.getFullYear(), month: n.getMonth() });
                }}
                className="btn btn-secondary text-xs h-8 px-3"
              >
                Today
              </button>
              <button
                onClick={next}
                className="w-8 h-8 rounded flex items-center justify-center"
                style={{ background: "var(--bg-elev-2)" }}
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div
                key={d}
                className="text-xs font-medium text-center py-1"
                style={{ color: "var(--text-dim)" }}
              >
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {cells.map((cell, i) => {
              const dayPosts = byDate.get(cell.date) || [];
              const isToday = cell.date === todayStr;
              const isSelected = cell.date === selectedDate;
              return (
                <button
                  key={i}
                  onClick={() => setSelectedDate(cell.date)}
                  className="relative aspect-square p-1.5 rounded-lg text-left flex flex-col overflow-hidden transition-all"
                  style={{
                    background: isSelected
                      ? "var(--accent-soft)"
                      : isToday
                      ? "var(--bg-elev-2)"
                      : cell.inMonth
                      ? "var(--bg-elev)"
                      : "transparent",
                    border: `1px solid ${
                      isSelected ? "var(--accent)" : isToday ? "var(--border)" : "transparent"
                    }`,
                    color: cell.inMonth ? "var(--text)" : "var(--text-dim)",
                    opacity: cell.inMonth ? 1 : 0.4,
                  }}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span style={{ fontWeight: isToday ? 700 : 500 }}>{cell.day}</span>
                    {dayPosts.length > 0 && (
                      <span
                        className="text-[10px] font-semibold px-1 rounded"
                        style={{ background: "var(--accent-soft)", color: "var(--accent)" }}
                      >
                        {dayPosts.length}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-0.5 mt-auto">
                    {dayPosts.slice(0, 6).map((p, idx) => (
                      <div
                        key={idx}
                        title={`${p.platform} · ${p.time}`}
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: PLATFORM_COLOR[p.platform] || "#888" }}
                      />
                    ))}
                    {dayPosts.length > 6 && (
                      <div className="text-[9px]" style={{ color: "var(--text-dim)" }}>
                        +{dayPosts.length - 6}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t flex items-center gap-4 text-xs" style={{ borderColor: "var(--border-subtle)", color: "var(--text-muted)" }}>
            {Object.entries(PLATFORM_COLOR).map(([p, c]) => (
              <div key={p} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ background: c }} />
                <span className="capitalize">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card p-5">
        <h3 className="text-sm font-semibold mb-1">
          {selectedDate ? new Date(selectedDate).toLocaleDateString("en-CA", { weekday: "long", month: "long", day: "numeric" }) : "Select a day"}
        </h3>
        <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>
          {selectedDate
            ? selectedPosts.length === 0
              ? "No posts scheduled"
              : `${selectedPosts.length} post${selectedPosts.length === 1 ? "" : "s"}`
            : "Click any day to see scheduled posts"}
        </p>

        {selectedPosts.length > 0 && (
          <div className="space-y-3">
            {selectedPosts
              .sort((a, b) => a.time.localeCompare(b.time))
              .map((p, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg"
                  style={{ background: "var(--bg-elev-2)" }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold"
                        style={{
                          background: `${PLATFORM_COLOR[p.platform] || "#888"}22`,
                          color: PLATFORM_COLOR[p.platform] || "#888",
                        }}
                      >
                        {PLATFORM_LABEL[p.platform] || "?"}
                      </span>
                      <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                        {p.time}
                      </span>
                    </div>
                    <span
                      className={`badge ${
                        p.status === "published"
                          ? "badge-ok"
                          : p.status === "scheduled"
                          ? "badge-info"
                          : p.status === "draft"
                          ? "badge-muted"
                          : "badge-err"
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>
                  {p.preview && (
                    <p className="text-xs leading-relaxed" style={{ color: "var(--text)" }}>
                      {p.preview}
                      {p.preview.length >= 140 ? "…" : ""}
                    </p>
                  )}
                </div>
              ))}
          </div>
        )}

        {selectedDate && selectedPosts.length === 0 && (
          <div
            className="text-center py-8 rounded-lg text-xs"
            style={{ background: "var(--bg-elev-2)", color: "var(--text-dim)" }}
          >
            Nothing scheduled on this day.
          </div>
        )}
      </div>
    </div>
  );
}
