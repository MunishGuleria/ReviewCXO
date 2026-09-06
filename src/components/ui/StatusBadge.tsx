interface StatusBadgeProps {
  variant: "featured" | "verified" | "pending" | "approved" | "published" | "draft" | "category" | "primary";
  children: React.ReactNode;
}

const variantStyles: Record<string, string> = {
  featured: "bg-primary/10 border border-primary/20 text-primary",
  verified: "bg-green-500/10 border border-green-500/20 text-green-500",
  pending: "bg-yellow-500/10 border border-yellow-500/20 text-yellow-500",
  approved: "bg-green-500/10 border border-green-500/20 text-green-500",
  published: "bg-green-500/10 border border-green-500/20 text-green-500",
  draft: "bg-yellow-500/10 border border-yellow-500/20 text-yellow-500",
  category: "bg-primary/10 border border-primary/20 text-primary",
  primary: "bg-primary/10 border border-primary/20 text-primary",
};

export function StatusBadge({ variant, children }: StatusBadgeProps) {
  return (
    <span
      className={`inline-block rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${variantStyles[variant]}`}
    >
      {children}
    </span>
  );
}
