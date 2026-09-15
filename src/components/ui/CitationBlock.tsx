interface CitationBlockProps {
  authors?: string;
  title: string;
  date: string;
  url?: string;
  version?: string;
}

export function CitationBlock({
  authors = "Reviews CXO Research Lab",
  title,
  date,
  url = "https://reviews-cxo.com",
  version,
}: CitationBlockProps) {
  return (
    <div className="rounded-xl border border-border bg-surface-alt/60 p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <p className="text-xs font-bold uppercase tracking-wider text-muted font-mono">
          How to Cite This Research
        </p>
        {version && (
          <span className="rounded-full bg-primary/10 border border-primary/20 px-2.5 py-0.5 text-[10px] font-mono font-bold text-primary">
            {version}
          </span>
        )}
      </div>
      <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-foreground/90 font-mono">
        {authors}. &ldquo;{title}.&rdquo; <em>Reviews CXO Enterprise Research</em>, {date}. Available at:{" "}
        <a href={url} className="text-primary hover:underline break-all">
          {url}
        </a>
      </p>
    </div>
  );
}
