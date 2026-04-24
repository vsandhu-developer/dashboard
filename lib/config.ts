import fs from "node:fs";
import path from "node:path";

export const REPO_ROOT = path.resolve(process.cwd(), "..");
export const CONTENT_DIR = path.join(REPO_ROOT, "content");
export const TEMPLATES_DIR = path.join(REPO_ROOT, "templates");
export const VOICE_DIR = path.join(REPO_ROOT, "voice");

export interface AppConfig {
  postsyncerApiKey: string;
  postsyncerWorkspaceId: string;
  postsyncerTimezone: string;
  accountIds: Record<string, string>;
}

export function loadConfig(): AppConfig {
  const envPath = path.join(REPO_ROOT, ".env");
  const env: Record<string, string> = {};

  if (fs.existsSync(envPath)) {
    const raw = fs.readFileSync(envPath, "utf-8");
    for (const line of raw.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const val = trimmed.slice(eq + 1).trim().split("#")[0].trim();
      if (key && val) env[key] = val;
    }
  }

  return {
    postsyncerApiKey: env.POSTSYNCER_API_KEY || "",
    postsyncerWorkspaceId: env.POSTSYNCER_WORKSPACE_ID || "",
    postsyncerTimezone: env.POSTSYNCER_TIMEZONE || "America/Toronto",
    accountIds: {
      twitter: env.ACCOUNT_ID_TWITTER || "",
      linkedin: env.ACCOUNT_ID_LINKEDIN || "",
      threads: env.ACCOUNT_ID_THREADS || "",
      instagram: env.ACCOUNT_ID_INSTAGRAM || "",
      tiktok: env.ACCOUNT_ID_TIKTOK || "",
      youtube: env.ACCOUNT_ID_YOUTUBE || "",
    },
  };
}
