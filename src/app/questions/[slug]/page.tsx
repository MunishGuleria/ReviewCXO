import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResearchLayout } from "@/components/layout/ResearchLayout";
import { getQuestionBySlug, getPublishedQuestions } from "@/lib/questions";
import { getVisibleVendors } from "@/lib/vendors";
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
    title: `${question.title} — Reviews CXO Analysis`,
    description: question.excerpt,
    alternates: { canonical: `https://reviews-cxo.com/questions/${question.slug}` },
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
    .map((vSlug) => getVisibleVendors().find((v) => v.slug === vSlug))
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

        <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-[10px] font-bold text-primary">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
              </svg>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">The Question</span>
            <div className="h-px flex-1 bg-border/60" />
          </div>

          <blockquote className="relative border-l-2 border-primary/30 pl-4 py-1">
            <p className="text-sm text-foreground/80 leading-relaxed italic">
              &ldquo;{question.question}&rdquo;
            </p>
          </blockquote>

          <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {question.author}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {question.source}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <time dateTime={question.publishedAt}>
                {new Date(question.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </span>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-[10px] font-bold text-primary">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
              </svg>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Reviews CXO Analysis</span>
            <div className="h-px flex-1 bg-primary/10" />
          </div>

          <div className="space-y-6">
            {question.answer.split("\n\n").map((paragraph, i) => {
              if (paragraph.startsWith("## ")) {
                return (
                  <div key={i} className="border-b border-border/50 pb-3 last:border-0 last:pb-0">
                    <h2 className="text-base font-black text-foreground tracking-tight">
                      {paragraph.replace("## ", "")}
                    </h2>
                  </div>
                );
              }
              if (paragraph.startsWith("### ")) {
                return (
                  <h3 key={i} className="text-sm font-bold text-foreground mt-6 mb-2 flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-primary" />
                    {paragraph.replace("### ", "")}
                  </h3>
                );
              }
              if (paragraph.startsWith("- ")) {
                return (
                  <ul key={i} className="space-y-2 my-2">
                    {paragraph.split("\n").map((item, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-[13px] text-foreground/70 leading-relaxed">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                        <span>{item.replace(/^- /, "")}</span>
                      </li>
                    ))}
                  </ul>
                );
              }
              if (paragraph.match(/^\d\. /)) {
                return (
                  <ol key={i} className="space-y-2 my-2">
                    {paragraph.split("\n").map((item, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-[13px] text-foreground/70 leading-relaxed">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded bg-primary/10 text-[10px] font-bold text-primary">
                          {j + 1}
                        </span>
                        <span>{item.replace(/^\d\. /, "")}</span>
                      </li>
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
                  <p key={i} className="text-[13px] text-foreground/70 leading-relaxed">
                    {parts.map((part, j) =>
                      j % 2 === 1 ? (
                        <strong key={j} className="font-bold text-foreground">{part}</strong>
                      ) : (
                        part
                      )
                    )}
                  </p>
                );
              }
              return (
                <p key={i} className="text-[13px] text-foreground/70 leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </section>

        {question.findings && question.findings.length > 0 && (
          <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-success/10 text-[10px] font-bold text-success">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Key Findings</span>
              <div className="h-px flex-1 bg-border/60" />
            </div>
            <ul className="space-y-3">
              {question.findings.map((f, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[13px] text-foreground/70 leading-relaxed">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-success" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {question.sources && question.sources.length > 0 && (
          <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-[10px] font-bold text-primary">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Sources & Evidence</span>
              <div className="h-px flex-1 bg-border/60" />
            </div>
            <ul className="space-y-2.5">
              {question.sources.map((s, i) => (
                <li key={i}>
                  {s.url.startsWith("/") ? (
                    <Link href={s.url} className="group flex items-center gap-2 text-[13px] text-foreground/70 hover:text-primary transition-colors">
                      <svg className="h-3.5 w-3.5 shrink-0 text-muted group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                      <span className="font-medium">{s.title}</span>
                    </Link>
                  ) : (
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-[13px] text-foreground/70 hover:text-primary transition-colors">
                      <svg className="h-3.5 w-3.5 shrink-0 text-muted group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                      <span className="font-medium">{s.title}</span>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {relatedVendors.length > 0 && (
          <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-[10px] font-bold text-primary">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
                </svg>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Related Platforms</span>
              <div className="h-px flex-1 bg-border/60" />
            </div>
            <div className="flex flex-wrap gap-2">
              {relatedVendors.map((v) => (
                <Link
                  key={v!.slug}
                  href={`/vendors/${v!.slug}`}
                  className="group flex items-center gap-1.5 rounded-lg border border-border bg-surface-alt px-3 py-2 text-xs font-bold text-foreground hover:border-primary/40 hover:text-primary transition-all"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                  {v!.name}
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </ResearchLayout>
  );
}
