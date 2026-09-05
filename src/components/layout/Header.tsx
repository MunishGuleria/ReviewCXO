"use client";

import Link from "next/link";
import { useState } from "react";
import { SITE, NAVIGATION } from "@/lib/site";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/90 backdrop-blur-md supports-[backdrop-filter]:bg-surface/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary font-mono text-sm font-black text-white shadow-sm transition-transform group-hover:scale-105">
            CXO
          </span>
          <span className="text-xl font-black tracking-tight text-foreground transition-colors group-hover:text-primary">
            Reviews<span className="text-primary">_CXO</span>
          </span>
          <span className="hidden rounded bg-surface-alt px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-muted sm:inline border border-border">
            Research Lab
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAVIGATION.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-semibold text-foreground/80 transition-colors hover:bg-surface-alt hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Link
            href="/about"
            className="text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            About
          </Link>
          <Link
            href="/newsletter"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white shadow-sm transition-colors hover:bg-primary-dark"
          >
            Dispatch
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-muted hover:text-foreground md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
            </svg>
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-surface px-4 pb-4 pt-2 md:hidden">
          <nav className="flex flex-col gap-1">
            {NAVIGATION.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground/70 hover:bg-surface-alt hover:text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <hr className="my-2 border-border" />
            <Link
              href="/about"
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/70 hover:bg-surface-alt hover:text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              About
            </Link>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm font-medium text-muted">Appearance</span>
              <ThemeToggle />
            </div>
            <Link
              href="/newsletter"
              className="mt-2 rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-bold text-white hover:bg-primary-dark"
              onClick={() => setMobileOpen(false)}
            >
              Dispatch
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
