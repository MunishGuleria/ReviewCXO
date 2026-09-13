"use client";

import { useState } from "react";
import { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { StarRating } from "@/components/ui/StarRating";
import { getAllVendors } from "@/lib/vendors";
import { ASCS_DIMENSIONS } from "@/lib/site";
import Link from "next/link";

const platformComparisons = [
  { a: "salesforce", b: "microsoft-dynamics-365", question: "CRM Monolith vs Unified ERP+CRM Infrastructure", verdict: "Salesforce leads in CRM depth; Dynamics wins on unified ERP+CRM" },
  { a: "salesforce-einstein", b: "microsoft-copilot", question: "CRM-Native AI vs Productivity-Embedded AI", verdict: "Einstein for CRM-native intelligence; Copilot for Outlook/Teams workflows" },
  { a: "salesforce", b: "sap-joule", question: "Global CRM Ecosystem vs ERP Intelligence", verdict: "Salesforce for ecosystem scale; SAP Joule for deep ERP grounding" },
  { a: "microsoft-dynamics-365", b: "sap-joule", question: "Unified CRM+ERP vs Deep ERP Transactional AI", verdict: "Dynamics for Microsoft-native shops; SAP Joule for manufacturing/supply chain" },
  { a: "salesforce-einstein", b: "sap-joule", question: "CRM AI Models vs ERP Transaction Intelligence", verdict: "Einstein for sales/marketing AI; SAP Joule for operational AI" },
  { a: "microsoft-copilot", b: "salesforce-einstein", question: "Productivity Suite AI vs CRM Platform AI", verdict: "Copilot for sellers in Outlook/Teams; Einstein for CRM-native workflows" },
];

function ComparisonDetail({ a, b }: { a: string; b: string }) {
  const allVendors = getAllVendors();
  const vA = allVendors.find((v) => v.slug === a)!;
  const vB = allVendors.find((v) => v.slug === b)!;
  const aWins = vA.ascsComposite >= vB.ascsComposite;
  const leader = aWins ? vA : vB;
  const follower = aWins ? vB : vA;

  return (
    <div className="space-y-4">
      {/* TWO VENDOR CARDS */}
      <div className="grid gap-3 sm:grid-cols-2">
        {[vA, vB].map((v) => {
          const isLeader = v.slug === leader.slug;
          return (
            <div
              key={v.slug}
              className={`rounded-xl p-4 ${isLeader ? "bg-primary/5 border border-primary/20" : "bg-surface-alt border border-border"}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`font-extrabold ${isLeader ? "text-primary" : "text-foreground"}`}>
                    {v.name}
                  </p>
                  <p className="text-[10px] text-muted">{v.category}</p>
                </div>
                {isLeader && (
                  <span className="rounded bg-success/10 border border-success/20 px-2 py-0.5 text-[10px] font-bold text-success">
                    LEADS
                  </span>
                )}
              </div>
              <div className="mt-2">
                <StarRating rating={v.rating} size="sm" reviewCount={v.reviewCount} />
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className={`font-mono text-lg font-black ${isLeader ? "text-primary" : "text-foreground"}`}>
                  {v.ascsComposite}
                </span>
                <span className="text-[10px] text-muted">/10 ASCS</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 12-DIMENSION BREAKDOWN */}
      <div className="rounded-xl border border-border bg-surface p-4">
        <p className="text-xs font-bold uppercase tracking-wider text-muted mb-3">12-Dimension Score Breakdown</p>
        <div className="space-y-2">
          {ASCS_DIMENSIONS.map((dim) => {
            const scoreA = vA.ascsScores[dim.number] ?? 0;
            const scoreB = vB.ascsScores[dim.number] ?? 0;
            const diff = scoreA - scoreB;
            const aLeads = diff > 0;
            const tied = diff === 0;

            return (
              <div key={dim.number} className="flex items-center gap-2 text-xs">
                <span className="w-28 sm:w-36 truncate font-medium text-foreground">{dim.name}</span>
                <div className="flex-1 flex items-center gap-1">
                  <span className={`font-mono font-bold w-8 text-right ${!tied && aLeads ? "text-primary" : "text-muted"}`}>
                    {scoreA}
                  </span>
                  <span className="text-muted">vs</span>
                  <span className={`font-mono font-bold w-8 ${!tied && !aLeads ? "text-primary" : "text-muted"}`}>
                    {scoreB}
                  </span>
                </div>
                <span className={`font-mono text-[10px] w-12 text-right ${tied ? "text-muted" : aLeads ? "text-primary" : "text-danger"}`}>
                  {tied ? "TIE" : `${diff > 0 ? "+" : ""}${diff.toFixed(1)}`}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* VERDICT */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
        <p className="text-xs font-bold uppercase tracking-wider text-primary mb-1">Verdict</p>
        <p className="text-sm text-foreground">{platformComparisons.find(c => c.a === a && c.b === b)?.verdict}</p>
      </div>
    </div>
  );
}

export default function ComparePage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <PageHeader
        badge="Comparative Research"
        title="Platform Comparisons"
        description="Click any question to see the 12-dimension breakdown, score comparison, and editorial assessment."
      />

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 border-b border-border pb-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              {platformComparisons.length} Comparisons
            </span>
            <p className="mt-1 text-sm text-muted">Click a question to expand the full comparison.</p>
          </div>
          <Link
            href="/compare/custom"
            className="inline-flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-bold text-primary hover:bg-primary/10 transition-colors shrink-0"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
            </svg>
            Compare Any Two Platforms
          </Link>
        </div>

        <div className="space-y-2">
          {platformComparisons.map((c, i) => {
            const allVendors = getAllVendors();
            const vA = allVendors.find((v) => v.slug === c.a)!;
            const vB = allVendors.find((v) => v.slug === c.b)!;
            const isOpen = openIndex === i;
            const aWins = vA.ascsComposite >= vB.ascsComposite;

            return (
              <div
                key={`${c.a}-vs-${c.b}`}
                className="rounded-xl border border-border bg-surface overflow-hidden transition-all hover:border-primary/30"
              >
                {/* QUESTION HEADER — clickable */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-black ${isOpen ? "bg-primary text-primary-foreground" : "bg-surface-alt border border-border text-muted"}`}>
                      {i + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-foreground truncate">{c.question}</p>
                      <p className="text-[10px] text-muted mt-0.5">
                        {vA.name} ({vA.ascsComposite}) vs {vB.name} ({vB.ascsComposite})
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {!isOpen && (
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${aWins ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"}`}>
                        {aWins ? vA.name : vB.name} leads
                      </span>
                    )}
                    <svg
                      className={`h-5 w-5 text-muted transition-transform ${isOpen ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </button>

                {/* EXPANDED CONTENT */}
                {isOpen && (
                  <div className="px-5 pb-5 pt-0 border-t border-border">
                    <ComparisonDetail a={c.a} b={c.b} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
