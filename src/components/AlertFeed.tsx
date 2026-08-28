import type { Alert } from "@/lib/types";

export default function AlertFeed({ alerts }: { alerts: Alert[] }) {
  const ordered = [...alerts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <section className="card">
      <h2>🚨 Family Alerts</h2>
      {ordered.length === 0 && (
        <p style={{ color: "var(--muted)" }}>All quiet. That&apos;s the point.</p>
      )}
      {ordered.map((a) => (
        <div key={a.id} className={`alert ${a.severity}`}>
          <strong>
            {a.severity === "urgent" ? "🚨" : a.severity === "warning" ? "⚠️" : "ℹ️"}{" "}
            {a.title}
          </strong>
          <div>{a.detail}</div>
          <div className="when">
            {new Date(a.createdAt).toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      ))}
    </section>
  );
}
