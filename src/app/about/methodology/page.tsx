import { Metadata } from "next";
import { ASCS_DIMENSIONS, SCORING_RUBRIC, EVIDENCE_TYPES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Methodology",
  description:
    "The ASCS (AI Sales Capability Score) framework — a 12-dimension evaluation methodology for enterprise AI sales platforms.",
  alternates: { canonical: "https://reviews-cxo.com/about/methodology" },
  openGraph: {
    title: "ASCS Research Methodology",
    description: "12-dimension evaluation methodology for enterprise AI sales platforms.",
    url: "https://reviews-cxo.com/about/methodology",
    siteName: "Reviews_CXO",
    locale: "en_US",
    type: "article",
  },
};

export default function MethodologyPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-background via-background to-surface-alt">
        <div className="relative mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary mb-2">
            <span className="h-1 w-1 rounded-full bg-primary animate-pulse" />
            ASCS Framework v3.0
          </span>
          <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
            How We <span className="text-primary">Actually</span> Evaluate Platforms
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted">
            12 dimensions. 7 evidence tiers. Every score backed by documented evidence, not marketing claims.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-3 max-w-sm mx-auto">
            <div className="rounded-lg border border-border/60 bg-surface/80 p-3">
              <span className="font-mono text-xl font-black text-primary">12</span>
              <p className="mt-0.5 text-[10px] font-semibold text-muted">Dimensions</p>
            </div>
            <div className="rounded-lg border border-border/60 bg-surface/80 p-3">
              <span className="font-mono text-xl font-black text-primary">0–10</span>
              <p className="mt-0.5 text-[10px] font-semibold text-muted">Scale</p>
            </div>
            <div className="rounded-lg border border-border/60 bg-surface/80 p-3">
              <span className="font-mono text-xl font-black text-primary">7</span>
              <p className="mt-0.5 text-[10px] font-semibold text-muted">Evidence Tiers</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">

        {/* ── 01: What is ASCS ── */}
        <section className="mb-14">
          <div className="flex items-center gap-2 mb-4">
            <span className="flex h-6 w-6 items-center justify-center rounded bg-primary/10 text-[10px] font-bold text-primary">01</span>
            <div className="h-px flex-1 bg-border/60" />
          </div>
          <div className="grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <h2 className="text-xl font-black text-foreground tracking-tight">What is ASCS?</h2>
            </div>
            <div className="lg:col-span-3 space-y-3">
              <p className="text-sm leading-relaxed text-muted">
                The AI Sales Capability Score (ASCS) is a standardized, evidence-based framework for enterprise AI sales platforms. Every platform is scored across <strong className="text-foreground font-semibold">12 weighted dimensions</strong> on a 0–10 scale, backed by classified evidence sources.
              </p>
              <div className="rounded-lg border border-primary/10 bg-primary/[0.02] p-3">
                <p className="text-[11px] text-muted leading-relaxed">
                  Every score cites its evidence class — from Observed (lab-tested) to Not Tested.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 02: 12 Dimensions ── */}
        <section className="mb-14">
          <div className="flex items-center gap-2 mb-4">
            <span className="flex h-6 w-6 items-center justify-center rounded bg-primary/10 text-[10px] font-bold text-primary">02</span>
            <div className="h-px flex-1 bg-border/60" />
          </div>
          <h2 className="text-xl font-black text-foreground tracking-tight mb-2">The 12 ASCS Dimensions</h2>
          <p className="text-sm text-muted mb-6 max-w-xl">Weighted by importance — cross-system reasoning and AI quality carry the highest weights (12% each).</p>

          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {ASCS_DIMENSIONS.map((dim) => (
              <div
                key={dim.number}
                className="group rounded-lg border border-border/80 bg-surface p-4 transition-all hover:border-primary/30"
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-xl font-black text-primary/15 group-hover:text-primary/30 transition-colors">
                    {dim.number.toString().padStart(2, "0")}
                  </span>
                  <span className="rounded bg-primary/10 border border-primary/15 px-1.5 py-0.5 text-[9px] font-mono font-bold text-primary">
                    {dim.weight}
                  </span>
                </div>
                <h3 className="mt-2 text-xs font-bold text-foreground">{dim.name}</h3>
                <p className="mt-1 text-[11px] leading-relaxed text-muted">{dim.description}</p>
                <div className="mt-2 pt-2 border-t border-border/60">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-warning/80">Why it matters</p>
                  <p className="text-[10px] text-muted mt-0.5">{dim.whyItMatters}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 03: Scoring Rubric ── */}
        <section className="mb-14">
          <div className="flex items-center gap-2 mb-4">
            <span className="flex h-6 w-6 items-center justify-center rounded bg-primary/10 text-[10px] font-bold text-primary">03</span>
            <div className="h-px flex-1 bg-border/60" />
          </div>
          <h2 className="text-xl font-black text-foreground tracking-tight mb-2">Scoring Rubric</h2>
          <p className="text-sm text-muted mb-6 max-w-xl">Standardized 0–10 scale applied consistently across all vendors and dimensions.</p>

          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {SCORING_RUBRIC.map((row) => {
              const isLow = row.range === "0" || row.range === "1–2";
              const isMid = row.range === "3–4" || row.range === "5–6";
              const isHigh = row.range === "7–8" || row.range === "9–10";
              return (
                <div
                  key={row.range}
                  className={`rounded-lg border p-4 transition-all hover:shadow-sm ${
                    isHigh
                      ? "border-success/20 bg-success/[0.03] hover:border-success/40"
                      : isMid
                        ? "border-warning/20 bg-warning/[0.03] hover:border-warning/40"
                        : "border-danger/20 bg-danger/[0.03] hover:border-danger/40"
                  }`}
                >
                  <span className={`font-mono text-xl font-black ${
                    isHigh ? "text-success/70" : isMid ? "text-warning/70" : "text-danger/70"
                  }`}>
                    {row.range}
                  </span>
                  <p className="mt-1.5 text-xs font-medium text-foreground leading-relaxed">{row.meaning}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── 04: Evidence Classification ── */}
        <section className="mb-14">
          <div className="flex items-center gap-2 mb-4">
            <span className="flex h-6 w-6 items-center justify-center rounded bg-primary/10 text-[10px] font-bold text-primary">04</span>
            <div className="h-px flex-1 bg-border/60" />
          </div>
          <h2 className="text-xl font-black text-foreground tracking-tight mb-2">Evidence Classification</h2>
          <p className="text-sm text-muted mb-6 max-w-xl">Every score cites its evidence class — full transparency on confidence levels.</p>

          <div className="rounded-lg border border-border/80 bg-surface overflow-hidden">
            {EVIDENCE_TYPES.map((type, idx) => {
              const weightNum = parseFloat(type.weight) || 0;
              const barWidth = weightNum * 100;
              return (
                <div
                  key={type.id}
                  className={`flex items-center gap-3 px-4 py-3 transition-colors hover:bg-surface-alt/50 ${
                    idx !== EVIDENCE_TYPES.length - 1 ? "border-b border-border/50" : ""
                  }`}
                >
                  <span className="font-mono text-sm font-black text-primary/70 w-10 shrink-0">{type.weight}</span>
                  <span className="text-xs font-bold text-foreground w-24 sm:w-32 shrink-0">{type.label}</span>
                  <p className="flex-1 text-[11px] text-muted leading-relaxed min-w-0 hidden sm:block">{type.description}</p>
                  <div className="w-16 sm:w-24 shrink-0">
                    <div className="h-1.5 rounded-full bg-border/60 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          weightNum >= 0.9 ? "bg-success" : weightNum >= 0.7 ? "bg-primary" : weightNum > 0 ? "bg-warning" : "bg-danger"
                        }`}
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── 05: Weight Distribution ── */}
        <section className="mb-14">
          <div className="flex items-center gap-2 mb-4">
            <span className="flex h-6 w-6 items-center justify-center rounded bg-primary/10 text-[10px] font-bold text-primary">05</span>
            <div className="h-px flex-1 bg-border/60" />
          </div>
          <h2 className="text-xl font-black text-foreground tracking-tight mb-2">Weight Distribution</h2>

          <div className="rounded-lg border border-border/80 bg-surface p-5">
            <div className="space-y-2.5">
              {ASCS_DIMENSIONS.map((dim) => {
                const weightNum = parseFloat(dim.weight);
                return (
                  <div key={dim.number} className="group flex items-center gap-2">
                    <span className="w-40 sm:w-48 text-[11px] font-medium text-muted group-hover:text-foreground transition-colors truncate">{dim.name}</span>
                    <div className="flex-1 h-2 rounded-full bg-border/50 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary/80 to-primary"
                        style={{ width: `${weightNum * 10}%` }}
                      />
                    </div>
                    <span className="font-mono text-[10px] font-bold text-primary/70 w-8 text-right">{dim.weight}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 06: Benchmark Protocol ── */}
        <section className="mb-14">
          <div className="flex items-center gap-2 mb-4">
            <span className="flex h-6 w-6 items-center justify-center rounded bg-primary/10 text-[10px] font-bold text-primary">06</span>
            <div className="h-px flex-1 bg-border/60" />
          </div>
          <h2 className="text-xl font-black text-foreground tracking-tight mb-2">Benchmark Protocol</h2>
          <p className="text-sm text-muted mb-6 max-w-xl">7-step protocol ensuring reproducibility, transparency, and scientific rigor.</p>

          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { step: "01", title: "Research Question", desc: "Clear buyer-oriented hypothesis." },
              { step: "02", title: "Dataset Design", desc: "Documented ground truth labels." },
              { step: "03", title: "Environments", desc: "Representative lab configurations." },
              { step: "04", title: "Metrics", desc: "Pre-defined evaluation criteria." },
              { step: "05", title: "Execution", desc: "Multiple runs with significance testing." },
              { step: "06", title: "Analysis", desc: "Confidence intervals and limitations." },
              { step: "07", title: "Publication", desc: "Open datasets and code." },
            ].map((item) => (
              <div
                key={item.step}
                className="group rounded-lg border border-border/80 bg-surface p-3 transition-all hover:border-primary/30"
              >
                <span className="font-mono text-lg font-black text-primary/15 group-hover:text-primary/30 transition-colors">{item.step}</span>
                <h3 className="mt-1 text-xs font-bold text-foreground">{item.title}</h3>
                <p className="mt-0.5 text-[10px] text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 07: Evaluation Process ── */}
        <section className="mb-14">
          <div className="flex items-center gap-2 mb-4">
            <span className="flex h-6 w-6 items-center justify-center rounded bg-primary/10 text-[10px] font-bold text-primary">07</span>
            <div className="h-px flex-1 bg-border/60" />
          </div>
          <h2 className="mb-4 text-xl font-bold text-foreground">Evaluation Process</h2>

          <div className="rounded-lg border border-border/80 bg-surface p-5">
            <div className="relative">
              <div className="absolute left-[11px] top-3 bottom-3 w-px bg-border/60" />
              <div className="space-y-0">
                {["Evidence Collection", "Evidence Review", "Cross-Source Analysis", "12-Dimension ASCS Evaluation", "Editorial Assessment"].map((step, i, arr) => (
                  <div key={step} className="relative flex items-center gap-3 py-2">
                    <span className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 border-primary/20 bg-surface text-[9px] font-bold text-primary shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-xs font-semibold text-foreground">{step}</span>
                    {i < arr.length - 1 && <span className="text-border/60 ml-auto hidden sm:inline text-[10px]">→</span>}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-border/60">
              <p className="text-[11px] text-muted leading-relaxed">
                Reviews_CXO considers documented capabilities, architecture, enterprise fit, customer-market evidence, cost considerations, strengths, limitations, and uncertainty when forming its assessment.
              </p>
            </div>
          </div>
        </section>

        {/* ── 08: Reproducibility & Peer Review ── */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="flex h-6 w-6 items-center justify-center rounded bg-primary/10 text-[10px] font-bold text-primary">08</span>
            <div className="h-px flex-1 bg-border/60" />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-border/80 bg-surface p-5 transition-all hover:border-primary/30">
              <div className="flex items-center gap-2 mb-3">
                <span className="flex h-6 w-6 items-center justify-center rounded bg-success/10">
                  <svg className="h-3 w-3 text-success" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </span>
                <h3 className="text-sm font-bold text-foreground">Open & Auditable</h3>
              </div>
              <p className="text-xs leading-relaxed text-muted">
                All datasets are versioned and checksummed. Raw data is preserved and available for audit. Methodology changes are documented in published changelogs.
              </p>
            </div>

            <div className="rounded-lg border border-border/80 bg-surface p-5 transition-all hover:border-primary/30">
              <div className="flex items-center gap-2 mb-3">
                <span className="flex h-6 w-6 items-center justify-center rounded bg-primary/10">
                  <svg className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </span>
                <h3 className="text-sm font-bold text-foreground">External Advisory Review</h3>
              </div>
              <p className="text-xs leading-relaxed text-muted">
                Reviewed by 2–3 domain experts before publication. Audits for bias, ensures methodological rigor, and signs off before release.
              </p>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
