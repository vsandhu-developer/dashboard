import AgentFlow from "@/components/AgentFlow";
import { Terminal } from "lucide-react";

export const dynamic = "force-dynamic";

const SUPPORTING = [
  {
    name: "Postsyncer API",
    description: "Scheduling engine — pushes approved posts to X, LinkedIn, Threads at exact slots.",
  },
  {
    name: "Claude in Chrome MCP",
    description: "Browser automation for commenting + reposting on X and LinkedIn where API doesn't reach.",
  },
  {
    name: "pdf + docx skills",
    description: "Document generation for lead magnets and asset pack creation.",
  },
];

export default function AgentsPage() {
  return (
    <div className="p-8 max-w-7xl">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Agents</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
          The AI subagents powering your social media engine. Click any node or run the simulation to see how they work together.
        </p>
      </header>

      <section className="mb-8">
        <AgentFlow />
      </section>

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--text-muted)" }}>
          Supporting Infrastructure
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SUPPORTING.map((s) => (
            <div key={s.name} className="card p-5">
              <div className="flex items-center gap-2 mb-2">
                <Terminal size={14} color="var(--text-muted)" />
                <h4 className="font-semibold text-sm">{s.name}</h4>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
