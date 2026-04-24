import PillarChart from "@/components/PillarChart";
import { calculatePillarCoverage } from "@/lib/content";

export const dynamic = "force-dynamic";

const PILLAR_NOTES: Record<string, string> = {
  "AI Agents & Automation":
    "Core credibility. Systems that take input (WhatsApp, call, lead form) and run full workflows autonomously.",
  "UpliftAI":
    "Building in public. Product decisions, 6-agent architecture, GEO wedge, pricing. Minimum 1 post per daily batch.",
  "Agency & Founder Lessons":
    "Running three companies at once. Pricing, team, scoping, cash flow, agency-to-product pivots.",
  "Client Work":
    "\"Shipped this for a client last week\" energy. Anonymised case studies, specific workflows.",
  "Contrarian Takes":
    "Bullish on building, bearish on AI strategy consulting. Bullish on systems, bearish on prompt libraries.",
  "Hospitality":
    "Motel ops + real estate. Only as operator-range signal, never as pivot.",
};

export default function PillarsPage() {
  const data7 = calculatePillarCoverage(7);
  const data30 = calculatePillarCoverage(30);

  return (
    <div className="p-8 max-w-7xl">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Pillars</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
          Weighted content mix vs target (35 / 20 / 15 / 15 / 10 / 5)
        </p>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        <PillarChart data={data7} />
        <div className="card p-5">
          <div className="mb-4">
            <h3 className="text-sm font-semibold">30-Day Coverage</h3>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              Longer-term pillar balance
            </p>
          </div>
          <div className="space-y-3">
            {data30.map((d) => (
              <div key={d.pillar} className="flex items-center justify-between text-sm">
                <span>{d.pillar}</span>
                <span style={{ color: "var(--text-muted)" }}>
                  {d.posts} posts · {d.actual.toFixed(0)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-sm font-semibold mb-4">Pillar Playbook</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {data7.map((d) => (
            <div key={d.pillar} className="card p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-sm">{d.pillar}</h4>
                <span className="badge badge-muted">{d.target.toFixed(0)}%</span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {PILLAR_NOTES[d.pillar]}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
