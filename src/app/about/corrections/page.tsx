import { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Corrections",
  description:
    "How Reviews_CXO handles errors, updates, and score recalculations.",
  alternates: { canonical: "https://reviews-cxo.com/about/corrections" },
  openGraph: {
    title: "Corrections & Retractions — Reviews_CXO",
    description: "How we handle errors, updates, and score recalculations.",
    url: "https://reviews-cxo.com/about/corrections",
    siteName: "Reviews_CXO",
    locale: "en_US",
    type: "article",
  },
};

export default function CorrectionsPage() {
  return (
    <>
      <PageHeader
        title="Corrections & Retractions"
        description="Our commitment to accuracy and transparency when errors are identified."
      />

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="prose">
          <section>
            <h2>Corrections Policy</h2>
            <p>
              Reviews_CXO is committed to accuracy. When factual errors are
              identified, we correct them promptly and transparently.
            </p>
            <ul>
              <li>
                <strong>Factual errors</strong> are corrected within 48 hours
                with a visible correction note at the top of the affected
                page.
              </li>
              <li>
                <strong>Score recalculations</strong> trigger a new version of
                the affected benchmark or index, with a changelog entry
                documenting the change.
              </li>
              <li>
                <strong>All corrections</strong> are logged on this page with
                the date, nature of the correction, and affected publication.
              </li>
            </ul>
          </section>

          <section>
            <h2>How to Report an Error</h2>
            <p>
              If you believe any Reviews_CXO publication contains a factual
              error, please email{" "}
              <a href="mailto:research@reviews-cxo.com">
                research@reviews-cxo.com
              </a>{" "}
              with:
            </p>
            <ul>
              <li>The specific page and section containing the error</li>
              <li>The nature of the error</li>
              <li>Supporting evidence for the correction</li>
            </ul>
          </section>

          <section>
            <h2>Version History</h2>
            <p>
              All major updates to published research are documented in
              changelogs within each research page. Version numbers follow
              semantic versioning:
            </p>
            <ul>
              <li>
                <strong>Minor version (v1.1):</strong> Typographical errors,
                formatting fixes, link corrections
              </li>
              <li>
                <strong>Major version (v2.0):</strong> Score changes, new
                data, methodology updates
              </li>
            </ul>
          </section>

          <section>
            <h2>Retractions</h2>
            <p>
              In rare cases where a publication&apos;s methodology or
              conclusions are fundamentally flawed, Reviews_CXO may issue a
              retraction. Retractions are published as updates to the
              original page, never silently removed.
            </p>
          </section>

          <section>
            <h2>Correction Log</h2>
            <p className="text-muted">
              No corrections have been issued yet. This log will be updated as
              corrections are made.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
