import { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Editorial Policy",
  description:
    "Reviews_CXO editorial independence policy — how we ensure research integrity and independence.",
};

export default function EditorialPolicyPage() {
  return (
    <>
      <PageHeader
        title="Editorial Policy"
        description="Our commitment to independent, evidence-based research."
      />

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="prose">
          <section>
            <h2>Editorial Independence</h2>
            <p>
              Reviews_CXO maintains editorial independence in all research
              conclusions, vendor scores, benchmark methodology, and
              publication decisions. No sponsor, advertiser, or vendor
              controls the content.
            </p>
          </section>

          <section>
            <h2>Research Integrity</h2>
            <ul>
              <li>
                All research follows the published ASCS methodology without
                exception.
              </li>
              <li>
                Vendor scores are determined by evidence, not business
                relationships.
              </li>
              <li>
                Negative findings are published alongside positive ones.
              </li>
              <li>
                Limitations and caveats are always disclosed prominently.
              </li>
            </ul>
          </section>

          <section>
            <h2>Conflict of Interest</h2>
            <ul>
              <li>
                All researchers must disclose personal or financial
                relationships with evaluated vendors.
              </li>
              <li>
                The sponsoring company is evaluated using the same methodology
                as all other vendors.
              </li>
              <li>
                Any dimension where the sponsor scores unusually high or low
                receives additional advisory board scrutiny.
              </li>
            </ul>
          </section>

          <section>
            <h2>Vendor Communication</h2>
            <ul>
              <li>
                Vendors may be invited to review factual accuracy of their
                profile pages before publication.
              </li>
              <li>
                Vendor feedback does not obligate Reviews_CXO to change
                scores, conclusions, or framing.
              </li>
              <li>All vendor communication is documented.</li>
            </ul>
          </section>

          <section>
            <h2>AI-Generated Content</h2>
            <ul>
              <li>
                AI tools may assist with data analysis, visualization, and
                draft generation.
              </li>
              <li>
                All AI-assisted content is reviewed and validated by human
                researchers.
              </li>
              <li>
                AI-generated content is disclosed when it constitutes a
                substantial portion of the output.
              </li>
            </ul>
          </section>

          <section>
            <h2>Data Integrity</h2>
            <ul>
              <li>All datasets are versioned and checksummed.</li>
              <li>Raw data is preserved and available for audit.</li>
              <li>
                Methodology changes between versions are documented in
                changelogs.
              </li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
