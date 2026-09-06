"use client";

import { useEffect, useState } from "react";
import { ResearchLayout } from "@/components/layout/ResearchLayout";
import { StatusBadge } from "@/components/ui/StatusBadge";

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
    if (!confirm("Approve this review?")) return;
    setActionId(id);
    try {
      const res = await fetch(`/api/admin/reviews/${id}/approve`, { method: "POST" });
      if (res.ok) setReviews((prev) => prev.filter((r) => r.id !== id));
    } finally {
      setActionId(null);
    }
  }

  async function handleReject(id: string) {
    const reason = prompt("Rejection reason (optional):");
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
    <ResearchLayout badge="Admin" title="Review Moderation" description="Approve or reject submitted reviews." backHref="/admin" backLabel="Admin">
      <div className="space-y-4">
        <div className="flex items-center gap-4 text-sm text-muted">
          <span><span className="font-bold text-yellow-500">{reviews.length}</span> pending</span>
        </div>

        {loading ? (
          <div className="text-sm text-muted py-8 text-center">Loading...</div>
        ) : reviews.length === 0 ? (
          <div className="text-sm text-muted py-8 text-center">No pending reviews</div>
        ) : (
          <div className="space-y-3">
            {reviews.map((review) => (
              <div key={review.id} className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-sm font-bold text-foreground">{review.project_title}</h4>
                    <p className="text-xs text-muted mt-0.5">
                      {review.it_company_name} &middot; {review.project_category} &middot; {review.overall_rating}/5
                    </p>
                  </div>
                  <StatusBadge variant="pending">Pending</StatusBadge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs text-muted mb-4">
                  <div>
                    <p className="font-medium text-foreground">CxO</p>
                    <p>{review.cxo_full_name}</p>
                    <p>{review.cxo_title}</p>
                    <p>{review.cxo_company_name}</p>
                    <p className="font-mono">{review.cxo_email}</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Submitted</p>
                    <p>{new Date(review.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleApprove(review.id)}
                    disabled={actionId === review.id}
                    className="bg-green-500 text-white px-4 py-1.5 rounded-lg text-xs font-medium hover:opacity-90 disabled:opacity-50"
                  >
                    {actionId === review.id ? "Working..." : "Approve"}
                  </button>
                  <button
                    onClick={() => handleReject(review.id)}
                    disabled={actionId === review.id}
                    className="bg-red-500 text-white px-4 py-1.5 rounded-lg text-xs font-medium hover:opacity-90 disabled:opacity-50"
                  >
                    {actionId === review.id ? "Working..." : "Reject"}
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
