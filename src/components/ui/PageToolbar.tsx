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
          className="btn-primary text-xs"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
