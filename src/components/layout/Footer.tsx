import Link from "next/link";
import { SITE, NAVIGATION, ABOUT_LINKS } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative border-t border-border/50 bg-background overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[1000px] pointer-events-none">
        <div className="absolute -top-[300px] left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-[100%] bg-primary/10 blur-[120px] opacity-60" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Brand & Mission */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <span className="text-2xl font-black tracking-tight text-foreground transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.3)]">
                Reviews <span className="text-primary-text">CXO</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted font-medium">
              Editorial research on AI for enterprise sales.
              Architecture analysis, benchmarks, and CXO insights.
            </p>
            
            {/* Social Icons */}
            <div className="mt-8 flex items-center gap-3">
              <a
                href="https://github.com/reviews-cxo"
                className="group relative flex h-10 w-10 items-center justify-center rounded-xl bg-surface border border-border/60 transition-all duration-300 hover:border-primary/40 hover:bg-primary/5 hover:shadow-[0_0_20px_rgba(56,189,248,0.15)] hover:-translate-y-1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <svg className="h-4 w-4 text-muted transition-colors duration-300 group-hover:text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/reviews-cxo"
                className="group relative flex h-10 w-10 items-center justify-center rounded-xl bg-surface border border-border/60 transition-all duration-300 hover:border-primary/40 hover:bg-primary/5 hover:shadow-[0_0_20px_rgba(56,189,248,0.15)] hover:-translate-y-1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <svg className="h-4 w-4 text-muted transition-colors duration-300 group-hover:text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <Link
                href="/rss.xml"
                className="group relative flex h-10 w-10 items-center justify-center rounded-xl bg-surface border border-border/60 transition-all duration-300 hover:border-primary/40 hover:bg-primary/5 hover:shadow-[0_0_20px_rgba(56,189,248,0.15)] hover:-translate-y-1"
                aria-label="RSS Feed"
              >
                <svg className="h-4 w-4 text-muted transition-colors duration-300 group-hover:text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 19.5v-.75a7.5 7.5 0 00-7.5-7.5H4.5m8.25-6v-.75a15 15 0 00-15-15H4.5m.75 19.5a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row gap-12 sm:gap-24">
            {/* Research Links */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-foreground mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary/80 animate-pulse" />
                Research
              </h3>
              <ul className="space-y-3.5">
                {NAVIGATION.filter((item) => !item.hidden).map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group flex items-center text-sm font-medium text-muted transition-all duration-300 hover:text-foreground"
                    >
                      <span className="relative overflow-hidden">
                        {item.label}
                        <span className="absolute left-0 bottom-0 w-full h-px bg-primary/50 translate-x-[-100%] transition-transform duration-300 group-hover:translate-x-0" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* About Links */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-foreground mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary/40" />
                About
              </h3>
              <ul className="space-y-3.5">
                {ABOUT_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group flex items-center text-sm font-medium text-muted transition-all duration-300 hover:text-foreground"
                    >
                      <span className="relative overflow-hidden">
                        {item.label}
                        <span className="absolute left-0 bottom-0 w-full h-px bg-primary/50 translate-x-[-100%] transition-transform duration-300 group-hover:translate-x-0" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end">
            <div className="w-full max-w-sm rounded-2xl border border-border/40 bg-surface/50 backdrop-blur-xl p-6 shadow-2xl transition-all duration-500 hover:border-primary/30 hover:shadow-[0_0_40px_rgba(56,189,248,0.1)] relative overflow-hidden group">
              {/* Subtle animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 mb-4 border border-primary/20">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Dispatch</span>
                </div>
                
                <h4 className="text-base font-bold text-foreground">Stay ahead of the curve</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Quarterly architecture reports & benchmark releases. Strict research-only publications.
                </p>
                
                <Link
                  href="/newsletter"
                  className="mt-6 group/btn inline-flex w-full items-center justify-between gap-2 rounded-xl bg-foreground px-4 py-3 text-sm font-bold text-background transition-all hover:scale-[1.02] hover:bg-primary"
                >
                  Subscribe to Newsletter
                  <svg className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 border-t border-border/40 pt-8 pb-4 relative z-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-[11px] font-semibold tracking-wider text-muted/50 lg:whitespace-nowrap">
              <span>&copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.</span>
              <span className="hidden sm:block h-3 w-px bg-border/60"></span>
              <a href={`mailto:${SITE.email}`} className="hover:text-primary transition-colors">{SITE.email}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
