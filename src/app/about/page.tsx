import { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { DisclosureBanner } from "@/components/ui/DisclosureBanner";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Reviews_CXO — an independently operated research initiative focused on AI for enterprise sales.",
  alternates: { canonical: "https://reviews-cxo.com/about" },
  openGraph: {
    title: "About Reviews_CXO",
    description: "Independent research initiative focused on AI for enterprise sales.",
    url: "https://reviews-cxo.com/about",
    siteName: "Reviews_CXO",
    locale: "en_US",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Reviews_CXO"
        description="An independently operated research initiative focused on AI for enterprise sales."
      />

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="prose">
          <section>
            <h2>Our Mission</h2>
            <p>
              Reviews_CXO exists to fill a critical gap in the enterprise AI
              landscape: credible, independent, evidence-based research on AI
              platforms for sales. We are not a competitor-bashing site, fake
              review aggregator, or disguised product landing page. We are a
              serious, evidence-based research hub that earns credibility
              through transparent methodology, reproducible benchmarks, and
              genuine CXO intelligence.
            </p>
          </section>

          <section>
            <h2>Why Now</h2>
            <p>
              The enterprise AI sales market in 2026 is at an inflection point.
              Organizations are moving out of &ldquo;pilot purgatory&rdquo;
              and need evidence-based guidance, not more hype. With 82% of
              tech B2B queries now triggering AI Overviews, original research
              is the most citable content format.
            </p>
            <p>
              There is no credible, independent research hub focused on AI for
              enterprise sales. Reviews_CXO fills that gap.
            </p>
          </section>

          <section>
            <h2>Our Approach</h2>
            <ul>
              <li>
                <strong>Transparent methodology:</strong> Every score is backed
                by a documented evidence classification.
              </li>
              <li>
                <strong>Reproducible benchmarks:</strong> Datasets, code, and
                environment specifications are published on GitHub.
              </li>
              <li>
                <strong>Evidence-based positioning:</strong> We never make
                unsupported &ldquo;best&rdquo; or &ldquo;worst&rdquo; claims.
              </li>
              <li>
                <strong>Editorial independence:</strong> Sponsors do not
                control research conclusions, vendor scores, or editorial
                decisions.
              </li>
            </ul>
          </section>

          <section>
            <h2>Strategic Rules</h2>
            <ol>
              <li>Do not fabricate research, interviews, benchmark results, or customer outcomes.</li>
              <li>Do not present simulated vendor configurations as official vendor tests.</li>
              <li>Clearly separate observed, documented, simulated, inferred, and unavailable evidence.</li>
              <li>Use the same evaluation methodology across ALL vendors.</li>
              <li>Do not create content whose primary purpose is attacking competitors.</li>
              <li>Do not make unsupported &ldquo;best&rdquo; or &ldquo;worst&rdquo; claims.</li>
              <li>Focus on task-level evidence and highlight specialization/trade-offs.</li>
              <li>Make research reproducible wherever possible.</li>
              <li>Use synthetic data when real customer data is unavailable.</li>
              <li>Clearly disclose material sponsorship/conflicts.</li>
              <li>Optimize for long-term credibility rather than short-term SEO.</li>
              <li>Every major claim should have evidence.</li>
            </ol>
          </section>

          <DisclosureBanner className="my-8" />

          <section>
            <h2>Policies</h2>
            <ul>
              <li>
                <Link href="/about/methodology">Methodology</Link> — Our
                research framework and ASCS scoring system
              </li>
              <li>
                <Link href="/about/editorial-policy">
                  Editorial Policy
                </Link>{" "}
                — How we ensure independence and accuracy
              </li>
              <li>
                <Link href="/about/disclosure">Disclosure</Link> —
                Sponsorship and conflict of interest transparency
              </li>
              <li>
                <Link href="/about/corrections">Corrections</Link> — How we
                handle errors and updates
              </li>
            </ul>
          </section>

          <section>
            <h2>Contact</h2>
            <p>
              For research inquiries, partnership discussions, or corrections,
              contact us at{" "}
              <a href="mailto:research@reviews-cxo.com">
                research@reviews-cxo.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
