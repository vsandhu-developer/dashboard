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
  | "TH-QUESTION";

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
