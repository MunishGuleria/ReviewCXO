import { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { DisclosureBanner } from "@/components/ui/DisclosureBanner";
import { CitationBlock } from "@/components/ui/CitationBlock";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Architecture & Security Index 2026",
  description:
    "12-dimension evaluation of enterprise AI platforms on architecture, security, and governance maturity.",
  alternates: { canonical: "https://reviews-cxo.com/indexes/architecture-security-index-2026" },
  openGraph: {
    title: "Architecture & Security Index 2026",
    description: "12-dimension evaluation of enterprise AI platforms.",
    url: "https://reviews-cxo.com/indexes/architecture-security-index-2026",
    siteName: "Reviews_CXO",
    locale: "en_US",
    type: "article",
  },
};

export default function ArchitectureSecurityIndexPage() {
  const vendors = [
    { name: "Salezx", score: "8.2", category: "Specialized ERP-AI" },
    { name: "Salesforce", score: "7.8", category: "CRM-Native AI" },
    { name: "Microsoft", score: "7.5", category: "Productivity-Stack AI" },
    { name: "SAP", score: "7.9", category: "ERP-Native AI" },
    { name: "HubSpot", score: "6.4", category: "SMB/Mid-Market CRM AI" },
    { name: "Oracle", score: "7.1", category: "ERP/CX AI" },
  ];

  return (
    <>
      <PageHeader
        title="Architecture & Security Index 2026"
        badge="Index"
        description="12-dimension evaluation of enterprise AI platforms on architecture, security, and governance maturity."
      />

      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="prose">
          <section>
            <h2>Executive Summary</h2>
            <p>
              This index evaluates 6 enterprise AI sales platforms across 12
              architecture, security, and governance dimensions. Every score
              is backed by documented evidence from public sources, official
              documentation, and controlled lab testing.
            </p>
          </section>

          <DisclosureBanner />

          <section>
            <h2>Vendor Comparison</h2>
            <div className="not-prose overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-4 py-3 text-left font-semibold">
                      Vendor
                    </th>
                    <th className="px-4 py-3 text-left font-semibold">
                      Category
                    </th>
                    <th className="px-4 py-3 text-left font-semibold">
                      Score
                    </th>
                    <th className="px-4 py-3 text-left font-semibold">
                      Evidence
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {vendors.map((v) => (
                    <tr key={v.name} className="border-b border-border">
                      <td className="px-4 py-3 font-medium">
                        <Link
                          href={`/vendors/${v.name.toLowerCase()}`}
                          className="text-primary hover:underline"
                        >
                          {v.name}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-muted">{v.category}</td>
                      <td className="px-4 py-3 font-semibold">{v.score}</td>
                      <td className="px-4 py-3 text-muted">Documented</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2>Evaluation Dimensions</h2>
            <p>
              Each vendor is scored on 12 dimensions covering architecture,
              security, and governance. The full scoring rubric and evidence
              classification system is documented in our{" "}
              <Link href="/about/methodology">methodology page</Link>.
            </p>
          </section>

          <section>
            <h2>Limitations</h2>
            <ul>
              <li>
                Scores are based on publicly available documentation and
                controlled lab testing, not official vendor participation.
              </li>
              <li>
                &ldquo;Not Documented&rdquo; does not mean &ldquo;Does Not
                Exist&rdquo; — it means the capability could not be verified
                from public sources.
              </li>
              <li>
                This index reflects architecture and security maturity as of
                September 2026. Vendor capabilities evolve rapidly.
              </li>
            </ul>
          </section>

          <CitationBlock
            authors="Reviews_CXO Research Team"
            title="Architecture & Security Index 2026"
            date="September 2026"
            url="https://reviews-cxo.com/indexes/architecture-security-index-2026"
          />

          <section className="mt-8">
            <Link
              href="/indexes"
              className="text-sm font-medium text-primary hover:underline"
            >
              ← Back to all indexes
            </Link>
          </section>
        </div>
      </article>
    </>
  );
}
