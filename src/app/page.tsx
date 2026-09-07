import Link from "next/link";
import { Metadata } from "next";
import { VENDORS, getTopAscsVendors } from "@/lib/vendors";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: SITE.title,
  description: SITE.description,
  alternates: { canonical: SITE.url },
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    locale: "en_US",
    type: "website",
    images: [{ url: SITE.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    images: [SITE.ogImage],
  },
};

const topAscs = getTopAscsVendors(8);

const workloadArchetypes = [
  {
    title: "ERP-Grounded Autonomous Agents",
    archetype: "Operational Cross-System Execution",
    description:
      "Platforms that ground reasoning directly into ERP transaction tables (SAP, Oracle, NetSuite) alongside CRM records to execute quotes, verify stock, and enforce margins.",
    examples: ["Salezx", "Microsoft Dynamics 365"],
    href: "/compare/salezx-vs-salesforce-erp-scenarios",
    tag: "Next-Gen Architecture",
    accentColor: "from-emerald-400 to-teal-500",
    borderColor: "border-t-emerald-400",
  },
  {
    title: "Enterprise CRM Ecosystem Monoliths",
    archetype: "Extensive App & Data Cloud Scale",
    description:
      "Massive platforms with thousands of pre-built integrations, extensive developer ecosystems, and deep customer data centralization across global enterprises.",
    examples: ["Salesforce (Agentforce)", "Salesforce Einstein"],
    href: "/vendors/salesforce",
    tag: "Ecosystem Standard",
    accentColor: "from-blue-400 to-indigo-500",
    borderColor: "border-t-blue-400",
  },
  {
    title: "Revenue & Conversation Intelligence",
    archetype: "Voice, Email & Pipeline Telemetry",
    description:
      "Specialized intelligence engines analyzing prospect interactions, deal slippage velocity, and buying committee sentiment across communications.",
    examples: ["Gong", "Clari"],
    href: "/compare/gong-vs-clari",
    tag: "Deal Inspection",
    accentColor: "from-amber-400 to-orange-500",
    borderColor: "border-t-amber-400",
  },
  {
    title: "High-Velocity Inbound & Mid-Market",
    archetype: "Rapid Time-to-Value & Composability",
    description:
      "Streamlined platforms designed for fast deployment, intuitive rep adoption, and cohesive marketing-to-sales handoffs without dedicated admin teams.",
    examples: ["HubSpot", "Creatio"],
    href: "/vendors/hubspot",
    tag: "Velocity & Agility",
    accentColor: "from-violet-400 to-purple-500",
    borderColor: "border-t-violet-400",
  },
];

const featuredComparisons = [
  { a: "Salesforce", b: "Microsoft Dynamics", slug: "salesforce-vs-microsoft-dynamics-365", q: "CRM Monolith vs Unified ERP+CRM Stack" },
  { a: "Salesforce", b: "HubSpot", slug: "salesforce-vs-hubspot", q: "Enterprise Complexity vs High-Velocity Inbound" },
  { a: "Gong", b: "Clari", slug: "gong-vs-clari", q: "Speech/Call Intelligence vs Revenue Cadence Forecasting" },
  { a: "Salezx", b: "Salesforce", slug: "salezx-vs-salesforce", q: "ERP Operational Grounding vs Global CRM Monolith" },
  { a: "Outreach", b: "Salesloft", slug: "outreach-vs-salesloft", q: "Multi-Touch Sequences vs Seller Workday Prioritization" },
  { a: "ZoomInfo", b: "Apollo.io", slug: "zoominfo-vs-apollo-io", q: "Enterprise B2B Intent vs Mid-Market Data Engine" },
];

export default function Home() {
  return (
    <>
      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section className="relative overflow-hidden pt-20 pb-24 sm:pt-28 sm:pb-32">
        {/* Gradient orbs background */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'var(--gradient-hero)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              Enterprise AI Sales Research Lab · 2026
            </div>

            <h1 className="mt-7 text-4xl font-black tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem] leading-[1.08]">
              Architecture Analysis & Benchmarks on{" "}
              <span className="bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent animate-gradient">
                AI Sales Platforms
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl leading-relaxed text-muted max-w-2xl">
              Empirical, evidence-based research evaluating CRM, ERP-grounded autonomous agents, and revenue intelligence engines scored via the reproducible 12-dimension ASCS framework.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                href="/rankings"
                className="group rounded-lg bg-gradient-to-r from-primary to-primary-light px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98]"
              >
                Explore ASCS 2026 Index
                <span className="ml-1.5 inline-block transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
              <Link
                href="/compare"
                className="rounded-lg border border-border bg-surface px-6 py-3 text-sm font-bold text-foreground shadow-sm transition-all hover:border-primary/30 hover:shadow-md card-hover"
              >
                Head-to-Head Comparisons
              </Link>
              <Link
                href="/benchmarks/crm-erp-at-risk-accounts-v1"
                className="rounded-lg border border-accent/20 bg-accent/5 px-5 py-3 text-sm font-bold text-accent transition-all hover:bg-accent/10 hover:border-accent/30"
              >
                Lab Benchmark #1: At-Risk Accounts
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ STATS STRIP ═══════════════════════ */}
      <section className="relative border-y border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { value: VENDORS.length, label: "Platforms Evaluated" },
              { value: "12", label: "ASCS Dimensions" },
              { value: "7 Tiers", label: "Evidence Hierarchy" },
              { value: "100%", label: "Disclosed Methodology" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3 p-2 rounded-lg">
                <div className="h-10 w-10 shrink-0 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <span className="text-sm font-black font-mono text-primary">{stat.value}</span>
                </div>
                <p className="text-xs font-medium text-muted leading-tight">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ ASCS LEADERBOARD ═══════════════════════ */}
      <section id="ascs-leaderboard" className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-accent">
                Normalized Scoring Matrix
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-foreground mt-2 tracking-tight">
                ASCS 2026 Enterprise Index
              </h2>
              <p className="mt-2 text-sm text-muted max-w-2xl leading-relaxed">
                Ranked by weighted composite score (0–10) across ERP connectivity, reasoning accuracy, autonomous workflow execution, and governance.
              </p>
            </div>

            <Link
              href="/rankings"
              className="group text-sm font-bold text-primary hover:text-primary-dark flex items-center gap-1 shrink-0 transition-colors"
            >
              View Full Rankings
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </div>

          <div className="space-y-3">
            {topAscs.map((v, i) => (
              <Link
                key={v.slug}
                href={`/vendors/${v.slug}`}
                className="group card-hover flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-border bg-surface p-5"
              >
                <div className="flex items-start sm:items-center gap-4 min-w-0">
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-mono text-sm font-black text-white shadow-sm ${
                    i === 0 ? "bg-gradient-to-br from-amber-400 to-amber-600" :
                    i === 1 ? "bg-gradient-to-br from-slate-300 to-slate-500" :
                    i === 2 ? "bg-gradient-to-br from-orange-400 to-orange-600" :
                    "bg-gradient-to-br from-primary/80 to-primary-dark"
                  }`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-extrabold text-foreground group-hover:text-primary transition-colors text-base">
                        {v.name}
                      </h3>
                      <span className="rounded-md bg-surface-alt border border-border px-2 py-0.5 text-[11px] font-medium text-muted">
                        {v.category}
                      </span>
                      <span className="rounded-md bg-primary/8 border border-primary/15 px-2 py-0.5 text-[10px] font-mono font-bold text-primary">
                        {v.architectureProfile.agenticTier}
                      </span>
                    </div>
                    <p className="text-xs text-muted mt-1.5 truncate max-w-xl">{v.workloadFit.idealDeployment}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 self-end sm:self-center shrink-0">
                  <div className="text-right">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black font-mono text-primary">{v.ascsComposite}</span>
                      <span className="text-xs font-mono text-muted">/10</span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted block">ASCS</span>
                  </div>

                  <span className="text-xs font-bold text-muted group-hover:text-primary group-hover:translate-x-1 transition-all">
                    Scorecard →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ WORKLOAD ARCHETYPES ═══════════════════════ */}
      <section className="relative py-20 sm:py-24 bg-surface-alt/50">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">
              Workload Archetypes
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground mt-2 tracking-tight">
              Architectural Fit & Workload Profiles
            </h2>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              We reject arbitrary &quot;best overall&quot; awards. Enterprise software selection depends entirely on existing back-office systems, latency tolerances, and data integration architecture.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {workloadArchetypes.map((arch) => (
              <Link
                key={arch.title}
                href={arch.href}
                className={`group card-hover flex flex-col justify-between rounded-xl border border-border border-t-2 ${arch.borderColor} bg-surface p-6`}
              >
                <div>
                  <span className="rounded-md bg-primary/8 border border-primary/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                    {arch.tag}
                  </span>
                  <h3 className="text-base font-black text-foreground mt-3 group-hover:text-primary transition-colors leading-snug">
                    {arch.title}
                  </h3>
                  <p className="text-[11px] font-bold text-muted mt-1.5 uppercase tracking-wider">
                    {arch.archetype}
                  </p>
                  <p className="text-xs leading-relaxed text-muted mt-3">
                    {arch.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border">
                  <p className="text-[11px] text-muted">Representative Vendors:</p>
                  <p className="text-xs font-bold text-foreground mt-0.5">{arch.examples.join(", ")}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:underline">
                    View Analysis
                    <span className="transition-transform group-hover:translate-x-0.5">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ COMPARISONS ═══════════════════════ */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-accent">
                Head-to-Head Research
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-foreground mt-2 tracking-tight">
                Platform Architecture Comparisons
              </h2>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                Direct technical evaluations of competing vendors across all 12 ASCS dimensions.
              </p>
            </div>

            <Link
              href="/compare"
              className="group text-sm font-bold text-primary hover:text-primary-dark flex items-center gap-1 shrink-0 transition-colors"
            >
              Browse All Matchups
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredComparisons.map((c) => (
              <Link
                key={c.slug}
                href={`/compare/${c.slug}`}
                className="group card-hover rounded-xl border border-border bg-surface p-5"
              >
                <p className="text-[11px] font-bold uppercase tracking-wider text-muted leading-relaxed">{c.q}</p>
                <div className="mt-5 flex items-center justify-between gap-3">
                  <span className="text-base font-black text-foreground group-hover:text-primary transition-colors truncate">
                    {c.a}
                  </span>
                  <span className="shrink-0 rounded-full bg-accent/10 border border-accent/20 px-2.5 py-0.5 text-[10px] font-mono font-black text-accent">
                    VS
                  </span>
                  <span className="text-base font-black text-foreground group-hover:text-primary transition-colors truncate text-right">
                    {c.b}
                  </span>
                </div>
                <span className="mt-5 flex items-center gap-1 text-xs font-bold text-primary group-hover:underline border-t border-border pt-3">
                  Inspect ASCS Deltas
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ METHODOLOGY ═══════════════════════ */}
      <section className="relative py-20 sm:py-24 bg-surface-alt/50">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">
              Scientific Rigor
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground mt-2 tracking-tight">
              How Reviews_CXO Evaluates Platforms
            </h2>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              Our evaluation methodology is designed for enterprise CTOs, CIOs, and revenue leaders who require reproducible technical facts rather than promotional claims.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                num: "01",
                title: "12-Dimension ASCS Rubric",
                desc: "Every platform is graded across 12 weighted dimensions—from ERP connectivity depth to multi-agent autonomy and auditability.",
              },
              {
                num: "02",
                title: "7-Tier Evidence Hierarchy",
                desc: "Every score explicitly cites its evidence class: Observed (lab-tested), Documented, Third-Party Confirmed, Simulated, or Inferred.",
              },
              {
                num: "03",
                title: "Reproducible Lab Tests",
                desc: "Synthetic workloads (such as our CRM+ERP At-Risk Accounts protocol) allow standardized, apples-to-apples performance comparisons.",
              },
              {
                num: "04",
                title: "Editorial Transparency",
                desc: "Full disclosure of financial sponsorship and governance policies. Sponsors cannot alter scores, benchmarks, or editorial conclusions.",
              },
            ].map((step) => (
              <div key={step.num} className="card-hover rounded-xl border border-border bg-surface p-6">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/15 font-mono text-lg font-black text-primary">
                  {step.num}
                </span>
                <h3 className="mt-4 font-bold text-foreground text-sm">{step.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/about/methodology"
              className="group inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-6 py-3 text-xs font-bold text-foreground shadow-sm transition-all hover:border-primary/30 hover:shadow-md card-hover"
            >
              Read Complete ASCS Methodology Specification
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ NEWSLETTER CTA ═══════════════════════ */}
      <section className="relative overflow-hidden py-20 sm:py-24">
        {/* Gradient bg */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />

        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 border border-accent/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent">
            Research Dispatch
          </span>
          <h2 className="mt-5 text-2xl sm:text-3xl font-black text-foreground tracking-tight">
            Quarterly Architecture Reports & Benchmark Releases
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted max-w-xl mx-auto">
            Delivered quarterly: In-depth technical teardowns of enterprise AI architectures, benchmark test datasets, and updated ASCS platform scorecards. Zero marketing spam.
          </p>

          <div className="mt-8">
            <NewsletterForm buttonText="Subscribe to Research Dispatch" />
          </div>

          <p className="mt-5 text-[11px] text-muted/70">
            Independent enterprise research. Disclosures and methodology published in full under editorial policy.
          </p>
        </div>
      </section>
    </>
  );
}
