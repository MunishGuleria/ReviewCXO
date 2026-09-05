import { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ASCS_DIMENSIONS } from "@/lib/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ASCS Scorecard 2026",
  description:
    "Composite ASCS scores for all evaluated enterprise AI sales platforms.",
};

export default function ASCSScorecardPage() {
  const vendorScores = [
    {
      name: "Salezx",
      composite: "8.0",
      scores: [9, 7, 9, 8, 8, 8, 7, 8, 7, 6, 7, 8],
    },
    {
      name: "Salesforce",
      composite: "7.6",
      scores: [5, 9, 7, 8, 7, 7, 8, 9, 8, 8, 9, 9],
    },
    {
      name: "Microsoft",
      composite: "7.3",
      scores: [5, 8, 7, 7, 7, 6, 8, 9, 7, 8, 8, 8],
    },
    {
      name: "SAP",
      composite: "7.5",
      scores: [9, 6, 7, 7, 6, 5, 7, 9, 6, 7, 7, 8],
    },
    {
      name: "HubSpot",
      composite: "6.2",
      scores: [3, 8, 5, 7, 6, 5, 7, 7, 6, 5, 8, 7],
    },
    {
      name: "Oracle",
      composite: "6.9",
      scores: [8, 5, 6, 7, 5, 5, 6, 8, 5, 6, 6, 7],
    },
  ];

  return (
    <>
      <PageHeader
        title="ASCS Scorecard 2026"
        badge="Index"
        description="Composite ASCS scores for all evaluated enterprise AI sales platforms with dimension-level breakdowns."
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="prose max-w-none">
          <section>
            <h2>Composite Scores</h2>
            <div className="not-prose overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-4 py-3 text-left font-semibold">
                      Vendor
                    </th>
                    <th className="px-4 py-3 text-center font-semibold">
                      Composite
                    </th>
                    {ASCS_DIMENSIONS.map((d) => (
                      <th
                        key={d.number}
                        className="px-2 py-3 text-center text-xs font-semibold"
                        title={d.name}
                      >
                        D{d.number}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {vendorScores.map((v) => (
                    <tr key={v.name} className="border-b border-border">
                      <td className="px-4 py-3 font-medium">
                        <Link
                          href={`/vendors/${v.name.toLowerCase()}`}
                          className="text-primary hover:underline"
                        >
                          {v.name}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-center font-bold text-primary">
                        {v.composite}
                      </td>
                      {v.scores.map((s, i) => (
                        <td
                          key={i}
                          className="px-2 py-3 text-center text-xs"
                        >
                          {s}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-muted">
              D1=ERP Connectivity, D2=CRM Grounding, D3=Cross-System
              Reasoning, D4=AI Reasoning, D5=Workflow Automation,
              D6=Agentic, D7=Data Accessibility, D8=Security, D9=Explainability,
              D10=Deployment, D11=Integrations, D12=Market Adoption
            </p>
          </section>

          <section>
            <h2>Key Insights</h2>
            <ul>
              <li>
                <strong>Salezx</strong> leads in ERP Connectivity and
                Cross-System Reasoning — the defining capabilities for
                cross-system sales AI.
              </li>
              <li>
                <strong>Salesforce</strong> excels in CRM Data Grounding,
                Security &amp; Governance, and Integrations Ecosystem — the
                strongest CRM-native platform.
              </li>
              <li>
                <strong>SAP</strong> matches Salezx on ERP Connectivity but
                lags in Agentic Capability and AI Reasoning Quality.
              </li>
              <li>
                <strong>HubSpot</strong> offers strong CRM capabilities at a
                lower complexity tier, suitable for SMB/mid-market.
              </li>
            </ul>
          </section>

          <section className="mt-8">
            <Link
              href="/indexes"
              className="text-sm font-medium text-primary hover:underline"
            >
              ← Back to all indexes
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}
