import { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Editorial Policy",
  description:
    "Reviews_CXO editorial policy — how the publication maintains research integrity and editorial independence.",
  alternates: { canonical: "https://reviews-cxo.com/about/editorial-policy" },
  openGraph: {
    title: "Editorial Policy — Reviews_CXO",
    description: "How the publication maintains research integrity and editorial independence.",
    url: "https://reviews-cxo.com/about/editorial-policy",
    siteName: "Reviews_CXO",
    locale: "en_US",
    type: "article",
  },
};

export default function EditorialPolicyPage() {
  return (
    <>
      <PageHeader
        badge="Standards & Governance"
        title="Editorial Policy"
        description="The publication's commitment to evidence-based research, transparency, and data integrity."
      />

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">
        {/* Core Independence Card */}
        <div className="rounded-2xl border border-primary/20 bg-surface p-8 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Foundational Rule</span>
          <h2 className="mt-2 text-2xl font-black text-foreground">Editorial Independence</h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Reviews_CXO maintains editorial independence in all research conclusions, vendor scores, benchmark methodology, and publication decisions. No sponsor, advertiser, or commercial vendor controls evaluation findings.
          </p>
        </div>

        {/* 2x2 Grid of Core Policies */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface p-7 shadow-sm">
            <h3 className="section-heading text-lg font-bold text-foreground">Research Integrity</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li className="flex items-start gap-2.5">
                <span className="text-primary font-bold">▪</span>
                <span>All research adheres to the published 12-dimension ASCS methodology.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-primary font-bold">▪</span>
                <span>Vendor scores are determined solely by documented evidence, not commercial relationships.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-primary font-bold">▪</span>
                <span>Limitations and strengths are published with equal prominence.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-primary font-bold">▪</span>
                <span>Caveats and test environments are documented openly in every report.</span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-7 shadow-sm">
            <h3 className="section-heading text-lg font-bold text-foreground">Conflict of Interest</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li className="flex items-start gap-2.5">
                <span className="text-primary font-bold">▪</span>
                <span>All analysts must disclose personal, financial, or consulting relationships with evaluated vendors.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-primary font-bold">▪</span>
                <span>Sponsoring entities are evaluated under the same standardized methodology as all peers.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-primary font-bold">▪</span>
                <span>Any dimension where a sponsor scores in the top tier undergoes mandatory secondary advisory review.</span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-7 shadow-sm">
            <h3 className="section-heading text-lg font-bold text-foreground">Vendor Communication</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li className="flex items-start gap-2.5">
                <span className="text-primary font-bold">▪</span>
                <span>Vendors may review technical specifications for factual accuracy prior to final scorecard publishing.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-primary font-bold">▪</span>
                <span>Vendor feedback does not obligate Reviews_CXO to alter editorial assessments or critical teardowns.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-primary font-bold">▪</span>
                <span>All vendor communications, challenges, and clarifications are archived for audit purposes.</span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-7 shadow-sm">
            <h3 className="section-heading text-lg font-bold text-foreground">Data Integrity & Versioning</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li className="flex items-start gap-2.5">
                <span className="text-primary font-bold">▪</span>
                <span>All benchmark datasets and synthetic workload generators are cryptographically checksummed.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-primary font-bold">▪</span>
                <span>Raw evaluation logs and scoring telemetry are retained for peer inspection.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-primary font-bold">▪</span>
                <span>Methodology modifications across quarterly releases are tracked in published changelogs.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
