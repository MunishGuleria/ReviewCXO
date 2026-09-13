import { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Indexes",
  description:
    "Composite scores and rankings using the ASCS 12-dimension framework.",
  alternates: { canonical: "https://reviews-cxo.com/indexes" },
  openGraph: {
    title: "AI Sales Platform Indexes",
    description: "Composite scores and rankings using the ASCS 12-dimension framework.",
    url: "https://reviews-cxo.com/indexes",
    siteName: "Reviews_CXO",
    locale: "en_US",
    type: "website",
  },
};

export default function IndexesPage() {
  return (
    <>
      <PageHeader
        title="Indexes"
        description="Composite scores and rankings using the ASCS 12-dimension framework. Evaluations of enterprise AI sales platforms."
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card
            href="/indexes/architecture-security-index-2026"
            badge="Published"
            title="Architecture & Security Index 2026"
            description="12-dimension evaluation of 6 enterprise AI platforms on architecture, security, and governance maturity."
            meta="Sep 2026 · 5 platforms evaluated"
          />
          <Card
            href="/indexes/ascs-scorecard-2026"
            badge="Published"
            title="ASCS Scorecard 2026"
            description="Composite ASCS scores for all evaluated vendors, with radar charts and dimension-level breakdowns."
            meta="Sep 2026"
          />
          <Card
            badge="Planned"
            title="Enterprise AI Maturity Model"
            description="A 5-level maturity framework for assessing enterprise readiness for AI-powered sales."
            meta="Q1 2027"
          />
        </div>
      </div>
    </>
  );
}
