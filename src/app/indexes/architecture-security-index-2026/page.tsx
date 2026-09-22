import { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { DisclosureBanner } from "@/components/ui/DisclosureBanner";
import { CitationBlock } from "@/components/ui/CitationBlock";
import { getVisibleVendors } from "@/lib/vendors";
import Link from "next/link";
import { loadResearchFromMarkdown } from "@/lib/content-loader";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Architecture & Security Index 2026",
  description:
    "12-dimension evaluation of enterprise AI platforms on architecture, security, and governance maturity.",
  alternates: { canonical: "https://reviewscxo.com/indexes/architecture-security-index-2026" },
  openGraph: {
    title: "Architecture & Security Index 2026",
    description: "12-dimension evaluation of enterprise AI platforms.",
    url: "https://reviewscxo.com/indexes/architecture-security-index-2026",
    siteName: "Reviews CXO",
    locale: "en_US",
    type: "article",
  },
};

export default function ArchitectureSecurityIndexPage() {
  const data = loadResearchFromMarkdown("architecture-security-index-2026", "indexes");
  if (!data) return notFound();

  const visibleVendors = getVisibleVendors();

  const sortedVendors = [...visibleVendors].sort((a, b) => b.ascsComposite - a.ascsComposite);

  return (
    <>
      <PageHeader
        title={data.title}
        badge={data.badge || "Index"}
        description={data.description}
      />

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">
        {/* Executive Summary Card */}
        <div className="rounded-2xl border border-primary/20 bg-surface p-8 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Executive Summary</span>
          <h2 className="mt-2 text-2xl font-black text-foreground">Architecture & Security Governance</h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            This index evaluates {visibleVendors.length} enterprise AI platforms across 12 architecture, security, and governance dimensions. Every score is backed by documented evidence from public sources, official vendor documentation, and structured assessment processes.
          </p>
        </div>

        <DisclosureBanner />

        {/* Vendor Comparison Card */}
        <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Ranked Platforms</span>
              <h3 className="mt-1 text-xl font-black text-foreground">Composite Security Maturity Scores</h3>
            </div>
            <span className="rounded-full bg-accent/10 border border-accent/20 px-3 py-1 text-xs font-mono font-bold text-accent">
              Cycle: Q3 2026
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Vendor</th>
                  <th>Category</th>
                  <th className="text-center">Score</th>
                  <th className="text-right">Evidence Tier</th>
                </tr>
              </thead>
              <tbody>
                {sortedVendors.map((v) => (
                  <tr key={v.slug}>
                    <td className="font-bold">
                      <Link
                        href={`/vendors/${v.slug}`}
                        className="text-foreground hover:text-primary transition-colors"
                      >
                        {v.name}
                      </Link>
                    </td>
                    <td className="text-muted text-xs">{v.category}</td>
                    <td className="text-center">
                      <span className="inline-block rounded-lg bg-primary/10 px-2.5 py-0.5 font-mono font-black text-primary">
                        {v.ascsComposite}/10
                      </span>
                    </td>
                    <td className="text-right">
                      <span className="rounded bg-surface-alt border border-border px-2 py-0.5 text-[10px] font-mono uppercase font-bold text-muted">
                        Documented
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Limitations & Caveats */}
        <div className="rounded-2xl border border-warning/20 bg-warning/5 p-6 sm:p-8">
          <div className="flex items-center gap-2 text-warning font-bold text-xs uppercase tracking-wider">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-warning/20 text-warning text-xs font-black">!</span>
            Evaluation Limitations & Caveats
          </div>
          <ul className="mt-4 space-y-2.5 text-xs text-muted leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-warning font-bold">•</span>
              <span>Scores are based on publicly available documentation and structured assessment methods, not paid vendor participation.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-warning font-bold">•</span>
              <span>&ldquo;Not Documented&rdquo; denotes that the capability could not be confirmed from public sources, not necessarily that it does not exist.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-warning font-bold">•</span>
              <span>This index reflects architecture and security maturity as of September 2026. Vendor configurations may evolve.</span>
            </li>
          </ul>
        </div>

        <CitationBlock
          authors="Reviews CXO Research Team"
          title={data.title}
          date="September 2026"
          url="https://reviewscxo.com/indexes/architecture-security-index-2026"
        />

        <div className="pt-2">
          <Link
            href="/indexes"
            className="btn-secondary text-xs"
          >
            ← Back to All Indexes
          </Link>
        </div>
      </div>
    </>
  );
}
