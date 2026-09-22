import { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ASCS_DIMENSIONS } from "@/lib/site";
import { getVisibleVendors } from "@/lib/vendors";
import Link from "next/link";
import { loadResearchFromMarkdown } from "@/lib/content-loader";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "ASCS Scorecard 2026",
  description:
    "Composite ASCS scores for all evaluated enterprise AI sales platforms.",
  alternates: { canonical: "https://reviewscxo.com/indexes/ascs-scorecard-2026" },
  openGraph: {
    title: "ASCS Scorecard 2026",
    description: "Composite ASCS scores for all evaluated platforms.",
    url: "https://reviewscxo.com/indexes/ascs-scorecard-2026",
    siteName: "Reviews CXO",
    locale: "en_US",
    type: "article",
  },
};

export default function ASCSScorecardPage() {
  const data = loadResearchFromMarkdown("ascs-scorecard-2026", "indexes");
  if (!data) return notFound();

  const vendorScores: any[] = data.bodyData.VENDOR_SCORES || [];
  const insights: any[] = data.bodyData.INSIGHTS || [];

  return (
    <>
      <PageHeader
        title={data.title}
        badge={data.badge}
        description={data.description}
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
                {vendorScores.map((v: any) => (
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
                    {v.scores.map((s: number, i: number) => (
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
            {insights.map((insight: any, i: number) => (
              <div key={i} className="rounded-xl border border-border bg-surface-alt/30 p-5">
                <span className="text-xs font-bold text-primary uppercase tracking-wider">{insight.category}</span>
                <h4 className="mt-1 font-bold text-foreground">{insight.title}</h4>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  {insight.description}
                </p>
              </div>
            ))}
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
