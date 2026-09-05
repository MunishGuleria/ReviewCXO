import Link from "next/link";

interface CardProps {
  href?: string;
  title: string;
  description: string;
  badge?: string;
  meta?: string;
}

export function Card({ href, title, description, badge, meta }: CardProps) {
  const content = (
    <div className="group flex h-full flex-col rounded-lg border border-border bg-surface p-6 transition-all hover:border-primary/30 hover:shadow-md">
      {badge && (
        <span className="mb-2 inline-block w-fit rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-primary">
          {badge}
        </span>
      )}
      <h3 className="text-lg font-bold text-foreground group-hover:text-primary">
        {title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
        {description}
      </p>
      {meta && (
        <p className="mt-3 text-xs font-medium text-muted/70">{meta}</p>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {content}
      </Link>
    );
  }

  return content;
}
