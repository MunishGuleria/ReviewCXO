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
  let verdictBg = "bg-success/10 border-success/20";
  if (overallScore < 6) { verdictColor = "text-danger"; verdictLabel = "Needs Work"; verdictBg = "bg-danger/10 border-danger/20"; }
  else if (overallScore < 7.5) { verdictColor = "text-warning"; verdictLabel = "Good"; verdictBg = "bg-warning/10 border-warning/20"; }
  else if (overallScore < 8.5) { verdictColor = "text-primary-text"; verdictLabel = "Strong"; verdictBg = "bg-primary/10 border-primary/20"; }

  return (
    <div className="card-premium p-6">
      <div className="mb-6 flex items-start justify-between">
        <div>
          {badge && (
            <span className="mb-3 inline-block rounded bg-success/10 border border-success/20 px-2 py-1 text-[10px] font-bold tracking-wider text-success uppercase">
              {badge}
            </span>
          )}
          <h3 className="text-xl font-bold text-foreground">{vendorName}</h3>
          <p className="text-sm font-medium text-muted-foreground mt-1">{category}</p>
        </div>
        <div className="text-right">
          <div className="flex items-baseline justify-end gap-1">
            <span className="text-3xl font-bold text-foreground">{overallScore}</span>
            <span className="text-sm text-muted-foreground">/10</span>
          </div>
          <div className={`mt-2 inline-block rounded border px-2 py-0.5 text-[10px] font-bold ${verdictColor} ${verdictBg}`}>
            {verdictLabel}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {dimensions.map((d) => (
          <div key={d.name}>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-secondary-foreground">{d.name}</span>
              {d.weight && <span className="text-xs font-mono text-muted-foreground">{d.weight}</span>}
            </div>
            <ScoreBar score={d.score} size="sm" />
          </div>
        ))}
      </div>
    </div>
  );
}
