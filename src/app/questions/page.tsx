import { Metadata } from "next";
import { ResearchLayout } from "@/components/layout/ResearchLayout";
import { getPublishedQuestions } from "@/lib/questions";
import { DisclosureBanner } from "@/components/ui/DisclosureBanner";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { TagList } from "@/components/ui/TagList";
import { SectionCard } from "@/components/ui/SectionCard";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Community Questions — AI Sales Platform Research",
  description: "Expert answers to real enterprise AI questions. Independent research on Salesforce, Microsoft, SAP, and AI sales platforms from Reviews_CXO analysts.",
  alternates: { canonical: "https://reviews-cxo.com/questions" },
  openGraph: {
    title: "Community Questions — AI Sales Platform Research",
    description: "Expert answers to real enterprise AI questions from Reviews_CXO analysts.",
    url: "https://reviews-cxo.com/questions",
    siteName: "Reviews_CXO",
    locale: "en_US",
    type: "website",
  },
};

const questions = getPublishedQuestions();

export default function QuestionsPage() {
  return (
    <ResearchLayout
      badge="Research Archive"
      title="Enterprise AI Questions, Answered"
      description="Real questions from enterprise teams evaluating AI sales platforms. Our analysts provide independent, evidence-based answers grounded in the ASCS framework — no vendor bias, no marketing fluff."
      backHref="/"
      backLabel="Home"
    >
      <div className="space-y-6">
        <DisclosureBanner />

        <SectionCard title="How It Works">
          <p className="text-xs sm:text-sm text-muted leading-relaxed">
            Enterprise teams face tough decisions when evaluating AI sales platforms. We collect real questions from across the industry and our analysts produce independent, evidence-based responses. Every answer is grounded in our ASCS framework, references verified data sources, and provides actionable recommendations. No fabricated questions, no paid placements, no vendor influence.
          </p>
        </SectionCard>

        <div className="space-y-4">
          {questions.length === 0 ? (
            <div className="rounded-xl border border-border bg-surface p-12 text-center">
              <p className="text-muted text-sm">No published questions yet.</p>
            </div>
          ) : (
            questions.map((q) => (
              <article
                key={q.id}
                className="group rounded-xl border border-border bg-surface p-5 transition-all hover:border-primary/40 hover:shadow-sm"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusBadge variant="category">{q.category}</StatusBadge>
                    <TagList tags={q.tags} maxVisible={3} />
                  </div>

                  <h2 className="text-lg font-black text-foreground group-hover:text-primary transition-colors leading-snug">
                    {q.title}
                  </h2>

                  <p className="text-sm text-muted leading-relaxed line-clamp-2">{q.excerpt}</p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted">
                    <span>
                      Asked by <span className="font-semibold text-foreground">{q.author}</span>
                    </span>
                    <span>
                      Source: <span className="font-semibold text-foreground">{q.source}</span>
                    </span>
                    <time dateTime={q.publishedAt}>{new Date(q.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</time>
                  </div>

                  <div className="pt-2">
                    <Link
                      href={`/questions/${q.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface-alt px-4 py-2 text-xs font-bold text-foreground hover:border-primary/40 hover:text-primary transition-colors"
                    >
                      Read Analysis
                      <span className="text-muted">→</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </ResearchLayout>
  );
}
