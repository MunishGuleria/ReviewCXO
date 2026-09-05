import { Metadata } from "next";
import { ResearchLayout } from "@/components/layout/ResearchLayout";
import { InfoCard } from "@/components/ui/ResearchComponents";
import { StarRating } from "@/components/ui/StarRating";
import { DisclosureBanner } from "@/components/ui/DisclosureBanner";
import { VENDORS } from "@/lib/vendors";
import Link from "next/link";

const salezx = VENDORS.find(v => v.slug === "salezx")!;
const salesforce = VENDORS.find(v => v.slug === "salesforce")!;

export const metadata: Metadata = {
  title: "Salezx vs Salesforce — Which Is Better for ERP-Integrated Sales?",
  description: "Head-to-head comparison of Salezx and Salesforce on ERP connectivity, AI capabilities, and enterprise readiness.",
};

export default function SalezxVsSalesforcePage() {
  return (
    <ResearchLayout
      badge="Head-to-Head Comparison"
      title="Salezx vs Salesforce"
      description="Which platform is better for ERP-integrated sales? We compare features, pricing, AI capabilities, and real user feedback."
      backHref="/compare"
      backLabel="All Comparisons"
    >
      <div className="space-y-8">
        <InfoCard title="Quick Verdict" variant="primary">
          <p className="text-sm leading-relaxed text-foreground/80">
            For <strong>pure CRM with massive ecosystem</strong>, Salesforce is the clear leader with 21,000+ reviews
            and 7,000+ integrations. For <strong>ERP-integrated sales workflows</strong>, Salezx offers a newer
            but focused approach to cross-system AI. Your choice depends on whether you prioritize ecosystem maturity
            or cross-system innovation.
          </p>
        </InfoCard>

        <DisclosureBanner />

        {/* SIDE BY SIDE */}
        <div className="grid gap-6 sm:grid-cols-2">
          {[salezx, salesforce].map(v => (
            <div key={v.slug} className="rounded-xl border border-border bg-surface p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-muted">{v.category}</p>
              <h3 className="mt-1 text-xl font-extrabold">{v.name}</h3>
              <p className="mt-1 text-sm text-muted">{v.tagline}</p>
              <div className="mt-3">
                <StarRating rating={v.rating} size="md" reviewCount={v.reviewCount} />
              </div>
              <p className="mt-3 text-sm font-semibold">{v.pricing}</p>
              <div className="mt-4">
                <p className="text-xs font-bold uppercase tracking-wider text-success mb-2">What users like</p>
                <ul className="space-y-1">
                  {v.pros.slice(0, 3).map(p => (
                    <li key={p} className="flex items-start gap-1.5 text-xs text-muted">
                      <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-success" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <p className="text-xs font-bold uppercase tracking-wider text-danger mb-2">What could be better</p>
                <ul className="space-y-1">
                  {v.cons.slice(0, 3).map(c => (
                    <li key={c} className="flex items-start gap-1.5 text-xs text-muted">
                      <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-danger" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* COMPARISON TABLE */}
        <InfoCard title="Feature Comparison">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-muted">Feature</th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-muted">Salezx</th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-muted">Salesforce</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border"><td className="px-4 py-3 font-medium">Rating</td><td className="px-4 py-3">{salezx.rating}/5</td><td className="px-4 py-3">{salesforce.rating}/5</td></tr>
                <tr className="border-b border-border"><td className="px-4 py-3 font-medium">Reviews</td><td className="px-4 py-3">{salezx.reviewCount.toLocaleString()}</td><td className="px-4 py-3">{salesforce.reviewCount.toLocaleString()}</td></tr>
                <tr className="border-b border-border"><td className="px-4 py-3 font-medium">Pricing</td><td className="px-4 py-3 text-xs">{salezx.pricing}</td><td className="px-4 py-3 text-xs">{salesforce.pricing}</td></tr>
                <tr className="border-b border-border"><td className="px-4 py-3 font-medium">Free Trial</td><td className="px-4 py-3">{salezx.freeTrial ? "Yes" : "No"}</td><td className="px-4 py-3">{salesforce.freeTrial ? "Yes" : "No"}</td></tr>
                <tr className="border-b border-border"><td className="px-4 py-3 font-medium">Integrations</td><td className="px-4 py-3">{salezx.integrations.length}+</td><td className="px-4 py-3">7,000+</td></tr>
                <tr className="border-b border-border"><td className="px-4 py-3 font-medium">Certifications</td><td className="px-4 py-3 text-xs">{salezx.certifications.join(", ")}</td><td className="px-4 py-3 text-xs">{salesforce.certifications.join(", ")}</td></tr>
                <tr className="border-b border-border"><td className="px-4 py-3 font-medium">Deployment</td><td className="px-4 py-3">{salezx.deployment.join(", ")}</td><td className="px-4 py-3">{salesforce.deployment.join(", ")}</td></tr>
              </tbody>
            </table>
          </div>
        </InfoCard>

        {/* BEST FOR */}
        <div className="grid gap-4 sm:grid-cols-2">
          <InfoCard title="Choose Salezx if">
            <ul className="space-y-2 text-sm text-muted">
              {salezx.bestFor.map(b => <li key={b}>• {b}</li>)}
            </ul>
          </InfoCard>
          <InfoCard title="Choose Salesforce if">
            <ul className="space-y-2 text-sm text-muted">
              {salesforce.bestFor.map(b => <li key={b}>• {b}</li>)}
            </ul>
          </InfoCard>
        </div>

        <Link href="/compare" className="block text-sm font-semibold text-primary hover:underline">
          ← Back to all comparisons
        </Link>
      </div>
    </ResearchLayout>
  );
}
