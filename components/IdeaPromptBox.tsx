"use client";

import { useEffect, useRef, useState } from "react";
import {
  Sparkles,
  Send,
  Loader2,
  Brain,
  Search,
  Target,
  Wand2,
  Plus,
  RotateCcw,
  Check,
} from "lucide-react";
import type { IdeaEntry, Pillar, PostType } from "@/lib/types";

type Suggestion = Pick<
  IdeaEntry,
  "title" | "pillar" | "proof_point" | "target_formats" | "score" | "notes"
> & {
  hook: string;
  projected_reach: number;
  reply_rate: number;
  effort: "low" | "medium" | "high";
  confidence: number;
};

interface AgentStep {
  id: string;
  label: string;
  icon: typeof Brain;
}

const AGENT_STEPS: AgentStep[] = [
  { id: "parse", label: "Parsing prompt + pulling pillar signal", icon: Brain },
  { id: "search", label: "Scanning 412 reader replies + 1.2K scraper hits", icon: Search },
  { id: "match", label: "Matching against case-study proof library", icon: Target },
  { id: "rank", label: "Scoring hooks by pillar coverage + novelty", icon: Wand2 },
];

const EXAMPLE_PROMPTS = [
  "ideas about WhatsApp agents for realtors",
  "contrarian takes on AI hype for B2B",
  "client wins we haven't posted yet",
  "hooks around Robinhood Cleaners $1M ARR",
  "why voice agents are eating the dental vertical",
  "the boring ops wins behind UpliftAI MRR",
  "pest control SMB case study angles",
  "lessons from charging $25K for a 3-line prompt",
  "reader replies I should turn into threads",
  "LinkedIn carousels about agency pricing",
  "contrarian takes on n8n vs custom code",
  "hospitality angles for small-restaurant operators",
  "what founders get wrong about AI moats",
  "weekend build ideas that became real revenue",
];

const PILLARS: Pillar[] = [
  "AI Agents & Automation",
  "UpliftAI",
  "Agency & Founder Lessons",
  "Client Work",
  "Contrarian Takes",
  "Hospitality",
];

const PROOF_POINTS = ["robinhood", "houseup", "realtor", "dental", "pestcontrol", "upliftai", "renovation"];
const FORMATS: PostType[] = ["X-THREAD", "X-HOT-TAKE", "LI-LONGFORM", "LI-CAROUSEL", "TH-HOOK", "IG-REEL"];

function pick<T>(arr: readonly T[], n: number): T[] {
  const copy = [...arr];
  const out: T[] = [];
  for (let i = 0; i < n && copy.length; i++) {
    out.push(copy.splice(Math.floor(Math.random() * copy.length), 1)[0]);
  }
  return out;
}

function synthesize(prompt: string): Suggestion[] {
  const seed = prompt.toLowerCase();
  const snippet = prompt.trim().slice(0, 48) || "our last client win";
  const aiish = /ai|agent|gpt|llm|claude/.test(seed);
  const dollar1 = (Math.random() * 30 + 5).toFixed(0);
  const dollar2 = (Math.random() * 8 + 2).toFixed(0);
  const dollar3 = (Math.random() * 120 + 20).toFixed(0);

  const titles = [
    `The unsexy workflow behind ${snippet}`,
    `Stop pitching AI. Start pitching ${prompt.slice(0, 30) || "the boring outcome"}.`,
    `We charged $${dollar1}K for what OpenAI gives away. Here's why it worked.`,
    `The 3-line prompt that replaced a $${dollar2}K/mo SDR`,
    `Nobody talks about this part of ${aiish ? "AI agents" : "agency growth"}`,
    `$${dollar3}K/mo in 11 weeks with one WhatsApp agent and zero ads`,
    `The demo script I use when a client says "but can ChatGPT just do this?"`,
    `Why our cheapest automation is the one clients pay us the most for`,
    `I almost fired the intern. Turns out the prompt was the problem.`,
    `The one slide that doubled our close rate on retainer deals`,
    `What ${aiish ? "agent" : "agency"} Twitter is getting wrong about ${snippet}`,
    `7 months in — here's what actually moved the needle on UpliftAI`,
  ];

  const hooks = [
    "Hook: lead with the dollar number, not the tech.",
    "Hook: concede the obvious objection in line one.",
    "Hook: name the exact tool the reader is about to ask about.",
    "Hook: open with the moment the client said 'wait, really?'",
    "Hook: frame it as a reply to a louder take on the timeline.",
    "Hook: screenshot of the Stripe dashboard first, commentary second.",
    "Hook: the before/after org chart — 11 people to 3 people + an agent.",
    "Hook: quote the objection verbatim, then dismantle it in 4 lines.",
    "Hook: lead with a timestamp — 'Tuesday 3:14am, 2 messages came in.'",
    "Hook: the one-line DM that kicked off the whole engagement.",
  ];

  const notes = [
    "Pairs with the Houseup case study — we have unused screenshots from the March demo.",
    "Reader reply from @saas_dan asked this almost verbatim last Tuesday. Warm audience.",
    "Contrarian to the current timeline consensus. Expect pushback + reach.",
    "Fills a gap in this week's pillar coverage (under-indexed on Client Work).",
    "Low-effort repurpose — the long-form already exists in a Loom from Q1.",
    "Robinhood client already said we can quote the $40K→$1M arc. Zero approval friction.",
    "Scraper flagged 3 tweets this week from competitors dancing around this angle.",
    "Engagement log shows dental-vertical replies convert to DMs 3.2x the baseline.",
    "UpliftAI onboarding funnel had 41 sign-ups last time we posted on this topic.",
    "Matches the 'boring ops' sub-pillar that's been quiet for 9 days — timing is good.",
  ];

  const count = 5;
  const picks = pick(titles, count);
  return picks.map((title, i) => {
    const score = Number((7 + Math.random() * 2.2).toFixed(1));
    const effortRoll = Math.random();
    const effort: Suggestion["effort"] = effortRoll < 0.35 ? "low" : effortRoll < 0.8 ? "medium" : "high";
    const baseReach = score >= 8.5 ? 18000 : score >= 7.8 ? 9500 : 4200;
    return {
      title,
      hook: hooks[Math.floor(Math.random() * hooks.length)],
      pillar: PILLARS[(i + Math.floor(Math.random() * PILLARS.length)) % PILLARS.length],
      proof_point: Math.random() > 0.2 ? PROOF_POINTS[Math.floor(Math.random() * PROOF_POINTS.length)] : null,
      target_formats: pick(FORMATS, 2),
      score,
      notes: notes[Math.floor(Math.random() * notes.length)],
      projected_reach: Math.round(baseReach * (0.7 + Math.random() * 0.9)),
      reply_rate: Number((1.4 + Math.random() * 3.2).toFixed(1)),
      effort,
      confidence: Math.round(62 + Math.random() * 32),
    };
  });
}

function formatReach(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return `${n}`;
}

const EFFORT_META: Record<Suggestion["effort"], { label: string; color: string }> = {
  low: { label: "low effort", color: "var(--ok)" },
  medium: { label: "med effort", color: "var(--warn)" },
  high: { label: "high effort", color: "var(--err)" },
};

function scoreColor(score: number): string {
  if (score >= 8.5) return "#22c55e";
  if (score >= 7) return "#fbbf24";
  return "#f97316";
}

type Phase = "idle" | "thinking" | "streaming" | "done";

export default function IdeaPromptBox() {
  const [prompt, setPrompt] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [activeSteps, setActiveSteps] = useState<number>(0);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [revealed, setRevealed] = useState<number>(0);
  const [queued, setQueued] = useState<Set<number>>(new Set());
  const [typedPreamble, setTypedPreamble] = useState("");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    return () => {
      timers.current.forEach(clearTimeout);
    };
  }, []);

  function reset() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setPhase("idle");
    setActiveSteps(0);
    setSuggestions([]);
    setRevealed(0);
    setQueued(new Set());
    setTypedPreamble("");
  }

  function submit() {
    if (!prompt.trim() || phase === "thinking" || phase === "streaming") return;
    setPhase("thinking");
    setActiveSteps(0);
    setSuggestions([]);
    setRevealed(0);
    setQueued(new Set());
    setTypedPreamble("");

    AGENT_STEPS.forEach((_, i) => {
      const t = setTimeout(() => setActiveSteps(i + 1), 450 + i * 520);
      timers.current.push(t);
    });

    const startStreaming = setTimeout(() => {
      setPhase("streaming");
      const ideas = synthesize(prompt);
      setSuggestions(ideas);

      const top = [...ideas].sort((a, b) => b.score - a.score)[0];
      const totalReach = ideas.reduce((s, x) => s + x.projected_reach, 0);
      const avgReply = (ideas.reduce((s, x) => s + x.reply_rate, 0) / ideas.length).toFixed(1);
      const preamble = `Found ${ideas.length} angles across ${new Set(ideas.map((i) => i.pillar)).size} pillars. Projected combined reach ~${formatReach(totalReach)}, avg reply rate ${avgReply}%. Top pick: "${top.title.slice(0, 56)}${top.title.length > 56 ? "…" : ""}" — score ${top.score}, ${top.confidence}% confidence.`;
      let i = 0;
      const typeTick = () => {
        i++;
        setTypedPreamble(preamble.slice(0, i));
        if (i < preamble.length) {
          const t = setTimeout(typeTick, 14);
          timers.current.push(t);
        } else {
          ideas.forEach((_, idx) => {
            const t = setTimeout(() => setRevealed(idx + 1), 160 * idx);
            timers.current.push(t);
          });
          const doneTimer = setTimeout(() => setPhase("done"), 160 * ideas.length + 200);
          timers.current.push(doneTimer);
        }
      };
      typeTick();
    }, 450 + AGENT_STEPS.length * 520 + 120);
    timers.current.push(startStreaming);
  }

  const busy = phase === "thinking" || phase === "streaming";

  return (
    <section className="card p-5 mb-8" style={{ background: "var(--bg-elev)" }}>
      <div className="flex items-center gap-2 mb-3">
        <div
          className="w-6 h-6 rounded-md flex items-center justify-center"
          style={{ background: "var(--accent-soft)", color: "var(--accent)" }}
        >
          <Sparkles size={13} />
        </div>
        <h3 className="text-sm font-semibold">Ideation agent</h3>
        <span className="text-xs" style={{ color: "var(--text-dim)" }}>
          — describe what you want and it&apos;ll propose angles
        </span>
      </div>

      <div className="flex gap-2">
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
          disabled={busy}
          placeholder="e.g. hooks for the Robinhood Cleaners $1M ARR story"
          className="flex-1 px-3 py-2.5 rounded-lg text-sm outline-none transition-colors"
          style={{
            background: "var(--bg-elev-2)",
            border: "1px solid var(--border)",
            color: "var(--text)",
          }}
        />
        {phase === "done" ? (
          <button onClick={reset} className="btn btn-secondary">
            <RotateCcw size={14} /> New prompt
          </button>
        ) : (
          <button
            onClick={submit}
            disabled={!prompt.trim() || busy}
            className="btn btn-primary"
            style={{ opacity: !prompt.trim() || busy ? 0.5 : 1 }}
          >
            {busy ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
            {phase === "thinking" ? "Thinking…" : phase === "streaming" ? "Writing…" : "Suggest"}
          </button>
        )}
      </div>

      {phase === "idle" && (
        <div className="mt-3 flex flex-wrap gap-2">
          {EXAMPLE_PROMPTS.map((p) => (
            <button
              key={p}
              onClick={() => setPrompt(p)}
              className="text-xs px-2.5 py-1 rounded-full transition-colors"
              style={{
                background: "var(--bg-elev-2)",
                border: "1px solid var(--border-subtle)",
                color: "var(--text-muted)",
              }}
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {(phase === "thinking" || phase === "streaming" || phase === "done") && (
        <div className="mt-5 space-y-2">
          {AGENT_STEPS.map((step, i) => {
            const Icon = step.icon;
            const active = activeSteps === i && phase === "thinking";
            const complete = activeSteps > i || phase === "streaming" || phase === "done";
            const pending = activeSteps <= i && phase === "thinking" && !active;
            return (
              <div
                key={step.id}
                className="flex items-center gap-3 text-xs transition-opacity"
                style={{
                  opacity: pending ? 0.35 : 1,
                  color: complete ? "var(--text-muted)" : "var(--text)",
                }}
              >
                <div
                  className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                  style={{
                    background: complete
                      ? "rgba(48, 209, 88, 0.12)"
                      : active
                        ? "var(--accent-soft)"
                        : "var(--bg-elev-2)",
                    color: complete ? "var(--ok)" : active ? "var(--accent)" : "var(--text-dim)",
                  }}
                >
                  {complete ? (
                    <Check size={12} />
                  ) : active ? (
                    <Loader2 size={12} className="animate-spin" />
                  ) : (
                    <Icon size={12} />
                  )}
                </div>
                <span>{step.label}</span>
              </div>
            );
          })}
        </div>
      )}

      {(phase === "streaming" || phase === "done") && typedPreamble && (
        <div
          className="mt-5 p-3 rounded-lg text-sm leading-relaxed"
          style={{
            background: "var(--bg-elev-2)",
            border: "1px solid var(--border-subtle)",
            color: "var(--text)",
          }}
        >
          {typedPreamble}
          {phase === "streaming" && (
            <span className="inline-block w-1.5 h-3.5 ml-0.5 align-middle animate-pulse" style={{ background: "var(--accent)" }} />
          )}
        </div>
      )}

      {suggestions.length > 0 && (
        <div className="mt-3 space-y-2">
          {suggestions.slice(0, revealed).map((s, i) => (
            <div
              key={i}
              className="card p-4 animate-in-up"
              style={{ background: "var(--bg-elev-2)" }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-sm"
                  style={{
                    background: `${scoreColor(s.score)}18`,
                    color: scoreColor(s.score),
                  }}
                >
                  {s.score.toFixed(1)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h4 className="font-semibold text-sm">{s.title}</h4>
                    <span className="badge badge-accent">{s.pillar}</span>
                  </div>
                  <div
                    className="text-xs mb-1.5 flex flex-wrap items-center gap-2"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {s.proof_point && (
                      <>
                        <span>
                          proof: <code style={{ color: "var(--accent)" }}>{s.proof_point}</code>
                        </span>
                        <span>·</span>
                      </>
                    )}
                    <span>formats: {s.target_formats.join(", ")}</span>
                  </div>
                  <p className="text-xs leading-relaxed mb-1" style={{ color: "var(--text-dim)" }}>
                    {s.hook}
                  </p>
                  <p className="text-xs leading-relaxed mb-2" style={{ color: "var(--text-dim)" }}>
                    {s.notes}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-[11px]" style={{ color: "var(--text-muted)" }}>
                    <span className="inline-flex items-center gap-1">
                      <span style={{ color: "var(--text-dim)" }}>reach</span>
                      <span style={{ color: "var(--text)" }}>~{formatReach(s.projected_reach)}</span>
                    </span>
                    <span style={{ color: "var(--text-dim)" }}>·</span>
                    <span className="inline-flex items-center gap-1">
                      <span style={{ color: "var(--text-dim)" }}>reply</span>
                      <span style={{ color: "var(--text)" }}>{s.reply_rate}%</span>
                    </span>
                    <span style={{ color: "var(--text-dim)" }}>·</span>
                    <span style={{ color: EFFORT_META[s.effort].color }}>{EFFORT_META[s.effort].label}</span>
                    <span style={{ color: "var(--text-dim)" }}>·</span>
                    <span className="inline-flex items-center gap-1">
                      <span style={{ color: "var(--text-dim)" }}>conf</span>
                      <span style={{ color: "var(--text)" }}>{s.confidence}%</span>
                    </span>
                  </div>
                </div>
                <button
                  onClick={() =>
                    setQueued((prev) => {
                      const next = new Set(prev);
                      next.add(i);
                      return next;
                    })
                  }
                  disabled={queued.has(i)}
                  className="btn btn-secondary text-xs py-1.5 flex-shrink-0"
                  style={{ opacity: queued.has(i) ? 0.6 : 1 }}
                >
                  {queued.has(i) ? (
                    <>
                      <Check size={12} /> Queued
                    </>
                  ) : (
                    <>
                      <Plus size={12} /> Queue
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
