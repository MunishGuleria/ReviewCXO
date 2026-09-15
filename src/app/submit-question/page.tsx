"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import Link from "next/link";

const CATEGORIES = [
  "AI Sales",
  "CRM & ERP",
  "Implementation",
  "Pricing & Licensing",
  "Security & Compliance",
  "Integration",
  "General",
];

export default function SubmitQuestionPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("General");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        if (!data.user) router.replace("/login?next=/submit-question");
        else setCheckingAuth(false);
      })
      .catch(() => router.replace("/login?next=/submit-question"));
  }, [router]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);

    try {
      const res = await fetch("/api/questions/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body, category }),
      });
      const data = await res.json();
      setResult({
        ok: data.success,
        message: data.success
          ? "Question submitted! Our analysts will review it and publish an answer."
          : data.error || "Submission failed.",
      });
      if (data.success) {
        setTitle("");
        setBody("");
        setCategory("General");
      }
    } catch {
      setResult({ ok: false, message: "Network error. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  const inputCls =
    "w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors";
  const textareaCls = inputCls + " min-h-[160px] resize-y";

  if (checkingAuth) {
    return (
      <>
        <PageHeader badge="Community" title="Ask a Question" description="Submit a question about enterprise AI sales platforms." />
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
        <PageHeader badge="Community" title="Ask a Question" description="Submit a question about enterprise AI sales platforms." />
        <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="card-premium p-6 sm:p-10 text-center py-8">
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-green-500 text-xl font-bold">&#10003;</span>
            </div>
            <h2 className="text-lg font-bold text-foreground mb-2">Question Submitted!</h2>
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
        title="Ask a Question"
        description="Submit a question about enterprise AI sales platforms. Our analysts will research and provide an evidence-based answer."
      />
      <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="card-premium p-6 sm:p-10">
          {result && !result.ok && (
            <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm font-medium text-red-600">
              {result.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">Category</label>
              <select
                className={inputCls + " appearance-none"}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">Question Title *</label>
              <input
                type="text"
                required
                className={inputCls}
                placeholder="e.g. How does Salesforce Einstein compare to Microsoft Copilot for lead scoring?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">Details *</label>
              <textarea
                required
                className={textareaCls}
                placeholder="Provide context about your question — what you're evaluating, what constraints you have, what you've already tried..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </div>

            <div className="pt-4 border-t border-border">
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Submitting..." : "Submit Question"}
              </button>
              <p className="mt-3 text-xs text-muted-foreground">
                Our analysts review every question. We publish evidence-based answers grounded in the ASCS framework.
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
