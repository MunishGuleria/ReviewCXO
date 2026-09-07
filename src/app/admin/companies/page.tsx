import { Metadata } from "next";
import { ResearchLayout } from "@/components/layout/ResearchLayout";
import { VENDORS } from "@/lib/vendors";
import { getVendorReviewStats } from "@/lib/reviews";
import { StatusBadge } from "@/components/ui/StatusBadge";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin — Vendors & Platforms | Reviews_CXO",
  description: "Manage software vendor profiles.",
};

const vendors = VENDORS;

export default function AdminCompaniesPage() {
  return (
    <ResearchLayout
      badge="Admin"
      title="Vendors & Platforms"
      description="Canonical software & AI platform vendor directory."
      backHref="/admin"
      backLabel="Admin"
    >
      <div className="space-y-3">
        {vendors.map((vendor) => {
          const stats = getVendorReviewStats(vendor.slug);
          return (
            <div key={vendor.slug} className="rounded-xl border border-border bg-surface p-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="rounded bg-surface-alt border border-border px-2 py-0.5 text-[10px] font-mono font-bold text-muted">
                    {vendor.category}
                  </span>
                  {vendor.ascsComposite >= 8.5 && <StatusBadge variant="featured">Top Tier</StatusBadge>}
                  <span className="text-[10px] font-mono text-primary font-bold">ASCS: {vendor.ascsComposite}/10</span>
                </div>
                <h3 className="text-sm font-bold text-foreground">{vendor.name}</h3>
                <p className="text-xs text-muted">{vendor.hq} · Founded {vendor.founded} · {vendor.rating}/5 rating · {stats.totalReviews} documented reviews</p>

              </div>
              <Link href={`/vendors/${vendor.slug}`} className="rounded-lg border border-border bg-surface-alt px-3.5 py-2 text-xs font-bold text-foreground hover:border-primary/40 transition-colors shrink-0">
                View Profile →
              </Link>
            </div>
          );
        })}
      </div>
    </ResearchLayout>
  );
}

