interface DisclosureBannerProps {
  className?: string;
}

export function DisclosureBanner({ className = "" }: DisclosureBannerProps) {
  return (
    <div
      className={`rounded-xl border border-success/20 bg-success/5 p-4 shadow-sm ${className}`}
    >
      <p className="text-sm font-bold text-success flex items-center gap-2">
        <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
        Disclosure
      </p>
      <p className="mt-1.5 text-xs leading-relaxed text-muted pl-6">
        Reviews_CXO is an independently operated research initiative focused on
        AI for enterprise sales. The publication receives financial support from
        a technology company active in the enterprise software sector. Sponsors
        do not control individual research conclusions, vendor scores, benchmark
        methodology, or editorial decisions.
      </p>
    </div>
  );
}
