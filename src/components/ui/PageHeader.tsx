interface PageHeaderProps {
  title: string;
  description?: string;
  badge?: string;
}

export function PageHeader({ title, description, badge }: PageHeaderProps) {
  return (
    <div className="relative border-b border-border bg-surface py-14 sm:py-18">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'var(--gradient-hero)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {badge && (
          <span className="mb-3 inline-block rounded-md bg-accent/10 border border-accent/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent">
            {badge}
          </span>
        )}
        <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted sm:text-lg">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
