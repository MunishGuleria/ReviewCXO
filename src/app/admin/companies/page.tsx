import { Metadata } from "next";
import { ResearchLayout } from "@/components/layout/ResearchLayout";
import { getVisibleVendors } from "@/lib/vendors";
import { getVendorReviewStats } from "@/lib/reviews";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin — Vendors & Platforms | Reviews CXO",
  description: "Manage software vendor profiles.",
};

export default function AdminCompaniesPage() {
  const vendors = getVisibleVendors();

  return (
    <ResearchLayout
      badge="Admin Workspace"
      title="Platform Directory"
      description="Manage the canonical software & AI platform database."
      backHref="/admin"
      backLabel="Admin Dashboard"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            Active Platforms
          </h2>
          <span className="bg-surface border border-border px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-muted-foreground">{vendors.length} Total</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {vendors.map((vendor) => {
            const stats = getVendorReviewStats(vendor.slug);
            return (
              <div key={vendor.slug} className="group rounded-2xl border border-border bg-surface p-6 hover:border-primary/40 hover:shadow-sm transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="rounded bg-surface-alt border border-border px-2.5 py-1 text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-wider">
                      {vendor.category}
                    </span>
                    {vendor.ascsComposite >= 8.5 && (
                      <span className="bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                        Top Tier
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{vendor.name}</h3>
                  <p className="text-xs font-medium text-muted-foreground mb-6 line-clamp-1">{vendor.tagline}</p>
                  
                  <div className="grid grid-cols-3 gap-3 mb-6 bg-surface-alt rounded-xl p-4 border border-border/50">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">ASCS Score</span>
                      <span className="text-base font-black text-foreground">{vendor.ascsComposite}<span className="text-muted-foreground text-xs font-medium">/10</span></span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">User Rating</span>
                      <span className="text-base font-black text-foreground">{vendor.rating}<span className="text-muted-foreground text-xs font-medium">/5</span></span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Reviews</span>
                      <span className="text-base font-black text-foreground">{stats.totalReviews}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex justify-end">
                  <Link href={`/vendors/${vendor.slug}`} className="bg-surface-alt border border-border px-4 py-2 rounded-lg text-xs font-bold text-foreground hover:bg-surface-elevated hover:border-primary/40 transition-colors flex items-center gap-1.5 w-full justify-center sm:w-auto">
                    View Public Profile
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ResearchLayout>
  );
}
