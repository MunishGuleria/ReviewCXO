import Link from "next/link";
import { SITE, NAVIGATION, ABOUT_LINKS } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative border-t border-border/40 bg-background overflow-hidden pt-12 pb-6">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[400px] h-[300px] rounded-full bg-primary/10 blur-[120px] opacity-40 mix-blend-screen" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-12 lg:gap-8 mb-10">
          
          {/* Brand */}
          <div className="lg:col-span-4 flex flex-col items-start pr-4">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <span className="text-xl font-black tracking-tight text-foreground transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.4)]">
                Reviews <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">CXO</span>
              </span>
            </Link>
            <p className="mt-3 text-[13px] leading-relaxed text-muted font-medium max-w-xs">
              Editorial research, architecture analysis, and benchmarks for enterprise AI sales platforms.
            </p>
            
            {/* Social Icons */}
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://github.com/reviews-cxo"
                className="group flex h-8 w-8 items-center justify-center rounded-lg bg-surface/50 border border-border/60 transition-all hover:border-primary/50 hover:bg-primary/10 hover:shadow-[0_0_15px_rgba(56,189,248,0.15)]"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <svg className="h-4 w-4 text-muted transition-colors group-hover:text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/reviews-cxo"
                className="group flex h-8 w-8 items-center justify-center rounded-lg bg-surface/50 border border-border/60 transition-all hover:border-primary/50 hover:bg-primary/10 hover:shadow-[0_0_15px_rgba(56,189,248,0.15)]"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <svg className="h-4 w-4 text-muted transition-colors group-hover:text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links Section (Research + About) combined in a denser layout */}
          <div className="lg:col-span-4 flex flex-row gap-12 sm:gap-16">
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground mb-4">
                Research
              </h3>
              <ul className="space-y-2.5">
                {NAVIGATION.filter((item) => !item.hidden).map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group inline-flex items-center text-[13px] font-medium text-muted transition-colors hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground mb-4">
                About
              </h3>
              <ul className="space-y-2.5">
                {ABOUT_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group inline-flex items-center text-[13px] font-medium text-muted transition-colors hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Minimal Newsletter Box */}
          <div className="lg:col-span-4">
            <div className="rounded-xl border border-border/40 bg-surface/20 p-5 shadow-sm transition-all hover:border-primary/30 hover:bg-surface/30">
              <h4 className="text-[13px] font-bold text-foreground mb-1.5 flex items-center gap-2">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
                </span>
                CXO Research Dispatch
              </h4>
              <p className="text-[12px] leading-relaxed text-muted mb-4">
                Quarterly architecture reports & benchmark releases to your inbox.
              </p>
              
              <Link
                href="/newsletter"
                className="group flex w-full items-center justify-between rounded-lg bg-foreground px-3 py-2 text-[12px] font-semibold text-background transition-colors hover:bg-primary"
              >
                Subscribe
                <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-5 border-t border-border/40 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-muted/60">
            <span>&copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-semibold text-muted">
             <a href={`mailto:${SITE.email}`} className="hover:text-primary transition-colors flex items-center gap-1.5">
               <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
               </svg>
               {SITE.email}
             </a>
             <Link href="/about/disclosure" className="hover:text-primary transition-colors">
               Disclosures
             </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
