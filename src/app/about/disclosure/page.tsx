import { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Disclosure",
  description:
    "Reviews_CXO sponsorship disclosure and conflict of interest transparency.",
  alternates: { canonical: "https://reviews-cxo.com/about/disclosure" },
  openGraph: {
    title: "Disclosure — Reviews_CXO",
    description: "Sponsorship disclosure and conflict of interest transparency.",
    url: "https://reviews-cxo.com/about/disclosure",
    siteName: "Reviews_CXO",
    locale: "en_US",
    type: "article",
  },
};

export default function DisclosurePage() {
  return (
    <>
      <PageHeader
        badge="Governance & Independence"
        title="Sponsorship & Conflict Disclosure"
        description="Full transparency regarding research funding, commercial safeguards, and editorial governance policies."
      />

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">
        {/* Core Statement Card */}
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8 relative overflow-hidden">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white font-mono font-bold text-lg shadow-sm">
              §
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Official Sponsorship Statement</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                Reviews_CXO is an independently operated research initiative focused on enterprise AI for sales.
                The publication receives financial support from a technology company active in the enterprise software sector.
                Sponsors do not control individual research conclusions, vendor scores, benchmark methodology, or editorial decisions.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-semibold text-primary">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 border border-primary/20 shadow-xs">
                  <span className="h-2 w-2 rounded-full bg-success" />
                  Mandatory Public Disclosure
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 border border-primary/20 shadow-xs">
                  Applicable to all 134+ research reports & rankings
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Dual Column: What Sponsors DO NOT vs DO Control */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Safeguards / Non-Control */}
          <div className="rounded-2xl border border-border bg-surface p-6 sm:p-7 shadow-sm">
            <div className="flex items-center gap-2.5 text-danger font-bold text-sm uppercase tracking-wider">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-danger/10 text-danger text-xs font-black">✕</span>
              Editorial Firewalls: What Sponsors Do NOT Control
            </div>
            <ul className="mt-5 space-y-3.5 text-sm text-muted">
              {[
                "Individual research conclusions, technical evaluations, or findings",
                "Vendor scores, tiering, or ASCS composite rankings",
                "Benchmark methodology, scoring weights, or evaluation criteria",
                "Editorial decisions about what to investigate or publish",
                "The tone, technical framing, or critique in any teardown",
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="mt-0.5 text-danger font-bold">✕</span>
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sponsoring Boundaries */}
          <div className="rounded-2xl border border-border bg-surface p-6 sm:p-7 shadow-sm">
            <div className="flex items-center gap-2.5 text-primary font-bold text-sm uppercase tracking-wider">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-black">✓</span>
              Authorized Boundaries: What Sponsors DO
            </div>
            <ul className="mt-5 space-y-3.5 text-sm text-muted">
              {[
                "Provide financial funding for empirical research and compute operations",
                "Participate in open advisory board discussions (strictly non-binding)",
                "Undergo evaluation under the exact same 12-dimension ASCS methodology as all other vendors",
                "Receive no advance notice of upcoming scores or comparative verdicts",
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="mt-0.5 text-primary font-bold">✓</span>
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Conflict of Interest & Commercial Ethics */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface p-6 sm:p-7 shadow-sm">
            <h3 className="section-heading text-lg font-bold text-foreground">Conflict of Interest Policy</h3>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
              <p>
                All contributing analysts and benchmark engineers are required to disclose any personal, consulting, or equity relationships with evaluated AI vendors.
              </p>
              <p>
                Any dimension where a sponsor or affiliated vendor scores in the top tier undergoes mandatory dual-analyst cross-verification before publication.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-6 sm:p-7 shadow-sm">
            <h3 className="section-heading text-lg font-bold text-foreground">Zero Pay-to-Play Advertising</h3>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
              <p>
                Reviews_CXO strictly prohibits paid vendor placement in rankings, benchmarks, or search results.
              </p>
              <p>
                Vendor claims can never overwrite verified lab observations. All evidence tiers are publicly cited in accordance with our 7-tier hierarchy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
