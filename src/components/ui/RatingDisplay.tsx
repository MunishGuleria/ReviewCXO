interface RatingDisplayProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  label?: string;
}

const sizeMap = {
  sm: { value: "text-base", max: "text-[10px]", label: "text-[10px]" },
  md: { value: "text-xl", max: "text-xs", label: "text-[10px]" },
  lg: { value: "text-3xl", max: "text-sm", label: "text-xs" },
};

export function RatingDisplay({ value, max = 5, size = "md", showLabel = false, label }: RatingDisplayProps) {
  const s = sizeMap[size];
  return (
    <div className="flex items-baseline gap-1">
      <span className={`${s.value} font-black font-mono text-primary`}>{value}</span>
      <span className={`${s.max} font-mono text-muted`}>/{max}</span>
      {showLabel && label && (
        <span className={`${s.label} font-bold uppercase tracking-wider text-muted ml-1`}>{label}</span>
      )}
    </div>
  );
}
