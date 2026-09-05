import Link from "next/link";

interface ComparisonRowProps {
  feature: string;
  vendorA: string;
  vendorB: string;
  winner?: "a" | "b" | "tie";
}

export function ComparisonTable({
  rows,
  vendorA,
  vendorB,
}: {
  rows: { feature: string; vendorA: string; vendorB: string; winner?: "a" | "b" | "tie" }[];
  vendorA: string;
  vendorB: string;
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-surface-alt">
            <th className="px-4 py-3 text-left font-semibold">Feature</th>
            <th className="px-4 py-3 text-left font-semibold">{vendorA}</th>
            <th className="px-4 py-3 text-left font-semibold">{vendorB}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.feature} className="border-b border-border last:border-0">
              <td className="px-4 py-3 font-medium">{row.feature}</td>
              <td className={`px-4 py-3 ${row.winner === "a" ? "font-semibold text-success" : ""}`}>
                {row.vendorA}
              </td>
              <td className={`px-4 py-3 ${row.winner === "b" ? "font-semibold text-success" : ""}`}>
                {row.vendorB}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface VerdictBoxProps {
  winner: string;
  summary: string;
  bestForA: string;
  bestForB: string;
}

export function VerdictBox({ winner, summary, bestForA, bestForB }: VerdictBoxProps) {
  return (
    <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-6">
      <div className="mb-2 flex items-center gap-2">
        <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase text-white">
          Verdict
        </span>
      </div>
      <p className="text-lg font-bold text-foreground">{summary}</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-border bg-surface p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-muted">Best For</p>
          <p className="mt-1 text-sm font-medium text-foreground">{bestForA}</p>
        </div>
        <div className="rounded-lg border border-border bg-surface p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-muted">Best For</p>
          <p className="mt-1 text-sm font-medium text-foreground">{bestForB}</p>
        </div>
      </div>
    </div>
  );
}

interface QuickPickProps {
  title: string;
  winner: string;
  score: string;
  reason: string;
  href: string;
}

export function QuickPickCard({ title, winner, score, reason, href }: QuickPickProps) {
  return (
    <Link href={href} className="group block rounded-xl border border-border bg-surface p-5 transition-all hover:border-primary/30 hover:shadow-md">
      <p className="text-xs font-bold uppercase tracking-wider text-muted">{title}</p>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-extrabold text-primary">{winner}</span>
        <span className="rounded-full bg-success/10 px-2 py-0.5 text-xs font-bold text-success">{score}</span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted">{reason}</p>
      <span className="mt-3 inline-block text-xs font-semibold text-primary group-hover:underline">
        See full comparison →
      </span>
    </Link>
  );
}
