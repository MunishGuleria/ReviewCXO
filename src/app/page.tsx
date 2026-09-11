import Link from "next/link";
import { Metadata } from "next";
import { getVisibleVendors, getTopAscsVendors } from "@/lib/vendors";
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
    examples: ["Microsoft Dynamics 365", "SAP Joule"],
    href: "/vendors/microsoft-dynamics-365",
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
    title: "AI Copilots for Productivity Suites",
    archetype: "Embedded Intelligence Across Workflows",
    description:
      "AI assistants deeply integrated into existing productivity tools, enabling sellers to work directly within Outlook, Teams, and Excel without switching context.",
    examples: ["Microsoft Copilot for Sales", "Salesforce Einstein"],
    href: "/vendors/microsoft-copilot",
    tag: "Productivity Native",
  },
  {
    title: "ERP-Native AI Intelligence",
    archetype: "Deep Transactional AI Grounding",
    description:
      "AI platforms embedded directly within ERP systems, leveraging real-time transactional data for supply chain, manufacturing, and financial insights.",
    examples: ["SAP Joule", "Microsoft Dynamics 365"],
    href: "/vendors/sap-joule",
    tag: "ERP-First",
  },
];

export default function Home() {
  return (
    <>
      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section className="relative overflow-hidden pt-12 pb-14 sm:pt-24 sm:pb-28 bg-background border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            {/* Left Hero Column: Bold Clean Typography */}
            <div className="lg:col-span-6 flex flex-col items-start relative z-10">
              
              {/* Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-surface-alt mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-xs font-semibold text-secondary-foreground">ASCS 2026 Rankings Live</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
                From AI Ambition<br />
                To Empirical Truth
              </h1>

              <p className="mt-5 text-base sm:text-lg leading-relaxed text-muted-foreground max-w-lg">
                We independently evaluate enterprise AI platforms that connect your ERPs and CRMs into autonomous workflows. Evidence-based research for CTOs, CIOs, and procurement leaders.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link href="/rankings" className="btn-primary">
                  Explore ASCS Scorecards
                </Link>
                <Link href="/questions" className="btn-secondary">
                  Browse Research Questions
                </Link>
              </div>

              <div className="mt-8 pt-5 border-t border-border flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Verified Integration:</span>
                <span className="flex items-center gap-1.5">
                  <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  SAP ERP
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  Oracle DB
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  Salesforce
                </span>
              </div>
            </div>

            {/* Right Hero Column: Clean Architecture Diagram */}
            <div className="lg:col-span-6">
              <div className="card-premium p-6">
                <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">
                      ASCS Topology
                    </span>
                  </div>
                  <span className="text-xs font-medium text-muted-foreground bg-surface-alt px-2.5 py-1 rounded">
                    Lab Environment Active
                  </span>
                </div>

                {/* Clean SVG Diagram */}
                <div className="relative rounded-md bg-surface-alt border border-border p-6 overflow-hidden">
                  <svg viewBox="0 0 540 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                    {/* Conduit Lines */}
                    <path d="M 130 60 C 190 60, 210 110, 240 115" stroke="currentColor" className="text-border-strong" strokeWidth="1.5" strokeDasharray="4 4" />
                    <path d="M 130 120 C 190 120, 210 120, 240 120" stroke="currentColor" className="text-border-strong" strokeWidth="2" />
                    <path d="M 130 180 C 190 180, 210 130, 240 125" stroke="currentColor" className="text-border-strong" strokeWidth="1.5" strokeDasharray="4 4" />
                    <path d="M 300 115 C 330 110, 350 60, 410 60" stroke="currentColor" className="text-border-strong" strokeWidth="1.5" strokeDasharray="4 4" />
                    <path d="M 300 120 C 330 120, 350 120, 410 120" stroke="currentColor" className="text-border-strong" strokeWidth="2" />
                    <path d="M 300 125 C 330 130, 350 180, 410 180" stroke="currentColor" className="text-border-strong" strokeWidth="1.5" strokeDasharray="4 4" />

                    {/* Node Boxes */}
                    {[
                      { x: 10, y: 38, t1: "SAP ERP", t2: "Live Inventory" },
                      { x: 10, y: 98, t1: "CRM Core", t2: "Pipeline Data" },
                      { x: 10, y: 158, t1: "Oracle DB", t2: "Tx Records" },
                      { x: 410, y: 38, t1: "Auto-Quotes", t2: "Workflow Exec" },
                      { x: 410, y: 98, t1: "ASCS Audit", t2: "Traceability" },
                      { x: 410, y: 158, t1: "CxO Analytics", t2: "Impact Metrics" }
                    ].map((node, i) => (
                      <g key={i} transform={`translate(${node.x}, ${node.y})`}>
                        <rect width="120" height="44" rx="4" className="fill-surface stroke-border" strokeWidth="1" />
                        <text x="14" y="20" className="fill-foreground font-medium" fontSize="12">{node.t1}</text>
                        <text x="14" y="34" className="fill-muted-foreground" fontSize="10">{node.t2}</text>
                      </g>
                    ))}

                    {/* Central Agent Hub */}
                    <g transform="translate(225, 75)">
                      <rect width="90" height="90" rx="8" className="fill-surface stroke-primary" strokeWidth="2" />
                      <circle cx="45" cy="38" r="14" className="fill-surface-alt stroke-border-strong" strokeWidth="1" />
                      <path d="M 40 34 h 10 M 40 38 h 10 M 40 42 h 10 M 45 30 v 16" className="stroke-foreground" strokeWidth="1.5" strokeLinecap="round" />
                      <text x="45" y="66" textAnchor="middle" className="fill-foreground font-bold" fontSize="11">AGENT</text>
                      <text x="45" y="78" textAnchor="middle" className="fill-muted-foreground font-medium" fontSize="8">REASONING</text>
                    </g>
                  </svg>
                </div>

                <div className="mt-6 pt-4 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-muted-foreground">Top Platforms Validated</span>
                  </div>
                  <Link href="/rankings" className="text-sm font-medium text-primary-text hover:underline transition-all">
                    View Full Index →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ STATS STRIP ═══════════════════════ */}
      <section className="bg-surface-alt border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 sm:gap-8">
            {[
              { value: `${getVisibleVendors().length}+`, label: "Platforms Evaluated", sub: "Enterprise AI Engines" },
              { value: "12", label: "ASCS Dimensions", sub: "Normalized Technical Rubric" },
              { value: "7 Tiers", label: "Evidence Hierarchy", sub: "Observed & Documented" },
              { value: "100%", label: "Disclosed Methodology", sub: "Zero Vendor Pay-to-Play" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl sm:text-3xl font-bold text-foreground">
                  {stat.value}
                </div>
                <p className="text-sm font-medium text-secondary-foreground mt-2">{stat.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ ASCS LEADERBOARD ═══════════════════════ */}
      <section className="py-12 sm:py-20 bg-background border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                ASCS 2026 Enterprise Index
              </h2>
              <p className="mt-2 text-sm text-muted-foreground max-w-2xl leading-relaxed">
                Ranked by weighted composite score (0–10) across ERP connectivity, reasoning accuracy, autonomous workflow execution, and governance.
              </p>
            </div>

            <Link
              href="/rankings"
              className="text-sm font-medium text-primary-text hover:underline"
            >
              View Full Rankings →
            </Link>
          </div>

          <div className="space-y-4">
            {topAscs.map((v, i) => (
              <Link
                key={v.slug}
                href={`/vendors/${v.slug}`}
                className="card-premium flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5"
              >
                <div className="flex items-start sm:items-center gap-4 min-w-0">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-surface-alt font-mono text-sm font-bold text-secondary-foreground">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-bold text-foreground text-base hover:text-primary-text transition-colors">
                        {v.name}
                      </h3>
                      <span className="rounded bg-surface-alt border border-border px-2 py-0.5 text-xs font-medium text-secondary-foreground">
                        {v.category}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 truncate max-w-xl">{v.workloadFit.idealDeployment}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 self-end sm:self-center shrink-0">
                  <div className="text-right">
                    <div className="flex items-baseline justify-end gap-1">
                      <span className="text-xl font-bold text-foreground">{v.ascsComposite}</span>
                      <span className="text-sm text-muted-foreground">/10</span>
                    </div>
                    <span className="text-xs font-medium text-muted-foreground mt-1 block">Composite Score</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ WORKLOAD ARCHETYPES ═══════════════════════ */}
      <section className="py-12 sm:py-20 bg-surface-alt border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              Architectural Fit & Workload Profiles
            </h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              We reject arbitrary &quot;best overall&quot; awards. Enterprise software selection depends entirely on existing back-office systems, latency tolerances, and operational data integration architecture.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {workloadArchetypes.map((arch) => (
              <Link
                key={arch.title}
                href={arch.href}
                className="card-premium p-6 flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block rounded bg-surface border border-border px-2 py-1 text-xs font-medium text-secondary-foreground mb-4">
                    {arch.tag}
                  </span>
                  <h3 className="text-base font-bold text-foreground leading-tight">
                    {arch.title}
                  </h3>
                  <p className="text-sm font-medium text-secondary-foreground mt-2">
                    {arch.archetype}
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground mt-3">
                    {arch.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground">Representative Vendors</p>
                  <p className="text-sm font-medium text-foreground mt-1">{arch.examples.join(", ")}</p>
                  <span className="mt-4 inline-block text-sm font-medium text-primary-text hover:underline">
                    View Analysis →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ METHODOLOGY ═══════════════════════ */}
      <section className="py-12 sm:py-20 bg-surface-alt border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10 mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              How Reviews_CXO Evaluates Platforms
            </h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Our evaluation methodology is engineered for enterprise CTOs, CIOs, and procurement leaders who require reproducible technical facts rather than vendor promotional claims.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                num: "01",
                title: "12-Dimension ASCS Rubric",
                desc: "Every platform is systematically graded across 12 weighted dimensions—from ERP connectivity depth to multi-agent autonomy and auditability.",
              },
              {
                num: "02",
                title: "7-Tier Evidence Hierarchy",
                desc: "Every metric score explicitly cites its evidence class: Observed (lab-tested), Documented, Third-Party Confirmed, Simulated, or Inferred.",
              },
              {
                num: "03",
                title: "Reproducible Lab Tests",
                desc: "Synthetic workloads (such as our CRM+ERP At-Risk Accounts protocol) enforce standardized, apples-to-apples performance comparisons.",
              },
              {
                num: "04",
                title: "Editorial Independence",
                desc: "Full transparency of financial sponsorship and governance. Sponsors cannot alter scores, methodology weights, or editorial verdicts.",
              },
            ].map((step) => (
              <div key={step.num} className="card-premium p-6 flex flex-col justify-between">
                <div>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded bg-surface border border-border text-foreground font-mono text-sm font-bold mb-4">
                    {step.num}
                  </span>
                  <h3 className="font-bold text-foreground text-base">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/about/methodology"
              className="btn-secondary"
            >
              Read Complete Methodology
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ NEWSLETTER CTA ═══════════════════════ */}
      <section className="py-14 sm:py-24 bg-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="card-premium p-6 sm:p-12 text-center">
            <div className="mx-auto max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                Architecture Benchmarks & Quarterly Teardowns
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground mx-auto">
                Delivered quarterly to 18,000+ enterprise technology leaders: deep-dive technical evaluations of agentic architectures, benchmark test datasets, and updated ASCS platform scorecards.
              </p>

              <div className="mt-8 max-w-md mx-auto">
                <NewsletterForm buttonText="Subscribe to Research" />
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
                <span>Zero vendor fluff</span>
                <span>•</span>
                <span>1-click unsubscribe</span>
                <span>•</span>
                <Link href="/about/disclosure" className="hover:underline">
                  Read Editorial Disclosure
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
