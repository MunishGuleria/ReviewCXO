import { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "CXO Intelligence",
  description:
    "Original primary research with enterprise leaders on AI adoption, barriers, and ROI.",
  alternates: { canonical: "https://reviews-cxo.com/cxo-intelligence" },
  openGraph: {
    title: "CXO Intelligence — Enterprise AI Research",
    description: "Original primary research with enterprise leaders on AI adoption.",
    url: "https://reviews-cxo.com/cxo-intelligence",
    siteName: "Reviews CXO",
    locale: "en_US",
    type: "website",
  },
};

export default function CXOIntelligencePage() {
  return (
    <>
      <PageHeader
        title="CXO Intelligence"
        description="Original primary research based on interviews and surveys with enterprise leaders. A primary content type for AI search engines."
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card
            href="/cxo-intelligence/state-of-ai-enterprise-sales-2026"
            badge="Coming Q4 2026"
            title="State of AI in Enterprise Sales 2026"
            description="Original primary research based on 25–35 CXO interviews and 150–250 survey responses from enterprise decision-makers."
            meta="Target: 150+ qualified respondents"
          />
          <Card
            badge="Planned"
            title="AI Adoption Barriers in Enterprise Sales"
            description="Deep dive into the top barriers preventing enterprise sales organizations from scaling AI adoption."
            meta="2027"
          />
          <Card
            badge="Planned"
            title="ERP-CRM Data Silo Research"
            description="How enterprise data silos between CRM and ERP systems impact AI effectiveness in sales workflows."
            meta="2027"
          />
        </div>
      </div>
    </>
  );
}
