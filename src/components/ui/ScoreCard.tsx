import { ScoreBar } from "./ScoreBar";

interface DimensionScore {
  name: string;
  score: number;
  weight?: string;
}

interface ScoreCardProps {
  vendorName: string;
  category: string;
  overallScore: number;
  dimensions: DimensionScore[];
  badge?: string;
}

export function ScoreCard({ vendorName, category, overallScore, dimensions, badge }: ScoreCardProps) {
  let verdictColor = "text-success";
  let verdictLabel = "Excellent";
  if (overallScore < 6) { verdictColor = "text-danger"; verdictLabel = "Needs Work"; }
  else if (overallScore < 7.5) { verdictColor = "text-warning"; verdictLabel = "Good"; }
  else if (overallScore < 8.5) { verdictColor = "text-primary"; verdictLabel = "Strong"; }

  return (
    <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
      <div className="mb-4 flex items-start justify-between">
        <div>
          {badge && (
            <span className="mb-2 inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-primary">
              {badge}
            </span>
          )}
          <h3 className="text-xl font-extrabold text-foreground">{vendorName}</h3>
          <p className="text-sm text-muted">{category}</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-extrabold text-primary">{overallScore}</div>
          <div className="text-xs font-medium text-muted">/10</div>
          <div className={`mt-1 text-xs font-bold ${verdictColor}`}>{verdictLabel}</div>
        </div>
      </div>

      <div className="space-y-2.5">
        {dimensions.map((d) => (
          <div key={d.name}>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs font-medium text-muted">{d.name}</span>
              {d.weight && <span className="text-xs text-muted/60">{d.weight}</span>}
            </div>
            <ScoreBar score={d.score} size="sm" />
          </div>
        ))}
      </div>
    </div>
  );
}
