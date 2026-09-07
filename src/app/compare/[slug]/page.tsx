import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { VENDORS, getVendorBySlug } from "@/lib/vendors";
import { ASCS_DIMENSIONS, EVIDENCE_TYPES } from "@/lib/site";
import { StarRating } from "@/components/ui/StarRating";
import { DisclosureBanner } from "@/components/ui/DisclosureBanner";
import { CitationBlock } from "@/components/ui/CitationBlock";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const pairs = [
    ["salezx", "salesforce"],
    ["salezx", "microsoft-dynamics-365"],
    ["salesforce", "microsoft-dynamics-365"],
    ["salesforce", "hubspot"],
    ["gong", "clari"],
    ["outreach", "salesloft"],
    ["zoominfo", "apollo-io"],
    ["seismic", "highspot"],
    ["zoho-crm", "hubspot"],
    ["pipedrive", "close"],
    ["6sense", "demandbase"],
    ["intercom", "drift"],
    ["creatio", "salesforce"],
    ["salesforce-einstein", "microsoft-copilot"],
  ];

  return pairs.map(([a, b]) => ({
    slug: `${a}-vs-${b}`,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const parts = slug.split("-vs-");
  if (parts.length !== 2) return { title: "Comparison Not Found" };

  const vendorA = getVendorBySlug(parts[0]);
  const vendorB = getVendorBySlug(parts[1]);

  if (!vendorA || !vendorB) {
    return { title: "Comparison Not Found" };
  }

  return {
    title: `${vendorA.name} vs ${vendorB.name} — ASCS Architecture & Benchmark Comparison (2026)`,
    description: `Detailed enterprise evaluation of ${vendorA.name} (ASCS ${vendorA.ascsComposite}/10) vs ${vendorB.name} (ASCS ${vendorB.ascsComposite}/10). Benchmarks across ERP connectivity, agentic autonomy, and reasoning quality.`,
    alternates: { canonical: `https://reviews-cxo.com/compare/${vendorA.slug}-vs-${vendorB.slug}` },
    openGraph: {
      title: `${vendorA.name} vs ${vendorB.name} — Comparison`,
      description: `Enterprise evaluation of ${vendorA.name} vs ${vendorB.name}.`,
      url: `https://reviews-cxo.com/compare/${vendorA.slug}-vs-${vendorB.slug}`,
      siteName: "Reviews_CXO",
      locale: "en_US",
      type: "website",
    },
  };
}

export default async function ComparisonDetailPage({ params }: Props) {
  const { slug } = await params;
  const parts = slug.split("-vs-");
  if (parts.length !== 2) notFound();

  const vA = getVendorBySlug(parts[0]);
  const vB = getVendorBySlug(parts[1]);

  if (!vA || !vB) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* BREADCRUMB */}
      <nav className="mb-6 flex items-center gap-2 text-xs font-medium text-muted">
        <Link href="/compare" className="hover:text-foreground">Comparisons</Link>
        <span>/</span>
        <span className="text-foreground font-semibold">{vA.name} vs {vB.name}</span>
      </nav>

      <DisclosureBanner />

      {/* COMPARISON HERO */}
      <div className="mt-8 rounded-2xl border border-border bg-surface p-6 sm:p-10 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
          <div>
            <span className="inline-block rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
              Head-to-Head Research Evaluation
            </span>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-foreground sm:text-4xl">
              {vA.name} <span className="text-muted font-light">vs</span> {vB.name}
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">
              Evaluated across the 12-dimension ASCS framework. Comparing architecture, ERP operational grounding, agentic reasoning, and enterprise deployment trade-offs.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/vendors/${vA.slug}`}
              className="rounded-lg border border-border bg-surface-alt px-3.5 py-2 text-xs font-bold text-foreground hover:border-primary/40 transition-colors"
            >
              {vA.name} Profile →
            </Link>
            <Link
              href={`/vendors/${vB.slug}`}
              className="rounded-lg border border-border bg-surface-alt px-3.5 py-2 text-xs font-bold text-foreground hover:border-primary/40 transition-colors"
            >
              {vB.name} Profile →
            </Link>
          </div>
        </div>

        {/* TOP SCORE METRIC CARDS */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* VENDOR A CARD */}
          <div className="rounded-xl border border-border/80 bg-surface-alt/40 p-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-muted">{vA.category}</span>
                <h2 className="text-2xl font-black text-foreground mt-1">{vA.name}</h2>
                <p className="text-xs text-muted mt-1 italic">{vA.tagline}</p>
              </div>
              <div className="text-right">
                <div className="inline-flex items-baseline gap-1 rounded-xl bg-primary/10 px-3 py-1.5 border border-primary/20">
                  <span className="text-2xl font-black text-primary">{vA.ascsComposite}</span>
                  <span className="text-xs font-bold text-muted">/10</span>
                </div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted mt-1">ASCS Composite</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs">
              <StarRating rating={vA.rating} size="sm" reviewCount={vA.reviewCount} />
              <span className="text-muted font-mono">{vA.architectureProfile.agenticTier}</span>
            </div>
          </div>

          {/* VENDOR B CARD */}
          <div className="rounded-xl border border-border/80 bg-surface-alt/40 p-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-muted">{vB.category}</span>
                <h2 className="text-2xl font-black text-foreground mt-1">{vB.name}</h2>
                <p className="text-xs text-muted mt-1 italic">{vB.tagline}</p>
              </div>
              <div className="text-right">
                <div className="inline-flex items-baseline gap-1 rounded-xl bg-primary/10 px-3 py-1.5 border border-primary/20">
                  <span className="text-2xl font-black text-primary">{vB.ascsComposite}</span>
                  <span className="text-xs font-bold text-muted">/10</span>
                </div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted mt-1">ASCS Composite</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs">
              <StarRating rating={vB.rating} size="sm" reviewCount={vB.reviewCount} />
              <span className="text-muted font-mono">{vB.architectureProfile.agenticTier}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ASCS 12-DIMENSION COMPARISON MATRIX */}
      <div className="mt-12">
        <div className="mb-4">
          <h2 className="text-2xl font-black tracking-tight text-foreground">
            ASCS 12-Dimension Evaluation Matrix
          </h2>
          <p className="text-sm text-muted">
            0–10 scale normalized against enterprise sales workload requirements. Evidence classifications indicated.
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-border bg-surface shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-surface-alt text-xs font-bold uppercase tracking-wider text-muted">
              <tr>
                <th className="px-6 py-4">Dimension & Weight</th>
                <th className="px-6 py-4 w-48 text-right">{vA.name}</th>
                <th className="px-6 py-4 w-48 text-right">{vB.name}</th>
                <th className="px-6 py-4 w-32 text-center">Lead Delta</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {ASCS_DIMENSIONS.map((dim) => {
                const scoreA = vA.ascsScores[dim.number] ?? 0;
                const scoreB = vB.ascsScores[dim.number] ?? 0;
                const evA = vA.ascsEvidence[dim.number] ?? "documented";
                const evB = vB.ascsEvidence[dim.number] ?? "documented";
                const diff = Number((scoreA - scoreB).toFixed(1));

                return (
                  <tr key={dim.number} className="hover:bg-surface-alt/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-muted">{dim.number}.</span>
                        <span className="font-bold text-foreground">{dim.name}</span>
                        <span className="rounded bg-surface-alt border border-border px-1.5 py-0.5 text-[10px] font-mono text-muted">
                          {dim.weight}
                        </span>
                      </div>
                      <p className="text-xs text-muted mt-0.5">{dim.whyItMatters}</p>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="font-mono font-bold text-base text-foreground">{scoreA}/10</div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-muted bg-surface-alt px-1.5 py-0.5 rounded border border-border">
                        {evA}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="font-mono font-bold text-base text-foreground">{scoreB}/10</div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-muted bg-surface-alt px-1.5 py-0.5 rounded border border-border">
                        {evB}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-center">
                      {diff === 0 ? (
                        <span className="text-xs font-bold text-muted">Tied</span>
                      ) : diff > 0 ? (
                        <span className="inline-flex items-center rounded-md bg-success/10 px-2 py-0.5 text-xs font-bold text-success border border-success/20">
                          +{diff} {vA.name.split(" ")[0]}
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary border border-primary/20">
                          +{Math.abs(diff)} {vB.name.split(" ")[0]}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ARCHITECTURAL PROFILE COMPARISON */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-xl border border-border bg-surface p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">Architectural Comparison</h3>
          <dl className="space-y-4 text-sm">
            <div>
              <dt className="text-xs font-bold uppercase tracking-wider text-muted">ERP Integration Depth</dt>
              <dd className="mt-1 flex justify-between">
                <span className="font-medium text-foreground">{vA.name}:</span>
                <span className="font-semibold text-primary">{vA.architectureProfile.erpCoupling}</span>
              </dd>
              <dd className="mt-1 flex justify-between">
                <span className="font-medium text-foreground">{vB.name}:</span>
                <span className="font-semibold text-primary">{vB.architectureProfile.erpCoupling}</span>
              </dd>
            </div>

            <div className="border-t border-border pt-3">
              <dt className="text-xs font-bold uppercase tracking-wider text-muted">AI Reasoning & Models</dt>
              <dd className="mt-1 text-xs text-muted">
                <strong className="text-foreground">{vA.name}:</strong> {vA.architectureProfile.reasoningEngine}
              </dd>
              <dd className="mt-1 text-xs text-muted">
                <strong className="text-foreground">{vB.name}:</strong> {vB.architectureProfile.reasoningEngine}
              </dd>
            </div>

            <div className="border-t border-border pt-3">
              <dt className="text-xs font-bold uppercase tracking-wider text-muted">Deployment Flexibility</dt>
              <dd className="mt-1 text-xs">
                <span className="text-muted">{vA.name}: </span>
                <span className="font-medium text-foreground">{vA.deployment.join(", ")}</span>
              </dd>
              <dd className="mt-1 text-xs">
                <span className="text-muted">{vB.name}: </span>
                <span className="font-medium text-foreground">{vB.deployment.join(", ")}</span>
              </dd>
            </div>
          </dl>
        </div>

        {/* WORKLOAD FIT & TRADE-OFFS */}
        <div className="rounded-xl border border-border bg-surface p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">Workload Fit & Known Trade-Offs</h3>
          <div className="space-y-4 text-xs leading-relaxed">
            <div className="p-3.5 rounded-lg bg-surface-alt border border-border">
              <p className="font-bold text-foreground mb-1">{vA.name} Best Deployment Profile</p>
              <p className="text-muted">{vA.workloadFit.idealDeployment}</p>
              <p className="mt-2 text-warning font-semibold">Trade-off: {vA.workloadFit.keyTradeOff}</p>
            </div>

            <div className="p-3.5 rounded-lg bg-surface-alt border border-border">
              <p className="font-bold text-foreground mb-1">{vB.name} Best Deployment Profile</p>
              <p className="text-muted">{vB.workloadFit.idealDeployment}</p>
              <p className="mt-2 text-warning font-semibold">Trade-off: {vB.workloadFit.keyTradeOff}</p>
            </div>
          </div>
        </div>
      </div>

      {/* CITATION BLOCK */}
      <div className="mt-12">
        <CitationBlock
          title={`ASCS Head-to-Head Research: ${vA.name} vs ${vB.name}`}
          date="March 2026"
          version="v2.1"
        />
      </div>
    </div>
  );
}
