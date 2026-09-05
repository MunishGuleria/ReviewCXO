"use client";

import { useState } from "react";
import { ResearchLayout } from "@/components/layout/ResearchLayout";
import { QUESTION_CATEGORIES } from "@/lib/questions";

interface FormData {
  title: string;
  question: string;
  author: string;
  source: string;
  sourceUrl: string;
  category: string;
  tags: string;
  excerpt: string;
  answer: string;
  findings: string;
  sources: string;
  relatedVendors: string;
  status: "draft" | "published";
}

const initial: FormData = {
  title: "",
  question: "",
  author: "",
  source: "",
  sourceUrl: "",
  category: QUESTION_CATEGORIES[0],
  tags: "",
  excerpt: "",
  answer: "",
  findings: "",
  sources: "",
  relatedVendors: "",
  status: "draft",
};

export default function NewQuestionPage() {
  const [form, setForm] = useState<FormData>(initial);
  const [saved, setSaved] = useState(false);
  const [slug, setSlug] = useState("");

  function generateSlug(title: string) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const generatedSlug = generateSlug(form.title);
    setSlug(generatedSlug);
    setSaved(true);
    // In a real implementation, this would POST to an API route
    // For now, we show the generated data structure
  }

  function handleTitleChange(value: string) {
    setForm((prev) => ({ ...prev, title: value }));
    if (!saved) {
      setSlug(generateSlug(value));
    }
  }

  if (saved) {
    const data = {
      id: `q${Date.now()}`,
      slug,
      title: form.title,
      question: form.question,
      author: form.author,
      source: form.source,
      sourceUrl: form.sourceUrl,
      publishedAt: new Date().toISOString().split("T")[0],
      excerpt: form.excerpt,
      category: form.category,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      status: form.status,
      answer: form.answer,
      findings: form.findings
        .split("\n")
        .map((f) => f.replace(/^-\s*/, "").trim())
        .filter(Boolean),
      sources: form.sources
        .split("\n")
        .map((s) => {
          const [title, url] = s.split("|").map((p) => p.trim());
          return title && url ? { title, url } : null;
        })
        .filter(Boolean) as { title: string; url: string }[],
      relatedVendors: form.relatedVendors
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean),
    };

    return (
      <ResearchLayout
        badge="Admin — New Question"
        title="Question Saved"
        description="The question has been saved as a draft. In production, this would persist to a database."
        backHref="/admin/questions"
        backLabel="Back to Questions"
      >
        <div className="space-y-6">
          <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-5">
            <p className="text-sm font-bold text-green-500 mb-1">Saved Successfully</p>
            <p className="text-xs text-muted">
              Status: <span className="font-semibold text-foreground">{form.status}</span>
              {form.status === "published" && (
                <> · Live at <code className="text-primary">/questions/{slug}</code></>
              )}
            </p>
          </div>

          <div className="rounded-xl border border-border bg-surface p-5">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-muted mb-3">
              Generated Data Structure
            </h3>
            <pre className="text-xs text-muted font-mono whitespace-pre-wrap overflow-auto max-h-96 bg-background rounded-lg p-4 border border-border">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                setSaved(false);
                setForm(initial);
              }}
              className="rounded-lg border border-border bg-surface-alt px-4 py-2 text-xs font-bold text-foreground hover:border-primary/40 transition-colors"
            >
              Create Another
            </button>
            {form.status === "published" && (
              <a
                href={`/questions/${slug}`}
                className="rounded-lg border border-primary bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                View Live Page →
              </a>
            )}
          </div>
        </div>
      </ResearchLayout>
    );
  }

  return (
    <ResearchLayout
      badge="Admin — New Question"
      title="Create Question"
      description="Publish a new community question with Reviews_CXO analysis."
      backHref="/admin/questions"
      backLabel="Back to Questions"
    >
      <form onSubmit={handleSubmit} className="space-y-8">
        <Section title="Basic Information">
          <Field label="Question Title" required>
            <input
              type="text"
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="What is the best AI sales platform for manufacturing?"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            />
            {slug && (
              <p className="text-[11px] text-muted mt-1">
                Slug: <code className="text-primary">/questions/{slug}</code>
              </p>
            )}
          </Field>

          <Field label="Original Question" required>
            <textarea
              value={form.question}
              onChange={(e) => setForm((p) => ({ ...p, question: e.target.value }))}
              placeholder="The exact question as it appeared in the original community discussion..."
              rows={4}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y"
              required
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Author Name" required>
              <input
                type="text"
                value={form.author}
                onChange={(e) => setForm((p) => ({ ...p, author: e.target.value }))}
                placeholder="John Smith"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              />
            </Field>
            <Field label="Source Platform" required>
              <input
                type="text"
                value={form.source}
                onChange={(e) => setForm((p) => ({ ...p, source: e.target.value }))}
                placeholder="Stack Exchange, Reddit, LinkedIn..."
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              />
            </Field>
          </div>

          <Field label="Original Source URL">
            <input
              type="url"
              value={form.sourceUrl}
              onChange={(e) => setForm((p) => ({ ...p, sourceUrl: e.target.value }))}
              placeholder="https://..."
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Category" required>
              <select
                value={form.category}
                onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              >
                {QUESTION_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Tags (comma-separated)">
              <input
                type="text"
                value={form.tags}
                onChange={(e) => setForm((p) => ({ ...p, tags: e.target.value }))}
                placeholder="manufacturing, SAP, Salesforce"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </Field>
          </div>

          <Field label="Short Excerpt" required>
            <input
              type="text"
              value={form.excerpt}
              onChange={(e) => setForm((p) => ({ ...p, excerpt: e.target.value }))}
              placeholder="A brief summary of the question..."
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            />
          </Field>
        </Section>

        <Section title="Research / Analysis">
          <Field label="Reviews_CXO Analysis" required>
            <p className="text-[11px] text-muted mb-2">
              Use markdown formatting. Supports ## headings, ### subheadings, - bullet lists, 1. numbered lists, **bold**, and plain paragraphs.
            </p>
            <textarea
              value={form.answer}
              onChange={(e) => setForm((p) => ({ ...p, answer: e.target.value }))}
              placeholder="## Key Findings&#10;&#10;Your analysis of the question...&#10;&#10;### Recommended Approach&#10;&#10;Detailed recommendations...&#10;&#10;## What to Avoid&#10;&#10;- Point 1&#10;- Point 2"
              rows={16}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground font-mono placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y"
              required
            />
          </Field>

          <Field label="Key Findings (one per line)">
            <textarea
              value={form.findings}
              onChange={(e) => setForm((p) => ({ ...p, findings: e.target.value }))}
              placeholder="- Finding one&#10;- Finding two&#10;- Finding three"
              rows={4}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground font-mono placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y"
            />
          </Field>

          <Field label="Sources (one per line, format: Title | URL)">
            <textarea
              value={form.sources}
              onChange={(e) => setForm((p) => ({ ...p, sources: e.target.value }))}
              placeholder="ASCS Framework Methodology | /about/methodology&#10;Vendor Documentation | https://vendor.com/docs"
              rows={4}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground font-mono placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y"
            />
          </Field>

          <Field label="Related Vendors (comma-separated slugs)">
            <input
              type="text"
              value={form.relatedVendors}
              onChange={(e) => setForm((p) => ({ ...p, relatedVendors: e.target.value }))}
              placeholder="salezx, salesforce, microsoft-dynamics-365"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </Field>
        </Section>

        <Section title="Publishing">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
              <input
                type="radio"
                name="status"
                value="draft"
                checked={form.status === "draft"}
                onChange={() => setForm((p) => ({ ...p, status: "draft" }))}
                className="accent-primary"
              />
              Draft
            </label>
            <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
              <input
                type="radio"
                name="status"
                value="published"
                checked={form.status === "published"}
                onChange={() => setForm((p) => ({ ...p, status: "published" }))}
                className="accent-primary"
              />
              Published
            </label>
          </div>
          <p className="text-[11px] text-muted">
            Drafts are not visible on the public site. Published questions appear on <code>/questions</code>.
          </p>
        </Section>

        <div className="flex items-center gap-3 pt-4 border-t border-border">
          <button
            type="submit"
            className="rounded-lg border border-primary bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Save Question
          </button>
          <a
            href="/admin/questions"
            className="rounded-lg border border-border bg-surface-alt px-4 py-2.5 text-sm font-bold text-foreground hover:border-primary/40 transition-colors"
          >
            Cancel
          </a>
        </div>
      </form>
    </ResearchLayout>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-5 space-y-4">
      <h3 className="text-[11px] font-bold uppercase tracking-wider text-muted">{title}</h3>
      {children}
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-bold text-foreground mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}
