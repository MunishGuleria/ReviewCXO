import { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { DisclosureBanner } from "@/components/ui/DisclosureBanner";
import Link from "next/link";

const metadata: Metadata = {
  title: "AI Sales Platforms: On-Prem vs Cloud vs Hybrid",
  description: "What deployment model fits your requirements?",
};

export default function DeploymentComparisonPage() {
  return (
    <>
      <PageHeader title="AI Sales Platforms: On-Prem vs Cloud vs Hybrid" badge="Comparison" description="What deployment model fits your requirements?" />
      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="prose">
          <section>
            <h2>Quick Answer</h2>
            <p>Cloud deployment offers the fastest time-to-value and lowest operational overhead. On-prem provides maximum data control. Hybrid offers a balance for enterprises with regulatory or data residency requirements.</p>
          </section>
          <DisclosureBanner />
          <section>
            <h2>Deployment Model Comparison</h2>
            <div className="not-prose overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-border"><th className="px-4 py-3 text-left font-semibold">Model</th><th className="px-4 py-3 text-left font-semibold">Data Control</th><th className="px-4 py-3 text-left font-semibold">Time to Value</th><th className="px-4 py-3 text-left font-semibold">Operational Cost</th></tr></thead>
                <tbody>
                  <tr className="border-b border-border"><td className="px-4 py-3 font-medium">Cloud</td><td className="px-4 py-3 text-muted">Vendor-managed</td><td className="px-4 py-3 text-success">Fast</td><td className="px-4 py-3 text-success">Lower</td></tr>
                  <tr className="border-b border-border"><td className="px-4 py-3 font-medium">On-Prem</td><td className="px-4 py-3 text-success">Full control</td><td className="px-4 py-3 text-muted">Slow</td><td className="px-4 py-3 text-muted">Higher</td></tr>
                  <tr className="border-b border-border"><td className="px-4 py-3 font-medium">Hybrid</td><td className="px-4 py-3">Partial control</td><td className="px-4 py-3">Moderate</td><td className="px-4 py-3">Moderate</td></tr>
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
