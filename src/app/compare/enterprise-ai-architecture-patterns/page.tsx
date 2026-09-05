import { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { DisclosureBanner } from "@/components/ui/DisclosureBanner";
import Link from "next/link";

const metadata: Metadata = {
  title: "Enterprise AI Architecture Patterns Compared",
  description: "Embedded AI vs. Bolt-on AI vs. Platform AI — which fits your needs?",
};

export default function ArchitecturePatternsPage() {
  return (
    <>
      <PageHeader title="Enterprise AI Architecture Patterns Compared" badge="Comparison" description="Embedded AI vs. Bolt-on AI vs. Platform AI — which fits your needs?" />
      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="prose">
          <section>
            <h2>Quick Answer</h2>
            <p>Embedded AI (native to CRM/ERP) offers the deepest data access but limited flexibility. Bolt-on AI provides flexibility but requires integration work. Platform AI offers a middle ground with structured APIs and pre-built connectors.</p>
          </section>
          <DisclosureBanner />
          <section>
            <h2>Architecture Comparison</h2>
            <div className="not-prose overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-border"><th className="px-4 py-3 text-left font-semibold">Pattern</th><th className="px-4 py-3 text-left font-semibold">Data Access</th><th className="px-4 py-3 text-left font-semibold">Flexibility</th><th className="px-4 py-3 text-left font-semibold">Integration Effort</th></tr></thead>
                <tbody>
                  <tr className="border-b border-border"><td className="px-4 py-3 font-medium">Embedded AI</td><td className="px-4 py-3 text-success">Deep</td><td className="px-4 py-3 text-muted">Limited</td><td className="px-4 py-3 text-success">Low</td></tr>
                  <tr className="border-b border-border"><td className="px-4 py-3 font-medium">Bolt-on AI</td><td className="px-4 py-3 text-muted">Varies</td><td className="px-4 py-3 text-success">High</td><td className="px-4 py-3 text-muted">High</td></tr>
                  <tr className="border-b border-border"><td className="px-4 py-3 font-medium">Platform AI</td><td className="px-4 py-3">Good</td><td className="px-4 py-3">Moderate</td><td className="px-4 py-3">Moderate</td></tr>
                </tbody>
              </table>
            </div>
          </section>
          <section className="mt-8"><Link href="/compare" className="text-sm font-medium text-primary hover:underline">← Back to all comparisons</Link></section>
        </div>
      </article>
    </>
  );
}
