import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResearchLayout } from "@/components/layout/ResearchLayout";
import { getITCompanyBySlug, getAllITCompanies } from "@/lib/it-companies";
import { getReviewsByCompany, getCxOById, getCompanyStats } from "@/lib/reviews";
import { DisclosureBanner } from "@/components/ui/DisclosureBanner";
import { RatingDisplay } from "@/components/ui/RatingDisplay";
import { StatGrid } from "@/components/ui/StatCard";
import { SectionCard } from "@/components/ui/SectionCard";
import { RatingBreakdown } from "@/components/ui/RatingBreakdown";
import { TagList } from "@/components/ui/TagList";
import { CXOAttribution } from "@/components/ui/CXOAttribution";
import { StatRowGrid } from "@/components/ui/StatCard";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllITCompanies().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const company = getITCompanyBySlug(slug);
  if (!company) return {};
  return {
    title: `${company.name} — AI Project Reviews | Reviews_CXO`,
    description: company.description,
  };
}

export default async function ITCompanyPage({ params }: Props) {
  const { slug } = await params;
  const company = getITCompanyBySlug(slug);
  if (!company) notFound();

  const reviews = getReviewsByCompany(company.id);
  const stats = getCompanyStats(company.id);

  return (
    <ResearchLayout
      badge="IT Company Profile"
      title={company.name}
      description={company.description}
      backHref="/it-companies"
      backLabel="All Companies"
    >
      <div className="space-y-6">
        <DisclosureBanner />

        <StatGrid items={[
          { label: "Overall Rating", value: `${company.rating}/5`, color: "primary", size: "lg" },
          { label: "Average ROI", value: `${stats.avgRoi}%`, color: "success", size: "lg" },
          { label: "Would Recommend", value: `${stats.recommendPercentage}%`, color: "primary", size: "lg" },
        ]} columns={3} />

        <SectionCard title="Company Details">
          <StatRowGrid items={[
            { label: "Headquarters", value: company.hqLocation },
            { label: "Employees", value: company.employeeCount },
            { label: "Founded", value: String(company.foundedYear) },
            { label: "Revenue", value: company.revenueRange },
          ]} />
        </SectionCard>

        <SectionCard title="AI Capabilities">
          <TagList tags={company.aiCapabilities} variant="primary" />
        </SectionCard>

        <SectionCard title="Industries Served">
          <TagList tags={company.industriesServed} />
        </SectionCard>

        <SectionCard title="Rating Breakdown">
          <RatingBreakdown items={[
            { label: "Delivery Quality", value: stats.avgDeliveryRating },
            { label: "AI Effectiveness", value: stats.avgAiRating },
            { label: "Communication", value: stats.avgCommunicationRating },
            { label: "Value for Money", value: stats.avgValueRating },
          ]} />
        </SectionCard>

        {reviews.length > 0 && (
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-muted mb-4">Project Reviews ({reviews.length})</h3>
            <div className="space-y-4">
              {reviews.map((review) => {
                const cxo = getCxOById(review.cxoId);
                return (
                  <div key={review.id} className="rounded-xl border border-border bg-surface p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-sm font-bold text-foreground">{review.projectTitle}</h4>
                        <p className="text-xs text-muted mt-0.5">
                          {review.projectCategory} · {review.teamSize} team · {review.timelineMonths} months · {review.budgetRange}
                        </p>
                      </div>
                      <RatingDisplay value={review.overallRating} size="sm" />
                    </div>

                    <StatRowGrid items={[
                      { label: "ROI", value: `${review.roiPercentage}%`, color: "text-green-500" },
                      { label: "Efficiency Gain", value: `${review.efficiencyGainPercentage}%`, color: "text-green-500" },
                      { label: "Adoption", value: review.adoptionRate },
                      { label: "Recommend", value: review.wouldRecommend ? "Yes" : "No", color: review.wouldRecommend ? "text-green-500" : "text-red-500" },
                    ]} />

                    <p className="text-xs text-muted leading-relaxed mt-3 mb-3">{review.outcomesDescription}</p>

                    {cxo && !review.isAnonymous && (
                      <CXOAttribution cxo={cxo} size="sm" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </ResearchLayout>
  );
}
