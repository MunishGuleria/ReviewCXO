import { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { DisclosureBanner } from "@/components/ui/DisclosureBanner";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Reviews CXO — an independently operated research initiative focused on AI for enterprise sales.",
  alternates: { canonical: "https://reviewscxo.com/about" },
  openGraph: {
    title: "About Reviews CXO",
    description: "Research initiative focused on AI for enterprise sales.",
    url: "https://reviewscxo.com/about",
    siteName: "Reviews CXO",
    locale: "en_US",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        badge="Research Initiative"
        title="About Reviews CXO"
        description="A research hub where enterprise professionals evaluate AI sales platforms and implementation architectures."
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16">
        {/* Mission & Inflection Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Core Directive</span>
            <h2 className="mt-2 text-xl sm:text-2xl font-black text-foreground" style={{ letterSpacing: "-0.025em" }}>
              Our Mission
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Reviews CXO exists to address a gap in the enterprise AI landscape: research on AI platforms for sales that is transparent, structured, and editorially independent.
            </p>
            <p className="mt-3 text-base leading-relaxed text-muted">
              Reviews CXO is not a competitor-bashing site, review aggregator, or disguised product landing page. The publication aims to earn credibility through transparent methodology, structured benchmarks, and CXO-sourced intelligence.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-accent">Market Landscape</span>
            <h2 className="mt-2 text-xl sm:text-2xl font-black text-foreground" style={{ letterSpacing: "-0.025em" }}>
              Why Evidence Matters Now
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              The enterprise AI sales market is moving from pilot phases into multi-million dollar core system replacements. Procurement leaders need architectural assessments, not marketing claims.
            </p>
            <p className="mt-3 text-base leading-relaxed text-muted">
              With reported 80%+ of B2B evaluations factoring in autonomous execution depth and security postures, structured technical assessments are increasingly used as a reference point for procurement decisions.
            </p>
          </div>
        </div>

        {/* 4 Pillars of Our Approach */}
        <div>
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Pillars</span>
            <h2 className="mt-1 text-xl sm:text-2xl font-black text-foreground">Our Research Approach</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                title: "Transparent Rubric",
                desc: "Every score is calculated across 12 explicit, weighted dimensions—from ERP grounding to auditability.",
              },
              {
                step: "02",
                title: "Controlled Benchmarks",
                desc: "Synthetic test datasets, evaluation code, and environment specs are published and inspectable.",
              },
              {
                step: "03",
                title: "Strict Evidence Tiers",
                desc: "Every claim cites its tier: Observed, Documented, Third-Party Confirmed, or Inferred.",
              },
              {
                step: "04",
                title: "Editorial Firewalls",
                desc: "Sponsors do not control rankings, scores, methodology weights, or editorial decisions.",
              },
            ].map((pillar) => (
              <div key={pillar.step} className="card-hover rounded-2xl border border-border bg-surface p-6 shadow-sm">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 font-mono text-lg font-black text-primary">
                  {pillar.step}
                </span>
                <h3 className="mt-4 font-bold text-foreground">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Disclosure Banner */}
        <DisclosureBanner />

        {/* Policies Grid */}
        <div>
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Governance</span>
            <h2 className="mt-1 text-2xl font-black text-foreground">Editorial & Operational Policies</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Methodology", desc: "12-dimension rubric & evidence hierarchy", href: "/about/methodology" },
              { title: "Editorial Policy", desc: "Standards for editorial integrity & accuracy", href: "/about/editorial-policy" },
              { title: "Disclosure", desc: "Funding transparency & sponsor boundaries", href: "/about/disclosure" },
              { title: "Corrections", desc: "Protocol for dispute resolution & updates", href: "/about/corrections" },
            ].map((p) => (
              <Link
                key={p.title}
                href={p.href}
                className="card-hover group block rounded-xl border border-border bg-surface p-5 shadow-sm"
              >
                <h3 className="font-bold text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
                  {p.title}
                  <span className="text-xs text-primary font-mono transition-transform group-hover:translate-x-1">→</span>
                </h3>
                <p className="mt-1.5 text-xs text-muted leading-relaxed">{p.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
