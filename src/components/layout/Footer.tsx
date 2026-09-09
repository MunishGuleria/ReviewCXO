import Link from "next/link";
import { SITE, NAVIGATION, ABOUT_LINKS } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-foreground">
                Reviews_CXO
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              Independent, evidence-based research on AI for enterprise sales.
              Benchmarks, architecture analysis, and CXO insights.
            </p>
            {/* Social Icons */}
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://github.com/reviews-cxo"
                className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-surface text-muted transition-all hover:border-primary/30 hover:text-primary hover:bg-primary/5"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/reviews-cxo"
                className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-surface text-muted transition-all hover:border-primary/30 hover:text-primary hover:bg-primary/5"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <Link
                href="/rss.xml"
                className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-surface text-muted transition-all hover:border-primary/30 hover:text-primary hover:bg-primary/5"
                aria-label="RSS Feed"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 19.5v-.75a7.5 7.5 0 00-7.5-7.5H4.5m8.25-6v-.75a15 15 0 00-15-15H4.5m.75 19.5a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Research Links */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-primary border-l-4 border-primary pl-3">
              Research
            </h3>
            <ul className="mt-4 space-y-2.5">
              {NAVIGATION.filter((item) => !item.hidden).map((item) => (
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

          {/* About Links */}
          <div className="md:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-primary border-l-4 border-primary pl-3">
              About
            </h3>
            <ul className="mt-4 space-y-2.5">
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

          {/* Contact */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-primary border-l-4 border-primary pl-3">
              Contact
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  {SITE.email}
                </a>
              </li>
            </ul>

            <div className="mt-6 rounded-xl border border-border bg-surface p-4 shadow-sm">
              <p className="text-xs font-bold text-foreground">Research Dispatch</p>
              <p className="mt-1 text-[11px] leading-relaxed text-muted">
                Quarterly architecture reports & benchmark releases. Zero marketing spam.
              </p>
              <Link
                href="/newsletter"
                className="mt-3 inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-xs font-bold text-white transition-all hover:bg-primary-dark shadow-sm"
              >
                Subscribe
                <span className="text-white/70">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-border pt-8 pb-4">
          <div className="flex flex-col-reverse items-start gap-6 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-2">
              <p className="max-w-2xl text-[11px] leading-relaxed text-muted/70">
                Reviews_CXO is an independently operated research initiative.
                Sponsors do not control research conclusions, vendor scores, or editorial decisions.
              </p>
              <p className="text-[10px] font-medium text-muted">
                &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
