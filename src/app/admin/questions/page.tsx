import { Metadata } from "next";
import { ResearchLayout } from "@/components/layout/ResearchLayout";
import { getAllQuestions } from "@/lib/questions";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin — Questions | Reviews_CXO",
  description: "Manage published community questions.",
};

const questions = getAllQuestions();

export default function AdminQuestionsPage() {
  return (
    <ResearchLayout
      badge="Admin"
      title="Manage Questions"
      description="Create, edit, and publish community question posts."
      backHref="/admin"
      backLabel="Admin"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted">
            {questions.length} question{questions.length !== 1 ? "s" : ""} total
          </p>
          <Link
            href="/admin/questions/new"
            className="rounded-lg border border-primary bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            + New Question
          </Link>
        </div>

        <div className="space-y-3">
          {questions.map((q) => (
            <div
              key={q.id}
              className="rounded-xl border border-border bg-surface p-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      q.status === "published"
                        ? "bg-green-500/10 border border-green-500/20 text-green-500"
                        : "bg-yellow-500/10 border border-yellow-500/20 text-yellow-500"
                    }`}
                  >
                    {q.status}
                  </span>
                  <span className="rounded bg-surface-alt border border-border px-2 py-0.5 text-[10px] font-medium text-muted">
                    {q.category}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-foreground truncate">{q.title}</h3>
                <p className="text-xs text-muted mt-0.5">
                  {q.author} · {q.source} · {new Date(q.publishedAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {q.status === "published" && (
                  <Link
                    href={`/questions/${q.slug}`}
                    className="rounded-lg border border-border bg-surface-alt px-3 py-1.5 text-[11px] font-bold text-foreground hover:border-primary/40 transition-colors"
                  >
                    View Live →
                  </Link>
                )}
                <span className="text-xs text-muted font-mono">/{q.slug}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ResearchLayout>
  );
}
