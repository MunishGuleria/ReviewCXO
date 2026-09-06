import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResearchLayout } from "@/components/layout/ResearchLayout";
import { getCaseStudyBySlug, getPublishedCaseStudies, getReviewByProjectId, getCxOById } from "@/lib/reviews";
import { getAllITCompanies } from "@/lib/it-companies";
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
    openGraph: { title: cs.metaTitle, description: cs.metaDescription, type: "article" },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) notFound();

  const review = getReviewByProjectId(cs.projectReviewId);
  if (!review) notFound();

  const company = getAllITCompanies().find((c) => c.id === review.itCompanyId);
  const cxo = getCxOById(review.cxoId);

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
          {company && (
            <Link href={`/it-companies/${company.slug}`} className="font-semibold text-primary hover:underline">
              {company.name}
            </Link>
          )}
          <span>{review.teamSize} team · {review.timelineMonths} months · {review.budgetRange}</span>
        </div>

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
          <SectionCard title="Reviewed By">
            <CXOAttribution cxo={cxo} />
          </SectionCard>
        )}
      </div>
    </ResearchLayout>
  );
}
