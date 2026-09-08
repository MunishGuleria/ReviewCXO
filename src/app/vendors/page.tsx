import { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { VendorCard } from "@/components/ui/VendorCard";
import { getVisibleVendors, VENDOR_CATEGORIES } from "@/lib/vendors";
import Link from "next/link";

export const metadata: Metadata = {
  title: `Enterprise AI Sales Platforms — Directory & ASCS Scores`,
  description: `Directory of enterprise AI sales platforms. Architectural analysis, ASCS benchmarks, and integration capabilities.`,
  alternates: { canonical: "https://reviews-cxo.com/vendors" },
  openGraph: {
    title: `Enterprise AI Sales Platforms`,
    description: `Directory of enterprise AI sales platforms with ASCS scores.`,
    url: "https://reviews-cxo.com/vendors",
    siteName: "Reviews_CXO",
    locale: "en_US",
    type: "website",
  },
};

export default function VendorsPage() {
  const visibleVendors = getVisibleVendors();
  const sorted = [...visibleVendors].sort((a, b) => b.ascsComposite - a.ascsComposite);

  return (
    <>
      <PageHeader
        badge="Platform Directory"
        title="Enterprise AI Platform Directory"
        description="Comprehensive architecture evaluations, deployment specs, and ASCS benchmarks across enterprise platforms."
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16">
        {/* EMPIRICAL LAB STATS */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-xl border border-border bg-surface p-5 text-center shadow-sm">
            <p className="text-3xl font-black text-primary font-mono">{visibleVendors.length}</p>
            <p className="text-xs font-medium text-muted mt-1">Evaluated Platforms</p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-5 text-center shadow-sm">
            <p className="text-3xl font-black text-primary font-mono">12</p>
            <p className="text-xs font-medium text-muted mt-1">ASCS Dimensions</p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-5 text-center shadow-sm">
            <p className="text-3xl font-black text-primary font-mono">{VENDOR_CATEGORIES.length}</p>
            <p className="text-xs font-medium text-muted mt-1">Software Categories</p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-5 text-center shadow-sm">
            <p className="text-3xl font-black text-primary font-mono">Quarterly</p>
            <p className="text-xs font-medium text-muted mt-1">Benchmark Cycles</p>
          </div>
        </div>

        {/* ALL VENDORS GRID */}
        <div>
          <div className="mb-6 flex items-end justify-between border-b border-border pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Master Directory</span>
              <h2 className="text-2xl font-black text-foreground mt-1">Platforms Ranked by ASCS Index</h2>
            </div>
            <span className="text-xs text-muted font-mono">{sorted.length} Platforms</span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((v, i) => (
              <VendorCard key={v.slug} vendor={v} rank={i + 1} />
            ))}
          </div>
        </div>

        {/* BY CATEGORY (USING IMMUTABLE SORT & NEXT.JS LINK) */}
        <div>
          <div className="mb-6 border-b border-border pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Taxonomy</span>
            <h2 className="text-2xl font-black text-foreground mt-1">Browse by Enterprise Category</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {VENDOR_CATEGORIES.map((cat) => {
              const catVendors = visibleVendors.filter((v) => v.category === cat);
              if (catVendors.length === 0) return null;

              // Immutable sort
              const sortedCategory = [...catVendors].sort((a, b) => b.ascsComposite - a.ascsComposite);

              return (
                <div key={cat} className="rounded-xl border border-border bg-surface p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-black text-foreground text-base">{cat}</h3>
                      <span className="rounded bg-surface-alt border border-border px-2 py-0.5 text-[11px] font-mono text-muted">
                        {catVendors.length}
                      </span>
                    </div>

                    <div className="mt-4 space-y-2">
                      {sortedCategory.map((v) => (
                        <Link
                          key={v.slug}
                          href={`/vendors/${v.slug}`}
                          className="group flex items-center justify-between rounded-lg p-2 text-xs transition-colors hover:bg-surface-alt"
                        >
                          <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {v.name}
                          </span>
                          <span className="font-mono text-muted group-hover:text-foreground">
                            ASCS {v.ascsComposite}/10
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
