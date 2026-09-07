interface StatusBadgeProps {
  variant: "featured" | "verified" | "pending" | "approved" | "published" | "draft" | "category" | "primary" | "info";
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<string, string> = {
  featured: "bg-primary/10 border border-primary/20 text-primary",
  verified: "bg-success/10 border border-success/20 text-success",
  pending: "bg-warning/10 border border-warning/20 text-warning",
  approved: "bg-success/10 border border-success/20 text-success",
  published: "bg-success/10 border border-success/20 text-success",
  draft: "bg-warning/10 border border-warning/20 text-warning",
  category: "bg-primary/10 border border-primary/20 text-primary",
  primary: "bg-primary/10 border border-primary/20 text-primary",
  info: "bg-primary/10 border border-primary/20 text-primary",
};

export function StatusBadge({ variant, children, className }: StatusBadgeProps) {
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${variantStyles[variant]} ${className || ""}`}
    >
      {children}
    </span>
  );
}
