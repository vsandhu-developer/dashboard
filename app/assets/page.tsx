import { readAssetsLibrary } from "@/lib/content";
import { FileText, FileCheck, FileStack, File } from "lucide-react";

export const dynamic = "force-dynamic";

const typeIcon = {
  "pdf-guide": FileText,
  checklist: FileCheck,
  "template-pack": FileStack,
  doc: File,
};

export default function AssetsPage() {
  const assets = readAssetsLibrary();

  return (
    <div className="p-8 max-w-7xl">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Asset Library</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
          Lead magnets tied to Funnel A posts — comment-for-asset deliverables
        </p>
      </header>

      {assets.length === 0 ? (
        <div className="card p-12 text-center">
          <div className="text-sm" style={{ color: "var(--text-muted)" }}>
            No assets created yet.
          </div>
          <div className="text-xs mt-1" style={{ color: "var(--text-dim)" }}>
            Assets are generated automatically when a post uses Funnel A.
            Run{" "}
            <code style={{ color: "var(--accent)" }}>/asset</code> in Claude Code to create one manually.
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {assets.map((asset) => {
            const Icon = typeIcon[asset.type] || File;
            return (
              <div key={asset.slug} className="card p-5">
                <div className="flex items-start justify-between mb-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: "var(--accent-soft)" }}
                  >
                    <Icon size={18} color="var(--accent)" />
                  </div>
                  <span className="badge badge-info">{asset.funnel_keyword}</span>
                </div>
                <h3 className="font-semibold text-sm mb-1">{asset.title}</h3>
                <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>
                  {asset.type} · created {asset.created}
                </p>
                <div className="flex items-center justify-between text-xs">
                  <span style={{ color: "var(--text-dim)" }}>
                    Used by {asset.used_by_posts.length} post{asset.used_by_posts.length === 1 ? "" : "s"}
                  </span>
                  {asset.tied_to_product !== "none" && (
                    <span className="badge badge-accent">{asset.tied_to_product}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
