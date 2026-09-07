interface BadgeProps {
  variant?: "default" | "primary" | "success" | "warning" | "danger";
  children: React.ReactNode;
}

const variants = {
  default: "bg-surface-alt border border-border text-muted",
  primary: "bg-primary/10 border border-primary/20 text-primary",
  success: "bg-success/10 border border-success/20 text-success",
  warning: "bg-warning/10 border border-warning/20 text-warning",
  danger: "bg-danger/10 border border-danger/20 text-danger",
};

export function Badge({ variant = "default", children }: BadgeProps) {
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
