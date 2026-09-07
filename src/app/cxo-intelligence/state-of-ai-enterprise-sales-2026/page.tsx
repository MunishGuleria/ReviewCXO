import { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { DisclosureBanner } from "@/components/ui/DisclosureBanner";

export const metadata: Metadata = {
  title: "State of AI in Enterprise Sales 2026",
  description:
    "Original primary research based on interviews and surveys with 150+ enterprise decision-makers.",
  alternates: { canonical: "https://reviews-cxo.com/cxo-intelligence/state-of-ai-enterprise-sales-2026" },
  openGraph: {
    title: "State of AI in Enterprise Sales 2026",
    description: "Original primary research with 150+ enterprise decision-makers.",
    url: "https://reviews-cxo.com/cxo-intelligence/state-of-ai-enterprise-sales-2026",
    siteName: "Reviews_CXO",
    locale: "en_US",
    type: "article",
  },
};

export default function StateOfAIReportPage() {
  return (
    <>
      <PageHeader
        title="State of AI in Enterprise Sales 2026"
        badge="CXO Report"
        description="Original primary research based on interviews and surveys with enterprise decision-makers."
      />

      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="prose">
          <section>
            <div className="rounded-lg border border-border bg-surface-alt p-6 text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-muted">
                Coming Q4 2026
              </p>
              <p className="mt-2 text-lg font-bold text-foreground">
                Research in Progress
              </p>
              <p className="mt-2 text-sm text-muted">
                This report is currently being developed. We are conducting
                25–35 CXO interviews and distributing a survey to 150–250
                enterprise decision-makers.
              </p>
            </div>
          </section>

          <DisclosureBanner />

          <section>
            <h2>Research Design</h2>
            <h3>Target Respondents</h3>
            <ul>
              <li>
                <strong>Qualitative interviews:</strong> 25–35 CXOs / VPs /
                Directors
              </li>
              <li>
                <strong>Quantitative survey:</strong> 150–250 enterprise
                decision-makers (VP+ level)
              </li>
              <li>
                <strong>Minimum qualifying criteria:</strong> Company &gt; 200
                employees, annual revenue &gt; $10M, active in B2B sales
              </li>
            </ul>

            <h3>Interview Topics</h3>
            <ol>
              <li>Current state of CRM/ERP data integration</li>
              <li>AI adoption in sales workflow (stage, tools, results)</li>
              <li>ROI expectations vs. reality</li>
              <li>Security and governance concerns</li>
              <li>Change management challenges</li>
              <li>Trust in AI recommendations</li>
              <li>Preferred AI use cases (ranked)</li>
              <li>Implementation barriers (top 5)</li>
              <li>Vendor selection criteria</li>
              <li>Future investment plans (12-month horizon)</li>
            </ol>
          </section>

          <section>
            <h2>Non-Negotiable Rules</h2>
            <ul>
              <li>
                We do NOT fabricate interviews, respondents, percentages,
                quotes, or survey results.
              </li>
              <li>
                We do NOT combine real and invented data points.
              </li>
              <li>
                We do NOT round up sample sizes or misrepresent response
                rates.
              </li>
              <li>
                If sample size is &lt; 200, we explicitly state the margin of
                error and limitations.
              </li>
            </ul>
          </section>

          <section>
            <h2>How to Participate</h2>
            <p>
              If you are a VP+ enterprise leader involved in AI sales
              decisions, we invite you to participate. Contact us at{" "}
              <a href="mailto:research@reviews-cxo.com">
                research@reviews-cxo.com
              </a>{" "}
              for interview or survey participation.
            </p>
          </section>
        </div>
      </article>
    </>
  );
}
