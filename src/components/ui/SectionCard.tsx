interface SectionCardProps {
  title: string;
  children: React.ReactNode;
  variant?: "default" | "primary" | "warning";
}

const variantStyles = {
  default: "border-border bg-surface",
  primary: "border-primary/30 bg-primary/5",
  warning: "border-warning/30 bg-warning/5",
};

const titleStyles = {
  default: "text-muted",
  primary: "text-primary",
  warning: "text-warning",
};

export function SectionCard({ title, children, variant = "default" }: SectionCardProps) {
  return (
    <div className={`rounded-xl border p-5 ${variantStyles[variant]}`}>
      <h3 className={`text-[11px] font-bold uppercase tracking-wider ${titleStyles[variant]} mb-3`}>
        {title}
      </h3>
      {children}
    </div>
  );
}
