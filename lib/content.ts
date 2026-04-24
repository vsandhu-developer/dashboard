import fs from "node:fs";
import path from "node:path";
import { CONTENT_DIR } from "./config";
import type {
  Asset,
  DailyLog,
  PillarCoverage,
  Pillar,
  CaseStudyUsageEntry,
  Integration,
  IdeaEntry,
  SkillEntry,
  EngagementLog,
} from "./types";

const PILLAR_TARGETS: Record<Pillar, number> = {
  "AI Agents & Automation": 0.35,
  UpliftAI: 0.2,
  "Agency & Founder Lessons": 0.15,
  "Client Work": 0.15,
  "Contrarian Takes": 0.1,
  Hospitality: 0.05,
};

export const PILLARS: Pillar[] = Object.keys(PILLAR_TARGETS) as Pillar[];

const CASE_STUDIES = [
  { slug: "houseup", name: "Houseup (proptech)" },
  { slug: "robinhood", name: "Robinhood Cleaners ($40K→$1M ARR)" },
  { slug: "renovation", name: "GTA Renovation" },
  { slug: "realtor", name: "Realtor Team (WhatsApp agent)" },
  { slug: "dental", name: "Dental Practice (voice agent)" },
  { slug: "pestcontrol", name: "Pest Control ($36K→$80K)" },
  { slug: "upliftai", name: "UpliftAI (own product)" },
];

export function getTodayDate(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export function readDailyLog(date: string): DailyLog | null {
  const logPath = path.join(CONTENT_DIR, date, "log.json");
  if (!fs.existsSync(logPath)) return null;
  try {
    return JSON.parse(fs.readFileSync(logPath, "utf-8"));
  } catch {
    return null;
  }
}

export function listDailyLogs(limit = 30): DailyLog[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const dateDirs = fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && /^\d{4}-\d{2}-\d{2}$/.test(d.name))
    .map((d) => d.name)
    .sort()
    .reverse()
    .slice(0, limit);

  const logs: DailyLog[] = [];
  for (const date of dateDirs) {
    const log = readDailyLog(date);
    if (log) logs.push(log);
  }
  return logs;
}

export function readAssetsLibrary(): Asset[] {
  const libPath = path.join(CONTENT_DIR, "assets-library.json");
  if (!fs.existsSync(libPath)) return [];
  try {
    const data = JSON.parse(fs.readFileSync(libPath, "utf-8"));
    return data.assets || [];
  } catch {
    return [];
  }
}

export function readIntegrations(): Integration[] {
  const p = path.join(CONTENT_DIR, "integrations.json");
  if (!fs.existsSync(p)) return [];
  try {
    const data = JSON.parse(fs.readFileSync(p, "utf-8"));
    return data.integrations || [];
  } catch {
    return [];
  }
}

export function readIdeationQueue(): IdeaEntry[] {
  const p = path.join(CONTENT_DIR, "ideation.json");
  if (!fs.existsSync(p)) return [];
  try {
    const data = JSON.parse(fs.readFileSync(p, "utf-8"));
    return data.ideas || [];
  } catch {
    return [];
  }
}

export function readSkillsRegistry(): SkillEntry[] {
  const p = path.join(CONTENT_DIR, "skills.json");
  if (!fs.existsSync(p)) return [];
  try {
    const data = JSON.parse(fs.readFileSync(p, "utf-8"));
    return data.skills || [];
  } catch {
    return [];
  }
}

export function readEngagementLog(): EngagementLog | null {
  const p = path.join(CONTENT_DIR, "engagement-log.json");
  if (!fs.existsSync(p)) return null;
  try {
    return JSON.parse(fs.readFileSync(p, "utf-8"));
  } catch {
    return null;
  }
}

export function readAnchorText(date: string): string | null {
  const anchorPath = path.join(CONTENT_DIR, date, "anchor.md");
  if (!fs.existsSync(anchorPath)) return null;
  return fs.readFileSync(anchorPath, "utf-8");
}

export function calculatePillarCoverage(daysBack = 7): PillarCoverage[] {
  const logs = listDailyLogs(daysBack);
  const counts = new Map<Pillar, number>();
  for (const p of PILLARS) counts.set(p, 0);

  let total = 0;
  for (const log of logs) {
    for (const post of log.posts) {
      if (post.pillar) {
        counts.set(post.pillar, (counts.get(post.pillar) || 0) + 1);
        total++;
      }
    }
  }

  return PILLARS.map((pillar) => ({
    pillar,
    target: PILLAR_TARGETS[pillar] * 100,
    actual: total > 0 ? ((counts.get(pillar) || 0) / total) * 100 : 0,
    posts: counts.get(pillar) || 0,
  }));
}

export function caseStudyUsage(daysBack = 30): CaseStudyUsageEntry[] {
  const logs = listDailyLogs(daysBack);
  const weekCutoff = new Date();
  weekCutoff.setDate(weekCutoff.getDate() - 7);
  const weekCutoffIso = weekCutoff.toISOString().slice(0, 10);

  return CASE_STUDIES.map((cs) => {
    let last_used: string | null = null;
    let uses_this_week = 0;
    let uses_total = 0;

    for (const log of logs) {
      for (const post of log.posts) {
        if (post.proof_point === cs.slug) {
          uses_total++;
          if (!last_used || log.date > last_used) last_used = log.date;
          if (log.date >= weekCutoffIso) uses_this_week++;
        }
      }
    }

    return {
      case_slug: cs.slug,
      case_name: cs.name,
      last_used,
      uses_this_week,
      uses_total,
    };
  });
}

export function countPosts(status?: "published" | "scheduled" | "draft"): number {
  const logs = listDailyLogs(30);
  let count = 0;
  for (const log of logs) {
    for (const post of log.posts) {
      if (!status || post.status === status) count++;
    }
  }
  return count;
}

export function countPostsToday(): number {
  const log = readDailyLog(getTodayDate());
  return log?.posts.length || 0;
}

export function countPostsThisWeek(): number {
  const logs = listDailyLogs(7);
  return logs.reduce((sum, log) => sum + log.posts.length, 0);
}
