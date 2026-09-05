interface InfoCardProps {
  title: string;
  children: React.ReactNode;
  variant?: "default" | "primary" | "warning";
}

export function InfoCard({ title, children, variant = "default" }: InfoCardProps) {
  const borderClass =
    variant === "primary"
      ? "border-primary/30 bg-primary/5"
      : variant === "warning"
        ? "border-warning/30 bg-warning/5"
        : "border-border bg-surface";

  return (
    <div className={`rounded-xl border p-6 ${borderClass}`}>
      <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-foreground/80">
        {title}
      </h3>
      {children}
    </div>
  );
}

interface DataTableProps {
  headers: string[];
  rows: (string | number)[][];
  highlightCol?: number;
}

export function DataTable({ headers, rows, highlightCol }: DataTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-surface-alt">
            {headers.map((h) => (
              <th key={h} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-muted">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-border last:border-0">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`px-4 py-3 ${
                    j === 0 ? "font-medium" : ""
                  } ${
                    highlightCol !== undefined && j === highlightCol
                      ? "font-bold text-success"
                      : ""
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface ProsConsProps {
  pros: string[];
  cons: string[];
}

export function ProsCons({ pros, cons }: ProsConsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-xl border border-success/20 bg-success/5 p-5">
        <h4 className="mb-3 flex items-center gap-2 text-sm font-bold text-success">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          Strengths
        </h4>
        <ul className="space-y-2">
          {pros.map((p) => (
            <li key={p} className="flex items-start gap-2 text-sm text-foreground/80">
              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-success" />
              {p}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border border-danger/20 bg-danger/5 p-5">
        <h4 className="mb-3 flex items-center gap-2 text-sm font-bold text-danger">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Limitations
        </h4>
        <ul className="space-y-2">
          {cons.map((c) => (
            <li key={c} className="flex items-start gap-2 text-sm text-foreground/80">
              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-danger" />
              {c}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

interface BestForProps {
  scenarios: { label: string; description: string }[];
}

export function BestFor({ scenarios }: BestForProps) {
  return (
    <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
      <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-primary">
        Best For
      </h4>
      <div className="grid gap-3 sm:grid-cols-2">
        {scenarios.map((s) => (
          <div key={s.label} className="flex items-start gap-2">
            <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-sm font-semibold">{s.label}</p>
              <p className="text-xs text-muted">{s.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
