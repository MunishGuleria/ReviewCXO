import { Metadata } from "next";
import { ResearchLayout } from "@/components/layout/ResearchLayout";
import { getAllITCompanies } from "@/lib/it-companies";
import { getCompanyStats } from "@/lib/reviews";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { RatingDisplay } from "@/components/ui/RatingDisplay";
import { StatRowGrid } from "@/components/ui/StatCard";
import Link from "next/link";

export const metadata: Metadata = {
  title: "IT Company Rankings — AI Project Delivery | Reviews_CXO",
  description: "IT companies ranked by AI project delivery quality, ROI, and CxO satisfaction. Based on verified project reviews.",
};

const companies = getAllITCompanies()
  .map((c) => ({
    ...c,
    stats: getCompanyStats(c.id),
  }))
  .sort((a, b) => b.rating - a.rating);

export default function ITCompanyRankingsPage() {
  return (
    <ResearchLayout
      badge="Rankings"
      title="IT Company Rankings"
      description="Ranked by CxO review ratings, average ROI, and project delivery quality."
      backHref="/"
      backLabel="Home"
    >
      <div className="space-y-4">
        {companies.map((company, i) => (
          <div
            key={company.id}
            className="rounded-xl border border-border bg-surface p-5 transition-all hover:border-primary/40 hover:shadow-sm"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between">
              <div className="flex items-start sm:items-center gap-4 min-w-0">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 font-mono text-base font-black text-primary">
                  {i + 1 < 10 ? `0${i + 1}` : i + 1}
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link href={`/it-companies/${company.slug}`} className="text-lg font-black text-foreground hover:text-primary transition-colors">
                      {company.name}
                    </Link>
                    {company.featured && <StatusBadge variant="featured">Featured</StatusBadge>}
                    {company.isVerified && <StatusBadge variant="verified">Verified</StatusBadge>}
                  </div>
                  <p className="text-xs text-muted mt-0.5">{company.hqLocation} · {company.employeeCount} employees · Founded {company.foundedYear}</p>
                </div>
              </div>

              <div className="flex items-center gap-6 self-end sm:self-center shrink-0">
                <div className="text-right">
                  <RatingDisplay value={company.rating} size="md" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted block">Rating</span>
                </div>

                <Link href={`/it-companies/${company.slug}`} className="rounded-lg border border-border bg-surface-alt px-3.5 py-2 text-xs font-bold text-foreground hover:border-primary/40 transition-colors">
                  View Profile →
                </Link>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border">
              <StatRowGrid items={[
                { label: "Reviews", value: String(company.stats.totalReviews) },
                { label: "Avg ROI", value: `${company.stats.avgRoi}%`, color: "text-green-500" },
                { label: "Efficiency Gain", value: `${company.stats.avgEfficiencyGain}%`, color: "text-green-500" },
                { label: "Recommend", value: `${company.stats.recommendPercentage}%` },
              ]} />
            </div>
          </div>
        ))}
      </div>
    </ResearchLayout>
  );
}
