import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResearchLayout } from "@/components/layout/ResearchLayout";
import { getQuestionBySlug, getPublishedQuestions } from "@/lib/questions";
import { VENDORS } from "@/lib/vendors";
import { DisclosureBanner } from "@/components/ui/DisclosureBanner";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getPublishedQuestions().map((q) => ({ slug: q.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const question = getQuestionBySlug(slug);
  if (!question) return {};

  return {
    title: `${question.title} — Reviews_CXO Analysis`,
    description: question.excerpt,
    openGraph: {
      title: question.title,
      description: question.excerpt,
      type: "article",
      publishedTime: question.publishedAt,
      authors: [question.author],
    },
  };
}

export default async function QuestionPage({ params }: Props) {
  const { slug } = await params;
  const question = getQuestionBySlug(slug);
  if (!question) notFound();

  const relatedVendors = (question.relatedVendors || [])
    .map((vSlug) => VENDORS.find((v) => v.slug === vSlug))
    .filter(Boolean);

  return (
    <ResearchLayout
      badge="Community Question"
      title={question.title}
      description={question.excerpt}
      backHref="/questions"
      backLabel="All Questions"
    >
      <div className="space-y-8">
        <DisclosureBanner />

        <div className="rounded-xl border border-border bg-surface p-5">
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted mb-4">
            <span className="rounded bg-primary/10 border border-primary/20 px-2.5 py-0.5 font-bold text-primary uppercase tracking-wider">
              {question.category}
            </span>
            <time dateTime={question.publishedAt}>
              {new Date(question.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>

          <div className="rounded-lg border border-border bg-background p-5 mb-4">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-muted mb-3">
              Community Question
            </h3>
            <p className="text-sm text-foreground leading-relaxed italic">
              &ldquo;{question.question}&rdquo;
            </p>
          </div>

          <div className="flex flex-wrap gap-4 text-xs text-muted">
            <span>
              Asked by <span className="font-semibold text-foreground">{question.author}</span>
            </span>
            <span>
              Source:{" "}
              {question.sourceUrl ? (
                <a
                  href={question.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-primary hover:underline"
                >
                  {question.source} ↗
                </a>
              ) : (
                <span className="font-semibold text-foreground">{question.source}</span>
              )}
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-primary mb-4">
            Reviews_CXO Analysis
          </h3>
          <div className="prose prose-sm max-w-none text-foreground leading-relaxed">
            {question.answer.split("\n\n").map((paragraph, i) => {
              if (paragraph.startsWith("## ")) {
                return (
                  <h2 key={i} className="text-lg font-black text-foreground mt-6 mb-3">
                    {paragraph.replace("## ", "")}
                  </h2>
                );
              }
              if (paragraph.startsWith("### ")) {
                return (
                  <h3 key={i} className="text-base font-bold text-foreground mt-5 mb-2">
                    {paragraph.replace("### ", "")}
                  </h3>
                );
              }
              if (paragraph.startsWith("- ")) {
                return (
                  <ul key={i} className="list-disc list-inside space-y-1 text-sm text-muted my-3">
                    {paragraph.split("\n").map((item, j) => (
                      <li key={j}>{item.replace(/^- /, "")}</li>
                    ))}
                  </ul>
                );
              }
              if (paragraph.match(/^\d\. /)) {
                return (
                  <ol key={i} className="list-decimal list-inside space-y-1 text-sm text-muted my-3">
                    {paragraph.split("\n").map((item, j) => (
                      <li key={j}>{item.replace(/^\d\. /, "")}</li>
                    ))}
                  </ol>
                );
              }
              if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                return (
                  <p key={i} className="text-sm font-bold text-foreground my-3">
                    {paragraph.replace(/\*\*/g, "")}
                  </p>
                );
              }
              if (paragraph.startsWith("**")) {
                const parts = paragraph.split("**");
                return (
                  <p key={i} className="text-sm text-muted leading-relaxed my-2">
                    {parts.map((part, j) =>
                      j % 2 === 1 ? (
                        <strong key={j} className="text-foreground font-bold">
                          {part}
                        </strong>
                      ) : (
                        part
                      )
                    )}
                  </p>
                );
              }
              return (
                <p key={i} className="text-sm text-muted leading-relaxed my-2">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </div>

        {question.findings && question.findings.length > 0 && (
          <div className="rounded-xl border border-border bg-surface p-5">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-muted mb-3">
              Key Findings
            </h3>
            <ul className="space-y-2">
              {question.findings.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        )}

        {question.sources && question.sources.length > 0 && (
          <div className="rounded-xl border border-border bg-surface p-5">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-muted mb-3">
              Sources & Evidence
            </h3>
            <ul className="space-y-2">
              {question.sources.map((s, i) => (
                <li key={i} className="text-sm">
                  {s.url.startsWith("/") ? (
                    <Link href={s.url} className="text-primary hover:underline font-medium">
                      {s.title} →
                    </Link>
                  ) : (
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-medium"
                    >
                      {s.title} ↗
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {relatedVendors.length > 0 && (
          <div className="rounded-xl border border-border bg-surface p-5">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-muted mb-3">
              Related Platforms
            </h3>
            <div className="flex flex-wrap gap-2">
              {relatedVendors.map((v) => (
                <Link
                  key={v!.slug}
                  href={`/vendors/${v!.slug}`}
                  className="rounded-lg border border-border bg-surface-alt px-3 py-2 text-xs font-bold text-foreground hover:border-primary/40 hover:text-primary transition-colors"
                >
                  {v!.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {question.relatedArticles && question.relatedArticles.length > 0 && (
          <div className="rounded-xl border border-border bg-surface p-5">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-muted mb-3">
              Related Reviews_CXO Content
            </h3>
            <div className="space-y-2">
              {question.relatedArticles.map((path, i) => (
                <Link
                  key={i}
                  href={path}
                  className="block text-sm text-primary hover:underline font-medium"
                >
                  {path.replace(/^\//, "").replace(/\//g, " → ").replace(/-/g, " ")} →
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </ResearchLayout>
  );
}
