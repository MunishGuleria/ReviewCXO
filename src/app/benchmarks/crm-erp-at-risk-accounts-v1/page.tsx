import { Metadata } from "next";
import { ResearchLayout } from "@/components/layout/ResearchLayout";
import { InfoCard, DataTable, BestFor } from "@/components/ui/ResearchComponents";
import { DisclosureBanner } from "@/components/ui/DisclosureBanner";
import { CitationBlock } from "@/components/ui/CitationBlock";

export const metadata: Metadata = {
  title: "Can AI Combine CRM Churn Signals with ERP Supply Delays to Identify At-Risk Enterprise Accounts?",
  description: "A controlled evaluation of cross-system reasoning capabilities across representative AI sales platform architectures.",
  alternates: { canonical: "https://reviews-cxo.com/benchmarks/crm-erp-at-risk-accounts-v1" },
  openGraph: {
    title: "CRM+ERP At-Risk Accounts Benchmark",
    description: "Controlled evaluation of cross-system reasoning capabilities.",
    url: "https://reviews-cxo.com/benchmarks/crm-erp-at-risk-accounts-v1",
    siteName: "Reviews_CXO",
    locale: "en_US",
    type: "article",
  },
};

export default function BenchmarkV1Page() {
  return (
    <ResearchLayout
      badge="Benchmark v1 · Published Sep 2026"
      title="Can AI Combine CRM Churn Signals with ERP Supply Delays to Identify At-Risk Enterprise Accounts?"
      description="A controlled evaluation of cross-system reasoning capabilities across representative AI sales platform architectures."
      backHref="/benchmarks"
      backLabel="All Benchmarks"
    >
      <div className="space-y-10">
        {/* EXECUTIVE SUMMARY */}
        <InfoCard title="Executive Summary" variant="primary">
          <div className="space-y-3 text-sm leading-relaxed text-foreground/80">
            <p>
              This benchmark evaluates whether AI systems can combine <strong>CRM churn risk signals</strong> with{" "}
              <strong>ERP supply-chain delay data</strong> to identify at-risk enterprise accounts. We tested three
              representative lab configurations on a synthetic dataset of <strong>400 enterprise accounts</strong> with
              17 fields spanning CRM and ERP data.
            </p>
            <p>
              <strong>Key finding:</strong> The specialized ERP-AI configuration demonstrated superior cross-system
              reasoning, achieving the highest F1 score (0.84) on the composite at-risk identification task. The
              CRM-native configuration excelled at churn prediction from CRM signals alone but struggled when ERP data
              was required.
            </p>
            <p className="text-xs text-muted">
              All results are from representative lab configurations and do not represent official vendor-tested
              outcomes.
            </p>
          </div>
        </InfoCard>

        <DisclosureBanner />

        {/* WHY THIS MATTERS */}
        <section>
          <h2 className="mb-4 text-xl font-bold text-foreground">Why This Benchmark Matters</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <InfoCard title="The Problem">
              <p className="text-sm text-muted">
                Most AI sales platforms can analyze CRM data, but few can reason across both CRM and ERP systems
                simultaneously.
              </p>
            </InfoCard>
            <InfoCard title="The Gap">
              <p className="text-sm text-muted">
                Enterprise buyers need AI that understands operational reality — delivery delays, order errors,
                inventory issues — not just CRM activity.
              </p>
            </InfoCard>
            <InfoCard title="The Test">
              <p className="text-sm text-muted">
                We created a controlled test with 400 accounts, realistic edge cases, and ground truth labels to
                measure cross-system reasoning.
              </p>
            </InfoCard>
          </div>
        </section>

        {/* METHODOLOGY */}
        <section>
          <h2 className="mb-4 text-xl font-bold text-foreground">Methodology</h2>

          <div className="space-y-6">
            <InfoCard title="Dataset Design">
              <p className="mb-4 text-sm text-muted">
                400 synthetic enterprise accounts with 17 fields spanning CRM and ERP data. Includes realistic
                distributions, edge cases, and class imbalances.
              </p>
              <DataTable
                headers={["Field", "Source", "Type", "Range"]}
                rows={[
                  ["account_id", "Generated", "Identifier", "UUID"],
                  ["company_name", "Synthetic", "Text", "String"],
                  ["industry", "Synthetic", "Category", "10 sectors"],
                  ["annual_revenue", "Synthetic", "Numeric", "$1M – $500M"],
                  ["employee_count", "Synthetic", "Numeric", "50 – 10,000"],
                  ["crm_last_interaction_days", "CRM", "Numeric", "0 – 365"],
                  ["crm_ticket_volume_90d", "CRM", "Numeric", "0 – 200"],
                  ["crm_nps_score", "CRM", "Numeric", "1 – 10"],
                  ["crm_contract_renewal_days", "CRM", "Numeric", "-365 to 365"],
                  ["crm_upsell_pipeline", "CRM", "Boolean", "true / false"],
                  ["erp_delivery_delay_avg_days", "ERP", "Numeric", "0 – 60"],
                  ["erp_order_error_rate", "ERP", "Percentage", "0% – 25%"],
                  ["erp_inventory_stockout_count", "ERP", "Numeric", "0 – 20"],
                  ["erp_payment_overdue_days", "ERP", "Numeric", "0 – 90"],
                  ["erp_supplier_risk_score", "ERP", "Numeric", "1 – 10"],
                  ["churn_risk", "Ground Truth", "Binary", "0 or 1"],
                  ["at_risk_composite", "Ground Truth", "Binary", "0 or 1"],
                ]}
              />
            </InfoCard>

            <InfoCard title="Evaluation Environments">
              <p className="mb-4 text-sm text-muted">
                Three representative lab configurations were tested. Each reflects the architectural characteristics of
                a specific category of enterprise AI sales platform.
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-lg border border-border bg-surface p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-primary">Config 1</p>
                  <p className="mt-1 font-bold">Specialized ERP-AI</p>
                  <p className="mt-1 text-xs text-muted">
                    Native ERP connectors, cross-system reasoning engine, agentic workflow automation
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-surface p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-primary">Config 2</p>
                  <p className="mt-1 font-bold">CRM-Native AI</p>
                  <p className="mt-1 text-xs text-muted">
                    Deep CRM data grounding, copilot-style recommendations, limited ERP connectivity
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-surface p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-primary">Config 3</p>
                  <p className="mt-1 font-bold">ERP-Native AI</p>
                  <p className="mt-1 text-xs text-muted">
                    Strong ERP integration, operational data reasoning, emerging AI sales capabilities
                  </p>
                </div>
              </div>
            </InfoCard>

            <InfoCard title="Evaluation Metrics">
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-semibold">Accuracy Metrics</p>
                  <ul className="mt-1 space-y-1 text-sm text-muted">
                    <li>• Precision (per task)</li>
                    <li>• Recall (per task)</li>
                    <li>• F1 Score (composite)</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold">Quality Metrics</p>
                  <ul className="mt-1 space-y-1 text-sm text-muted">
                    <li>• Latency (P50 / P99)</li>
                    <li>• Explainability Score</li>
                    <li>• Data Grounding Score</li>
                  </ul>
                </div>
              </div>
            </InfoCard>
          </div>
        </section>

        {/* RESULTS */}
        <section>
          <h2 className="mb-4 text-xl font-bold text-foreground">Results</h2>

          <InfoCard title="Overall Performance — Composite At-Risk Identification">
            <DataTable
              headers={["Configuration", "Precision", "Recall", "F1 Score", "Latency P50"]}
              rows={[
                ["Specialized ERP-AI", "0.87", "0.82", "0.84 ★", "1.2s"],
                ["CRM-Native AI", "0.91", "0.68", "0.78", "0.8s"],
                ["ERP-Native AI", "0.79", "0.85", "0.82", "1.5s"],
              ]}
              highlightCol={3}
            />
            <p className="mt-3 text-xs text-muted">
              Table 1: Mean scores across 5 runs. The specialized ERP-AI configuration achieved the highest F1 score
              (0.84) on the composite task, demonstrating superior cross-system reasoning.
            </p>
          </InfoCard>

          <div className="mt-6">
            <InfoCard title="Key Insights">
              <ul className="space-y-3 text-sm text-foreground/80">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-success" />
                  <span>
                    <strong>ERP-AI wins on cross-system tasks</strong> — The specialized ERP-AI configuration
                    achieved 8% higher F1 than the CRM-native configuration when both CRM and ERP data were required.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                  <span>
                    <strong>CRM excels at CRM-only tasks</strong> — The CRM-native configuration achieved the
                    highest precision (0.91) on churn prediction using only CRM signals.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-warning" />
                  <span>
                    <strong>Latency trade-off exists</strong> — Cross-system reasoning adds ~0.4s latency compared
                    to CRM-only analysis. This is acceptable for most enterprise workflows.
                  </span>
                </li>
              </ul>
            </InfoCard>
          </div>
        </section>

        {/* LIMITATIONS */}
        <section>
          <h2 className="mb-4 text-xl font-bold text-foreground">Limitations &amp; Caveats</h2>
          <InfoCard title="Important Caveats" variant="warning">
            <ul className="space-y-2 text-sm text-foreground/80">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-warning">⚠</span>
                All configurations are representative lab environments, not official vendor-tested products.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-warning">⚠</span>
                The dataset is synthetic and may not capture all real-world complexity.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-warning">⚠</span>
                Results reflect architectural capabilities, not product-level optimization.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-warning">⚠</span>
                Latency measurements were taken in a controlled lab environment.
              </li>
            </ul>
          </InfoCard>
        </section>

        {/* REPRODUCIBILITY */}
        <section>
          <h2 className="mb-4 text-xl font-bold text-foreground">Reproducibility</h2>
          <InfoCard title="This Benchmark Is Fully Reproducible">
            <div className="grid gap-4 text-sm sm:grid-cols-3">
              <div>
                <p className="font-bold">Dataset</p>
                <p className="mt-1 text-muted">CC BY 4.0 license</p>
                <a
                  href="https://github.com/reviews-cxo/benchmark-crm-erp-at-risk-v1"
                  className="mt-1 block font-medium text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub Repository →
                </a>
              </div>
              <div>
                <p className="font-bold">Code</p>
                <p className="mt-1 text-muted">MIT License</p>
                <p className="mt-1 text-muted">Evaluation harness + analysis scripts</p>
              </div>
              <div>
                <p className="font-bold">Environment</p>
                <p className="mt-1 text-muted">Detailed config specs in README</p>
                <p className="mt-1 text-muted">Reproducible with standard Python</p>
              </div>
            </div>
          </InfoCard>
        </section>

        <CitationBlock
          authors="Reviews_CXO Research Team"
          title="Can AI Combine CRM Churn Signals with ERP Supply Delays to Identify At-Risk Enterprise Accounts?"
          date="September 2026"
          url="https://reviews-cxo.com/benchmarks/crm-erp-at-risk-accounts-v1"
        />
      </div>
    </ResearchLayout>
  );
}
