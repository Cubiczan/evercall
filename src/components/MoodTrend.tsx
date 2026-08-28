/** 14-day mood sparkline (SVG, zero deps). Warm = high mood. */
export default function MoodTrend({ values }: { values: number[] }) {
  const w = 280;
  const h = 64;
  const pad = 4;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const pts = values.map((v, i) => {
    const x = pad + (i / (values.length - 1)) * (w - 2 * pad);
    const y = h - pad - ((v - min) / range) * (h - 2 * pad);
    return [x, y] as const;
  });

  const path = pts
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`)
    .join(" ");

  const last = pts[pts.length - 1];

  return (
    <section className="card">
      <h2>📈 Mood — Last 14 Days</h2>
      <svg
        viewBox={`0 0 ${w} ${h}`}
        width="100%"
        height={h}
        role="img"
        aria-label="Mood trend sparkline for the last 14 days"
      >
        <path
          d={path}
          fill="none"
          stroke="var(--amber)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx={last[0]} cy={last[1]} r="4" fill="var(--teal)" />
      </svg>
      <div className="kv">
        <span className="k">14-day average</span>
        <span className="v ok">
          {Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 100)}%
        </span>
      </div>
    </section>
  );
}
