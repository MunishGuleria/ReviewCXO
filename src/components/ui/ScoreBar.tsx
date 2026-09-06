"use client";

interface ScoreBarProps {
  score: number;
  maxScore?: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export function ScoreBar({ score, maxScore = 10, size = "md", showLabel = true }: ScoreBarProps) {
  const percentage = (score / maxScore) * 100;

  let colorClass = "bg-success";
  if (score <= 4) colorClass = "bg-danger";
  else if (score <= 6) colorClass = "bg-warning";
  else if (score <= 8) colorClass = "bg-primary";

  const heightClass = size === "sm" ? "h-1.5" : size === "lg" ? "h-3" : "h-2";

  return (
    <div className="flex items-center gap-2">
      <div className={`flex-1 overflow-hidden rounded-full bg-border ${heightClass}`}>
        <div
          className={`${colorClass} ${heightClass} rounded-full transition-all`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <span className="w-8 text-right text-sm font-bold tabular-nums">
          {score}
        </span>
      )}
    </div>
  );
}
