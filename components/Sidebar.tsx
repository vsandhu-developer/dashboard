"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  PieChart,
  FileText,
  MessageSquare,
  Users,
  Settings,
  Zap,
  Bot,
  Lightbulb,
  Wrench,
  AtSign,
  Camera,
  Video,
  Briefcase,
  Hash,
  Music2,
} from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
  section?: string;
};

const NAV: NavItem[] = [
  { label: "Today's Agenda", href: "/", icon: LayoutDashboard },
  { label: "Agents", href: "/agents", icon: Bot },
  { label: "Ideation", href: "/ideation", icon: Lightbulb },
  { label: "Calendar", href: "/calendar", icon: Calendar },

  { label: "X / Twitter", href: "/platforms/x", icon: AtSign, section: "Platforms" },
  { label: "Threads", href: "/platforms/threads", icon: Hash },
  { label: "LinkedIn", href: "/platforms/linkedin", icon: Briefcase },
  { label: "Instagram", href: "/platforms/instagram", icon: Camera },
  { label: "TikTok", href: "/platforms/tiktok", icon: Music2 },
  { label: "YouTube", href: "/platforms/youtube", icon: Video },

  { label: "Skills", href: "/skills", icon: Wrench, section: "System" },
  { label: "Pillars", href: "/pillars", icon: PieChart },
  { label: "Assets", href: "/assets", icon: FileText },
  { label: "Engagement", href: "/engagement", icon: MessageSquare },
  { label: "Watchlist", href: "/watchlist", icon: Users },
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="w-64 flex-shrink-0 border-r flex flex-col"
      style={{ background: "var(--bg-elev)", borderColor: "var(--border-subtle)" }}
    >
      <div className="px-6 py-5 border-b" style={{ borderColor: "var(--border-subtle)" }}>
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "var(--accent)" }}
          >
            <Zap size={18} color="white" fill="white" />
          </div>
          <div>
            <div className="font-semibold text-sm">VishalAI</div>
            <div className="text-xs" style={{ color: "var(--text-muted)" }}>
              Social Media Engine
            </div>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        {NAV.map(({ label, href, icon: Icon, section }) => {
          const active = pathname === href;
          return (
            <div key={href}>
              {section && (
                <div
                  className="px-3 pt-4 pb-1.5 text-[10px] font-semibold uppercase tracking-widest"
                  style={{ color: "var(--text-dim)" }}
                >
                  {section}
                </div>
              )}
              <Link
                href={href}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm mb-0.5 transition-colors"
                style={{
                  background: active ? "var(--accent-soft)" : "transparent",
                  color: active ? "var(--accent)" : "var(--text-muted)",
                }}
              >
                <Icon size={16} />
                {label}
              </Link>
            </div>
          );
        })}
      </nav>

      <div
        className="px-6 py-4 border-t text-xs"
        style={{ borderColor: "var(--border-subtle)", color: "var(--text-dim)" }}
      >
        <div>Operator mode</div>
        <div style={{ color: "var(--text-muted)" }}>Vishal Patel</div>
      </div>
    </aside>
  );
}
