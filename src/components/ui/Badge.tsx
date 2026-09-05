interface BadgeProps {
  variant?: "default" | "primary" | "success" | "warning" | "danger";
  children: React.ReactNode;
}

const variants = {
  default: "bg-surface-alt text-muted",
  primary: "bg-primary/10 text-primary",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  danger: "bg-danger/10 text-danger",
};

export function Badge({ variant = "default", children }: BadgeProps) {
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
