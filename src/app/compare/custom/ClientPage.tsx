"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StarRating } from "@/components/ui/StarRating";
import { ASCS_DIMENSIONS } from "@/lib/site";
import { Vendor } from "@/lib/vendors";

export default function CustomComparePage({ allVendors }: { allVendors: Vendor[] }) {
  const sortedVendors = [...allVendors].sort((a, b) => a.name.localeCompare(b.name));
  const [slugA, setSlugA] = useState("");
  const [slugB, setSlugB] = useState("");

  const vA = allVendors.find((v) => v.slug === slugA);
  const vB = allVendors.find((v) => v.slug === slugB);
  const showComparison = vA && vB && slugA !== slugB;

  return (
    <>
      <PageHeader
        badge="Custom Comparison"
        title="Compare Any Two Platforms"
        description="Select two platforms from the dropdowns below to see a side-by-side comparison."
      />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">

        {/* SELECTOR */}
        <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-wider text-muted mb-4">Select Platforms</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-bold text-foreground mb-2">Platform A</label>
              <select
                value={slugA}
                onChange={(e) => setSlugA(e.target.value)}
                className="w-full rounded-xl border border-border bg-surface-alt px-4 py-3 text-sm font-medium text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="">Choose a platform...</option>
                {sortedVendors.map((v) => (
                  <option key={v.slug} value={v.slug}>
                    {v.name} — {v.category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-foreground mb-2">Platform B</label>
              <select
                value={slugB}
                onChange={(e) => setSlugB(e.target.value)}
                className="w-full rounded-xl border border-border bg-surface-alt px-4 py-3 text-sm font-medium text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="">Choose a platform...</option>
                {sortedVendors.filter((v) => v.slug !== slugA).map((v) => (
                  <option key={v.slug} value={v.slug}>
                    {v.name} — {v.category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* EMPTY STATE */}
        {!showComparison && (
          <div className="text-center py-16">
            <span className="font-mono text-4xl sm:text-5xl font-black text-primary/20">VS</span>
            <p className="mt-4 text-sm text-muted">Select two different platforms above to see the comparison.</p>
          </div>
        )}

        {/* COMPARISON */}
        {showComparison && vA && vB && (
          <>
            {/* TWO VENDOR CARDS */}
            <div className="grid gap-4 sm:grid-cols-2">
              {[vA, vB].map((v, idx) => {
                const other = idx === 0 ? vB : vA;
                const isLeader = v.ascsComposite >= other.ascsComposite;
                return (
                  <div
                    key={v.slug}
                    className={`rounded-2xl border p-6 ${isLeader ? "border-primary/30 bg-primary/5" : "border-border bg-surface"}`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-muted">{v.category}</p>
                        <h3 className={`text-xl font-black mt-1 ${isLeader ? "text-primary" : "text-foreground"}`}>
                          {v.name}
                        </h3>
                        <p className="text-xs text-muted mt-1">{v.tagline}</p>
                      </div>
                      {isLeader && (
                        <span className="rounded bg-success/10 border border-success/20 px-2 py-0.5 text-[10px] font-bold text-success">
                          LEADS
                        </span>
                      )}
                    </div>

                    <div className="mt-4">
                      <StarRating rating={v.rating} size="md" reviewCount={v.reviewCount} />
                    </div>

                    <div className="mt-4 flex items-center gap-4">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-muted">ASCS Score</p>
                        <p className={`font-mono text-2xl font-black ${isLeader ? "text-primary" : "text-foreground"}`}>
                          {v.ascsComposite}<span className="text-sm text-muted">/10</span>
                        </p>
                      </div>
                      <div className="border-l border-border pl-4">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-muted">Pricing</p>
                        <p className="text-xs font-medium text-foreground">{v.pricing}</p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {v.certifications.map((c) => (
                        <span key={c} className="rounded bg-surface-alt border border-border px-2 py-0.5 text-[10px] font-mono text-muted">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 12-DIMENSION BREAKDOWN */}
            <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
              <div className="flex items-end justify-between border-b border-border pb-4 mb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">Head-to-Head</span>
                  <h3 className="text-xl font-black text-foreground mt-1">12-Dimension Score Breakdown</h3>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                    <span className="font-bold text-foreground">{vA.name}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-border" />
                    <span className="font-bold text-foreground">{vB.name}</span>
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {ASCS_DIMENSIONS.map((dim) => {
                  const scoreA = vA.ascsScores[dim.number] ?? 0;
                  const scoreB = vB.ascsScores[dim.number] ?? 0;
                  const diff = scoreA - scoreB;
                  const aLeads = diff > 0;
                  const tied = diff === 0;

                  return (
                    <div key={dim.number} className="rounded-xl border border-border/60 bg-surface-alt/30 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-muted">{dim.number}.</span>
                          <span className="text-sm font-bold text-foreground">{dim.name}</span>
                          <span className="rounded bg-surface-alt border border-border px-1.5 py-0.5 text-[10px] font-mono text-muted">
                            {dim.weight}
                          </span>
                        </div>
                        <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                          tied ? "text-muted bg-surface-alt" : aLeads ? "text-primary bg-primary/10" : "text-danger bg-danger/10"
                        }`}>
                          {tied ? "TIE" : `${vA.name.split(" ")[0]} +${Math.abs(diff).toFixed(1)}`}
                        </span>
                      </div>

                      {/* BARS */}
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="w-20 text-[10px] text-muted truncate">{vA.name.split(" ")[0]}</span>
                          <div className="flex-1 h-2.5 rounded-full bg-border overflow-hidden">
                            <div
                              className={`h-full rounded-full ${aLeads ? "bg-primary" : "bg-border-hover"}`}
                              style={{ width: `${(scoreA / 10) * 100}%` }}
                            />
                          </div>
                          <span className={`font-mono text-xs font-black w-8 text-right ${aLeads ? "text-primary" : "text-muted"}`}>
                            {scoreA}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-20 text-[10px] text-muted truncate">{vB.name.split(" ")[0]}</span>
                          <div className="flex-1 h-2.5 rounded-full bg-border overflow-hidden">
                            <div
                              className={`h-full rounded-full ${!aLeads && !tied ? "bg-primary" : "bg-border-hover"}`}
                              style={{ width: `${(scoreB / 10) * 100}%` }}
                            />
                          </div>
                          <span className={`font-mono text-xs font-black w-8 text-right ${!aLeads && !tied ? "text-primary" : "text-muted"}`}>
                            {scoreB}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* PROS AND CONS */}
            <div className="grid gap-4 sm:grid-cols-2">
              {[vA, vB].map((v) => (
                <div key={v.slug} className="rounded-2xl border border-border bg-surface p-6">
                  <h3 className="text-base font-black text-foreground mb-4">{v.name}</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-success mb-2">Strengths</p>
                      <ul className="space-y-1.5">
                        {v.pros.map((p) => (
                          <li key={p} className="flex items-start gap-2 text-xs text-muted">
                            <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-success" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="border-t border-border pt-3">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-danger mb-2">Limitations</p>
                      <ul className="space-y-1.5">
                        {v.cons.map((c) => (
                          <li key={c} className="flex items-start gap-2 text-xs text-muted">
                            <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-danger" />
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* BEST FOR */}
            <div className="grid gap-4 sm:grid-cols-2">
              {[vA, vB].map((v) => (
                <div key={v.slug} className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
                  <h3 className="text-sm font-bold text-primary mb-3">Best For — {v.name}</h3>
                  <ul className="space-y-2">
                    {v.bestFor.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-xs text-foreground/80">
                        <svg className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* ARCHITECTURE COMPARISON */}
            <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
              <h3 className="text-xl font-black text-foreground mb-6">Architecture Comparison</h3>
              <div className="grid gap-6 sm:grid-cols-2">
                {[vA, vB].map((v) => (
                  <div key={v.slug}>
                    <p className="text-sm font-bold text-foreground mb-3">{v.name}</p>
                    <dl className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <dt className="text-muted">ERP Coupling</dt>
                        <dd className="font-bold text-foreground text-right">{v.architectureProfile.erpCoupling}</dd>
                      </div>
                      <div className="flex justify-between border-t border-border pt-2">
                        <dt className="text-muted">Reasoning Engine</dt>
                        <dd className="font-medium text-foreground text-right max-w-[60%]">{v.architectureProfile.reasoningEngine}</dd>
                      </div>
                      <div className="flex justify-between border-t border-border pt-2">
                        <dt className="text-muted">Agentic Tier</dt>
                        <dd className="font-bold text-foreground text-right">{v.architectureProfile.agenticTier}</dd>
                      </div>
                      <div className="flex justify-between border-t border-border pt-2">
                        <dt className="text-muted">Deployment</dt>
                        <dd className="font-medium text-foreground text-right">{v.deployment.join(", ")}</dd>
                      </div>
                    </dl>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
