import { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Corrections",
  description:
    "How Reviews CXO handles errors, updates, and score recalculations.",
  alternates: { canonical: "https://reviews-cxo.com/about/corrections" },
  openGraph: {
    title: "Corrections & Retractions — Reviews CXO",
    description: "How the publication handles errors, updates, and score recalculations.",
    url: "https://reviews-cxo.com/about/corrections",
    siteName: "Reviews CXO",
    locale: "en_US",
    type: "article",
  },
};

export default function CorrectionsPage() {
  return (
    <>
      <PageHeader
        badge="Accountability & Quality"
        title="Corrections & Retractions"
        description="The publication's commitment to accuracy, transparency, and correction when errors are identified."
      />

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">
        {/* Policy Commitment Card */}
        <div className="rounded-2xl border border-primary/20 bg-surface p-8 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">SLA & Protocol</span>
          <h2 className="mt-2 text-2xl font-black text-foreground">Transparent Correction Policy</h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Reviews CXO commits to prompt and auditable error correction. When factual discrepancies or scoring calculation errors are confirmed, the publication updates research artifacts and provides public disclosures.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-surface-alt/40 p-4">
              <span className="text-xs font-bold uppercase tracking-wider text-primary font-mono">48 Hours</span>
              <h4 className="mt-1 text-sm font-bold text-foreground">Factual Discrepancies</h4>
              <p className="mt-1 text-xs text-muted">Corrected with visible timestamps on affected pages.</p>
            </div>
            <div className="rounded-xl border border-border bg-surface-alt/40 p-4">
              <span className="text-xs font-bold uppercase tracking-wider text-accent font-mono">Semantic</span>
              <h4 className="mt-1 text-sm font-bold text-foreground">Score Recalculation</h4>
              <p className="mt-1 text-xs text-muted">Triggers version increment and public changelog note.</p>
            </div>
            <div className="rounded-xl border border-border bg-surface-alt/40 p-4">
              <span className="text-xs font-bold uppercase tracking-wider text-muted font-mono">Permanent</span>
              <h4 className="mt-1 text-sm font-bold text-foreground">Public Audit Log</h4>
              <p className="mt-1 text-xs text-muted">All historic revisions are archived for public audit.</p>
            </div>
          </div>
        </div>

        {/* Reporting & Versioning Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface p-7 shadow-sm">
            <h3 className="section-heading text-lg font-bold text-foreground">How to Submit a Correction</h3>
            <p className="mt-3 text-sm text-muted leading-relaxed">
              If you identify an empirical discrepancy or broken link, submit details to our editorial review team:
            </p>
            <div className="mt-4 rounded-xl border border-border bg-surface-alt/30 p-4 space-y-2 text-xs text-muted font-mono">
              <p>• URL & section heading</p>
              <p>• Specific claim or metric in dispute</p>
              <p>• Primary source or documentation link</p>
              <p className="text-primary font-bold pt-2">research@reviews-cxo.com</p>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-7 shadow-sm">
            <h3 className="section-heading text-lg font-bold text-foreground">Public Correction Log</h3>
            <div className="mt-4 flex flex-col items-center justify-center rounded-xl border border-dashed border-border p-8 text-center bg-surface-alt/20">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-success/10 text-success text-xs font-black">✓</span>
              <p className="mt-3 text-sm font-bold text-foreground">Zero Outstanding Corrections</p>
              <p className="mt-1 text-xs text-muted max-w-xs">
                All published pages are currently validated against the 2026 ASCS benchmark cycle.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
