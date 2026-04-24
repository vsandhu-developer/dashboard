export type PostType =
  | "X-THREAD"
  | "X-HOT-TAKE"
  | "X-TIP"
  | "X-FOUNDER-NOTE"
  | "X-REPLY-BAIT"
  | "LI-LONGFORM"
  | "LI-CAROUSEL"
  | "LI-REFLECTION"
  | "TH-HOOK"
  | "TH-SPICY"
  | "TH-QUESTION"
  | "IG-REEL"
  | "IG-CAROUSEL"
  | "IG-STORY"
  | "TT-HOOK"
  | "TT-TALK"
  | "YT-SHORT"
  | "YT-LONG";

export type Platform = "twitter" | "linkedin" | "threads" | "instagram" | "tiktok" | "youtube";

export type PostStatus = "draft" | "scheduled" | "published" | "failed";

export type Funnel = "A" | "B" | "C" | "D";

export type Pillar =
  | "AI Agents & Automation"
  | "UpliftAI"
  | "Agency & Founder Lessons"
  | "Client Work"
  | "Contrarian Takes"
  | "Hospitality";

export interface PostLog {
  type: PostType;
  platform: Platform;
  postsyncer_id: number | string;
  scheduled: string;
  status?: PostStatus;
  funnel?: Funnel;
  funnel_keyword?: string;
  asset?: string;
  pillar?: Pillar;
  proof_point?: string;
  body_preview?: string;
}

export interface DailyLog {
  date: string;
  posts: PostLog[];
  anchor?: string;
  top_score?: number;
}

export interface Asset {
  slug: string;
  title: string;
  type: "pdf-guide" | "checklist" | "template-pack" | "doc";
  path: string;
  created: string;
  used_by_posts: (number | string)[];
  funnel_keyword: string;
  tied_to_product: "upliftai" | "codepaper" | "codepaper-ai" | "none";
}

export interface Workspace {
  id: number;
  name: string;
  type: string;
  timezone: string;
  credits: number;
  accounts: WorkspaceAccount[];
}

export interface WorkspaceAccount {
  id: number;
  platform: string;
  username: string | null;
  name: string | null;
  avatar: string;
  has_expired: boolean;
  is_default: boolean;
  is_verified: boolean;
}

export interface PostsyncerPost {
  id: number;
  status: PostStatus;
  scheduled_at: string | null;
  posted_on: string[] | null;
  content: { text: string }[];
  platforms: { platform: Platform; status: string }[];
}

export interface PillarCoverage {
  pillar: Pillar;
  target: number;
  actual: number;
  posts: number;
}

export interface CaseStudyUsageEntry {
  case_slug: string;
  case_name: string;
  last_used: string | null;
  uses_this_week: number;
  uses_total: number;
}

export type IntegrationStatus = "connected" | "needs_attention" | "disconnected";

export interface Integration {
  slug: string;
  name: string;
  category: string;
  status: IntegrationStatus;
  connected_at: string;
  last_sync: string;
  accounts_linked: number;
  description: string;
}

export type IdeaStatus = "queued" | "in_batch" | "shipped" | "needs_rewrite";
export type IdeaSource = "manual" | "scraper" | "reader_reply";

export interface IdeaEntry {
  id: string;
  title: string;
  source: IdeaSource;
  pillar: Pillar;
  proof_point: string | null;
  target_formats: PostType[];
  score: number;
  status: IdeaStatus;
  notes: string;
  shipped_on?: string;
}

export type SkillStatus = "healthy" | "degraded" | "offline";

export interface SkillEntry {
  slug: string;
  name: string;
  category: string;
  owner_agent: string;
  description: string;
  last_run: string;
  runs_7d: number;
  avg_runtime_s: number;
  status: SkillStatus;
}

export type EngagementType = "comment" | "repost" | "dm";

export interface EngagementAction {
  timestamp: string;
  type: EngagementType;
  platform: Platform;
  target_account: string;
  target_post_url: string | null;
  body: string;
  status: string;
}

export interface EngagementLog {
  budgets: { comments_per_day: number; reposts_per_day: number; dms_per_day: number };
  totals_7d: { comments: number; reposts: number; dms: number; reply_rate_pct: number };
  recent: EngagementAction[];
}
