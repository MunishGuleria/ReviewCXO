import { Metadata } from "next";
import { ResearchLayout } from "@/components/layout/ResearchLayout";
import { InfoCard } from "@/components/ui/ResearchComponents";
import { StarRating } from "@/components/ui/StarRating";
import { DisclosureBanner } from "@/components/ui/DisclosureBanner";
import { getVisibleVendors } from "@/lib/vendors";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ASCS 2026 Platform Rankings — Top Enterprise AI Sales Engines",
  description: "Enterprise AI sales platform rankings based on the 12-dimension ASCS architecture framework. Research-based rankings for enterprise buyers.",
  alternates: { canonical: "https://reviews-cxo.com/rankings" },
  openGraph: {
    title: "ASCS 2026 Platform Rankings",
    description: "Enterprise AI sales platform rankings based on the 12-dimension ASCS framework.",
    url: "https://reviews-cxo.com/rankings",
    siteName: "Reviews CXO",
    locale: "en_US",
    type: "website",
  },
};

const rankedVendors = [...getVisibleVendors()].sort((a, b) => b.ascsComposite - a.ascsComposite);

export default function RankingsPage() {
  return (
    <ResearchLayout
      badge="ASCS Index Rankings"
      title="Enterprise AI Sales Platform Rankings (2026)"
      description="Ranked by the weighted ASCS composite evaluation score (0–10) across 12 dimensions: ERP connectivity, CRM grounding, reasoning quality, and governance."
      backHref="/vendors"
      backLabel="All Platforms"
    >
      <div className="space-y-8">
        <DisclosureBanner />

        <InfoCard title="Ranking Methodology: The ASCS Framework">
          <p className="text-xs sm:text-sm text-muted leading-relaxed">
            Platforms are assessed and ranked using the 12-dimension Architecture, Security, Connectivity, and Scalability (ASCS) rubric. Dimension scores range from 0 to 10 and are weighted according to enterprise workload requirements (e.g. ERP connectivity 10%, Cross-system reasoning 12%, AI reasoning accuracy 12%). Aggregated scores from external platforms are provided as secondary context.
          </p>
        </InfoCard>

        <div className="space-y-4">
          {rankedVendors.map((v, i) => (
            <div
              key={v.slug}
              className="rounded-xl border border-border bg-surface p-6 transition-all hover:border-primary/40 hover:shadow-sm"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between">
                <div className="flex items-start sm:items-center gap-4 min-w-0">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 font-mono text-base font-black text-primary">
                    {i + 1 < 10 ? `0${i + 1}` : i + 1}
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <Link
                        href={`/vendors/${v.slug}`}
                        className="text-lg font-black text-foreground hover:text-primary transition-colors truncate"
                      >
                        {v.name}
                      </Link>
                      <span className="rounded bg-surface-alt border border-border px-2 py-0.5 text-[11px] font-medium text-muted">
                        {v.category}
                      </span>
                      <span className="rounded bg-primary/10 border border-primary/20 px-2 py-0.5 text-[10px] font-mono text-primary">
                        {v.architectureProfile.agenticTier}
                      </span>
                    </div>
                    <p className="text-xs text-muted mt-1 italic">{v.tagline}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 self-end sm:self-center shrink-0">
                  <div className="text-right">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black font-mono text-primary">{v.ascsComposite}</span>
                      <span className="text-xs font-mono text-muted">/10</span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted block">ASCS Composite</span>
                  </div>

                  <Link
                    href={`/vendors/${v.slug}`}
                    className="rounded-lg border border-border bg-surface-alt px-3.5 py-2 text-xs font-bold text-foreground hover:border-primary/40 transition-colors"
                  >
                    View Scorecard →
                  </Link>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-muted text-[11px] block font-medium">ERP Integration:</span>
                  <span className="font-semibold text-foreground">{v.architectureProfile.erpCoupling}</span>
                </div>
                <div>
                  <span className="text-muted text-[11px] block font-medium">Ideal Enterprise Workload:</span>
                  <span className="font-semibold text-foreground truncate block">{v.workloadFit.idealDeployment}</span>
                </div>
                <div className="sm:text-right flex sm:flex-col sm:items-end justify-between">
                  <span className="text-muted text-[11px] block font-medium">Satisfaction:</span>
                  <StarRating rating={v.rating} size="sm" reviewCount={v.reviewCount} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ResearchLayout>
  );
}
