import { Metadata } from "next";
import { ResearchLayout } from "@/components/layout/ResearchLayout";
import { getPublishedCaseStudies } from "@/lib/reviews";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { PageToolbar } from "@/components/ui/PageToolbar";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Case Studies — AI Project Reviews | Reviews_CXO",
  description: "Real-world AI project case studies with outcomes, ROI, and CxO reviews. Published after independent verification.",
  alternates: { canonical: "https://reviews-cxo.com/case-studies" },
  openGraph: {
    title: "AI Project Case Studies",
    description: "Real-world AI project case studies with outcomes and ROI.",
    url: "https://reviews-cxo.com/case-studies",
    siteName: "Reviews_CXO",
    locale: "en_US",
    type: "website",
  },
};

const caseStudies = getPublishedCaseStudies();

export default function CaseStudiesPage() {
  return (
    <ResearchLayout
      badge="Case Studies"
      title="AI Project Case Studies"
      description="Published project reviews with verified outcomes, ROI data, and CxO assessments."
      backHref="/"
      backLabel="Home"
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-primary/20 bg-primary/5 p-5">
          <div>
            <h4 className="text-sm font-bold text-foreground">Have You Deployed an Enterprise Sales or CRM Platform?</h4>
            <p className="text-xs text-muted mt-1 max-w-xl">
              Share your project telemetry, implementation timelines, and ROI metrics with peer enterprise executives. Submissions undergo independent verification.
            </p>
          </div>
          <Link
            href="/submit-review"
            className="btn-primary text-xs py-2.5 px-4 shrink-0 shadow-xs"
          >
            Submit Project Review →
          </Link>
        </div>

        <PageToolbar count={caseStudies.length} label="published case studies" />

        <div className="space-y-4">
          {caseStudies.map((cs) => (
            <Link
              key={cs.id}
              href={`/case-studies/${cs.slug}`}
              className="group block rounded-xl border border-border bg-surface p-5 transition-all hover:border-primary/40 hover:shadow-sm"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-base font-black text-foreground group-hover:text-primary transition-colors leading-snug pr-4">
                  {cs.metaTitle.replace(" | Reviews_CXO", "")}
                </h3>
                {cs.isFeatured && <StatusBadge variant="featured">Featured</StatusBadge>}
              </div>
              <p className="text-xs text-muted leading-relaxed mb-3">{cs.metaDescription}</p>
              <div className="flex items-center gap-4 text-[11px] text-muted">
                <span>{cs.viewsCount.toLocaleString()} views</span>
                <span>{cs.likesCount} likes</span>
                <span>{new Date(cs.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </ResearchLayout>
  );
}
