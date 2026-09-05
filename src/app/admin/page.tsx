import { Metadata } from "next";
import { ResearchLayout } from "@/components/layout/ResearchLayout";
import { getAllQuestions } from "@/lib/questions";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin — Reviews_CXO",
  description: "Content management dashboard.",
};

const questions = getAllQuestions();
const publishedCount = questions.filter((q) => q.status === "published").length;
const draftCount = questions.filter((q) => q.status === "draft").length;

export default function AdminPage() {
  return (
    <ResearchLayout
      badge="Admin"
      title="Content Management"
      description="Internal dashboard for managing Reviews_CXO content."
      backHref="/"
      backLabel="Home"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/admin/questions"
          className="rounded-xl border border-border bg-surface p-5 hover:border-primary/40 hover:shadow-sm transition-all"
        >
          <h3 className="text-sm font-black text-foreground mb-2">Questions</h3>
          <div className="flex gap-3 text-xs text-muted">
            <span>
              <span className="font-bold text-foreground">{publishedCount}</span> published
            </span>
            <span>
              <span className="font-bold text-foreground">{draftCount}</span> drafts
            </span>
          </div>
        </Link>
      </div>
    </ResearchLayout>
  );
}
