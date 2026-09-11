import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getVisibleVendors, getVendorBySlug, getVendorDocumentationSources } from "@/lib/vendors";
import { getReviewsByVendor, getCxOById, CASE_STUDIES, ProjectReview, CxOProfile } from "@/lib/reviews";
import { getApprovedSubmittedReviewsForVendor } from "@/lib/db-queries";
import { ASCS_DIMENSIONS, SITE } from "@/lib/site";

import { DisclosureBanner } from "@/components/ui/DisclosureBanner";
import { CXOAttribution } from "@/components/ui/CXOAttribution";
import { StatRowGrid } from "@/components/ui/StatCard";
import { RatingDisplay } from "@/components/ui/RatingDisplay";
import { JsonLd } from "@/components/ui/JsonLd";
import Link from "next/link";

export function generateStaticParams() {
  return getVisibleVendors().map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const vendor = getVendorBySlug(slug);
  if (!vendor) return { title: "Not Found" };
  return {
    title: `${vendor.name} — Reviews_CXO Independent Evaluation (${vendor.ascsComposite}/10)`,
    description: `Reviews_CXO independent evaluation of ${vendor.name}: ${vendor.tagline}. Assessed ${vendor.ascsComposite}/10 on the ASCS enterprise framework.`,
    alternates: { canonical: `https://reviews-cxo.com/vendors/${vendor.slug}` },
    openGraph: {
      title: `${vendor.name} — Reviews_CXO Evaluation`,
      description: `Reviews_CXO independent evaluation of ${vendor.name}. Assessed ${vendor.ascsComposite}/10.`,
      url: `https://reviews-cxo.com/vendors/${vendor.slug}`,
      siteName: "Reviews_CXO",
      locale: "en_US",
      type: "website",
    },
  };
}

export default async function VendorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const vendor = getVendorBySlug(slug);
  if (!vendor) notFound();

  const docSources = getVendorDocumentationSources(vendor);

  const competitors = getVisibleVendors()
    .filter((v) => v.category === vendor.category && v.slug !== vendor.slug)
    .sort((a, b) => b.ascsComposite - a.ascsComposite)
    .slice(0, 4);

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: vendor.name,
    description: vendor.tagline,
    applicationCategory: "BusinessApplication",
    operatingSystem: vendor.deployment.join(", "),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: vendor.rating.toString(),
      reviewCount: Math.max(vendor.reviewCount, 1).toString(),
      bestRating: "5",
      worstRating: "1",
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
  };

  const scoreLabel = vendor.ascsComposite >= 8 ? "Strong enterprise fit" : vendor.ascsComposite >= 6 ? "Moderate enterprise fit" : "Limited enterprise fit";

  return (
    <>
      <JsonLd data={softwareSchema} />

      {/* HEADER — Reviews_CXO Assessment Dominant */}
      <div className="py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/vendors"
            className="mb-6 inline-flex items-center gap-1.5 text-xs font-bold text-muted hover:text-foreground transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            All Platforms
          </Link>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-wider text-muted">{vendor.category}</span>
              <h1 className="mt-2 text-3xl font-black text-foreground sm:text-4xl lg:text-5xl">{vendor.name}</h1>
              <p className="mt-3 text-base sm:text-lg text-muted font-normal leading-relaxed">{vendor.tagline}</p>

              {/* Metadata tags */}
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded border border-border bg-surface-alt px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-muted">Enterprise Platform</span>
                <span className="rounded border border-border bg-surface-alt px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-muted">{vendor.architectureProfile.agenticTier}</span>
                <span className="rounded border border-border bg-surface-alt px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-muted">{vendor.deployment[0]}</span>
                {vendor.freeTrial && <span className="rounded border border-border bg-surface-alt px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-muted">Free Trial</span>}
              </div>

              {vendor.parentCompany && (
                <div className="mt-5 rounded-xl border border-primary/20 bg-primary/5 p-4 text-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-primary/20 px-2 py-0.5 text-[10px] font-mono font-bold text-primary">Parent Lineage</span>
                      <span className="font-bold text-foreground">
                        {vendor.name} is an enterprise platform venture of{" "}
                        <a href={vendor.parentCompany.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-extrabold">
                          {vendor.parentCompany.name} ↗
                        </a>
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold text-muted">{vendor.parentCompany.relationship}</span>
                  </div>
                  <p className="mt-2 text-muted leading-relaxed">{vendor.parentCompany.description}</p>
                  <div className="mt-2.5 flex flex-wrap gap-1.5 pt-2 border-t border-primary/10">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted mr-1 self-center">Capabilities:</span>
                    {vendor.parentCompany.services.map((service) => (
                      <span key={service} className="rounded bg-surface px-2 py-0.5 text-[10px] font-medium text-muted border border-border">{service}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* REVIEWS_CXO ASSESSMENT — Visually Dominant */}
            <div className="flex flex-col items-start lg:items-end gap-4">
              <div className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-6 sm:p-8 text-center lg:text-right">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Reviews_CXO Assessment</span>
                <div className="mt-2 flex items-baseline gap-1.5 justify-center lg:justify-end">
                  <span className="text-5xl sm:text-6xl font-black font-mono text-primary">{vendor.ascsComposite}</span>
                  <span className="text-lg font-bold text-muted font-mono">/10</span>
                </div>
                <p className="mt-2 text-xs text-muted font-medium">{scoreLabel}</p>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-4 text-xs">
                <div className="text-center lg:text-right">
                  <p className="text-muted uppercase tracking-wider font-bold text-[10px]">Founded</p>
                  <p className="font-black text-foreground text-sm mt-0.5">{vendor.founded}</p>
                </div>
                <div className="text-center lg:text-right">
                  <p className="text-muted uppercase tracking-wider font-bold text-[10px]">HQ</p>
                  <p className="font-black text-foreground text-sm mt-0.5">{vendor.hq}</p>
                </div>
                <div className="text-center lg:text-right">
                  <p className="text-muted uppercase tracking-wider font-bold text-[10px]">Trial</p>
                  <p className="font-black text-foreground text-sm mt-0.5">{vendor.freeTrial ? "Available" : "Enterprise Only"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* MAIN COLUMN */}
          <div className="flex flex-col h-full gap-10 lg:col-span-2">
            <DisclosureBanner />

            {/* PLATFORM OVERVIEW — Concise Analyst Format */}
            <section className="rounded-xl border border-border bg-surface p-6 sm:p-8 shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Overview</span>
              <h2 className="text-xl font-black text-foreground mt-1 mb-4">Platform Overview</h2>
              <div className="text-sm text-muted leading-relaxed space-y-4">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-foreground mb-1">What it is</h3>
                  <p>{vendor.name} is an enterprise platform in the {vendor.category} category, providing {vendor.features.slice(0, 3).join(", ").toLowerCase()} capabilities.</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-foreground mb-1">Primary role</h3>
                  <p>{vendor.tagline}.</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-foreground mb-1">Best suited for</h3>
                  <p>{vendor.bestFor.join("; ")}.</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-foreground mb-1">Key capabilities</h3>
                  <ul className="space-y-1 mt-1">
                    {vendor.features.slice(0, 6).map(f => (
                      <li key={f} className="flex items-start gap-2">
                        <span className="text-primary font-bold mt-0.5 text-xs">-</span> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* ASCS 12-DIMENSION SCORECARD */}
            <section className="mt-auto rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-border pb-4 mb-6">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Reviews_CXO Research</span>
                  <h2 className="text-xl font-black text-foreground mt-1">ASCS Scorecard</h2>
                  <p className="text-xs text-muted mt-1">Twelve-dimension assessment of enterprise capability, architecture, AI, security, scalability, usability, economics, and strategic fit.</p>
                </div>
                <div className="flex items-baseline gap-1.5 self-start sm:self-end">
                  <span className="text-3xl font-black font-mono text-primary">{vendor.ascsComposite}</span>
                  <span className="text-sm font-bold text-muted font-mono">/ 10</span>
                </div>
              </div>

              <div className="space-y-3">
                {ASCS_DIMENSIONS.map((dim) => {
                  const score = vendor.ascsScores[dim.number] ?? 0;
                  const evidence = vendor.ascsEvidence[dim.number] ?? "documented";
                  return (
                    <div key={dim.number} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-xl border border-border/80 bg-surface-alt/40 p-3.5 hover:border-primary/40 transition-colors">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-muted">{dim.number}.</span>
                          <span className="font-bold text-sm text-foreground">{dim.name}</span>
                          <span className="rounded bg-surface-alt border border-border px-1.5 py-0.2 text-[10px] font-mono text-muted">{dim.weight}</span>
                        </div>
                        <p className="text-xs text-muted mt-0.5">{dim.description}</p>
                      </div>
                      <div className="flex flex-wrap items-center justify-between sm:justify-end gap-3 shrink-0">
                        <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-muted bg-surface px-2 py-0.5 rounded border border-border">{evidence}</span>
                        <div className="flex items-center gap-2 w-28 shrink-0">
                          <div className="h-2 flex-1 rounded-full bg-border overflow-hidden">
                            <div className={`h-full rounded-full ${score >= 8 ? "bg-accent" : score >= 6 ? "bg-primary" : "bg-warning"}`} style={{ width: `${(score / 10) * 100}%` }} />
                          </div>
                          <span className="font-mono text-xs font-black text-foreground w-7 text-right">{score}</span>
        </div>
      </div>
                    </div>
                  );
                })}
              </div>
            </section>




          </div>

          {/* SIDEBAR */}
          <div className="flex flex-col h-full gap-6">
            {/* ENTERPRISE SPECS */}
            <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground mb-4">Enterprise Specs</h3>
              <dl className="space-y-3 text-xs">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-2">
                  <dt className="text-muted">Pricing</dt>
                  <dd className="font-bold text-foreground sm:text-right">{vendor.pricing}</dd>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-t border-border pt-2.5 gap-1 sm:gap-2">
                  <dt className="text-muted">Deployment</dt>
                  <dd className="font-bold text-foreground sm:text-right">{vendor.deployment.join(", ")}</dd>
                </div>
                <div className="border-t border-border pt-2.5">
                  <dt className="text-muted mb-1">Certifications</dt>
                  <dd className="flex flex-wrap gap-1">
                    {vendor.certifications.map((cert) => (
                      <span key={cert} className="rounded bg-surface-alt border border-border px-1.5 py-0.5 text-[10px] font-mono text-muted">{cert}</span>
                    ))}
                  </dd>
                </div>
              </dl>
              <div className="mt-6 pt-4 border-t border-border">
                <a href={vendor.website} target="_blank" rel="noopener noreferrer" className="btn-primary w-full text-center text-xs py-2.5">
                  Visit Vendor Site ↗
                </a>
              </div>
            </div>

            {/* ARCHITECTURAL PROFILE */}
            <div className="rounded-xl border border-border bg-surface p-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground mb-3">Architectural Profile</h3>
              <dl className="space-y-3 text-xs">
                <div>
                  <dt className="font-bold uppercase tracking-wider text-muted text-[10px]">ERP Integration</dt>
                  <dd className="font-bold text-foreground mt-0.5">{vendor.architectureProfile.erpCoupling}</dd>
                </div>
                <div className="border-t border-border pt-2">
                  <dt className="font-bold uppercase tracking-wider text-muted text-[10px]">Reasoning Kernel</dt>
                  <dd className="text-muted mt-0.5 leading-relaxed">{vendor.architectureProfile.reasoningEngine}</dd>
                </div>
                <div className="border-t border-border pt-2">
                  <dt className="font-bold uppercase tracking-wider text-muted text-[10px]">Agentic Tier</dt>
                  <dd className="font-medium text-foreground mt-0.5">{vendor.architectureProfile.agenticTier}</dd>
                </div>
              </dl>
            </div>

            {/* WORKLOAD FIT */}
            <div className="rounded-xl border border-border bg-surface p-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground mb-3">Workload Fit</h3>
              <div className="space-y-3 text-xs leading-relaxed">
                <div>
                  <p className="font-bold uppercase tracking-wider text-muted text-[10px]">Ideal Enterprise Workload</p>
                  <p className="text-foreground font-medium mt-0.5">{vendor.workloadFit.idealDeployment}</p>
                </div>
                <div className="border-t border-border pt-2">
                  <p className="font-bold uppercase tracking-wider text-warning text-[10px]">Key Trade-off</p>
                  <p className="text-muted mt-0.5">{vendor.workloadFit.keyTradeOff}</p>
                </div>
              </div>
            </div>

            {/* OFFICIAL DOCUMENTATION */}
            <div className="rounded-xl border border-border bg-surface p-4 shadow-sm">
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-foreground mb-2.5">Official Documentation</h3>
              <div className="space-y-1.5">
                {docSources.map((doc) => (
                  <a
                    key={doc.title}
                    href={doc.url}
                    target={doc.url.startsWith("http") ? "_blank" : undefined}
                    rel={doc.url.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-center justify-between rounded-lg border border-border/50 bg-surface-alt/30 px-2.5 py-2 transition-all hover:border-primary/40 hover:bg-surface"
                  >
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold text-foreground group-hover:text-primary transition-colors truncate">{doc.title}</p>
                      <p className="text-[10px] text-muted truncate">{doc.description}</p>
                    </div>
                    <span className="text-[10px] font-bold text-muted group-hover:text-primary transition-colors shrink-0 ml-2">↗</span>
                  </a>
                ))}
              </div>
            </div>

            {/* CUSTOMER & MARKET EVIDENCE — Compact Sidebar */}
            <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground mb-3">Customer & Market Evidence</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-success mb-1">Positive Themes</p>
                  <ul className="space-y-1 text-xs text-muted leading-relaxed">
                    {(vendor.customerSentiment?.positiveThemes || ["Data collection in progress"]).slice(0, 3).map(t => (
                      <li key={t} className="flex items-start gap-1.5 min-w-0">
                        <span className="text-success font-bold mt-0.5 text-[10px] shrink-0">-</span>
                        <span className="truncate flex-1">{t.split("—")[0].trim()}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-t border-border pt-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-warning mb-1">Recurring Concerns</p>
                  <ul className="space-y-1 text-xs text-muted leading-relaxed">
                    {(vendor.customerSentiment?.negativeThemes || ["Data collection in progress"]).slice(0, 3).map(t => (
                      <li key={t} className="flex items-start gap-1.5 min-w-0">
                        <span className="text-warning font-bold mt-0.5 text-[10px] shrink-0">-</span>
                        <span className="truncate flex-1">{t.split("—")[0].trim()}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* PRICING & TCO — Compact Sidebar */}
            <div className="mt-auto rounded-xl border border-border bg-surface p-6 shadow-sm flex flex-col lg:min-h-[500px]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground mb-3">Pricing & TCO</h3>
              <div className="space-y-3 flex-1 flex flex-col justify-between">
                <div className="rounded-lg border border-border overflow-x-auto w-full max-w-full min-w-0">
                  <table className="w-full text-sm">
                    <tbody>
                      {(vendor.pricingDetails?.breakdown || [{component: "Standard License", price: "Contact Sales"}, {component: "Implementation", price: "Custom"}]).slice(0, 4).map((b, i) => (
                        <tr key={b.component} className={`border-b border-border/50 ${i % 2 === 0 ? 'bg-surface-alt/20' : ''}`}>
                          <td className="p-3 font-medium text-foreground">{b.component}</td>
                          <td className="p-3 font-mono font-bold text-primary text-right whitespace-nowrap">{b.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-warning mb-1">Key TCO Factors</p>
                  <ul className="space-y-1 text-xs text-muted leading-relaxed">
                    {(vendor.pricingDetails?.tcoConsiderations || ["Custom implementation costs", "Training and adoption", "Ongoing maintenance"]).slice(0, 3).map(t => (
                      <li key={t} className="flex items-start gap-1.5 min-w-0">
                        <span className="text-warning font-bold mt-0.5 text-[10px] shrink-0">-</span>
                        <span className="truncate flex-1">{t.split(":")[0].trim()}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* SYNTHESIZED ANALYST EVALUATION — Full Width */}
      <section className="w-full py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6 shadow-sm">
            <div className="border-b border-border pb-3 mb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Reviews_CXO Research</span>
              <h2 className="text-lg font-black text-foreground mt-1">Synthesized Analyst Evaluation</h2>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground mb-1.5">Executive Assessment</h3>
              <div className="text-sm text-muted leading-relaxed border-l-2 border-primary/40 pl-4 bg-surface-alt/20 py-1.5 rounded-r-lg">
                <p>{vendor.analystEvaluation?.editorialNarrative || "Analyst evaluation is currently in progress. Check back soon for comprehensive insights."}</p>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-xl border border-border bg-surface-alt/40 p-3">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-foreground mb-1.5">Core Strengths</h4>
                  <ul className="space-y-0.5 text-[11px] text-muted leading-relaxed">
                    {(vendor.analystEvaluation?.coreStrengths || ["Evaluating core capabilities..."]).map(s => (
                      <li key={s} className="flex items-start gap-1.5">
                        <span className="text-primary font-bold mt-0.5 text-[10px]">-</span> {s}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-warning/20 bg-warning/5 p-3">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-warning mb-1.5">Known Limitations</h4>
                  <ul className="space-y-0.5 text-[11px] text-muted leading-relaxed">
                    {(vendor.analystEvaluation?.knownLimitations || ["Evaluating current limitations..."]).map(l => (
                      <li key={l} className="flex items-start gap-1.5">
                        <span className="text-warning font-bold mt-0.5 text-[10px]">-</span> {l}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-border bg-surface-alt/40 p-3">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-foreground mb-1.5">Enterprise Fit</h4>
                  <ul className="space-y-0.5 text-[11px] text-muted leading-relaxed">
                    {(vendor.analystEvaluation?.idealEnterpriseWorkloads || ["Assessing ideal workloads..."]).map(w => (
                      <li key={w} className="flex items-start gap-1.5">
                        <span className="text-primary font-bold mt-0.5 text-[10px]">-</span> {w}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-border bg-surface-alt/40 p-3">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-foreground mb-1.5">Potential Misfit</h4>
                  <p className="text-[11px] text-muted leading-relaxed">
                    Organizations seeking lower implementation complexity, lighter operational overhead, or smaller per-seat investment may prefer a more focused alternative.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS_CXO VERDICT — Full Width */}
      <section className="w-full py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border-2 border-primary/20 bg-primary/5 p-5 sm:p-6 shadow-sm">
            <div className="border-b border-primary/10 pb-4 mb-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Independent Verdict</span>
              <h2 className="text-xl font-black text-foreground mt-1">Reviews_CXO Verdict</h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-foreground mb-2">Where it excels</h3>
                <ul className="space-y-1 text-sm text-muted leading-relaxed">
                  {vendor.analystEvaluation?.coreStrengths.slice(0, 3).map(s => (
                    <li key={s} className="flex items-start gap-2">
                      <span className="text-primary font-bold mt-0.5 text-xs">-</span> {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-foreground mb-2">Where it struggles</h3>
                <ul className="space-y-1 text-sm text-muted leading-relaxed">
                  {vendor.analystEvaluation?.knownLimitations.slice(0, 3).map(l => (
                    <li key={l} className="flex items-start gap-2">
                      <span className="text-warning font-bold mt-0.5 text-xs">-</span> {l}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-foreground mb-2">Best suited for</h3>
                <p className="text-sm text-muted leading-relaxed">{vendor.bestFor.join("; ")}.</p>
              </div>

              <div className="border-t border-primary/10 pt-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-2">Overall Assessment</h3>
                <p className="text-sm text-muted leading-relaxed">
                  <strong>Reviews_CXO assesses</strong> {vendor.name} as a {scoreLabel.toLowerCase()} for {vendor.bestFor[0]?.toLowerCase() || 'enterprise organizations'}. The platform demonstrates strength in {vendor.analystEvaluation?.coreStrengths[0]?.toLowerCase() || 'its core capabilities'}, while teams should carefully evaluate {vendor.analystEvaluation?.knownLimitations[0]?.toLowerCase() || 'implementation complexity'} before committing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
