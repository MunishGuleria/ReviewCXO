import { Metadata } from "next";
import { notFound } from "next/navigation";
import { VENDORS, getVendorBySlug, getVendorDocumentationSources } from "@/lib/vendors";
import { getReviewsByVendor, getCxOById, EVIDENCE_TYPE_LABELS, CASE_STUDIES, ProjectReview, CxOProfile } from "@/lib/reviews";
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
  return VENDORS.map((v) => ({ slug: v.slug }));
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

const evidenceTypeColors: Record<string, string> = {
  verified_cxo_review: "bg-green-500/10 text-green-600 border-green-500/20",
  public_review_evidence: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  public_customer_evidence: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  vendor_provided_evidence: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  third_party_research: "bg-orange-500/10 text-orange-600 border-orange-500/20",
  observed_evidence: "bg-cyan-500/10 text-cyan-600 border-cyan-500/20",
  inferred: "bg-gray-500/10 text-gray-600 border-gray-500/20",
};

export default async function VendorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const vendor = getVendorBySlug(slug);
  if (!vendor) notFound();

  const dbApprovedReviews = getApprovedSubmittedReviewsForVendor(vendor.slug);

  const mappedDbReviews: ProjectReview[] = dbApprovedReviews.map((r: any) => ({
    id: r.id,
    cxoId: `db_${r.id}`,
    vendorId: vendor.slug,
    projectTitle: r.project_title,
    projectCategory: r.project_category,
    problemStatement: r.problem_statement || "",
    aiSolutionDescription: r.ai_solution_description || "",
    techStack: r.tech_stack ? (() => { try { return JSON.parse(r.tech_stack); } catch { return []; } })() : [],
    teamSize: r.team_size || 0,
    timelineMonths: r.timeline_months || 0,
    budgetRange: r.budget_range || "",
    startDate: "",
    completionDate: "",
    outcomesDescription: r.outcomes_description || "",
    roiPercentage: r.roi_percentage || 0,
    efficiencyGainPercentage: r.efficiency_gain_percentage || 0,
    adoptionRate: (r.adoption_rate as "High" | "Medium" | "Low") || "High",
    challengesFaced: r.challenges_faced || "",
    deliveryQualityRating: r.delivery_quality_rating || 5,
    aiEffectivenessRating: r.ai_effectiveness_rating || 5,
    communicationRating: r.communication_rating || 5,
    valueForMoneyRating: r.value_for_money_rating || 5,
    wouldRecommend: Boolean(r.would_recommend),
    overallRating: r.overall_rating || 5,
    status: "approved",
    isAnonymous: Boolean(r.is_anonymous),
    evidenceType: "verified_cxo_review",
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  }));

  const dbCxoProfiles: Record<string, CxOProfile> = {};
  for (const r of dbApprovedReviews) {
    dbCxoProfiles[`db_${r.id}`] = {
      id: `db_${r.id}`,
      fullName: r.cxo_full_name,
      title: r.cxo_title,
      companyName: r.cxo_company_name,
      companyDomain: "",
      linkedinUrl: r.cxo_linkedin_url || undefined,
      isVerified: true,
      verificationMethod: "company_email",
      reviewCount: 1,
    };
  }

  const staticReviews = getReviewsByVendor(vendor.slug);
  const vendorReviews = [...mappedDbReviews, ...staticReviews];
  const docSources = getVendorDocumentationSources(vendor);


  const competitors = VENDORS
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
      <div className="border-b border-border bg-surface py-10 sm:py-14">
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

            {/* ARCHITECTURAL PROFILE & WORKLOAD FIT */}
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
            </section>

            {/* PROS & CONS */}
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
            </section>

            {/* OFFICIAL DOCUMENTATION & VERIFIED EVIDENCE SOURCES */}
            <section className="rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-sm">
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

              <div className="grid gap-4 sm:grid-cols-2">
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
            </section>

            {/* ENTERPRISE REVIEWS & PROJECT EVIDENCE */}
            <section className="rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-4 mb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">Field Evidence & Customer Stories</span>
                  <h2 className="text-xl sm:text-2xl font-black text-foreground mt-1">Enterprise Project Evidence & Case Studies</h2>
                </div>
                <Link
                  href="/submit-review"
                  className="rounded-lg border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary hover:bg-primary/20 transition-colors self-start sm:self-center"
                >
                  Submit Review +
                </Link>
              </div>

              {vendorReviews.length > 0 ? (
                <div className="space-y-6">
                  {vendorReviews.map((review) => {
                    const cxo = dbCxoProfiles[review.cxoId] || getCxOById(review.cxoId);
                    const isVerifiedWorkflowReview = review.evidenceType === "verified_cxo_review";
                    const evidenceLabel = isVerifiedWorkflowReview
                      ? "Verified CXO Review"
                      : "Public Customer Evidence";
                    const evidenceColor = isVerifiedWorkflowReview
                      ? "bg-green-500/10 text-green-600 border-green-500/20"
                      : "bg-primary/10 text-primary border-primary/20";
                    const linkedCaseStudy = CASE_STUDIES.find((cs) => cs.projectReviewId === review.id);

                    return (
                      <div key={review.id} className="rounded-xl border border-border bg-surface-alt/40 p-5">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                          <div>
                            <h4 className="text-sm font-bold text-foreground">{review.projectTitle}</h4>
                            <p className="text-xs text-muted mt-0.5">
                              {review.projectCategory} · {review.teamSize} team · {review.timelineMonths} months · {review.budgetRange}
                            </p>
                          </div>
                          <RatingDisplay value={review.overallRating} size="sm" />
                        </div>

                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className={`inline-block rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border ${evidenceColor}`}>
                            {evidenceLabel}
                          </span>
                          {review.sourceName && (
                            <a
                              href={review.sourceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[10px] font-semibold text-primary hover:underline"
                            >
                              Source: {review.sourceName} ↗
                            </a>
                          )}
                        </div>

                        <StatRowGrid items={[
                          { label: "ROI", value: `${review.roiPercentage}%`, color: "text-green-500" },
                          { label: "Efficiency Gain", value: `${review.efficiencyGainPercentage}%`, color: "text-green-500" },
                          { label: "Adoption", value: review.adoptionRate },
                          { label: "Recommend", value: review.wouldRecommend ? "Yes" : "No", color: review.wouldRecommend ? "text-green-500" : "text-red-500" },
                        ]} />

                        <p className="text-xs text-muted leading-relaxed mt-3 mb-3">{review.outcomesDescription}</p>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-border mt-3">
                          {isVerifiedWorkflowReview && cxo && !review.isAnonymous ? (
                            <CXOAttribution cxo={cxo} size="sm" />
                          ) : cxo && !review.isAnonymous ? (
                            <div className="text-xs text-muted flex items-center gap-2">
                              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary">
                                {cxo.fullName.split(" ").map((n) => n[0]).join("")}
                              </span>
                              <div>
                                <span className="font-bold text-foreground">{cxo.fullName}</span>
                                <span className="text-muted"> · {cxo.title}, {cxo.companyName}</span>
                              </div>
                            </div>
                          ) : (
                            <span className="text-[11px] text-muted italic">
                              {isVerifiedWorkflowReview ? "Verified Enterprise CXO Review" : "Documented Enterprise Customer Evidence"}
                            </span>
                          )}

                          {linkedCaseStudy && (
                            <Link
                              href={`/case-studies/${linkedCaseStudy.slug}`}
                              className="text-xs font-bold text-primary hover:underline flex items-center gap-1 shrink-0"
                            >
                              Read Full Case Study →
                            </Link>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-border bg-surface-alt/30 p-8 text-center space-y-3">
                  <p className="text-sm font-semibold text-foreground">No Community Reviews Yet</p>
                  <p className="text-xs text-muted max-w-md mx-auto leading-relaxed">
                    All current scores for {vendor.name} are derived from official documentation, technical audit specifications, and laboratory ASCS benchmark tests. Have you implemented or evaluated {vendor.name}?
                  </p>
                  <div className="pt-2">
                    <Link
                      href="/submit-review"
                      className="btn-primary inline-flex text-xs py-2.5 px-5"
                    >
                      Submit a Verified CXO Review →
                    </Link>
                  </div>
                </div>
              )}
            </section>

            {/* CITATION */}
            <CitationBlock
              title={`Reviews_CXO Vendor Architecture Evaluation: ${vendor.name}`}
              date="March 2026"
              version="v2.1"
            />
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
