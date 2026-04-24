import { loadConfig } from "./config";
import type { PostsyncerPost, Workspace } from "./types";

const BASE_URL = "https://postsyncer.com/api/v1";

function headers(): HeadersInit {
  const cfg = loadConfig();
  return {
    Authorization: `Bearer ${cfg.postsyncerApiKey}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };
}

export async function fetchWorkspaces(): Promise<Workspace[]> {
  const cfg = loadConfig();
  if (!cfg.postsyncerApiKey) return [];
  try {
    const r = await fetch(`${BASE_URL}/workspaces`, {
      headers: headers(),
      cache: "no-store",
    });
    if (!r.ok) return [];
    const data = await r.json();
    return Array.isArray(data) ? data : data.data || [];
  } catch {
    return [];
  }
}

export async function fetchCurrentWorkspace(): Promise<Workspace | null> {
  const workspaces = await fetchWorkspaces();
  const cfg = loadConfig();
  const targetId = parseInt(cfg.postsyncerWorkspaceId || "0", 10);
  return workspaces.find((w) => w.id === targetId) || workspaces[0] || null;
}

export async function fetchPosts(): Promise<PostsyncerPost[]> {
  const cfg = loadConfig();
  if (!cfg.postsyncerApiKey || !cfg.postsyncerWorkspaceId) return [];
  try {
    const r = await fetch(
      `${BASE_URL}/posts?workspace_id=${cfg.postsyncerWorkspaceId}&per_page=100`,
      { headers: headers(), cache: "no-store" }
    );
    if (!r.ok) return [];
    const data = await r.json();
    const posts = data.data || (Array.isArray(data) ? data : []);
    return posts;
  } catch {
    return [];
  }
}

export interface CalendarPost {
  id: number | string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  platform: string;
  status: string;
  preview: string;
}

export async function fetchCalendarPosts(): Promise<CalendarPost[]> {
  const posts = await fetchPosts();
  const result: CalendarPost[] = [];
  for (const p of posts) {
    const dt = p.scheduled_at || (p.posted_on && p.posted_on[0]);
    if (!dt) continue;
    const d = new Date(dt);
    if (isNaN(d.getTime())) continue;
    const date = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    const time = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
    const platformList = (p.platforms || []).map((pl) => pl.platform);
    const preview = (p.content && p.content[0]?.text) || "";
    for (const platform of platformList.length > 0 ? platformList : ["unknown"]) {
      result.push({
        id: p.id,
        date,
        time,
        platform,
        status: p.status,
        preview: preview.slice(0, 140),
      });
    }
  }
  return result;
}

