import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getVisibleVendors, getVendorBySlug, getVendorDocumentationSources } from "@/lib/vendors";
import { getReviewsByVendor, getCxOById, CASE_STUDIES, ProjectReview, CxOProfile } from "@/lib/reviews";
import { getApprovedSubmittedReviewsForVendor } from "@/lib/db-queries";
import { ASCS_DIMENSIONS, SITE } from "@/lib/site";

import { StarRating } from "@/components/ui/StarRating";
import { DisclosureBanner } from "@/components/ui/DisclosureBanner";
import { CitationBlock } from "@/components/ui/CitationBlock";
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
    title: `${vendor.name} Evaluation — ASCS Scorecard (${vendor.ascsComposite}/10) & Architecture Review`,
    description: `Independent research evaluation of ${vendor.name}: ${vendor.tagline}. Scored ${vendor.ascsComposite}/10 on the ASCS enterprise architecture framework.`,
    alternates: { canonical: `https://reviews-cxo.com/vendors/${vendor.slug}` },
    openGraph: {
      title: `${vendor.name} Evaluation — ASCS Scorecard`,
      description: `Independent research evaluation of ${vendor.name}. Scored ${vendor.ascsComposite}/10.`,
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

  return (
    <>
      <JsonLd data={softwareSchema} />

      {/* HEADER */}
      <div className="py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/vendors"
            className="mb-6 inline-flex items-center gap-1.5 text-xs font-bold text-muted hover:text-foreground transition-colors"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-label="Back icon"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            All Platforms
          </Link>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="rounded bg-surface-alt border border-border px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-muted">
                  {vendor.category}
                </span>
                <span className="rounded bg-primary/10 border border-primary/20 px-2.5 py-0.5 text-xs font-mono font-bold text-primary">
                  {vendor.architectureProfile.agenticTier}
                </span>
              </div>

              <h1 className="text-3xl font-black text-foreground sm:text-4xl lg:text-5xl">{vendor.name}</h1>
              <p className="mt-3 text-base sm:text-lg text-muted font-normal leading-relaxed">{vendor.tagline}</p>

              <div className="mt-4 flex flex-wrap items-center gap-4">
                <StarRating rating={vendor.rating} size="md" reviewCount={vendor.reviewCount} />
                <span className="text-border">|</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-muted uppercase tracking-wider">ASCS Composite:</span>
                  <span className="font-mono text-base font-black text-primary">{vendor.ascsComposite}/10</span>
                </div>
              </div>

              {vendor.parentCompany && (
                <div className="mt-5 rounded-xl border border-primary/20 bg-primary/5 p-4 text-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-primary/20 px-2 py-0.5 text-[10px] font-mono font-bold text-primary">
                        Parent Lineage
                      </span>
                      <span className="font-bold text-foreground">
                        {vendor.name} is an enterprise platform venture of{" "}
                        <a
                          href={vendor.parentCompany.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline font-extrabold"
                        >
                          {vendor.parentCompany.name} ↗
                        </a>
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold text-muted">
                      {vendor.parentCompany.relationship}
                    </span>
                  </div>
                  <p className="mt-2 text-muted leading-relaxed">
                    {vendor.parentCompany.description}
                  </p>
                  <div className="mt-2.5 flex flex-wrap gap-1.5 pt-2 border-t border-primary/10">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted mr-1 self-center">Parent Capabilities:</span>
                    {vendor.parentCompany.services.map((service) => (
                      <span key={service} className="rounded bg-surface px-2 py-0.5 text-[10px] font-medium text-muted border border-border">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* QUICK STATS */}
            <div className="flex flex-wrap gap-6 rounded-xl border border-border bg-surface-alt/40 p-5 text-xs">
              <div>
                <p className="text-muted uppercase tracking-wider font-bold text-[10px]">Founded</p>
                <p className="font-black text-foreground text-sm mt-0.5">{vendor.founded}</p>
              </div>
              <div className="border-l border-border pl-6">
                <p className="text-muted uppercase tracking-wider font-bold text-[10px]">HQ</p>
                <p className="font-black text-foreground text-sm mt-0.5">{vendor.hq}</p>
              </div>
              <div className="border-l border-border pl-6">
                <p className="text-muted uppercase tracking-wider font-bold text-[10px]">Trial</p>
                <p className="font-black text-foreground text-sm mt-0.5">{vendor.freeTrial ? "Available" : "Enterprise Only"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* MAIN COLUMN */}
          <div className="space-y-10 lg:col-span-2">
            <DisclosureBanner />

            {/* PLATFORM OVERVIEW */}
            <section className="rounded-xl border border-border bg-surface p-6 sm:p-8 shadow-sm">
              <h2 className="text-2xl font-black text-foreground mb-4">Platform Overview</h2>
              <div className="text-sm text-muted-foreground leading-relaxed space-y-4">
                <p>
                  <strong>{vendor.name}</strong> operates as a highly specialized enterprise platform built primarily for {vendor.workloadFit.idealDeployment.toLowerCase()}. 
                  The platform&apos;s core operational capability is driven by its <strong>{vendor.architectureProfile.reasoningEngine}</strong>, 
                  allowing it to function as a {vendor.architectureProfile.agenticTier} system. 
                </p>
                <p>
                  Recognized as a leading solution in the {vendor.category} category, {vendor.name} provides robust 
                  {vendor.deployment.join(" and ")} deployment options. This makes it highly adaptable to varying corporate IT infrastructures, 
                  particularly those that require {vendor.architectureProfile.erpCoupling.toLowerCase()} to core business systems.
                </p>
              </div>
            </section>

            {/* ASCS 12-DIMENSION SCORECARD */}
            <section className="rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-border pb-4 mb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">Technical Evaluation</span>
                  <h2 className="text-2xl font-black text-foreground mt-1">ASCS 12-Dimension Scorecard</h2>
                </div>
                <div className="flex items-baseline gap-1.5 self-start sm:self-end">
                  <span className="text-3xl font-black font-mono text-primary">{vendor.ascsComposite}</span>
                  <span className="text-sm font-bold text-muted font-mono">/ 10.0</span>
                </div>
              </div>

              <p className="text-xs text-muted mb-6">
                Scores reflect laboratory validation, documented enterprise architecture, and verified capabilities across normalized enterprise workloads.
              </p>

              <div className="space-y-3">
                {ASCS_DIMENSIONS.map((dim) => {
                  const score = vendor.ascsScores[dim.number] ?? 0;
                  const evidence = vendor.ascsEvidence[dim.number] ?? "documented";

                  return (
                    <div
                      key={dim.number}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-xl border border-border/80 bg-surface-alt/40 p-3.5 hover:border-primary/40 transition-colors"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-muted">{dim.number}.</span>
                          <span className="font-bold text-sm text-foreground">{dim.name}</span>
                          <span className="rounded bg-surface-alt border border-border px-1.5 py-0.2 text-[10px] font-mono text-muted">
                            {dim.weight}
                          </span>
                        </div>
                        <p className="text-xs text-muted mt-0.5">{dim.description}</p>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                        <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-muted bg-surface px-2 py-0.5 rounded border border-border">
                          {evidence}
                        </span>

                        <div className="flex items-center gap-2 w-28">
                          <div className="h-2 flex-1 rounded-full bg-border overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                score >= 8
                                  ? "bg-accent"
                                  : score >= 6
                                  ? "bg-primary"
                                  : "bg-warning"
                              }`}
                              style={{ width: `${(score / 10) * 100}%` }}
                            />
                          </div>
                          <span className="font-mono text-xs font-black text-foreground w-7 text-right">
                            {score}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* 4. SYNTHESIZED ANALYST EVALUATION */}
            {vendor.analystEvaluation ? (
              <section className="rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8 border-b border-border pb-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">Reviews_CXO Research</span>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground mb-2 mt-1">Synthesized Analyst Evaluation</h2>
                    <p className="text-base text-muted-foreground max-w-2xl mt-2 leading-relaxed">
                      An independent architectural synthesis and objective evaluation of {vendor.name}, based on normalized testing and documented enterprise deployment footprints.
                    </p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-black text-foreground mb-3">Editorial Narrative & Architectural Fit</h3>
                    <div className="text-sm text-muted leading-relaxed space-y-4 border-l-2 border-primary/40 pl-4 bg-surface-alt/20 py-2 rounded-r-lg">
                      <p>{vendor.analystEvaluation.editorialNarrative}</p>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="rounded-xl border border-border bg-surface-alt/40 p-5">
                      <h4 className="font-bold text-sm text-foreground mb-3 flex items-center gap-2">
                        <span className="text-primary">✦</span> Ideal Enterprise Workloads
                      </h4>
                      <ul className="space-y-2 text-xs text-muted leading-relaxed">
                        {vendor.analystEvaluation.idealEnterpriseWorkloads.map(w => (
                          <li key={w} className="flex items-start gap-2">
                            <span className="text-muted font-bold mt-0.5">•</span> {w}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-xl border border-border bg-surface-alt/40 p-5">
                      <h4 className="font-bold text-sm text-foreground mb-3 flex items-center gap-2">
                        <span className="text-primary">✦</span> Core Architectural Strengths
                      </h4>
                      <ul className="space-y-2 text-xs text-muted leading-relaxed">
                        {vendor.analystEvaluation.coreStrengths.map(s => (
                          <li key={s} className="flex items-start gap-2">
                            <span className="text-muted font-bold mt-0.5">•</span> {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="rounded-xl border border-warning/20 bg-warning/5 p-5">
                    <h4 className="font-bold text-sm text-warning mb-3 flex items-center gap-2">
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-warning/20 text-[10px] font-black">!</span> 
                      Known Limitations & Documented Trade-Offs
                    </h4>
                    <ul className="space-y-2 text-xs text-muted leading-relaxed">
                      {vendor.analystEvaluation.knownLimitations.map(l => (
                        <li key={l} className="flex items-start gap-2">
                          <span className="text-warning font-bold mt-0.5">•</span> {l}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            ) : null}

        <div className="mt-20 pt-8 border-t border-border">
          <div className="mb-6 rounded-lg bg-surface-alt/50 p-5 border border-border/50 max-w-5xl mx-auto">
            <p className="text-[10px] text-muted uppercase tracking-widest font-black mb-2">Legal & Trademark Disclaimer</p>
            <p className="text-[11px] text-muted leading-relaxed">
              All product names, logos, trademarks, and registered trademarks are the property of their respective owners. All company, product, and service names used in this website are for identification purposes only. The use of these names, trademarks, and brands does not imply endorsement. <strong>{vendor.name}&trade;</strong> is a trademark of its respective parent company or organization. Reviews_CXO is an independent research platform and is not affiliated with, endorsed by, or sponsored by {vendor.name}.
            </p>
          </div>

          <CitationBlock
            title={`Reviews_CXO Architecture Evaluation: ${vendor.name}`}
            date="March 2026"
            version="v2.1"
          />
        </div>

          </div>

          {/* SIDEBAR */}
          <div className="space-y-6">
            {/* PRICING & METADATA CARD */}
            <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
              <h3 className="text-base font-black text-foreground mb-4">Enterprise Specs</h3>
              <dl className="space-y-3 text-xs">
                <div className="flex justify-between items-start gap-2">
                  <dt className="text-muted">Pricing</dt>
                  <dd className="font-bold text-foreground text-right">{vendor.pricing}</dd>
                </div>
                <div className="flex justify-between items-center border-t border-border pt-2.5">
                  <dt className="text-muted">Satisfaction Index</dt>
                  <dd className="font-bold text-foreground">{vendor.rating}/5</dd>
                </div>
                <div className="flex justify-between items-center border-t border-border pt-2.5">
                  <dt className="text-muted">User Feedback</dt>
                  <dd className="font-bold text-foreground">
                    {vendor.reviewCount > 0 ? `${vendor.reviewCount.toLocaleString()} reviews` : "Ecosystem Component"}
                  </dd>
                </div>
                <div className="border-t border-border pt-2.5">
                  <dt className="text-muted mb-1">Certifications</dt>
                  <dd className="flex flex-wrap gap-1">
                    {vendor.certifications.map((cert) => (
                      <span key={cert} className="rounded bg-surface-alt border border-border px-1.5 py-0.5 text-[10px] font-mono text-muted">
                        {cert}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>

              <div className="mt-6 pt-4 border-t border-border">
                <a
                  href={vendor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full text-center text-xs py-2.5"
                >
                  Visit Vendor Site ↗
                </a>
              </div>
            </div>

            {/* ARCHITECTURAL PROFILE & WORKLOAD FIT */}
            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-surface p-6">
                <h3 className="text-base font-black text-foreground mb-3">Enterprise Architectural Profile</h3>
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
                    <dt className="font-bold uppercase tracking-wider text-muted text-[10px]">Deployment Footprint</dt>
                    <dd className="font-medium text-foreground mt-0.5">{vendor.deployment.join(", ")}</dd>
                  </div>
                </dl>
              </div>

              <div className="rounded-xl border border-border bg-surface p-6">
                <h3 className="text-base font-black text-foreground mb-3">Workload Fit & Trade-Offs</h3>
                <div className="space-y-3 text-xs leading-relaxed">
                  <div>
                    <p className="font-bold uppercase tracking-wider text-muted text-[10px]">Ideal Enterprise Workload</p>
                    <p className="text-foreground font-medium mt-0.5">{vendor.workloadFit.idealDeployment}</p>
                  </div>
                  <div className="border-t border-border pt-2">
                    <p className="font-bold uppercase tracking-wider text-warning text-[10px]">Documented Trade-Off</p>
                    <p className="text-muted mt-0.5">{vendor.workloadFit.keyTradeOff}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* PROS & CONS */}
            <div className="space-y-6">
              <div className="rounded-xl border border-success/20 bg-success/5 p-6">
                <h3 className="mb-3 flex items-center gap-2 text-base font-bold text-success">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  Documented Strengths
                </h3>
                <ul className="space-y-2 text-xs text-foreground/90 leading-relaxed">
                  {vendor.pros.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-success" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-danger/20 bg-danger/5 p-6">
                <h3 className="mb-3 flex items-center gap-2 text-base font-bold text-danger">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Known Limitations & Gaps
                </h3>
                <ul className="space-y-2 text-xs text-foreground/90 leading-relaxed">
                  {vendor.cons.map((c) => (
                    <li key={c} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-danger" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            
            {/* OFFICIAL DOCUMENTATION & VERIFIED EVIDENCE SOURCES */}
            <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-4 mb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">Primary Sources & Audit Trail</span>
                  <h2 className="text-xl sm:text-2xl font-black text-foreground mt-1">Official Documentation & Verified Sources</h2>
                </div>
                <span className="text-xs font-mono text-muted">{docSources.length} Verified Sources</span>
              </div>

              <p className="text-xs text-muted mb-6 leading-relaxed">
                All ASCS dimension scores, architectural classifications, and enterprise capabilities for {vendor.name} are verified directly against the vendor&apos;s official technical documentation, API specifications, compliance registries, and laboratory benchmark protocols:
              </p>

              <div className="space-y-3">
                {docSources.map((doc) => (
                  <a
                    key={doc.title}
                    href={doc.url}
                    target={doc.url.startsWith("http") ? "_blank" : undefined}
                    rel={doc.url.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group rounded-xl border border-border bg-surface-alt/40 p-4 transition-all hover:border-primary/40 hover:bg-surface hover:shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="rounded bg-primary/10 border border-primary/20 px-2 py-0.5 text-[10px] font-mono font-bold text-primary">
                          {doc.type}
                        </span>
                        <span className="text-xs font-bold text-muted group-hover:text-primary transition-colors flex items-center gap-0.5">
                          Inspect Docs ↗
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors mt-2.5">
                        {doc.title}
                      </h4>
                      <p className="text-xs text-muted mt-1 leading-relaxed">
                        {doc.description}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            
            {/* SIMILAR PLATFORMS (USING LINK, NOT A) */}
            {competitors.length > 0 && (
              <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
                <h3 className="text-base font-black text-foreground mb-3">Compare Similar Platforms</h3>
                <div className="space-y-2.5">
                  {competitors.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/compare/${vendor.slug}-vs-${c.slug}`}
                      className="group flex items-center justify-between rounded-lg border border-transparent p-2.5 transition-colors hover:border-border hover:bg-surface-alt"
                    >
                      <div>
                        <span className="text-xs font-bold text-foreground group-hover:text-primary transition-colors block">
                          vs {c.name}
                        </span>
                        <span className="text-[10px] text-muted font-mono">ASCS: {c.ascsComposite}/10</span>
                      </div>
                      <span className="text-xs font-bold text-primary group-hover:underline">
                        Compare →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
