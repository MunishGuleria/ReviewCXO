import { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Benchmarks",
  description:
    "Controlled evaluations of AI sales platform capabilities on specific enterprise tasks with published methodology.",
  alternates: { canonical: "https://reviewscxo.com/benchmarks" },
  openGraph: {
    title: "AI Sales Platform Benchmarks",
    description: "Controlled evaluations of AI sales platform capabilities.",
    url: "https://reviewscxo.com/benchmarks",
    siteName: "Reviews CXO",
    locale: "en_US",
    type: "website",
  },
};

export default function BenchmarksPage() {
  return (
    <>
      <PageHeader
        title="Benchmarks"
        description="Controlled evaluations of AI sales platform capabilities on specific enterprise tasks. Every benchmark includes published datasets, code, and methodology."
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card
            href="/benchmarks/crm-erp-at-risk-accounts-v1"
            badge="Published"
            title="CRM-ERP At-Risk Accounts v1"
            description="Can AI combine CRM churn signals with ERP supply delays to identify at-risk enterprise accounts?"
            meta="Sep 2026 · 400 accounts · 3 environments"
          />
          <Card
            badge="Planned"
            title="Sales Forecasting with ERP Data"
            description="Evaluating cross-system reasoning accuracy for revenue forecasting using CRM pipeline and ERP operational data."
            meta="Q1 2027"
          />
          <Card
            badge="Planned"
            title="Agentic Task Completion"
            description="Multi-step agentic task completion across enterprise AI platforms — from planning to execution."
            meta="Q2 2027"
          />
        </div>
      </div>
    </>
  );
}
