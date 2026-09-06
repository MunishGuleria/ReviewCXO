"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { SITE, NAV_GROUPS } from "@/lib/site";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

/* ── Inline SVG icons for nav items ── */
function NavIcon({ name, className = "h-4 w-4" }: { name: string; className?: string }) {
  const icons: Record<string, React.ReactNode> = {
    chart: (
      <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    flask: (
      <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M5 14.5l-.94.94a1.5 1.5 0 00.47 2.416l.882.353a18.272 18.272 0 0013.176 0l.882-.353a1.5 1.5 0 00.47-2.416L19.8 15.3M5 14.5l1.313-1.312" />
      </svg>
    ),
    scale: (
      <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
      </svg>
    ),
    grid: (
      <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
    building: (
      <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
    file: (
      <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
    chat: (
      <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
    book: (
      <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  };
  return <>{icons[name] || null}</>;
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const openGroup = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveGroup(label);
  };

  const closeGroup = () => {
    timeoutRef.current = setTimeout(() => setActiveGroup(null), 150);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 glass gradient-border-b transition-all duration-300 ${
          scrolled ? "shadow-lg shadow-black/[0.03] dark:shadow-black/20" : ""
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary-dark font-mono text-[10px] font-black text-white shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:shadow-primary/20 group-hover:scale-105">
              CXO
            </span>
            <span className="text-lg font-black tracking-tight text-foreground transition-colors group-hover:text-primary">
              Reviews<span className="text-primary">_CXO</span>
            </span>
            <span className="hidden rounded-md bg-accent/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent border border-accent/20 sm:inline">
              Research Lab
            </span>
          </Link>

          {/* ── Desktop Navigation ── */}
          <nav className="hidden items-center gap-0.5 lg:flex">
            {NAV_GROUPS.map((group) => (
              <div
                key={group.label}
                className="nav-group relative"
                onMouseEnter={() => openGroup(group.label)}
                onMouseLeave={closeGroup}
              >
                <button
                  type="button"
                  className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                    activeGroup === group.label
                      ? "text-primary bg-primary/5"
                      : "text-foreground/70 hover:text-foreground hover:bg-surface-alt/60"
                  }`}
                >
                  {group.label}
                  <svg
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${
                      activeGroup === group.label ? "rotate-180 text-primary" : "text-muted"
                    }`}
                    fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>

                {/* ── Dropdown Panel ── */}
                <div
                  className={`nav-dropdown absolute left-1/2 -translate-x-1/2 top-full pt-2 ${
                    activeGroup === group.label ? "!opacity-100 !visible !translate-y-0" : ""
                  }`}
                >
                  <div className="glass-card rounded-xl p-2 shadow-xl shadow-black/[0.08] dark:shadow-black/30 min-w-[280px]">
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="group/item flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-primary/5"
                        onClick={() => setActiveGroup(null)}
                      >
                        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-surface-alt border border-border text-muted group-hover/item:border-primary/30 group-hover/item:text-primary transition-colors">
                          <NavIcon name={item.icon} className="h-4 w-4" />
                        </span>
                        <div className="min-w-0">
                          <span className="text-sm font-bold text-foreground group-hover/item:text-primary transition-colors">
                            {item.label}
                          </span>
                          <p className="text-xs text-muted leading-relaxed mt-0.5">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </nav>

          {/* ── Desktop Right Actions ── */}
          <div className="hidden items-center gap-2.5 lg:flex">
            <ThemeToggle />
            <Link
              href="/about"
              className="rounded-lg px-3 py-2 text-sm font-semibold text-muted transition-colors hover:text-foreground hover:bg-surface-alt/60"
            >
              About
            </Link>
            <Link
              href="/newsletter"
              className="group relative rounded-lg bg-gradient-to-r from-primary to-primary-light px-4 py-2 text-sm font-bold text-white shadow-md shadow-primary/20 transition-all hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="relative z-10">Subscribe</span>
            </Link>
          </div>

          {/* ── Mobile Toggle ── */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted hover:text-foreground hover:bg-surface-alt transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Slide-in Drawer ── */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden animate-fade-in-up"
            style={{ animationDuration: '0.15s' }}
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer */}
          <div className="fixed inset-y-0 right-0 z-50 w-[min(85vw,360px)] glass border-l border-border shadow-2xl lg:hidden animate-fade-in-up overflow-y-auto"
               style={{ animationDuration: '0.25s' }}>
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <span className="text-sm font-black text-foreground">
                Reviews<span className="text-primary">_CXO</span>
              </span>
              <button
                type="button"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:text-foreground hover:bg-surface-alt transition-colors"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="px-4 py-4 space-y-4">
              {NAV_GROUPS.map((group) => (
                <div key={group.label}>
                  <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-widest text-accent">
                    {group.label}
                  </p>
                  <div className="space-y-0.5">
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-primary/5 hover:text-foreground"
                        onClick={() => setMobileOpen(false)}
                      >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-surface-alt border border-border text-muted">
                          <NavIcon name={item.icon} className="h-3.5 w-3.5" />
                        </span>
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              <hr className="border-border" />

              <Link
                href="/about"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-primary/5 hover:text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                About
              </Link>

              <Link
                href="/newsletter"
                className="block rounded-lg bg-gradient-to-r from-primary to-primary-light px-4 py-3 text-center text-sm font-bold text-white shadow-md shadow-primary/20"
                onClick={() => setMobileOpen(false)}
              >
                Subscribe to Research Dispatch
              </Link>
            </nav>
          </div>
        </>
      )}
    </>
  );
}
