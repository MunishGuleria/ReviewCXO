"use client";

import { useEffect, useState } from "react";
import { ResearchLayout } from "@/components/layout/ResearchLayout";

interface SubmittedReview {
  id: string;
  cxo_full_name: string;
  cxo_title: string;
  cxo_company_name: string;
  cxo_email: string;
  it_company_name: string;
  project_title: string;
  project_category: string;
  overall_rating: number;
  status: string;
  created_at: string;
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<SubmittedReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/reviews")
      .then((r) => r.json())
      .then((data) => setReviews(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function handleApprove(id: string) {
    if (!confirm("Approve this review for publication?")) return;
    setActionId(id);
    try {
      const res = await fetch(`/api/admin/reviews/${id}/approve`, { method: "POST" });
      if (res.ok) setReviews((prev) => prev.filter((r) => r.id !== id));
    } finally {
      setActionId(null);
    }
  }

  async function handleReject(id: string) {
    const reason = prompt("Rejection reason (optional, for internal logging):");
    if (reason === null) return;
    setActionId(id);
    try {
      const res = await fetch(`/api/admin/reviews/${id}/reject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason }),
      });
      if (res.ok) setReviews((prev) => prev.filter((r) => r.id !== id));
    } finally {
      setActionId(null);
    }
  }

  return (
    <ResearchLayout badge="Admin Workspace" title="Review Moderation" description="Approve or reject submitted enterprise platform reviews." backHref="/admin" backLabel="Admin Dashboard">
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            Pending Reviews
          </h2>
          <span className="bg-blue-500/10 text-blue-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{reviews.length} Awaiting Action</span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-pulse">
            {[1,2,3,4].map(i => <div key={i} className="h-64 bg-surface-alt rounded-2xl border border-border"></div>)}
          </div>
        ) : reviews.length === 0 ? (
          <div className="bg-surface border border-border rounded-2xl p-16 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4 text-blue-500">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            </div>
            <h3 className="text-lg font-bold text-foreground">Inbox Zero</h3>
            <p className="text-sm text-muted-foreground mt-2 max-w-md">There are currently no pending project reviews requiring moderation. New submissions will appear here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {reviews.map((review) => (
              <div key={review.id} className="rounded-2xl border border-border bg-surface hover:border-primary/40 hover:shadow-sm transition-all p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1 block">Project Submission</span>
                      <h4 className="text-base font-bold text-foreground leading-tight pr-4">{review.project_title}</h4>
                      <p className="text-sm text-muted-foreground mt-1.5 font-medium">
                        {review.it_company_name} <span className="mx-1.5 opacity-50">&middot;</span> {review.project_category}
                      </p>
                    </div>
                    <div className="bg-yellow-500/10 text-yellow-600 border border-yellow-500/20 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider shrink-0 flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse"></div>
                      Pending
                    </div>
                  </div>
                  
                  <div className="bg-surface-alt rounded-xl p-4 mb-6 border border-border/50">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Executive Contact</p>
                        <p className="text-sm font-semibold text-foreground">{review.cxo_full_name}</p>
                        <p className="text-muted-foreground text-xs mt-0.5">{review.cxo_title}</p>
                        <p className="text-muted-foreground text-xs">{review.cxo_company_name}</p>
                        <p className="font-mono text-xs text-primary-text mt-1.5 bg-background border border-border px-1.5 py-0.5 rounded w-max">{review.cxo_email}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Details</p>
                        <div className="flex items-center gap-2 mb-2 bg-background border border-border px-2 py-1.5 rounded w-max">
                          <span className="text-xs font-medium text-muted-foreground">Rating:</span>
                          <span className="text-xs font-black text-primary">{review.overall_rating}/5</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1.5">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                          {new Date(review.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-border">
                  <button
                    onClick={() => handleApprove(review.id)}
                    disabled={actionId === review.id}
                    className="flex-1 bg-primary text-primary-foreground px-4 py-2.5 rounded-lg text-sm font-bold hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center justify-center gap-2"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    {actionId === review.id ? "Processing..." : "Approve"}
                  </button>
                  <button
                    onClick={() => handleReject(review.id)}
                    disabled={actionId === review.id}
                    className="flex-1 bg-surface-alt border border-border text-foreground px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-danger/10 hover:text-danger hover:border-danger/30 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    {actionId === review.id ? "Processing..." : "Reject"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ResearchLayout>
  );
}
