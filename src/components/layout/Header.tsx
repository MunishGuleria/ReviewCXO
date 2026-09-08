"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-shadow duration-200 nav-container ${
          scrolled ? "shadow-sm" : ""
        }`}
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* ── Logo Wordmark ── */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-lg font-bold tracking-tight text-foreground">
              Reviews<span className="text-primary-text">_CXO</span>
            </span>
          </Link>

          {/* ── Desktop Navigation ── */}
          <DesktopNav />

          {/* ── Desktop Right Actions ── */}
          <div className="hidden items-center gap-4 lg:flex">
            <div className="flex items-center">
               <ThemeToggle />
            </div>
            <div className="h-4 w-px bg-border" />
            <Link
              href="/about"
              className="text-sm font-medium text-secondary-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              href="mailto:research@reviews-cxo.com"
              className="btn-primary whitespace-nowrap"
            >Contact Analyst</Link>
          </div>

          {/* ── Mobile Toggle ── */}
          <div className="flex items-center gap-3 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface text-foreground hover:bg-surface-alt transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label="Toggle menu"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Spacer to prevent content from going under the fixed header */}
      <div className="h-14" />

      {/* ── Mobile Navigation Drawer ── */}
      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
