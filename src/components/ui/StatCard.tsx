interface StatCardProps {
  label: string;
  value: string;
  color?: "primary" | "success" | "danger" | "muted";
  size?: "sm" | "md" | "lg";
}

const colorMap = {
  primary: "text-primary",
  success: "text-success",
  danger: "text-danger",
  muted: "text-foreground",
};

const bgMap = {
  primary: "bg-primary/8 border-primary/15",
  success: "bg-success/8 border-success/15",
  danger: "bg-danger/8 border-danger/15",
  muted: "bg-surface-alt border-border",
};

const sizeMap = {
  sm: { value: "text-lg font-black", label: "text-[10px]" },
  md: { value: "text-2xl font-black", label: "text-[10px]" },
  lg: { value: "text-3xl font-black", label: "text-xs" },
};

export function StatCard({ label, value, color = "primary", size = "md" }: StatCardProps) {
  return (
    <div className={`rounded-xl border ${bgMap[color]} p-4 text-center shadow-sm card-hover`}>
      <div className={`${sizeMap[size].value} font-mono ${colorMap[color]}`}>{value}</div>
      <p className={`${sizeMap[size].label} font-bold uppercase tracking-wider text-muted mt-1.5`}>{label}</p>
    </div>
  );
}

interface StatGridProps {
  items: StatCardProps[];
  columns?: 2 | 3 | 4;
}

export function StatGrid({ items, columns = 4 }: StatGridProps) {
  const gridClass = columns === 2 ? "grid-cols-2" : columns === 3 ? "grid-cols-3" : "grid-cols-2 sm:grid-cols-4";
  return (
    <div className={`grid ${gridClass} gap-4`}>
      {items.map((item) => (
        <StatCard key={item.label} {...item} />
      ))}
    </div>
  );
}

interface StatRowProps {
  label: string;
  value: string;
  color?: string;
}

export function StatRow({ label, value, color = "text-foreground" }: StatRowProps) {
  return (
    <div>
      <span className="text-muted text-[10px] font-bold uppercase tracking-wider block">{label}</span>
      <span className={`font-black ${color}`}>{value}</span>
    </div>
  );
}

interface StatRowGridProps {
  items: StatRowProps[];
  columns?: 2 | 3 | 4;
}

export function StatRowGrid({ items, columns = 4 }: StatRowGridProps) {
  const gridClass = columns === 2 ? "grid-cols-2" : columns === 3 ? "grid-cols-3" : "grid-cols-2 sm:grid-cols-4";
  return (
    <div className={`grid ${gridClass} gap-3 text-xs`}>
      {items.map((item) => (
        <StatRow key={item.label} {...item} />
      ))}
    </div>
  );
}
