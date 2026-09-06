"use client";

import { useState } from "react";
import { ResearchLayout } from "@/components/layout/ResearchLayout";
import { getAllITCompanies } from "@/lib/it-companies";
import { PROJECT_CATEGORIES, BUDGET_RANGES } from "@/lib/reviews";

const companies = getAllITCompanies();

interface Step1 { companySlug: string; category: string; }
interface Step2 { projectTitle: string; problemStatement: string; aiSolutionDescription: string; techStack: string; teamSize: string; timelineMonths: string; budgetRange: string; startDate: string; completionDate: string; }
interface Step3 { outcomesDescription: string; roiPercentage: string; efficiencyGainPercentage: string; adoptionRate: string; challengesFaced: string; }
interface Step4 { deliveryQualityRating: number; aiEffectivenessRating: number; communicationRating: number; valueForMoneyRating: number; wouldRecommend: boolean; }
interface Step5 { fullName: string; title: string; companyName: string; companyDomain: string; linkedinUrl: string; isAnonymous: boolean; }

export default function SubmitReviewPage() {
  const [step, setStep] = useState(1);
  const [step1, setStep1] = useState<Step1>({ companySlug: "", category: "" });
  const [step2, setStep2] = useState<Step2>({ projectTitle: "", problemStatement: "", aiSolutionDescription: "", techStack: "", teamSize: "", timelineMonths: "", budgetRange: "", startDate: "", completionDate: "" });
  const [step3, setStep3] = useState<Step3>({ outcomesDescription: "", roiPercentage: "", efficiencyGainPercentage: "", adoptionRate: "High", challengesFaced: "" });
  const [step4, setStep4] = useState<Step4>({ deliveryQualityRating: 3, aiEffectivenessRating: 3, communicationRating: 3, valueForMoneyRating: 3, wouldRecommend: true });
  const [step5, setStep5] = useState<Step5>({ fullName: "", title: "", companyName: "", companyDomain: "", linkedinUrl: "", isAnonymous: false });
  const [submitted, setSubmitted] = useState(false);

  const selectedCompany = companies.find((c) => c.slug === step1.companySlug);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cxo_full_name: step5.fullName,
          cxo_title: step5.title,
          cxo_company_name: step5.companyName,
          cxo_email: step5.companyDomain,
          cxo_linkedin_url: step5.linkedinUrl,
          it_company_id: selectedCompany?.id,
          it_company_name: selectedCompany?.name || "",
          project_title: step2.projectTitle,
          project_category: step1.category,
          problem_statement: step2.problemStatement,
          ai_solution_description: step2.aiSolutionDescription,
          tech_stack: step2.techStack.split(",").map((s) => s.trim()).filter(Boolean),
          team_size: step2.teamSize ? parseInt(step2.teamSize) : undefined,
          timeline_months: step2.timelineMonths ? parseInt(step2.timelineMonths) : undefined,
          budget_range: step2.budgetRange,
          outcomes_description: step3.outcomesDescription,
          roi_percentage: step3.roiPercentage ? parseInt(step3.roiPercentage) : undefined,
          efficiency_gain_percentage: step3.efficiencyGainPercentage ? parseInt(step3.efficiencyGainPercentage) : undefined,
          adoption_rate: step3.adoptionRate,
          challenges_faced: step3.challengesFaced,
          delivery_quality_rating: step4.deliveryQualityRating,
          ai_effectiveness_rating: step4.aiEffectivenessRating,
          communication_rating: step4.communicationRating,
          value_for_money_rating: step4.valueForMoneyRating,
          would_recommend: step4.wouldRecommend,
          overall_rating: Math.round((step4.deliveryQualityRating + step4.aiEffectivenessRating + step4.communicationRating + step4.valueForMoneyRating) / 4),
          is_anonymous: step5.isAnonymous,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
      } else {
        setError(result.error || "Failed to submit review. Please try again.");
      }
    } catch {
      setError("Error submitting review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <ResearchLayout badge="Review Submitted" title="Review Submitted" description="Your review has been submitted for moderation. It will appear on the site after admin approval." backHref="/it-companies" backLabel="All Companies">
        <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-8 text-center">
          <p className="text-lg font-black text-green-500 mb-2">Thank You</p>
          <p className="text-sm text-muted">Your review of <span className="font-bold text-foreground">{selectedCompany?.name}</span> has been submitted. Our team will verify and publish it within 48 hours.</p>
        </div>
      </ResearchLayout>
    );
  }

  return (
    <ResearchLayout badge="Submit Review" title="Submit a Project Review" description="Share your experience with an AI project delivered by an IT company. Verified CxO reviews help the community." backHref="/it-companies" backLabel="All Companies">
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((s) => (
            <div key={s} className={`flex items-center gap-2 ${s < 5 ? "flex-1" : ""}`}>
              <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${step >= s ? "bg-primary text-primary-foreground" : "bg-surface-alt border border-border text-muted"}`}>
                {s}
              </div>
              {s < 5 && <div className={`flex-1 h-0.5 ${step > s ? "bg-primary" : "bg-surface-alt"}`} />}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="rounded-xl border border-border bg-surface p-5 space-y-4">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-muted">Step 1: Company & Category</h3>
              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">IT Company *</label>
                <select value={step1.companySlug} onChange={(e) => setStep1((p) => ({ ...p, companySlug: e.target.value }))} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" required>
                  <option value="">Select a company</option>
                  {companies.map((c) => <option key={c.id} value={c.slug}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">Project Category *</label>
                <select value={step1.category} onChange={(e) => setStep1((p) => ({ ...p, category: e.target.value }))} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" required>
                  <option value="">Select category</option>
                  {PROJECT_CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div className="flex justify-end pt-2">
                <button type="button" onClick={() => setStep(2)} disabled={!step1.companySlug || !step1.category} className="rounded-lg border border-primary bg-primary px-6 py-2 text-xs font-bold text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50">Next →</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="rounded-xl border border-border bg-surface p-5 space-y-4">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-muted">Step 2: Project Details</h3>
              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">Project Title *</label>
                <input type="text" value={step2.projectTitle} onChange={(e) => setStep2((p) => ({ ...p, projectTitle: e.target.value }))} placeholder="e.g., AI Sales Pipeline for Manufacturing" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">Problem Statement *</label>
                <textarea value={step2.problemStatement} onChange={(e) => setStep2((p) => ({ ...p, problemStatement: e.target.value }))} placeholder="What was the business problem?" rows={3} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">AI Solution Description *</label>
                <textarea value={step2.aiSolutionDescription} onChange={(e) => setStep2((p) => ({ ...p, aiSolutionDescription: e.target.value }))} placeholder="How did the IT company solve it with AI?" rows={4} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">Tech Stack (comma-separated)</label>
                <input type="text" value={step2.techStack} onChange={(e) => setStep2((p) => ({ ...p, techStack: e.target.value }))} placeholder="Python, TensorFlow, AWS" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-foreground mb-1.5">Team Size</label>
                  <input type="number" value={step2.teamSize} onChange={(e) => setStep2((p) => ({ ...p, teamSize: e.target.value }))} placeholder="5" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-foreground mb-1.5">Timeline (months)</label>
                  <input type="number" value={step2.timelineMonths} onChange={(e) => setStep2((p) => ({ ...p, timelineMonths: e.target.value }))} placeholder="6" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">Budget Range</label>
                <select value={step2.budgetRange} onChange={(e) => setStep2((p) => ({ ...p, budgetRange: e.target.value }))} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                  <option value="">Select budget</option>
                  {BUDGET_RANGES.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div className="flex justify-between pt-2">
                <button type="button" onClick={() => setStep(1)} className="rounded-lg border border-border bg-surface-alt px-4 py-2 text-xs font-bold text-foreground hover:border-primary/40 transition-colors">← Back</button>
                <button type="button" onClick={() => setStep(3)} disabled={!step2.projectTitle || !step2.problemStatement || !step2.aiSolutionDescription} className="rounded-lg border border-primary bg-primary px-6 py-2 text-xs font-bold text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50">Next →</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="rounded-xl border border-border bg-surface p-5 space-y-4">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-muted">Step 3: Outcomes & Metrics</h3>
              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">Outcomes Description *</label>
                <textarea value={step3.outcomesDescription} onChange={(e) => setStep3((p) => ({ ...p, outcomesDescription: e.target.value }))} placeholder="What were the results? Include specific metrics." rows={4} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-foreground mb-1.5">ROI (%)</label>
                  <input type="number" value={step3.roiPercentage} onChange={(e) => setStep3((p) => ({ ...p, roiPercentage: e.target.value }))} placeholder="150" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-foreground mb-1.5">Efficiency Gain (%)</label>
                  <input type="number" value={step3.efficiencyGainPercentage} onChange={(e) => setStep3((p) => ({ ...p, efficiencyGainPercentage: e.target.value }))} placeholder="40" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">Adoption Rate</label>
                <select value={step3.adoptionRate} onChange={(e) => setStep3((p) => ({ ...p, adoptionRate: e.target.value }))} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">Challenges Faced</label>
                <textarea value={step3.challengesFaced} onChange={(e) => setStep3((p) => ({ ...p, challengesFaced: e.target.value }))} placeholder="What challenges did you face?" rows={3} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y" />
              </div>
              <div className="flex justify-between pt-2">
                <button type="button" onClick={() => setStep(2)} className="rounded-lg border border-border bg-surface-alt px-4 py-2 text-xs font-bold text-foreground hover:border-primary/40 transition-colors">← Back</button>
                <button type="button" onClick={() => setStep(4)} disabled={!step3.outcomesDescription} className="rounded-lg border border-primary bg-primary px-6 py-2 text-xs font-bold text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50">Next →</button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="rounded-xl border border-border bg-surface p-5 space-y-4">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-muted">Step 4: Ratings</h3>
              {[
                { key: "deliveryQualityRating" as const, label: "Delivery Quality" },
                { key: "aiEffectivenessRating" as const, label: "AI Effectiveness" },
                { key: "communicationRating" as const, label: "Communication" },
                { key: "valueForMoneyRating" as const, label: "Value for Money" },
              ].map((item) => (
                <div key={item.key}>
                  <label className="block text-xs font-bold text-foreground mb-1.5">{item.label}</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button key={n} type="button" onClick={() => setStep4((p) => ({ ...p, [item.key]: n }))} className={`h-10 w-10 rounded-lg border text-sm font-bold transition-colors ${step4[item.key] === n ? "bg-primary border-primary text-primary-foreground" : "bg-surface-alt border-border text-muted hover:border-primary/40"}`}>
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <div>
                <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                  <input type="checkbox" checked={step4.wouldRecommend} onChange={(e) => setStep4((p) => ({ ...p, wouldRecommend: e.target.checked }))} className="accent-primary" />
                  I would recommend this company
                </label>
              </div>
              <div className="flex justify-between pt-2">
                <button type="button" onClick={() => setStep(3)} className="rounded-lg border border-border bg-surface-alt px-4 py-2 text-xs font-bold text-foreground hover:border-primary/40 transition-colors">← Back</button>
                <button type="button" onClick={() => setStep(5)} className="rounded-lg border border-primary bg-primary px-6 py-2 text-xs font-bold text-primary-foreground hover:bg-primary/90 transition-colors">Next →</button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="rounded-xl border border-border bg-surface p-5 space-y-4">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-muted">Step 5: Your Information</h3>
              <p className="text-xs text-muted">Your identity is verified but not publicly displayed unless you choose.</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-foreground mb-1.5">Full Name *</label>
                  <input type="text" value={step5.fullName} onChange={(e) => setStep5((p) => ({ ...p, fullName: e.target.value }))} placeholder="Jane Smith" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-foreground mb-1.5">Title *</label>
                  <input type="text" value={step5.title} onChange={(e) => setStep5((p) => ({ ...p, title: e.target.value }))} placeholder="CTO" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-foreground mb-1.5">Company Name *</label>
                  <input type="text" value={step5.companyName} onChange={(e) => setStep5((p) => ({ ...p, companyName: e.target.value }))} placeholder="Acme Corp" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-foreground mb-1.5">Company Domain *</label>
                  <input type="text" value={step5.companyDomain} onChange={(e) => setStep5((p) => ({ ...p, companyDomain: e.target.value }))} placeholder="acme.com" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50" required />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">LinkedIn URL</label>
                <input type="url" value={step5.linkedinUrl} onChange={(e) => setStep5((p) => ({ ...p, linkedinUrl: e.target.value }))} placeholder="https://linkedin.com/in/..." className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                  <input type="checkbox" checked={step5.isAnonymous} onChange={(e) => setStep5((p) => ({ ...p, isAnonymous: e.target.checked }))} className="accent-primary" />
                  Submit anonymously (name not shown publicly)
                </label>
              </div>
              {error && (
                <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-3 text-xs text-red-500">
                  {error}
                </div>
              )}
              <div className="flex justify-between pt-2">
                <button type="button" onClick={() => setStep(4)} className="rounded-lg border border-border bg-surface-alt px-4 py-2 text-xs font-bold text-foreground hover:border-primary/40 transition-colors">← Back</button>
                <button type="submit" disabled={!step5.fullName || !step5.title || !step5.companyName || !step5.companyDomain || isSubmitting} className="rounded-lg border border-primary bg-primary px-6 py-2 text-xs font-bold text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50">
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </ResearchLayout>
  );
}
