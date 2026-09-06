import Link from "next/link";

interface PageToolbarProps {
  count?: number;
  label?: string;
  actionLabel?: string;
  actionHref?: string;
}

export function PageToolbar({ count, label, actionLabel, actionHref }: PageToolbarProps) {
  if (!count && !actionLabel) return null;

  return (
    <div className="flex items-center justify-between">
      {label && (
        <p className="text-sm text-muted">
          {count !== undefined && <span className="font-bold text-foreground">{count}</span>} {label}
        </p>
      )}
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="rounded-lg border border-primary bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
