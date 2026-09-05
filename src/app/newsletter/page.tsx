import { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { NewsletterForm } from "@/components/ui/NewsletterForm";

export const metadata: Metadata = {
  title: "Newsletter",
  description: "Get new research delivered to your inbox.",
};

export default function NewsletterPage() {
  return (
    <>
      <PageHeader
        title="Newsletter"
        description="Get new research, benchmarks, and CXO insights delivered to your inbox."
      />
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="prose">
          <section>
            <h2>Subscribe to Reviews_CXO</h2>
            <p>
              We publish research-only content — benchmarks, architecture
              analysis, and CXO insights on AI for enterprise sales. No
              spam, no marketing fluff.
            </p>
            <ul>
              <li>New benchmark reports</li>
              <li>ASCS scorecard updates</li>
              <li>CXO intelligence findings</li>
              <li>Comparison analyses</li>
            </ul>
            <div className="mt-8 not-prose">
              <NewsletterForm buttonText="Subscribe to Research Dispatch" />
            </div>
            <p className="mt-4 text-xs text-muted text-center">
              No spam. Research-only publications. Unsubscribe anytime.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
