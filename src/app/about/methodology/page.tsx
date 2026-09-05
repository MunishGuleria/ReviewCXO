import { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ASCS_DIMENSIONS, SCORING_RUBRIC, EVIDENCE_TYPES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Methodology",
  description:
    "The ASCS (AI Sales Capability Score) framework — our 12-dimension evaluation methodology for AI enterprise sales platforms.",
};

export default function MethodologyPage() {
  return (
    <>
      <PageHeader
        title="Research Methodology"
        badge="ASCS Framework"
        description="The AI Sales Capability Score (ASCS) is a 12-dimension evaluation framework designed to assess enterprise AI sales platforms on the capabilities that matter most to enterprise buyers in 2026."
      />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 space-y-20">

        {/* SECTION 1: WHAT IS ASCS */}
        <section>
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Core Framework</span>
            <h2 className="text-3xl font-black text-foreground mt-2">What is ASCS?</h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              The AI Sales Capability Score (ASCS) is a standardized, evidence-based evaluation framework
              for enterprise AI sales platforms. Every platform is scored across <strong>12 weighted dimensions</strong> on a
              0–10 scale, backed by classified evidence sources. The result is a single composite score
              that enables apples-to-apples comparison across vendors.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-surface p-5">
              <span className="font-mono text-3xl font-black text-primary">12</span>
              <p className="mt-1 text-sm font-bold text-foreground">Evaluation Dimensions</p>
              <p className="mt-1 text-xs text-muted">Covering ERP connectivity, AI reasoning, security, agentic capability, and more.</p>
            </div>
            <div className="rounded-xl border border-border bg-surface p-5">
              <span className="font-mono text-3xl font-black text-primary">0–10</span>
              <p className="mt-1 text-sm font-bold text-foreground">Scoring Scale</p>
              <p className="mt-1 text-xs text-muted">Standardized rubric applied consistently across all vendors and dimensions.</p>
            </div>
            <div className="rounded-xl border border-border bg-surface p-5">
              <span className="font-mono text-3xl font-black text-primary">7</span>
              <p className="mt-1 text-sm font-bold text-foreground">Evidence Tiers</p>
              <p className="mt-1 text-xs text-muted">Every score cites its evidence class — from Observed (lab-tested) to Not Tested.</p>
            </div>
          </div>
        </section>

        {/* SECTION 2: 12 DIMENSIONS */}
        <section>
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Evaluation Dimensions</span>
            <h2 className="text-3xl font-black text-foreground mt-2">The 12 ASCS Dimensions</h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Each dimension measures a specific capability critical to enterprise AI sales success.
              Dimensions are weighted by importance — cross-system reasoning and AI quality carry the
              highest weights (12% each), while market adoption carries the lowest (5%).
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {ASCS_DIMENSIONS.map((dim) => (
              <div
                key={dim.number}
                className="group rounded-xl border border-border bg-surface p-5 transition-all hover:border-primary/40 hover:shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-2xl font-black text-primary/30 group-hover:text-primary/60 transition-colors">
                    {dim.number.toString().padStart(2, "0")}
                  </span>
                  <span className="rounded bg-primary/10 border border-primary/20 px-2 py-0.5 text-[11px] font-mono font-bold text-primary">
                    {dim.weight}
                  </span>
                </div>
                <h3 className="mt-3 text-sm font-bold text-foreground">{dim.name}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted">{dim.description}</p>
                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-warning">Why it matters</p>
                  <p className="text-[11px] text-muted mt-0.5">{dim.whyItMatters}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: SCORING RUBRIC */}
        <section>
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Scoring System</span>
            <h2 className="text-3xl font-black text-foreground mt-2">Scoring Rubric</h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Every dimension is scored on a 0–10 scale using this standardized rubric. The rubric ensures
              consistent, comparable scoring across all vendors regardless of category or market position.
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SCORING_RUBRIC.map((row) => {
              const isLow = row.range === "0" || row.range === "1–2";
              const isMid = row.range === "3–4" || row.range === "5–6";
              const isHigh = row.range === "7–8" || row.range === "9–10";
              return (
                <div
                  key={row.range}
                  className={`rounded-xl border p-5 ${
                    isHigh
                      ? "border-success/20 bg-success/5"
                      : isMid
                        ? "border-warning/20 bg-warning/5"
                        : "border-danger/20 bg-danger/5"
                  }`}
                >
                  <span className={`font-mono text-2xl font-black ${
                    isHigh ? "text-success" : isMid ? "text-warning" : "text-danger"
                  }`}>
                    {row.range}
                  </span>
                  <p className="mt-2 text-sm font-medium text-foreground">{row.meaning}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 4: EVIDENCE CLASSIFICATION */}
        <section>
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Evidence System</span>
            <h2 className="text-3xl font-black text-foreground mt-2">Evidence Classification Taxonomy</h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Every score is backed by a classified evidence source. The classification determines how much
              weight a piece of evidence carries in the final score. This ensures transparency — you always
              know how confident we are in a score.
            </p>
          </div>

          <div className="mt-8 space-y-2">
            {EVIDENCE_TYPES.map((type) => {
              const weightNum = parseFloat(type.weight) || 0;
              const barWidth = weightNum * 100;
              return (
                <div
                  key={type.id}
                  className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-xl border border-border bg-surface p-4 transition-all hover:border-primary/30"
                >
                  <div className="flex items-center gap-3 sm:w-48 shrink-0">
                    <span className="font-mono text-lg font-black text-primary">{type.weight}</span>
                    <span className="text-sm font-bold text-foreground">{type.label}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted leading-relaxed">{type.description}</p>
                  </div>
                  <div className="w-full sm:w-32 shrink-0">
                    <div className="h-2 rounded-full bg-border overflow-hidden">
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

        {/* SECTION 5: COMPOSITE CALCULATION */}
        <section>
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Score Calculation</span>
            <h2 className="text-3xl font-black text-foreground mt-2">Composite Score Calculation</h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              The composite ASCS score is a weighted average of all tested dimensions. Each dimension
              contributes according to its weight. Dimensions classified as &ldquo;Not Tested&rdquo; are
              excluded from the average and explicitly noted in the vendor profile.
            </p>
          </div>

          <div className="mt-8 rounded-xl border border-border bg-surface p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-wider text-muted mb-4">Weight Distribution</p>
            <div className="space-y-3">
              {ASCS_DIMENSIONS.map((dim) => {
                const weightNum = parseFloat(dim.weight);
                return (
                  <div key={dim.number} className="flex items-center gap-3">
                    <span className="w-40 sm:w-56 text-xs font-medium text-foreground truncate">{dim.name}</span>
                    <div className="flex-1 h-3 rounded-full bg-border overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${weightNum * 10}%` }}
                      />
                    </div>
                    <span className="font-mono text-xs font-bold text-primary w-10 text-right">{dim.weight}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 6: BENCHMARK PROTOCOL */}
        <section>
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Benchmark Process</span>
            <h2 className="text-3xl font-black text-foreground mt-2">Benchmark Protocol</h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Every benchmark published by Reviews_CXO follows this 7-step protocol to ensure
              reproducibility, transparency, and scientific rigor.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { step: "01", title: "Research Question", desc: "A clear, buyer-oriented hypothesis that defines what we are testing." },
              { step: "02", title: "Dataset Design", desc: "Synthetic or real data with documented ground truth labels." },
              { step: "03", title: "Evaluation Environments", desc: "Representative lab configurations clearly labeled as such." },
              { step: "04", title: "Metrics", desc: "Pre-defined, standardized evaluation criteria agreed before execution." },
              { step: "05", title: "Execution", desc: "Multiple runs per environment with statistical significance testing." },
              { step: "06", title: "Analysis", desc: "Results with confidence intervals, limitations, and reproducibility instructions." },
              { step: "07", title: "Publication", desc: "Full report with dataset and code released under open licenses." },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-xl border border-border bg-surface p-5 transition-all hover:border-primary/40 hover:shadow-sm"
              >
                <span className="font-mono text-2xl font-black text-primary/30">{item.step}</span>
                <h3 className="mt-2 text-sm font-bold text-foreground">{item.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 7: REPRODUCIBILITY & PEER REVIEW */}
        <section>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Reproducibility</span>
              <h2 className="text-xl font-black text-foreground mt-2">Open & Auditable</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Any independent researcher should be able to read the ASCS specification and replicate
                the scoring methodology. All datasets are versioned and checksummed. Raw data is preserved
                and available for audit. Methodology changes between versions are documented in changelogs.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Peer Review</span>
              <h2 className="text-xl font-black text-foreground mt-2">External Advisory Board</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                The ASCS framework is reviewed by an external advisory board of 2–3 domain experts
                before publication. The advisory board audits for bias, ensures methodological rigor,
                and signs off on the framework before any public release.
              </p>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
