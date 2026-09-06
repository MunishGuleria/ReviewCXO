import { Metadata } from "next";
import { ResearchLayout } from "@/components/layout/ResearchLayout";
import { getAllITCompanies } from "@/lib/it-companies";
import { getCompanyStats } from "@/lib/reviews";
import { StatusBadge } from "@/components/ui/StatusBadge";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin — IT Companies | Reviews_CXO",
  description: "Manage IT company profiles.",
};

const companies = getAllITCompanies();

export default function AdminCompaniesPage() {
  return (
    <ResearchLayout
      badge="Admin"
      title="IT Companies"
      description="Manage IT company profiles in the directory."
      backHref="/admin"
      backLabel="Admin"
    >
      <div className="space-y-3">
        {companies.map((company) => {
          const stats = getCompanyStats(company.id);
          return (
            <div key={company.id} className="rounded-xl border border-border bg-surface p-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {company.featured && <StatusBadge variant="featured">Featured</StatusBadge>}
                  {company.isVerified && <StatusBadge variant="verified">Verified</StatusBadge>}
                </div>
                <h3 className="text-sm font-bold text-foreground">{company.name}</h3>
                <p className="text-xs text-muted">{company.hqLocation} · {company.employeeCount} · {stats.totalReviews} reviews · {company.rating}/5</p>
              </div>
              <Link href={`/it-companies/${company.slug}`} className="rounded-lg border border-border bg-surface-alt px-3.5 py-2 text-xs font-bold text-foreground hover:border-primary/40 transition-colors shrink-0">
                View →
              </Link>
            </div>
          );
        })}
      </div>
    </ResearchLayout>
  );
}
