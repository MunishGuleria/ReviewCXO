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
    <div className="overflow-x-auto rounded border border-border bg-surface">
      <table className="data-table">
        <thead>
          <tr>
            <th>Feature</th>
            <th>{vendorA}</th>
            <th>{vendorB}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.feature}>
              <td className="font-medium text-secondary-foreground">{row.feature}</td>
              <td className={`${row.winner === "a" ? "font-semibold text-foreground bg-primary/5" : "text-muted-foreground"}`}>
                {row.vendorA}
              </td>
              <td className={`${row.winner === "b" ? "font-semibold text-foreground bg-primary/5" : "text-muted-foreground"}`}>
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
    <div className="rounded border border-border bg-surface-alt p-6">
      <div className="mb-3 flex items-center gap-2">
        <span className="rounded bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
          Verdict
        </span>
      </div>
      <p className="text-lg font-semibold text-foreground leading-snug">{summary}</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded border border-border bg-surface p-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Best For</p>
          <p className="text-sm font-medium text-secondary-foreground">{bestForA}</p>
        </div>
        <div className="rounded border border-border bg-surface p-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Best For</p>
          <p className="text-sm font-medium text-secondary-foreground">{bestForB}</p>
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
    <Link href={href} className="group block rounded border border-border bg-surface p-6 transition-colors hover:border-border-strong">
      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{title}</p>
      <div className="mt-3 flex items-baseline gap-3">
        <span className="text-2xl font-bold text-foreground group-hover:text-primary-text transition-colors">{winner}</span>
        <span className="rounded bg-success/10 border border-success/20 px-2 py-0.5 text-xs font-bold text-success">{score}</span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{reason}</p>
      <span className="mt-4 inline-block text-xs font-medium text-primary-text group-hover:underline">
        Read Comparison →
      </span>
    </Link>
  );
}
