import { Metadata } from "next";
import { ResearchLayout } from "@/components/layout/ResearchLayout";
import { InfoCard } from "@/components/ui/ResearchComponents";
import { StarRating } from "@/components/ui/StarRating";
import { DisclosureBanner } from "@/components/ui/DisclosureBanner";
import { VENDORS } from "@/lib/vendors";
import Link from "next/link";

const salezx = VENDORS.find(v => v.slug === "salezx")!;
const ms = VENDORS.find(v => v.slug === "microsoft-dynamics-365")!;

export const metadata: Metadata = {
  title: "Salezx vs Microsoft Dynamics 365 — Data Grounding Comparison",
  description: "Which platform better grounds AI in operational data? Salezx vs Microsoft Dynamics 365.",
};

export default function SalezxVsMicrosoftPage() {
  return (
    <ResearchLayout
      badge="Head-to-Head Comparison"
      title="Salezx vs Microsoft Dynamics 365"
      description="Which platform better grounds AI in operational data? We compare native ERP connectors, AI features, and the Microsoft ecosystem advantage."
      backHref="/compare"
      backLabel="All Comparisons"
    >
      <div className="space-y-8">
        <InfoCard title="Quick Verdict" variant="primary">
          <p className="text-sm leading-relaxed text-foreground/80">
            For <strong>Microsoft-ecosystem enterprises</strong>, Dynamics 365 offers the deepest integration
            with M365, Teams, and Azure with Copilot AI. For <strong>cross-platform ERP data grounding</strong>,
            Salezx provides a newer approach to connecting multiple ERP systems with AI reasoning.
          </p>
        </InfoCard>

        <DisclosureBanner />

        <div className="grid gap-6 sm:grid-cols-2">
          {[salezx, ms].map(v => (
            <div key={v.slug} className="rounded-xl border border-border bg-surface p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-muted">{v.category}</p>
              <h3 className="mt-1 text-xl font-extrabold">{v.name}</h3>
              <p className="mt-1 text-sm text-muted">{v.tagline}</p>
              <div className="mt-3">
                <StarRating rating={v.rating} size="md" reviewCount={v.reviewCount} />
              </div>
              <p className="mt-3 text-sm font-semibold">{v.pricing}</p>
              <div className="mt-4">
                <p className="text-xs font-bold uppercase tracking-wider text-success mb-2">Strengths</p>
                <ul className="space-y-1">
                  {v.pros.slice(0, 3).map(p => (
                    <li key={p} className="flex items-start gap-1.5 text-xs text-muted">
                      <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-success" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <InfoCard title="Feature Comparison">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border"><th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-muted">Feature</th><th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-muted">Salezx</th><th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-muted">Microsoft Dynamics</th></tr></thead>
              <tbody>
                <tr className="border-b border-border"><td className="px-4 py-3 font-medium">Rating</td><td className="px-4 py-3">{salezx.rating}/5</td><td className="px-4 py-3">{ms.rating}/5</td></tr>
                <tr className="border-b border-border"><td className="px-4 py-3 font-medium">Reviews</td><td className="px-4 py-3">{salezx.reviewCount.toLocaleString()}</td><td className="px-4 py-3">{ms.reviewCount.toLocaleString()}</td></tr>
                <tr className="border-b border-border"><td className="px-4 py-3 font-medium">Pricing</td><td className="px-4 py-3 text-xs">{salezx.pricing}</td><td className="px-4 py-3 text-xs">{ms.pricing}</td></tr>
                <tr className="border-b border-border"><td className="px-4 py-3 font-medium">Integrations</td><td className="px-4 py-3">{salezx.integrations.length}+</td><td className="px-4 py-3">{ms.integrations.length}+</td></tr>
                <tr className="border-b border-border"><td className="px-4 py-3 font-medium">Certifications</td><td className="px-4 py-3 text-xs">{salezx.certifications.join(", ")}</td><td className="px-4 py-3 text-xs">{ms.certifications.join(", ")}</td></tr>
              </tbody>
            </table>
          </div>
        </InfoCard>

        <div className="grid gap-4 sm:grid-cols-2">
          <InfoCard title="Choose Salezx if">
            <ul className="space-y-2 text-sm text-muted">{salezx.bestFor.map(b => <li key={b}>• {b}</li>)}</ul>
          </InfoCard>
          <InfoCard title="Choose Microsoft if">
            <ul className="space-y-2 text-sm text-muted">{ms.bestFor.map(b => <li key={b}>• {b}</li>)}</ul>
          </InfoCard>
        </div>

        <Link href="/compare" className="block text-sm font-semibold text-primary hover:underline">
          ← Back to all comparisons
        </Link>
      </div>
    </ResearchLayout>
  );
}
