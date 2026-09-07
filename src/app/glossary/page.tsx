import { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Glossary",
  description: "Enterprise AI terminology defined with evidence-backed explanations.",
  alternates: { canonical: "https://reviews-cxo.com/glossary" },
  openGraph: {
    title: "Enterprise AI Glossary",
    description: "Enterprise AI terminology defined with evidence-backed explanations.",
    url: "https://reviews-cxo.com/glossary",
    siteName: "Reviews_CXO",
    locale: "en_US",
    type: "website",
  },
};

const terms = [
  { term: "Agentic AI", definition: "AI systems that can autonomously plan, execute, and coordinate multi-step tasks using tools and sub-agents, rather than just providing recommendations." },
  { term: "ASCS (AI Sales Capability Score)", definition: "Reviews_CXO's 12-dimension evaluation framework for assessing enterprise AI sales platforms on architecture, security, and capability maturity." },
  { term: "Cross-System Reasoning", definition: "The ability of an AI system to combine data from multiple enterprise systems (CRM, ERP, external) in a single reasoning chain to produce insights." },
  { term: "CRM Data Grounding", definition: "The process of anchoring AI outputs to actual CRM data records, ensuring recommendations are based on real customer and pipeline information." },
  { term: "ERP Connectivity", definition: "The depth and quality of native integration between an AI platform and enterprise ERP systems (SAP, Oracle, NetSuite)." },
  { term: "Evidence Classification", definition: "Reviews_CXO's taxonomy for categorizing the strength of evidence behind a claim: Observed, Documented, Partially Documented, Third-Party Confirmed, Simulated, Inferred, or Not Tested." },
  { term: "Generative Engine Optimization (GEO)", definition: "Optimizing content to be cited and quoted by AI search engines (ChatGPT, Gemini, Perplexity) rather than just ranked in traditional search results." },
  { term: "Workflow Automation", definition: "AI systems that can complete end-to-end business tasks autonomously, not just provide recommendations for human action." },
  { term: "Model Transparency", definition: "The degree to which an AI platform discloses which LLMs it uses, versioning, model cards, and architectural details." },
  { term: "Data Portability", definition: "The ability to export and migrate data from an AI platform using standard formats, APIs, and open standards." },
];

export default function GlossaryPage() {
  return (
    <>
      <PageHeader
        title="Glossary"
        description="Enterprise AI terminology defined with evidence-backed explanations."
      />
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {terms.map((t) => (
            <div key={t.term}>
              <h2 className="text-lg font-bold text-foreground">{t.term}</h2>
              <p className="mt-1 text-sm leading-relaxed text-muted">{t.definition}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
