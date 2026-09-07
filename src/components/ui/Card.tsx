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
    <div className="group flex h-full flex-col rounded-xl border border-border bg-surface p-5 shadow-sm card-hover">
      {badge && (
        <span className="mb-3 inline-block w-fit rounded-full bg-primary/8 border border-primary/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
          {badge}
        </span>
      )}
      <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
        {description}
      </p>
      {meta && (
        <p className="mt-3 pt-3 border-t border-border text-xs font-medium text-muted/70">{meta}</p>
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
