import { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { NewsletterForm } from "@/components/ui/NewsletterForm";

export const metadata: Metadata = {
  title: "Newsletter",
  description: "Get new research delivered to your inbox.",
  alternates: { canonical: "https://reviews-cxo.com/newsletter" },
  openGraph: {
    title: "Reviews_CXO Newsletter",
    description: "Get new AI enterprise sales research delivered to your inbox.",
    url: "https://reviews-cxo.com/newsletter",
    siteName: "Reviews_CXO",
    locale: "en_US",
    type: "website",
  },
};

export default function NewsletterPage() {
  return (
    <>
      <PageHeader
        title="Newsletter"
        description="Get new research, benchmarks, and CXO insights delivered to your inbox."
      />
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="card-premium p-8 sm:p-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Subscribe to Reviews_CXO
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground mb-6">
            We publish research-only content — benchmarks, architecture
            analysis, and CXO insights on AI for enterprise sales. No
            spam, no marketing content.
          </p>
          
          <ul className="space-y-3 mb-8">
            {[
              "New benchmark reports",
              "ASCS scorecard updates",
              "CXO intelligence findings",
              "Comparison analyses"
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <svg className="h-5 w-5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="text-sm font-medium text-secondary-foreground">{item}</span>
              </li>
            ))}
          </ul>
          
          <div className="pt-6 border-t border-border">
            <NewsletterForm buttonText="Subscribe to Research Dispatch" />
            <p className="mt-5 text-xs font-medium text-muted-foreground text-center">
              No spam. Research-only publications. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
