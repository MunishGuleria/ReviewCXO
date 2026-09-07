"use client";

import { useState } from "react";
import { ResearchLayout } from "@/components/layout/ResearchLayout";
import { VENDORS } from "@/lib/vendors";
import { PROJECT_CATEGORIES, BUDGET_RANGES } from "@/lib/reviews";

const vendors = VENDORS;

interface Step1 { companySlug: string; category: string; }
interface Step2 { projectTitle: string; problemStatement: string; aiSolutionDescription: string; techStack: string; teamSize: string; timelineMonths: string; budgetRange: string; startDate: string; completionDate: string; }
interface Step3 { outcomesDescription: string; roiPercentage: string; efficiencyGainPercentage: string; adoptionRate: string; challengesFaced: string; }
interface Step4 { deliveryQualityRating: number; aiEffectivenessRating: number; communicationRating: number; valueForMoneyRating: number; wouldRecommend: boolean; }
interface Step5 { fullName: string; title: string; companyName: string; workEmail: string; companyDomain: string; linkedinUrl: string; isAnonymous: boolean; }

export default function SubmitReviewPage() {
  const [step, setStep] = useState(1);
  const [step1, setStep1] = useState<Step1>({ companySlug: "", category: "" });
  const [step2, setStep2] = useState<Step2>({ projectTitle: "", problemStatement: "", aiSolutionDescription: "", techStack: "", teamSize: "", timelineMonths: "", budgetRange: "", startDate: "", completionDate: "" });
  const [step3, setStep3] = useState<Step3>({ outcomesDescription: "", roiPercentage: "", efficiencyGainPercentage: "", adoptionRate: "High", challengesFaced: "" });
  const [step4, setStep4] = useState<Step4>({ deliveryQualityRating: 3, aiEffectivenessRating: 3, communicationRating: 3, valueForMoneyRating: 3, wouldRecommend: true });
  const [step5, setStep5] = useState<Step5>({ fullName: "", title: "", companyName: "", workEmail: "", companyDomain: "", linkedinUrl: "", isAnonymous: false });
  const [submitted, setSubmitted] = useState(false);

  const selectedVendor = vendors.find((v) => v.slug === step1.companySlug);

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
          cxo_email: step5.workEmail,
          cxo_linkedin_url: step5.linkedinUrl,
          it_company_id: selectedVendor?.slug,
          it_company_name: selectedVendor?.name || "",

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
      <ResearchLayout badge="Review Submitted" title="Review Submitted" description="Your review has been submitted for moderation. It will appear on the site after admin approval." backHref="/vendors" backLabel="All Vendors">
        <div className="card-premium p-8 text-center border-success/30 bg-success/5">
          <p className="text-lg font-bold text-success mb-2">Thank You</p>
          <p className="text-sm text-muted-foreground">Your review of <span className="font-semibold text-foreground">{selectedVendor?.name}</span> has been submitted. Our team will verify and publish it within 48 hours.</p>
        </div>
      </ResearchLayout>
    );
  }

  return (
    <ResearchLayout badge="Submit Review" title="Submit a Vendor Implementation Review" description="Share your experience with enterprise software or AI platforms. Verified CxO reviews help the community." backHref="/vendors" backLabel="All Vendors">
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-6">
          {[1, 2, 3, 4, 5].map((s) => (
            <div key={s} className={`flex items-center gap-2 ${s < 5 ? "flex-1" : ""}`}>
              <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${step >= s ? "bg-primary text-primary-foreground" : "bg-surface-alt border border-border text-muted-foreground"}`}>
                {s}
              </div>
              {s < 5 && <div className={`flex-1 h-px ${step > s ? "bg-primary" : "bg-border"}`} />}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="card-premium p-6 space-y-5">
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground border-b border-border pb-3">Step 1: Vendor & Category</h3>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">Software / Technology Vendor *</label>
                <select value={step1.companySlug} onChange={(e) => setStep1((p) => ({ ...p, companySlug: e.target.value }))} className="input-base w-full" required>
                  <option value="">Select a vendor</option>
                  {vendors.map((v) => <option key={v.slug} value={v.slug}>{v.name} ({v.category})</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">Project Category *</label>
                <select value={step1.category} onChange={(e) => setStep1((p) => ({ ...p, category: e.target.value }))} className="input-base w-full" required>
                  <option value="">Select category</option>
                  {PROJECT_CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div className="flex justify-end pt-4">
                <button type="button" onClick={() => setStep(2)} disabled={!step1.companySlug || !step1.category} className="btn-primary disabled:opacity-50">Next →</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="card-premium p-6 space-y-5">
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground border-b border-border pb-3">Step 2: Project Details</h3>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">Project Title *</label>
                <input type="text" value={step2.projectTitle} onChange={(e) => setStep2((p) => ({ ...p, projectTitle: e.target.value }))} placeholder="e.g., AI Sales Pipeline for Manufacturing" className="input-base w-full" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">Problem Statement *</label>
                <textarea value={step2.problemStatement} onChange={(e) => setStep2((p) => ({ ...p, problemStatement: e.target.value }))} placeholder="What was the business problem?" rows={3} className="input-base w-full resize-y" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">Vendor Solution Description *</label>
                <textarea value={step2.aiSolutionDescription} onChange={(e) => setStep2((p) => ({ ...p, aiSolutionDescription: e.target.value }))} placeholder="How did the vendor solution address this problem?" rows={4} className="input-base w-full resize-y" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">Tech Stack (comma-separated)</label>
                <input type="text" value={step2.techStack} onChange={(e) => setStep2((p) => ({ ...p, techStack: e.target.value }))} placeholder="Python, TensorFlow, AWS" className="input-base w-full" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">Team Size</label>
                  <input type="number" value={step2.teamSize} onChange={(e) => setStep2((p) => ({ ...p, teamSize: e.target.value }))} placeholder="5" className="input-base w-full" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">Timeline (months)</label>
                  <input type="number" value={step2.timelineMonths} onChange={(e) => setStep2((p) => ({ ...p, timelineMonths: e.target.value }))} placeholder="6" className="input-base w-full" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">Budget Range</label>
                <select value={step2.budgetRange} onChange={(e) => setStep2((p) => ({ ...p, budgetRange: e.target.value }))} className="input-base w-full">
                  <option value="">Select budget</option>
                  {BUDGET_RANGES.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div className="flex justify-between pt-4">
                <button type="button" onClick={() => setStep(1)} className="btn-secondary">← Back</button>
                <button type="button" onClick={() => setStep(3)} disabled={!step2.projectTitle || !step2.problemStatement || !step2.aiSolutionDescription} className="btn-primary disabled:opacity-50">Next →</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="card-premium p-6 space-y-5">
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground border-b border-border pb-3">Step 3: Outcomes & Metrics</h3>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">Outcomes Description *</label>
                <textarea value={step3.outcomesDescription} onChange={(e) => setStep3((p) => ({ ...p, outcomesDescription: e.target.value }))} placeholder="What were the results? Include specific metrics." rows={4} className="input-base w-full resize-y" required />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">ROI (%)</label>
                  <input type="number" value={step3.roiPercentage} onChange={(e) => setStep3((p) => ({ ...p, roiPercentage: e.target.value }))} placeholder="150" className="input-base w-full" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">Efficiency Gain (%)</label>
                  <input type="number" value={step3.efficiencyGainPercentage} onChange={(e) => setStep3((p) => ({ ...p, efficiencyGainPercentage: e.target.value }))} placeholder="40" className="input-base w-full" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">Adoption Rate</label>
                <select value={step3.adoptionRate} onChange={(e) => setStep3((p) => ({ ...p, adoptionRate: e.target.value }))} className="input-base w-full">
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">Challenges Faced</label>
                <textarea value={step3.challengesFaced} onChange={(e) => setStep3((p) => ({ ...p, challengesFaced: e.target.value }))} placeholder="What challenges did you face?" rows={3} className="input-base w-full resize-y" />
              </div>
              <div className="flex justify-between pt-4">
                <button type="button" onClick={() => setStep(2)} className="btn-secondary">← Back</button>
                <button type="button" onClick={() => setStep(4)} disabled={!step3.outcomesDescription} className="btn-primary disabled:opacity-50">Next →</button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="card-premium p-6 space-y-5">
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground border-b border-border pb-3">Step 4: Ratings</h3>
              {[
                { key: "deliveryQualityRating" as const, label: "Delivery Quality" },
                { key: "aiEffectivenessRating" as const, label: "AI Effectiveness" },
                { key: "communicationRating" as const, label: "Communication" },
                { key: "valueForMoneyRating" as const, label: "Value for Money" },
              ].map((item) => (
                <div key={item.key}>
                  <label className="block text-sm font-semibold text-foreground mb-2">{item.label}</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button key={n} type="button" onClick={() => setStep4((p) => ({ ...p, [item.key]: n }))} className={`h-10 w-10 rounded border text-sm font-bold transition-colors ${step4[item.key] === n ? "bg-primary border-primary text-primary-foreground" : "bg-surface border-border text-muted-foreground hover:border-border-strong hover:bg-surface-alt"}`}>
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <div className="pt-2">
                <label className="flex items-center gap-3 text-sm font-medium text-foreground cursor-pointer">
                  <input type="checkbox" checked={step4.wouldRecommend} onChange={(e) => setStep4((p) => ({ ...p, wouldRecommend: e.target.checked }))} className="h-4 w-4 rounded border-border text-primary focus:ring-primary" />
                  I would recommend this company
                </label>
              </div>
              <div className="flex justify-between pt-4 border-t border-border mt-6">
                <button type="button" onClick={() => setStep(3)} className="btn-secondary">← Back</button>
                <button type="button" onClick={() => setStep(5)} className="btn-primary">Next →</button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="card-premium p-6 space-y-5">
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground border-b border-border pb-3">Step 5: Your Information</h3>
              <p className="text-sm text-muted-foreground">Your identity is verified but not publicly displayed unless you choose.</p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">Full Name *</label>
                  <input type="text" value={step5.fullName} onChange={(e) => setStep5((p) => ({ ...p, fullName: e.target.value }))} placeholder="Jane Smith" className="input-base w-full" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">Title *</label>
                  <input type="text" value={step5.title} onChange={(e) => setStep5((p) => ({ ...p, title: e.target.value }))} placeholder="CTO" className="input-base w-full" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">Company Name *</label>
                  <input type="text" value={step5.companyName} onChange={(e) => setStep5((p) => ({ ...p, companyName: e.target.value }))} placeholder="Acme Corp" className="input-base w-full" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">Work Email (for verification) *</label>
                  <input type="email" value={step5.workEmail} onChange={(e) => setStep5((p) => ({ ...p, workEmail: e.target.value }))} placeholder="jane@acme.com" className="input-base w-full" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">Company Domain</label>
                  <input type="text" value={step5.companyDomain} onChange={(e) => setStep5((p) => ({ ...p, companyDomain: e.target.value }))} placeholder="acme.com" className="input-base w-full" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">LinkedIn URL</label>
                  <input type="url" value={step5.linkedinUrl} onChange={(e) => setStep5((p) => ({ ...p, linkedinUrl: e.target.value }))} placeholder="https://linkedin.com/in/..." className="input-base w-full" />
                </div>
              </div>
              <div className="pt-2">
                <label className="flex items-center gap-3 text-sm font-medium text-foreground cursor-pointer">
                  <input type="checkbox" checked={step5.isAnonymous} onChange={(e) => setStep5((p) => ({ ...p, isAnonymous: e.target.checked }))} className="h-4 w-4 rounded border-border text-primary focus:ring-primary" />
                  Submit anonymously (name not shown publicly)
                </label>
              </div>
              {error && (
                <div className="rounded border border-danger/30 bg-danger/5 p-4 text-sm font-medium text-danger">
                  {error}
                </div>
              )}
              <div className="flex justify-between pt-4 border-t border-border mt-6">
                <button type="button" onClick={() => setStep(4)} className="btn-secondary">← Back</button>
                <button type="submit" disabled={!step5.fullName || !step5.title || !step5.companyName || !step5.workEmail || isSubmitting} className="btn-primary disabled:opacity-50">
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
