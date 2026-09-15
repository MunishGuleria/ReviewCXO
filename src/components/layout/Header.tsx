"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => setUser(data.user))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    window.location.href = "/";
  }

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-shadow duration-200 nav-container ${
          scrolled ? "shadow-sm" : ""
        }`}
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-lg font-bold tracking-tight text-foreground">
              Reviews <span className="text-primary-text">CXO</span>
            </span>
          </Link>

          <DesktopNav />

          <div className="hidden items-center gap-4 lg:flex">
            <div className="flex items-center">
               <ThemeToggle />
            </div>
            <div className="h-4 w-px bg-border" />
            {loading ? (
              <div className="h-8 w-24 animate-pulse rounded-lg bg-surface-alt" />
            ) : user ? (
              <div className="flex items-center gap-3">
                {user.role === "admin" && (
                  <Link
                    href="/admin"
                    className="btn-secondary whitespace-nowrap"
                  >Admin</Link>
                )}
                <Link
                  href="/submit-review"
                  className="btn-primary whitespace-nowrap"
                >Submit Review</Link>
                
                <div className="flex items-center gap-3 pl-3 ml-1 border-l border-border">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-surface-alt border border-border font-mono text-[10px] font-bold text-secondary-foreground uppercase">
                      {user.name.charAt(0)}
                    </div>
                    <span className="text-sm font-medium text-foreground">{user.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="inline-flex h-8 w-8 items-center justify-center rounded text-muted-foreground hover:bg-surface-alt hover:text-foreground transition-colors"
                    title="Sign out"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                  </button>
                </div>
              </div>
            ) : (
              <Link
                href="/submit-review"
                className="btn-primary whitespace-nowrap"
              >Submit Review</Link>
            )}
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-foreground hover:bg-surface-alt transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label="Toggle menu"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div className="h-14" />

      <MobileNav
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        user={user}
        onLogout={handleLogout}
      />
    </>
  );
}
