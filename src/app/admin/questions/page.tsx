"use client";

import { useEffect, useState } from "react";
import { ResearchLayout } from "@/components/layout/ResearchLayout";

interface SubmittedQuestion {
  id: string;
  author_name: string;
  author_email: string;
  title: string;
  body: string;
  category: string;
  status: string;
  created_at: string;
}

export default function AdminQuestionsPage() {
  const [questions, setQuestions] = useState<SubmittedQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/questions")
      .then((r) => r.json())
      .then((data) => setQuestions(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function handleApprove(id: string) {
    if (!confirm("Approve and prepare this question for publishing?")) return;
    setActionId(id);
    try {
      const res = await fetch(`/api/admin/questions/${id}/approve`, { method: "POST" });
      if (res.ok) setQuestions((prev) => prev.filter((q) => q.id !== id));
    } finally {
      setActionId(null);
    }
  }

  async function handleReject(id: string) {
    if (!confirm("Reject and discard this question? This cannot be undone.")) return;
    setActionId(id);
    try {
      const res = await fetch(`/api/admin/questions/${id}/reject`, { method: "POST" });
      if (res.ok) setQuestions((prev) => prev.filter((q) => q.id !== id));
    } finally {
      setActionId(null);
    }
  }

  return (
    <ResearchLayout badge="Admin Workspace" title="Question Moderation" description="Review and moderate submitted executive questions for analytical drafting." backHref="/admin" backLabel="Admin Dashboard">
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            Pending Queries
          </h2>
          <span className="bg-purple-500/10 text-purple-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{questions.length} Awaiting Action</span>
        </div>

        {loading ? (
          <div className="space-y-4 animate-pulse">
            {[1,2,3].map(i => <div key={i} className="h-48 bg-surface-alt rounded-2xl border border-border w-full"></div>)}
          </div>
        ) : questions.length === 0 ? (
          <div className="bg-surface border border-border rounded-2xl p-16 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mb-4 text-purple-500">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            </div>
            <h3 className="text-lg font-bold text-foreground">Inbox Zero</h3>
            <p className="text-sm text-muted-foreground mt-2 max-w-md">There are currently no pending user questions requiring moderation.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {questions.map((q) => (
              <div key={q.id} className="rounded-2xl border border-border bg-surface hover:border-primary/40 hover:shadow-sm transition-all p-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-5 gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-surface-alt border border-border px-2 py-0.5 rounded text-muted-foreground">
                        {q.category}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                        {new Date(q.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-foreground leading-tight">{q.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1.5 font-medium flex items-center gap-2">
                       Submitted by {q.author_name} 
                       <span className="font-mono text-xs bg-background border border-border px-1.5 py-0.5 rounded">{q.author_email}</span>
                    </p>
                  </div>
                  <div className="bg-yellow-500/10 text-yellow-600 border border-yellow-500/20 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider shrink-0 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse"></div>
                    Pending
                  </div>
                </div>
                
                <div className="bg-surface-alt rounded-xl p-5 mb-6 border border-border/50">
                   <p className="text-sm text-secondary-foreground whitespace-pre-wrap leading-relaxed">{q.body}</p>
                </div>

                <div className="flex gap-3 pt-4 border-t border-border">
                  <button
                    onClick={() => handleApprove(q.id)}
                    disabled={actionId === q.id}
                    className="flex-1 sm:flex-none sm:w-48 bg-primary text-primary-foreground px-4 py-2.5 rounded-lg text-sm font-bold hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center justify-center gap-2"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    {actionId === q.id ? "Processing..." : "Approve to Draft"}
                  </button>
                  <button
                    onClick={() => handleReject(q.id)}
                    disabled={actionId === q.id}
                    className="flex-1 sm:flex-none sm:w-32 bg-surface-alt border border-border text-foreground px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-danger/10 hover:text-danger hover:border-danger/30 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    {actionId === q.id ? "Processing..." : "Discard"}
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
