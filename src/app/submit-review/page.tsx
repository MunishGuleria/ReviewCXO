"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import Link from "next/link";

const VISIBLE_VENDORS = [
  "Salesforce",
  "Microsoft Dynamics 365",
  "Salesforce Einstein AI",
  "Microsoft Copilot for Sales",
  "SAP Joule",
];

const PROJECT_CATEGORIES = [
  "AI Sales",
  "CRM & ERP",
  "Marketing Automation",
  "Customer Support",
  "Data Analytics",
  "DevOps & Engineering",
  "Finance & Accounting",
  "HR & Operations",
  "Other",
];

type FormData = {
  cxo_full_name: string;
  cxo_title: string;
  cxo_company_name: string;
  cxo_email: string;
  cxo_linkedin_url: string;
  it_company_name: string;
  project_title: string;
  project_category: string;
  problem_statement: string;
  ai_solution_description: string;
  tech_stack: string;
  team_size: string;
  timeline_months: string;
  budget_range: string;
  outcomes_description: string;
  roi_percentage: string;
  efficiency_gain_percentage: string;
  adoption_rate: string;
  challenges_faced: string;
  delivery_quality_rating: number;
  ai_effectiveness_rating: number;
  communication_rating: number;
  value_for_money_rating: number;
  would_recommend: boolean;
  overall_rating: number;
  is_anonymous: boolean;
};

const INITIAL: FormData = {
  cxo_full_name: "",
  cxo_title: "",
  cxo_company_name: "",
  cxo_email: "",
  cxo_linkedin_url: "",
  it_company_name: "",
  project_title: "",
  project_category: "AI Sales",
  problem_statement: "",
  ai_solution_description: "",
  tech_stack: "",
  team_size: "",
  timeline_months: "",
  budget_range: "",
  outcomes_description: "",
  roi_percentage: "",
  efficiency_gain_percentage: "",
  adoption_rate: "Medium",
  challenges_faced: "",
  delivery_quality_rating: 0,
  ai_effectiveness_rating: 0,
  communication_rating: 0,
  value_for_money_rating: 0,
  would_recommend: true,
  overall_rating: 0,
  is_anonymous: false,
};

function StarRating({
  value,
  onChange,
  label,
}: {
  value: number;
  onChange: (v: number) => void;
  label: string;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-foreground mb-1.5">{label}</label>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className="text-2xl transition-colors"
            aria-label={`${n} star${n > 1 ? "s" : ""}`}
          >
            {n <= value ? "★" : "☆"}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function SubmitReviewPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormData>(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        if (!data.user) router.replace("/login?next=/submit-review");
        else setCheckingAuth(false);
      })
      .catch(() => router.replace("/login?next=/submit-review"));
  }, [router]);

  const set = <K extends keyof FormData>(key: K, val: FormData[K]) =>
    setForm((p) => ({ ...p, [key]: val }));

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);

    const payload: Record<string, unknown> = {
      cxo_full_name: form.cxo_full_name,
      cxo_title: form.cxo_title,
      cxo_company_name: form.cxo_company_name,
      cxo_email: form.cxo_email,
      it_company_name: form.it_company_name,
      project_title: form.project_title,
      project_category: form.project_category,
      problem_statement: form.problem_statement || undefined,
      ai_solution_description: form.ai_solution_description || undefined,
      outcomes_description: form.outcomes_description || undefined,
      challenges_faced: form.challenges_faced || undefined,
      adoption_rate: form.adoption_rate,
      budget_range: form.budget_range || undefined,
      is_anonymous: form.is_anonymous,
      would_recommend: form.would_recommend,
      review_type: "case_study",
    };

    if (form.cxo_linkedin_url) payload.cxo_linkedin_url = form.cxo_linkedin_url;
    if (form.tech_stack) payload.tech_stack = form.tech_stack.split(",").map((s) => s.trim()).filter(Boolean);
    if (form.team_size) payload.team_size = Number(form.team_size);
    if (form.timeline_months) payload.timeline_months = Number(form.timeline_months);
    if (form.roi_percentage) payload.roi_percentage = Number(form.roi_percentage);
    if (form.efficiency_gain_percentage) payload.efficiency_gain_percentage = Number(form.efficiency_gain_percentage);
    if (form.delivery_quality_rating) payload.delivery_quality_rating = form.delivery_quality_rating;
    if (form.ai_effectiveness_rating) payload.ai_effectiveness_rating = form.ai_effectiveness_rating;
    if (form.communication_rating) payload.communication_rating = form.communication_rating;
    if (form.value_for_money_rating) payload.value_for_money_rating = form.value_for_money_rating;
    if (form.overall_rating) payload.overall_rating = form.overall_rating;

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setResult({
        ok: data.success,
        message: data.success
          ? "Review submitted! Our team will review it and notify you by email."
          : data.error || "Submission failed.",
      });
      if (data.success) setForm(INITIAL);
    } catch {
      setResult({ ok: false, message: "Network error. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  const inputCls =
    "w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors";
  const selectCls = inputCls + " appearance-none";
  const textareaCls = inputCls + " min-h-[100px] resize-y";

  if (checkingAuth) {
    return (
      <>
        <PageHeader badge="Community" title="Submit a Project Review" description="Share your experience evaluating or implementing an AI sales platform." />
        <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="card-premium p-6 sm:p-10">
            <div className="text-sm text-muted py-8 text-center">Checking authentication...</div>
          </div>
        </div>
      </>
    );
  }

  if (result?.ok) {
    return (
      <>
        <PageHeader badge="Community" title="Submit a Project Review" description="Share your experience evaluating or implementing an AI sales platform." />
        <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="card-premium p-6 sm:p-10 text-center py-8">
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-green-500 text-xl font-bold">&#10003;</span>
            </div>
            <h2 className="text-lg font-bold text-foreground mb-2">Review Submitted!</h2>
            <p className="text-sm text-muted mb-6">{result.message}</p>
            <Link href="/" className="btn-primary">Back to Home</Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        badge="Community"
        title="Submit a Project Review"
        description="Share your experience evaluating or implementing an AI sales platform. Our analysts will review your submission before publication."
      />
      <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="card-premium p-6 sm:p-10">
          {result && !result.ok && (
            <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm font-medium text-red-600">
              {result.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* ── Your Details ── */}
            <section>
              <h2 className="text-lg font-black text-foreground mb-4">Your Details</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">Full Name *</label>
                  <input type="text" required className={inputCls} placeholder="Jane Doe" value={form.cxo_full_name} onChange={(e) => set("cxo_full_name", e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">Title / Role *</label>
                  <input type="text" required className={inputCls} placeholder="VP of Sales" value={form.cxo_title} onChange={(e) => set("cxo_title", e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">Your Company *</label>
                  <input type="text" required className={inputCls} placeholder="Acme Corp" value={form.cxo_company_name} onChange={(e) => set("cxo_company_name", e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">Work Email *</label>
                  <input type="email" required className={inputCls} placeholder="jane@acme.com" value={form.cxo_email} onChange={(e) => set("cxo_email", e.target.value)} />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-foreground mb-1.5">LinkedIn URL (optional)</label>
                  <input type="url" className={inputCls} placeholder="https://linkedin.com/in/janedoe" value={form.cxo_linkedin_url} onChange={(e) => set("cxo_linkedin_url", e.target.value)} />
                </div>
              </div>
              <label className="mt-4 flex items-center gap-2 text-sm text-secondary-foreground cursor-pointer">
                <input type="checkbox" checked={form.is_anonymous} onChange={(e) => set("is_anonymous", e.target.checked)} className="rounded border-border" />
                Submit anonymously (your name won&apos;t be shown publicly)
              </label>
            </section>

            {/* ── Project Details ── */}
            <section>
              <h2 className="text-lg font-black text-foreground mb-4">Project Details</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-foreground mb-1.5">Platform / Vendor *</label>
                  <select required className={selectCls} value={form.it_company_name} onChange={(e) => set("it_company_name", e.target.value)}>
                    <option value="">Select a platform...</option>
                    {VISIBLE_VENDORS.map((v) => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-foreground mb-1.5">Project Title *</label>
                  <input type="text" required className={inputCls} placeholder="e.g. AI-Powered Lead Scoring Rollout" value={form.project_title} onChange={(e) => set("project_title", e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">Category *</label>
                  <select required className={selectCls} value={form.project_category} onChange={(e) => set("project_category", e.target.value)}>
                    {PROJECT_CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">Budget Range</label>
                  <input type="text" className={inputCls} placeholder="e.g. $50k-$100k" value={form.budget_range} onChange={(e) => set("budget_range", e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">Team Size</label>
                  <input type="number" min="1" className={inputCls} placeholder="e.g. 25" value={form.team_size} onChange={(e) => set("team_size", e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">Timeline (months)</label>
                  <input type="number" min="1" className={inputCls} placeholder="e.g. 6" value={form.timeline_months} onChange={(e) => set("timeline_months", e.target.value)} />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-foreground mb-1.5">Tech Stack (comma-separated)</label>
                  <input type="text" className={inputCls} placeholder="e.g. Salesforce Einstein, MuleSoft, Tableau" value={form.tech_stack} onChange={(e) => set("tech_stack", e.target.value)} />
                </div>
              </div>
            </section>

            {/* ── Narrative ── */}
            <section>
              <h2 className="text-lg font-black text-foreground mb-4">Project Narrative</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">Problem Statement</label>
                  <textarea className={textareaCls} placeholder="What business problem were you trying to solve?" value={form.problem_statement} onChange={(e) => set("problem_statement", e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">AI Solution Description</label>
                  <textarea className={textareaCls} placeholder="How did the platform address the problem?" value={form.ai_solution_description} onChange={(e) => set("ai_solution_description", e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">Outcomes & Results</label>
                  <textarea className={textareaCls} placeholder="What measurable results did you achieve?" value={form.outcomes_description} onChange={(e) => set("outcomes_description", e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">Challenges Faced</label>
                  <textarea className={textareaCls} placeholder="What went wrong or was harder than expected?" value={form.challenges_faced} onChange={(e) => set("challenges_faced", e.target.value)} />
                </div>
              </div>
            </section>

            {/* ── Metrics ── */}
            <section>
              <h2 className="text-lg font-black text-foreground mb-4">Metrics (Optional)</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">ROI %</label>
                  <input type="number" min="0" max="10000" className={inputCls} placeholder="e.g. 250" value={form.roi_percentage} onChange={(e) => set("roi_percentage", e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">Efficiency Gain %</label>
                  <input type="number" min="0" max="100" className={inputCls} placeholder="e.g. 35" value={form.efficiency_gain_percentage} onChange={(e) => set("efficiency_gain_percentage", e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">Adoption Rate</label>
                  <select className={selectCls} value={form.adoption_rate} onChange={(e) => set("adoption_rate", e.target.value)}>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>
            </section>

            {/* ── Ratings ── */}
            <section>
              <h2 className="text-lg font-black text-foreground mb-4">Ratings</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <StarRating label="Overall Rating" value={form.overall_rating} onChange={(v) => set("overall_rating", v)} />
                <StarRating label="Delivery Quality" value={form.delivery_quality_rating} onChange={(v) => set("delivery_quality_rating", v)} />
                <StarRating label="AI Effectiveness" value={form.ai_effectiveness_rating} onChange={(v) => set("ai_effectiveness_rating", v)} />
                <StarRating label="Communication" value={form.communication_rating} onChange={(v) => set("communication_rating", v)} />
                <StarRating label="Value for Money" value={form.value_for_money_rating} onChange={(v) => set("value_for_money_rating", v)} />
              </div>
              <label className="mt-6 flex items-center gap-2 text-sm text-secondary-foreground cursor-pointer">
                <input type="checkbox" checked={form.would_recommend} onChange={(e) => set("would_recommend", e.target.checked)} className="rounded border-border" />
                I would recommend this platform to other enterprises
              </label>
            </section>

            {/* ── Submit ── */}
            <div className="pt-4 border-t border-border">
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Submitting..." : "Submit Review"}
              </button>
              <p className="mt-3 text-xs text-muted-foreground">
                By submitting you agree to our{" "}
                <Link href="/about/editorial-policy" className="underline hover:text-foreground">editorial policy</Link>.
                Our analysts will review your submission before publication.
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
