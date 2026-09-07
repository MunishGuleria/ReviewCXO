import Link from "next/link";

interface ResearchLayoutProps {
  badge: string;
  title: string;
  description: string;
  backHref: string;
  backLabel: string;
  children: React.ReactNode;
}

export function ResearchLayout({
  badge,
  title,
  description,
  backHref,
  backLabel,
  children,
}: ResearchLayoutProps) {
  return (
    <>
      <div className="relative border-b border-border bg-surface py-14 sm:py-18">
        {/* Gradient background */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'var(--gradient-hero)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href={backHref}
            className="group mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-foreground transition-colors"
          >
            <svg className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            {backLabel}
          </Link>
          <span className="mb-3 block w-fit rounded-full bg-success/10 border border-success/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-success">
            {badge}
          </span>
          <h1 className="max-w-4xl text-3xl font-black tracking-tight text-foreground sm:text-4xl" style={{ letterSpacing: '-0.025em' }}>
            {title}
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted sm:text-lg">
            {description}
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">{children}</div>
    </>
  );
}
