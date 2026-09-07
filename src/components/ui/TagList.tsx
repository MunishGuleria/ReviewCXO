interface TagListProps {
  tags: string[];
  maxVisible?: number;
  variant?: "default" | "primary";
}

export function TagList({ tags, maxVisible, variant = "default" }: TagListProps) {
  const visible = maxVisible ? tags.slice(0, maxVisible) : tags;
  const remaining = maxVisible ? tags.length - maxVisible : 0;

  const tagStyle = variant === "primary"
    ? "bg-primary/10 border border-primary/20 text-primary"
    : "bg-surface-alt border border-border text-muted";

  return (
    <div className="flex flex-wrap gap-1.5">
      {visible.map((tag) => (
        <span key={tag} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${tagStyle}`}>
          {tag}
        </span>
      ))}
      {remaining > 0 && (
        <span className="rounded-full bg-surface-alt border border-border px-2.5 py-0.5 text-[10px] font-bold text-muted">
          +{remaining} more
        </span>
      )}
    </div>
  );
}
