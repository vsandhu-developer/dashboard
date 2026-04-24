"use client";

import { useState, useEffect, useRef } from "react";
import { Search, PenLine, Gauge, FileStack, Send, MessageSquare, Play, Square, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface AgentNode {
  slug: string;
  name: string;
  role: string;
  description: string;
  inputs: string[];
  outputs: string[];
  triggers: string[];
  icon: LucideIcon;
  color: string;
  position: { row: number; col: number };
  emoji?: string;
}

const NODES: AgentNode[] = [
  {
    slug: "researcher",
    name: "Researcher",
    role: "Finds today's ammo",
    description:
      "Pulls viral posts from watchlist, AI + SEO news, spots hook patterns winning right now.",
    inputs: ["Today's date", "Recent anchors"],
    outputs: ["10 viral posts", "5 news items", "3 patterns"],
    triggers: ["/daily step 2", "/research"],
    icon: Search,
    color: "#0a84ff",
    position: { row: 0, col: 0 },
  },
  {
    slug: "drafter",
    name: "Drafter",
    role: "Writes 4-5 posts in voice",
    description:
      "Generates posts in Vishal's voice. Pulls from 7-case library. 35/20/15/15/10/5 pillar mix. Rejects first 2-3 angles.",
    inputs: ["Anchor", "Voice samples", "Case studies"],
    outputs: ["5 posts + funnels"],
    triggers: ["/daily step 4", "/draft"],
    icon: PenLine,
    color: "#cc0000",
    position: { row: 0, col: 1 },
  },
  {
    slug: "voice-critic",
    name: "Voice Critic",
    role: "Scores every post 1-10",
    description:
      "Scores hook, voice match, specificity, pillar fit, engagement potential. Kills <5, rewrites 5-7, ships 7+.",
    inputs: ["All drafts", "Voice samples", "Rubric"],
    outputs: ["Scored table", "Rewrite notes"],
    triggers: ["/daily step 5"],
    icon: Gauge,
    color: "#ffd60a",
    position: { row: 0, col: 2 },
  },
  {
    slug: "asset-creator",
    name: "Asset Creator",
    role: "Generates lead magnets",
    description:
      "Funnel A posts promise assets — this agent builds them. Branded PDFs, checklists, template packs.",
    inputs: ["Source post", "Anchor"],
    outputs: ["PDF / docx asset", "Library entry"],
    triggers: ["/asset", "Auto for Funnel A"],
    icon: FileStack,
    color: "#30d158",
    position: { row: 1, col: 1 },
  },
  {
    slug: "postsyncer",
    name: "Postsyncer",
    role: "Schedules to platforms",
    description:
      "Pushes each approved post to X, LinkedIn, Threads at its exact time slot. The scheduling engine.",
    inputs: ["Approved posts"],
    outputs: ["Scheduled post IDs"],
    triggers: ["/daily step 8"],
    icon: Send,
    color: "#86868b",
    position: { row: 0, col: 3 },
  },
  {
    slug: "engager",
    name: "Engager",
    role: "Comments, reposts, DMs",
    description:
      "Three modes: comment on viral posts, repost with QT, respond to comments on your own posts (send asset DMs for keyword comments).",
    inputs: ["Watchlist", "Post comments"],
    outputs: ["Comments posted", "DMs sent"],
    triggers: ["/engage"],
    icon: MessageSquare,
    color: "#ff453a",
    position: { row: 0, col: 4 },
  },
];

const EDGES: { from: string; to: string; label?: string }[] = [
  { from: "researcher", to: "drafter", label: "anchor" },
  { from: "drafter", to: "voice-critic", label: "drafts" },
  { from: "voice-critic", to: "postsyncer", label: "approved" },
  { from: "voice-critic", to: "asset-creator", label: "funnel A" },
  { from: "asset-creator", to: "postsyncer", label: "asset link" },
  { from: "postsyncer", to: "engager", label: "live posts" },
];

const GRID_COLS = 5;
const GRID_ROWS = 2;
const CELL_WIDTH = 200;
const CELL_HEIGHT = 130;
const NODE_WIDTH = 170;
const NODE_HEIGHT = 80;

function nodeCenter(node: AgentNode) {
  return {
    x: node.position.col * CELL_WIDTH + CELL_WIDTH / 2,
    y: node.position.row * CELL_HEIGHT + CELL_HEIGHT / 2,
  };
}

function nodeEdge(from: AgentNode, to: AgentNode) {
  const fc = nodeCenter(from);
  const tc = nodeCenter(to);
  const dx = tc.x - fc.x;
  const dy = tc.y - fc.y;
  const angle = Math.atan2(dy, dx);
  const fromX = fc.x + Math.cos(angle) * (NODE_WIDTH / 2);
  const fromY = fc.y + Math.sin(angle) * (NODE_HEIGHT / 2);
  const toX = tc.x - Math.cos(angle) * (NODE_WIDTH / 2);
  const toY = tc.y - Math.sin(angle) * (NODE_HEIGHT / 2);
  return { fromX, fromY, toX, toY };
}

const RUN_SEQUENCE = ["researcher", "drafter", "voice-critic", "asset-creator", "postsyncer", "engager"];

export default function AgentFlow() {
  const [active, setActive] = useState<string[]>([]);
  const [running, setRunning] = useState(false);
  const [selected, setSelected] = useState<AgentNode | null>(null);
  const [activeEdge, setActiveEdge] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  function runSimulation() {
    if (running) {
      if (timerRef.current) clearTimeout(timerRef.current);
      setRunning(false);
      setActive([]);
      setActiveEdge(null);
      return;
    }
    setRunning(true);
    setActive([]);
    setActiveEdge(null);

    const stepDuration = 900;
    RUN_SEQUENCE.forEach((slug, i) => {
      const t = setTimeout(() => {
        setActive((curr) => [...curr, slug]);
        if (i > 0) {
          const prev = RUN_SEQUENCE[i - 1];
          setActiveEdge(`${prev}->${slug}`);
        }
        if (i === RUN_SEQUENCE.length - 1) {
          setTimeout(() => {
            setRunning(false);
            setActiveEdge(null);
          }, stepDuration);
        }
      }, i * stepDuration);
      timerRef.current = t;
    });
  }

  const svgWidth = GRID_COLS * CELL_WIDTH;
  const svgHeight = GRID_ROWS * CELL_HEIGHT;

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-semibold">Agent Flow</h3>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Click any agent to see details · Run simulation to see the pipeline fire
          </p>
        </div>
        <button
          onClick={runSimulation}
          className={running ? "btn btn-secondary" : "btn btn-primary"}
        >
          {running ? <Square size={14} /> : <Play size={14} />}
          {running ? "Stop" : "Run simulation"}
        </button>
      </div>

      <div
        className="relative mx-auto"
        style={{ width: svgWidth, height: svgHeight, maxWidth: "100%" }}
      >
        <svg
          width="100%"
          height={svgHeight}
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="absolute inset-0"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {NODES.map((n) => (
              <marker
                key={`arrow-${n.slug}`}
                id={`arrow-${n.slug}`}
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill={n.color} />
              </marker>
            ))}
            <marker
              id="arrow-default"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#26262a" />
            </marker>
          </defs>

          {EDGES.map((edge, i) => {
            const from = NODES.find((n) => n.slug === edge.from)!;
            const to = NODES.find((n) => n.slug === edge.to)!;
            const { fromX, fromY, toX, toY } = nodeEdge(from, to);
            const midX = (fromX + toX) / 2;
            const midY = (fromY + toY) / 2;
            const edgeId = `${edge.from}->${edge.to}`;
            const isActive = activeEdge === edgeId || (active.includes(edge.from) && active.includes(edge.to));
            return (
              <g key={i}>
                <line
                  x1={fromX}
                  y1={fromY}
                  x2={toX}
                  y2={toY}
                  stroke={isActive ? to.color : "#26262a"}
                  strokeWidth={isActive ? 2 : 1.5}
                  markerEnd={`url(#${isActive ? `arrow-${to.slug}` : "arrow-default"})`}
                  style={{
                    transition: "all 0.3s ease",
                    opacity: isActive ? 1 : 0.5,
                  }}
                />
                {edge.label && (
                  <text
                    x={midX}
                    y={midY - 4}
                    fill={isActive ? to.color : "#555559"}
                    fontSize="9"
                    fontWeight="500"
                    textAnchor="middle"
                    style={{ transition: "fill 0.3s ease" }}
                  >
                    {edge.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {NODES.map((node) => {
          const { x, y } = nodeCenter(node);
          const isActive = active.includes(node.slug);
          const isSelected = selected?.slug === node.slug;
          const Icon = node.icon;
          return (
            <button
              key={node.slug}
              onClick={() => setSelected(node)}
              className="absolute rounded-xl flex items-center gap-2.5 px-3 text-left transition-all"
              style={{
                left: x - NODE_WIDTH / 2,
                top: y - NODE_HEIGHT / 2,
                width: NODE_WIDTH,
                height: NODE_HEIGHT,
                background: isActive ? `${node.color}22` : isSelected ? "var(--bg-elev-2)" : "var(--bg-elev)",
                border: `1.5px solid ${isActive || isSelected ? node.color : "var(--border-subtle)"}`,
                boxShadow: isActive ? `0 0 20px ${node.color}66` : "none",
                transform: isActive ? "scale(1.05)" : "scale(1)",
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  background: `${node.color}24`,
                  boxShadow: isActive ? `inset 0 0 0 2px ${node.color}` : "none",
                }}
              >
                <Icon size={18} color={node.color} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold truncate">{node.name}</div>
                <div className="text-[10px] leading-tight" style={{ color: "var(--text-muted)" }}>
                  {node.role}
                </div>
              </div>
              {isActive && (
                <div className="absolute top-1.5 right-1.5">
                  <div
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ background: node.color }}
                  />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {selected && (
        <div
          className="mt-6 rounded-lg p-5"
          style={{
            background: "var(--bg-elev-2)",
            borderLeft: `3px solid ${selected.color}`,
          }}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-lg flex items-center justify-center"
                style={{ background: `${selected.color}24` }}
              >
                <selected.icon size={20} color={selected.color} />
              </div>
              <div>
                <h3 className="font-semibold">{selected.name}</h3>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {selected.role}
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelected(null)}
              className="w-7 h-7 rounded flex items-center justify-center"
              style={{ background: "var(--bg-elev)" }}
            >
              <X size={14} />
            </button>
          </div>

          <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text)" }}>
            {selected.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div>
              <div className="font-medium uppercase tracking-wider mb-1.5" style={{ color: "var(--text-dim)" }}>
                Inputs
              </div>
              <div className="space-y-1">
                {selected.inputs.map((i) => (
                  <div key={i} className="px-2 py-1 rounded" style={{ background: "var(--bg-elev)" }}>
                    {i}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="font-medium uppercase tracking-wider mb-1.5" style={{ color: "var(--text-dim)" }}>
                Outputs
              </div>
              <div className="space-y-1">
                {selected.outputs.map((o) => (
                  <div
                    key={o}
                    className="px-2 py-1 rounded"
                    style={{
                      background: `${selected.color}14`,
                      color: selected.color,
                    }}
                  >
                    {o}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="font-medium uppercase tracking-wider mb-1.5" style={{ color: "var(--text-dim)" }}>
                Triggered by
              </div>
              <div className="space-y-1">
                {selected.triggers.map((t) => (
                  <code
                    key={t}
                    className="block px-2 py-1 rounded text-[11px]"
                    style={{ background: "var(--bg-elev)", color: "var(--text-muted)" }}
                  >
                    {t}
                  </code>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
