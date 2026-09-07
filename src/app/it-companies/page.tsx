import { Metadata } from "next";
import { ResearchLayout } from "@/components/layout/ResearchLayout";
import { getAllITCompanies } from "@/lib/it-companies";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { RatingDisplay } from "@/components/ui/RatingDisplay";
import { TagList } from "@/components/ui/TagList";
import { PageToolbar } from "@/components/ui/PageToolbar";
import Link from "next/link";

export const metadata: Metadata = {
  title: "IT Companies — AI Project Reviews | Reviews_CXO",
  description: "Browse IT companies evaluated on their AI project delivery. Real CxO reviews of AI implementations by TCS, Infosys, Accenture, SalesX, and more.",
  alternates: { canonical: "https://reviews-cxo.com/it-companies" },
  openGraph: {
    title: "IT Companies — AI Project Reviews",
    description: "Browse IT companies evaluated on their AI project delivery.",
    url: "https://reviews-cxo.com/it-companies",
    siteName: "Reviews_CXO",
    locale: "en_US",
    type: "website",
  },
};

const companies = getAllITCompanies();

export default function ITCompaniesPage() {
  return (
    <ResearchLayout
      badge="IT Companies"
      title="AI Project Delivery Reviews"
      description="Real reviews from CxOs of AI projects delivered by IT companies. Evaluated on delivery quality, AI effectiveness, communication, and value."
      backHref="/"
      backLabel="Home"
    >
      <div className="space-y-6">
        <PageToolbar count={companies.length} label="companies evaluated" actionLabel="Submit a Review" actionHref="/submit-review" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {companies.map((company) => (
            <Link
              key={company.id}
              href={`/it-companies/${company.slug}`}
              className="group rounded-xl border border-border bg-surface p-5 transition-all hover:border-primary/40 hover:shadow-sm"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-black text-foreground group-hover:text-primary transition-colors">
                      {company.name}
                    </h3>
                    {company.featured && <StatusBadge variant="featured">Featured</StatusBadge>}
                    {company.isVerified && <StatusBadge variant="verified">Verified</StatusBadge>}
                  </div>
                  <p className="text-xs text-muted mt-0.5">{company.hqLocation} · {company.employeeCount} employees</p>
                </div>
                <div className="text-right shrink-0">
                  <RatingDisplay value={company.rating} size="sm" />
                  <span className="text-[10px] text-muted block">{company.reviewCount} reviews</span>
                </div>
              </div>

              <p className="text-xs text-muted leading-relaxed mb-3 line-clamp-2">{company.description}</p>

              <TagList tags={company.aiCapabilities} maxVisible={4} />

              <div className="flex items-center justify-between pt-3 border-t border-border mt-3">
                <span className="text-[11px] text-muted">{company.projectCount} projects reviewed</span>
                <span className="text-xs font-bold text-primary group-hover:underline">View Profile →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </ResearchLayout>
  );
}
