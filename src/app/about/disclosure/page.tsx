import { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Disclosure",
  description:
    "Reviews_CXO sponsorship disclosure and conflict of interest transparency.",
};

export default function DisclosurePage() {
  return (
    <>
      <PageHeader
        title="Disclosure"
        description="Transparency about our funding, sponsorship, and conflicts of interest."
      />

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="prose">
          <section>
            <h2>Sponsorship Disclosure</h2>
            <blockquote>
              Reviews_CXO is an independently operated research initiative
              focused on AI for enterprise sales. The publication receives
              financial support from a technology company active in the
              enterprise software sector. Sponsors do not control individual
              research conclusions, vendor scores, benchmark methodology, or
              editorial decisions.
            </blockquote>
            <p>
              This disclosure appears on the /about page and in the footer of
              every research report published by Reviews_CXO.
            </p>
          </section>

          <section>
            <h2>What Sponsors Do NOT Control</h2>
            <ul>
              <li>Individual research conclusions or findings</li>
              <li>Vendor scores or rankings</li>
              <li>Benchmark methodology or evaluation criteria</li>
              <li>Editorial decisions about what to publish</li>
              <li>The framing or tone of any research report</li>
            </ul>
          </section>

          <section>
            <h2>What Sponsors DO</h2>
            <ul>
              <li>Provide financial support for research operations</li>
              <li>May participate in advisory discussions (non-binding)</li>
              <li>Are evaluated using the same methodology as all other vendors</li>
            </ul>
          </section>

          <section>
            <h2>Conflict of Interest Policy</h2>
            <ul>
              <li>
                All researchers disclose personal or financial relationships
                with evaluated vendors.
              </li>
              <li>
                The sponsoring company receives no preferential treatment in
                scoring or evaluation.
              </li>
              <li>
                Any dimension where the sponsor scores unusually high or low
                receives additional scrutiny from the advisory board.
              </li>
            </ul>
          </section>

          <section>
            <h2>Advertising</h2>
            <p>
              Reviews_CXO does not sell placement in research reports, vendor
              profiles, or benchmark results. Advertising and sponsorship are
              clearly separated from editorial content.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
