export default function RingCounter({
  value,
  max = 100,
  color,
  label,
}: {
  value: number;
  max?: number;
  color: string;
  label?: string;
}) {
  const pct = Math.min(1, value / max);
  const circumference = 2 * Math.PI * 34;
  const offset = circumference * (1 - pct);

  return (
    <div className="flex flex-col items-center">
      <div className="ring-counter">
        <svg width="80" height="80" viewBox="0 0 80 80">
          <circle
            cx="40"
            cy="40"
            r="34"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="5"
          />
          <circle
            cx="40"
            cy="40"
            r="34"
            fill="none"
            stroke={color}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{
              filter: `drop-shadow(0 0 6px ${color}80)`,
              transition: "stroke-dashoffset 0.6s ease",
            }}
          />
        </svg>
        <div className="num" style={{ color }}>
          {value}
        </div>
      </div>
      {label && (
        <div
          className="mt-1.5 text-[10px] font-semibold uppercase tracking-wider"
          style={{ color: "var(--text-muted)" }}
        >
          {label}
        </div>
      )}
    </div>
  );
}
