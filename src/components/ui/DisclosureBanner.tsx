interface DisclosureBannerProps {
  className?: string;
}

export function DisclosureBanner({ className = "" }: DisclosureBannerProps) {
  return (
    <div
      className={`rounded-lg border border-accent/20 bg-accent/5 p-4 ${className}`}
    >
      <p className="text-sm font-semibold text-accent">Disclosure</p>
      <p className="mt-1 text-xs leading-relaxed text-muted">
        Reviews_CXO is an independently operated research initiative focused on
        AI for enterprise sales. The publication receives financial support from
        a technology company active in the enterprise software sector. Sponsors
        do not control individual research conclusions, vendor scores, benchmark
        methodology, or editorial decisions.
      </p>
    </div>
  );
}
