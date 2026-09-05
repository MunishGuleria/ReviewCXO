import Link from "next/link";
import { SITE, NAVIGATION, ABOUT_LINKS } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" className="text-lg font-extrabold text-primary">
              {SITE.name}
            </Link>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Independent, evidence-based research on AI for enterprise sales.
              Benchmarks, architecture analysis, and CXO insights.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Research
            </h3>
            <ul className="mt-3 space-y-2">
              {NAVIGATION.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              About
            </h3>
            <ul className="mt-3 space-y-2">
              {ABOUT_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Connect
            </h3>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href="https://github.com/reviews-cxo"
                  className="text-sm text-muted transition-colors hover:text-foreground"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/company/reviews-cxo"
                  className="text-sm text-muted transition-colors hover:text-foreground"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <Link
                  href="/rss.xml"
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  RSS Feed
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  {SITE.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-muted">
              &copy; {new Date().getFullYear()} {SITE.name}. All rights
              reserved.
            </p>
            <p className="max-w-2xl text-center text-xs leading-relaxed text-muted sm:text-left">
              Reviews_CXO is an independently operated research initiative
              focused on AI for enterprise sales. The publication receives
              financial support from a technology company active in the
              enterprise software sector. Sponsors do not control individual
              research conclusions, vendor scores, benchmark methodology, or
              editorial decisions.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
