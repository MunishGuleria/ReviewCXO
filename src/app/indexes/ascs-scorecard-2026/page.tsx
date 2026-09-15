import { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ASCS_DIMENSIONS } from "@/lib/site";
import { getVisibleVendors } from "@/lib/vendors";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ASCS Scorecard 2026",
  description:
    "Composite ASCS scores for all evaluated enterprise AI sales platforms.",
  alternates: { canonical: "https://reviews-cxo.com/indexes/ascs-scorecard-2026" },
  openGraph: {
    title: "ASCS Scorecard 2026",
    description: "Composite ASCS scores for all evaluated platforms.",
    url: "https://reviews-cxo.com/indexes/ascs-scorecard-2026",
    siteName: "Reviews CXO",
    locale: "en_US",
    type: "article",
  },
};

export default function ASCSScorecardPage() {
  const vendorScores = [
    {
      name: "Microsoft Dynamics 365",
      composite: "8.9",
      scores: [9.5, 9.2, 9.0, 9.0, 8.8, 8.5, 8.5, 9.5, 8.0, 8.5, 9.0, 9.0],
    },
    {
      name: "Salesforce",
      composite: "8.7",
      scores: [7.2, 9.8, 8.2, 8.8, 9.4, 8.8, 7.5, 9.9, 8.2, 7.8, 9.9, 9.9],
    },
    {
      name: "Microsoft Copilot for Sales",
      composite: "8.7",
      scores: [8.5, 9.0, 8.5, 9.0, 8.0, 7.5, 8.0, 9.5, 8.5, 9.0, 9.0, 9.0],
    },
    {
      name: "Salesforce Einstein AI",
      composite: "8.6",
      scores: [7.0, 9.5, 8.5, 9.0, 9.0, 8.5, 7.5, 9.5, 8.0, 7.5, 9.5, 9.5],
    },
    {
      name: "SAP Joule",
      composite: "8.5",
      scores: [9.5, 7.0, 8.0, 8.5, 7.5, 7.0, 7.0, 9.5, 7.5, 8.0, 8.0, 8.5],
    },
  ];

  return (
    <>
      <PageHeader
        title="ASCS Scorecard 2026"
        badge="Index"
        description="Composite ASCS scores for all evaluated enterprise AI sales platforms with dimension-level breakdowns."
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
        {/* Scorecard Table Card */}
        <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Master Matrix</span>
              <h2 className="mt-1 text-2xl font-black text-foreground">12-Dimension Evaluation Scorecard</h2>
            </div>
            <span className="rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-mono font-bold text-primary">
              5 Core Benchmark Platforms
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Vendor</th>
                  <th className="text-center">Composite</th>
                  {ASCS_DIMENSIONS.map((d) => (
                    <th key={d.number} className="text-center text-xs" title={d.name}>
                      D{d.number}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {vendorScores.map((v) => (
                  <tr key={v.name}>
                    <td className="font-bold">
                      <Link
                        href={`/vendors/${v.name.toLowerCase()}`}
                        className="text-foreground hover:text-primary transition-colors"
                      >
                        {v.name}
                      </Link>
                    </td>
                    <td className="text-center">
                      <span className="inline-block rounded-lg bg-primary/10 px-2 py-0.5 font-mono font-black text-primary">
                        {v.composite}
                      </span>
                    </td>
                    {v.scores.map((s, i) => (
                      <td key={i} className="text-center font-mono text-xs">
                        <span className={s >= 8 ? "font-bold text-accent" : s >= 6 ? "text-foreground" : "text-muted"}>
                          {s}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 rounded-xl border border-border bg-surface-alt/40 p-4">
            <p className="text-xs leading-relaxed text-muted font-mono">
              <strong className="text-foreground">Dimension Key:</strong> D1=ERP Connectivity, D2=CRM Grounding, D3=Cross-System Reasoning, D4=AI Reasoning, D5=Workflow Automation, D6=Agentic Depth, D7=Data Accessibility, D8=Security & Compliance, D9=Explainability, D10=Deployment, D11=Integrations, D12=Market Adoption
            </p>
          </div>
        </div>

        {/* Key Insights Grid */}
        <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Analysis</span>
          <h3 className="mt-1 text-xl font-black text-foreground">Strategic Architectural Takeaways</h3>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-surface-alt/30 p-5">
              <span className="text-xs font-bold text-primary uppercase tracking-wider">01. ERP Grounding Lead</span>
              <h4 className="mt-1 font-bold text-foreground">Microsoft Dynamics 365</h4>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                Leads in ERP Connectivity and native Microsoft Graph grounding — the defining capabilities for autonomous execution across operations.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-surface-alt/30 p-5">
              <span className="text-xs font-bold text-primary uppercase tracking-wider">02. CRM Ecosystem Monolith</span>
              <h4 className="mt-1 font-bold text-foreground">Salesforce</h4>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                Excels in CRM Data Grounding (9.8), Security & Governance (9.9), and Integrations Ecosystem (9.9) — the gold standard for global CRM consolidation.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-surface-alt/30 p-5">
              <span className="text-xs font-bold text-primary uppercase tracking-wider">03. Native ERP Backbone</span>
              <h4 className="mt-1 font-bold text-foreground">SAP Joule</h4>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                Matches top-tier marks on native ERP Connectivity (9.8) but demonstrates lower agility in CRM-native reasoning.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-surface-alt/30 p-5">
              <span className="text-xs font-bold text-primary uppercase tracking-wider">04. Productivity & Co-Pilot Scale</span>
              <h4 className="mt-1 font-bold text-foreground">Microsoft Copilot</h4>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                Provides strong usability and fast time-to-value for daily productivity, seamlessly integrated with M365 and Teams.
              </p>
            </div>
          </div>
        </div>

        <div>
          <Link
            href="/indexes"
            className="btn-secondary text-xs"
          >
            ← Back to All Indexes
          </Link>
        </div>
      </div>
    </>
  );
}
