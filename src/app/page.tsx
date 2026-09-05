import Link from "next/link";
import { VENDORS, getTopAscsVendors } from "@/lib/vendors";
import { ASCS_DIMENSIONS } from "@/lib/site";
import { NewsletterForm } from "@/components/ui/NewsletterForm";

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
  },
  {
    title: "Enterprise CRM Ecosystem Monoliths",
    archetype: "Extensive App & Data Cloud Scale",
    description:
      "Massive platforms with thousands of pre-built integrations, extensive developer ecosystems, and deep customer data centralization across global enterprises.",
    examples: ["Salesforce (Agentforce)", "Salesforce Einstein"],
    href: "/vendors/salesforce",
    tag: "Ecosystem Standard",
  },
  {
    title: "Revenue & Conversation Intelligence",
    archetype: "Voice, Email & Pipeline Telemetry",
    description:
      "Specialized intelligence engines analyzing prospect interactions, deal slippage velocity, and buying committee sentiment across communications.",
    examples: ["Gong", "Clari"],
    href: "/compare/gong-vs-clari",
    tag: "Deal Inspection",
  },
  {
    title: "High-Velocity Inbound & Mid-Market",
    archetype: "Rapid Time-to-Value & Composability",
    description:
      "Streamlined platforms designed for fast deployment, intuitive rep adoption, and cohesive marketing-to-sales handoffs without dedicated admin teams.",
    examples: ["HubSpot", "Creatio"],
    href: "/vendors/hubspot",
    tag: "Velocity & Agility",
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
      {/* HERO SECTION */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-surface to-surface-alt/40 pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.12),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(56,189,248,0.15),rgba(9,13,22,0))] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              Enterprise AI Sales Research Lab · 2026 Evaluation
            </div>

            <h1 className="mt-6 text-3xl font-black tracking-tight text-foreground sm:text-5xl lg:text-6xl leading-[1.1]">
              Architecture Analysis & Benchmarks on <span className="text-primary">AI Sales Platforms</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl leading-relaxed text-muted font-normal">
              Empirical, evidence-based research evaluating CRM, ERP-grounded autonomous agents, and revenue intelligence engines scored via the reproducible 12-dimension ASCS framework.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Link
                href="/rankings"
                className="rounded-lg bg-primary px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-primary-dark hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                Explore ASCS 2026 Index →
              </Link>
              <Link
                href="/compare"
                className="rounded-lg border border-border bg-surface px-6 py-3 text-sm font-bold text-foreground transition-all hover:border-primary/40 hover:bg-surface-alt shadow-sm"
              >
                Head-to-Head Comparisons
              </Link>
              <Link
                href="/benchmarks/crm-erp-at-risk-accounts-v1"
                className="rounded-lg border border-primary/20 bg-primary/5 px-5 py-3 text-sm font-bold text-primary transition-all hover:bg-primary/10"
              >
                Lab Benchmark #1: At-Risk Accounts
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* EMPIRICAL METRICS STRIP (NO FABRICATION) */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 text-center">
            <div className="p-2">
              <p className="text-2xl font-black text-primary font-mono">{VENDORS.length}</p>
              <p className="text-xs font-medium text-muted">Platforms Evaluated</p>
            </div>
            <div className="p-2">
              <p className="text-2xl font-black text-primary font-mono">12</p>
              <p className="text-xs font-medium text-muted">ASCS Evaluation Dimensions</p>
            </div>
            <div className="p-2">
              <p className="text-2xl font-black text-primary font-mono">7 Tiers</p>
              <p className="text-xs font-medium text-muted">Evidence Classification Hierarchy</p>
            </div>
            <div className="p-2">
              <p className="text-2xl font-black text-primary font-mono">100%</p>
              <p className="text-xs font-medium text-muted">Disclosed Methodology & Governance</p>
            </div>
          </div>
        </div>
      </section>

      {/* ASCS LEADERBOARD HIGHLIGHT */}
      <section id="ascs-leaderboard" className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Normalized Scoring Matrix
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-foreground mt-1">
                ASCS 2026 Enterprise Index
              </h2>
              <p className="mt-2 text-sm text-muted max-w-2xl">
                Ranked by weighted composite score (0–10) across ERP connectivity, reasoning accuracy, autonomous workflow execution, and governance.
              </p>
            </div>

            <Link
              href="/rankings"
              className="text-sm font-bold text-primary hover:underline flex items-center gap-1 shrink-0"
            >
              View Full 30-Vendor Rankings →
            </Link>
          </div>

          <div className="space-y-3">
            {topAscs.map((v, i) => (
              <Link
                key={v.slug}
                href={`/vendors/${v.slug}`}
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-border bg-surface p-5 transition-all hover:border-primary/40 hover:shadow-sm"
              >
                <div className="flex items-start sm:items-center gap-4 min-w-0">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-alt border border-border font-mono text-sm font-black text-foreground group-hover:border-primary/40 group-hover:text-primary transition-colors">
                    0{i + 1}
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-extrabold text-foreground group-hover:text-primary transition-colors text-base">
                        {v.name}
                      </h3>
                      <span className="rounded bg-surface-alt border border-border px-2 py-0.5 text-[11px] font-medium text-muted">
                        {v.category}
                      </span>
                      <span className="rounded bg-primary/10 border border-primary/20 px-2 py-0.5 text-[10px] font-mono text-primary">
                        {v.architectureProfile.agenticTier}
                      </span>
                    </div>
                    <p className="text-xs text-muted mt-1 truncate max-w-xl">{v.workloadFit.idealDeployment}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 self-end sm:self-center shrink-0">
                  <div className="text-right">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black font-mono text-primary">{v.ascsComposite}</span>
                      <span className="text-xs font-mono text-muted">/10</span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted block">ASCS Composite</span>
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

      {/* WORKLOAD FIT & ARCHITECTURAL PROFILES (REPLACING BIASED TOP PICKS) */}
      <section className="border-t border-border bg-surface-alt/40 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Workload Archetypes
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground mt-1">
              Architectural Fit & Workload Profiles
            </h2>
            <p className="mt-2 text-sm text-muted">
              We reject arbitrary &quot;best overall&quot; awards. Enterprise software selection depends entirely on existing back-office systems, latency tolerances, and data integration architecture.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {workloadArchetypes.map((arch) => (
              <Link
                key={arch.title}
                href={arch.href}
                className="group flex flex-col justify-between rounded-xl border border-border bg-surface p-6 transition-all hover:border-primary/40 hover:shadow-md"
              >
                <div>
                  <span className="rounded bg-primary/10 border border-primary/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                    {arch.tag}
                  </span>
                  <h3 className="text-lg font-black text-foreground mt-3 group-hover:text-primary transition-colors">
                    {arch.title}
                  </h3>
                  <p className="text-xs font-bold text-muted mt-1 uppercase tracking-wider">
                    {arch.archetype}
                  </p>
                  <p className="text-xs leading-relaxed text-muted mt-3">
                    {arch.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border">
                  <p className="text-[11px] text-muted">Representative Vendors:</p>
                  <p className="text-xs font-bold text-foreground mt-0.5">{arch.examples.join(", ")}</p>
                  <span className="mt-3 inline-block text-xs font-bold text-primary group-hover:underline">
                    View Architecture Analysis →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR COMPARISONS */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Head-to-Head Research
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-foreground mt-1">
                Platform Architecture Comparisons
              </h2>
              <p className="mt-2 text-sm text-muted">
                Direct technical evaluations of competing vendors across all 12 ASCS dimensions.
              </p>
            </div>

            <Link
              href="/compare"
              className="text-sm font-bold text-primary hover:underline shrink-0"
            >
              Browse All Platform Matchups →
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredComparisons.map((c) => (
              <Link
                key={c.slug}
                href={`/compare/${c.slug}`}
                className="group rounded-xl border border-border bg-surface p-5 transition-all hover:border-primary/40 hover:shadow-sm"
              >
                <p className="text-xs font-bold uppercase tracking-wider text-muted">{c.q}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-base font-black text-foreground group-hover:text-primary transition-colors">
                    {c.a}
                  </span>
                  <span className="rounded-full bg-surface-alt border border-border px-2 py-0.5 text-[10px] font-mono font-bold text-muted">
                    VS
                  </span>
                  <span className="text-base font-black text-foreground group-hover:text-primary transition-colors">
                    {c.b}
                  </span>
                </div>
                <span className="mt-4 block text-xs font-bold text-primary group-hover:underline border-t border-border pt-3">
                  Inspect ASCS Deltas →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* EMPIRICAL RESEARCH METHODOLOGY */}
      <section className="border-t border-border bg-surface-alt/40 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Scientific Rigor
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground mt-1">
              How Reviews_CXO Evaluates Platforms
            </h2>
            <p className="mt-2 text-sm text-muted">
              Our evaluation methodology is designed for enterprise CTOs, CIOs, and revenue leaders who require reproducible technical facts rather than promotional claims.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
              <span className="font-mono text-2xl font-black text-primary">01</span>
              <h3 className="mt-3 font-bold text-foreground text-base">12-Dimension ASCS Rubric</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                Every platform is graded across 12 weighted dimensions—from ERP connectivity depth to multi-agent autonomy and auditability.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
              <span className="font-mono text-2xl font-black text-primary">02</span>
              <h3 className="mt-3 font-bold text-foreground text-base">7-Tier Evidence Hierarchy</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                Every score explicitly cites its evidence class: Observed (lab-tested), Documented, Third-Party Confirmed, Simulated, or Inferred.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
              <span className="font-mono text-2xl font-black text-primary">03</span>
              <h3 className="mt-3 font-bold text-foreground text-base">Reproducible Lab Tests</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                Synthetic workloads (such as our CRM+ERP At-Risk Accounts protocol) allow standardized, apples-to-apples performance comparisons.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
              <span className="font-mono text-2xl font-black text-primary">04</span>
              <h3 className="mt-3 font-bold text-foreground text-base">Editorial Transparency</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                Full disclosure of financial sponsorship and governance policies. Sponsors cannot alter scores, benchmarks, or editorial conclusions.
              </p>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              href="/about/methodology"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-2.5 text-xs font-bold text-foreground hover:border-primary/40 transition-colors shadow-sm"
            >
              Read Complete ASCS Methodology Specification →
            </Link>
          </div>
        </div>
      </section>

      {/* RESEARCH DISPATCH (REAL NEWSLETTER, NO FABRICATION) */}
      <section className="border-t border-border bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <span className="rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
            Research Dispatch
          </span>
          <h2 className="mt-4 text-2xl sm:text-3xl font-black text-foreground">
            Quarterly Architecture Reports & Benchmark Releases
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Delivered quarterly: In-depth technical teardowns of enterprise AI architectures, benchmark test datasets, and updated ASCS platform scorecards. Zero marketing spam.
          </p>

          <div className="mt-8">
            <NewsletterForm buttonText="Subscribe to Research Dispatch" />
          </div>

          <p className="mt-4 text-[11px] text-muted">
            Independent enterprise research. Disclosures and methodology published in full under editorial policy.
          </p>
        </div>
      </section>
    </>
  );
}
