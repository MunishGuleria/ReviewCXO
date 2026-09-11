import { ScoreBar } from "./ScoreBar";

interface RatingBreakdownItem {
  label: string;
  value: number;
  max?: number;
}

interface RatingBreakdownProps {
  items: RatingBreakdownItem[];
}

export function RatingBreakdown({ items }: RatingBreakdownProps) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-3">
          <span className="text-xs text-muted w-24 sm:w-36 shrink-0">{item.label}</span>
          <ScoreBar score={item.value} maxScore={item.max ?? 5} size="sm" />
        </div>
      ))}
    </div>
  );
}
