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
  else if (overallScore < 8.5) { verdictColor = "text-primary"; verdictLabel = "Strong"; verdictBg = "bg-primary/10 border-primary/20"; }

  return (
    <div className="rounded-xl border border-border bg-surface p-6 card-hover">
      <div className="mb-5 flex items-start justify-between">
        <div>
          {badge && (
            <span className="mb-2 inline-block rounded-md bg-accent/10 border border-accent/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent">
              {badge}
            </span>
          )}
          <h3 className="text-xl font-black text-foreground">{vendorName}</h3>
          <p className="text-sm text-muted mt-0.5">{category}</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-black font-mono text-primary">{overallScore}</div>
          <div className="text-xs font-medium text-muted">/10</div>
          <div className={`mt-1.5 inline-block rounded-md border px-2 py-0.5 text-[10px] font-bold ${verdictColor} ${verdictBg}`}>
            {verdictLabel}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {dimensions.map((d) => (
          <div key={d.name}>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs font-medium text-muted">{d.name}</span>
              {d.weight && <span className="text-[10px] text-muted/60 font-mono">{d.weight}</span>}
            </div>
            <ScoreBar score={d.score} size="sm" />
          </div>
        ))}
      </div>
    </div>
  );
}
