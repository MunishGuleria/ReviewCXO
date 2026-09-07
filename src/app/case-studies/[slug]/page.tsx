import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResearchLayout } from "@/components/layout/ResearchLayout";
import { getCaseStudyBySlug, getPublishedCaseStudies, getReviewByProjectId, getCxOById, EVIDENCE_TYPE_LABELS } from "@/lib/reviews";
import { getVendorBySlug } from "@/lib/vendors";
import { DisclosureBanner } from "@/components/ui/DisclosureBanner";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { StatGrid } from "@/components/ui/StatCard";
import { SectionCard } from "@/components/ui/SectionCard";
import { TagList } from "@/components/ui/TagList";
import { CXOAttribution } from "@/components/ui/CXOAttribution";
import { StatRowGrid } from "@/components/ui/StatCard";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getPublishedCaseStudies().map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) return {};
  return {
    title: cs.metaTitle,
    description: cs.metaDescription,
    alternates: { canonical: `https://reviews-cxo.com/case-studies/${cs.slug}` },
    openGraph: { title: cs.metaTitle, description: cs.metaDescription, type: "article", url: `https://reviews-cxo.com/case-studies/${cs.slug}`, siteName: "Reviews_CXO", locale: "en_US" },
  };
}

const evidenceTypeColors: Record<string, string> = {
  verified_cxo_review: "bg-green-500/10 text-green-600 border-green-500/20",
  public_review_evidence: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  public_customer_evidence: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  vendor_provided_evidence: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  third_party_research: "bg-orange-500/10 text-orange-600 border-orange-500/20",
  observed_evidence: "bg-cyan-500/10 text-cyan-600 border-cyan-500/20",
  inferred: "bg-gray-500/10 text-gray-600 border-gray-500/20",
};

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) notFound();

  const review = getReviewByProjectId(cs.projectReviewId);
  if (!review) notFound();

  const vendor = getVendorBySlug(review.vendorId);
  const cxo = getCxOById(review.cxoId);

  const evidenceLabel = review.evidenceType ? EVIDENCE_TYPE_LABELS[review.evidenceType] : "Research Data";
  const evidenceColor = review.evidenceType ? (evidenceTypeColors[review.evidenceType] || "bg-gray-500/10 text-gray-600 border-gray-500/20") : "bg-gray-500/10 text-gray-600 border-gray-500/20";

  return (
    <ResearchLayout
      badge="Case Study"
      title={review.projectTitle}
      description={cs.metaDescription}
      backHref="/case-studies"
      backLabel="All Case Studies"
    >
      <div className="space-y-6">
        <DisclosureBanner />

        <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
          <StatusBadge variant="category">{review.projectCategory}</StatusBadge>
          <span className={`inline-block rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border ${evidenceColor}`}>
            {evidenceLabel}
          </span>
          {vendor && (
            <Link href={`/vendors/${vendor.slug}`} className="font-semibold text-primary hover:underline">
              {vendor.name}
            </Link>
          )}
          <span>{review.teamSize} team · {review.timelineMonths} months · {review.budgetRange}</span>
        </div>

        {review.sourceName && (
          <div className="rounded-lg border border-border bg-surface-alt p-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted">Source:</span>
              <a href={review.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline font-medium">
                {review.sourceName} →
              </a>
            </div>
            {review.sourceType && (
              <p className="text-[10px] text-muted mt-1">{review.sourceType}</p>
            )}
          </div>
        )}

        <StatGrid items={[
          { label: "Overall Rating", value: `${review.overallRating}/5`, color: "primary" },
          { label: "ROI", value: `${review.roiPercentage}%`, color: "success" },
          { label: "Efficiency Gain", value: `${review.efficiencyGainPercentage}%`, color: "success" },
          { label: "Recommend", value: review.wouldRecommend ? "Yes" : "No", color: review.wouldRecommend ? "success" : "danger" },
        ]} />

        <SectionCard title="Problem Statement">
          <p className="text-sm text-foreground leading-relaxed">{review.problemStatement}</p>
        </SectionCard>

        <SectionCard title="AI Solution" variant="primary">
          <p className="text-sm text-foreground leading-relaxed">{review.aiSolutionDescription}</p>
          {review.techStack.length > 0 && (
            <div className="mt-3">
              <TagList tags={review.techStack} />
            </div>
          )}
        </SectionCard>

        <SectionCard title="Outcomes">
          <p className="text-sm text-foreground leading-relaxed">{review.outcomesDescription}</p>
          <div className="mt-4">
            <StatRowGrid items={[
              { label: "Adoption Rate", value: review.adoptionRate },
              { label: "Delivery Quality", value: `${review.deliveryQualityRating}/5` },
              { label: "AI Effectiveness", value: `${review.aiEffectivenessRating}/5` },
              { label: "Value for Money", value: `${review.valueForMoneyRating}/5` },
            ]} />
          </div>
        </SectionCard>

        {review.challengesFaced && (
          <SectionCard title="Challenges Faced">
            <p className="text-sm text-muted leading-relaxed">{review.challengesFaced}</p>
          </SectionCard>
        )}

        {cxo && !review.isAnonymous && (
          <SectionCard title="Source Attribution">
            <CXOAttribution cxo={cxo} />
            {cxo.note && (
              <p className="text-[10px] text-muted/70 mt-2">{cxo.note}</p>
            )}
          </SectionCard>
        )}

        <SectionCard title="Evidence & Disclosure">
          <div className="space-y-2 text-xs text-muted">
            <p>
              <strong>Evidence Type:</strong> {evidenceLabel}
            </p>
            {review.sourceName && (
              <p>
                <strong>Source:</strong>{" "}
                <a href={review.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  {review.sourceName}
                </a>
              </p>
            )}
            {review.sourceType && (
              <p>
                <strong>Source Type:</strong> {review.sourceType}
              </p>
            )}
            {review.discoveredDate && (
              <p>
                <strong>Discovered:</strong> {review.discoveredDate}
              </p>
            )}
            <p className="text-[10px] text-muted/70 mt-2">
              This case study is classified as {evidenceLabel.toLowerCase()} based on the available source documentation.
              Reviews_CXO does not fabricate or invent project details.
            </p>
          </div>
        </SectionCard>
      </div>
    </ResearchLayout>
  );
}
