"use client";

import Link from "next/link";
import { NAV_GROUPS } from "@/lib/site";
import { NavIcon } from "./NavIcon";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  user: { id: string; email: string; name: string; role: string } | null;
  onLogout: () => void;
}

export function MobileNav({ isOpen, onClose, user, onLogout }: MobileNavProps) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/60 transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 z-50 w-[min(88vw,380px)] bg-surface border-l border-border shadow-xl overflow-y-auto flex flex-col">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-surface px-5 py-4 pb-4">
          <span className="text-base font-bold text-foreground">
            Reviews <span className="text-primary-text">CXO</span>
          </span>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground hover:bg-surface-alt hover:text-foreground transition-colors"
            onClick={onClose}
            aria-label="Close menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
          {NAV_GROUPS.map((group) => {
            if (group.directLink && group.href) {
              return (
                <Link
                  key={group.label}
                  href={group.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold text-secondary-foreground hover:bg-surface-alt hover:text-foreground transition-colors"
                  onClick={onClose}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-surface text-muted-foreground">
                    <NavIcon name="chart" className="h-4 w-4" />
                  </span>
                  {group.label}
                </Link>
              );
            }

            return (
              <div key={group.label}>
                <p className="mb-2 px-1 text-xs font-bold uppercase tracking-wider text-muted">
                  {group.label}
                </p>
                <div className="space-y-0.5">
                  {group.items.filter((item) => !item.hidden).map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group flex items-center gap-3 rounded-lg px-3 py-3 transition-colors hover:bg-surface-alt"
                      onClick={onClose}
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-surface text-muted-foreground group-hover:border-primary/50 group-hover:text-primary-text transition-colors">
                        <NavIcon name={item.icon} className="h-4 w-4" />
                      </span>
                      <span className="text-sm font-medium text-foreground group-hover:text-primary-text transition-colors">
                        {item.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </nav>

        <div className="sticky bottom-0 border-t border-border bg-surface px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <Link
            href="/submit-review"
            className={`btn-primary w-full flex items-center justify-center ${user ? 'mb-4' : ''}`}
            onClick={onClose}
          >
            Submit Review
          </Link>
          
          {user && (
            <div className="flex items-center justify-between p-3 rounded-xl border border-border bg-surface-alt">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-surface border border-border font-mono text-xs font-bold text-secondary-foreground uppercase">
                  {user.name.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-foreground leading-tight">{user.name}</span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{user.role}</span>
                </div>
              </div>
              <button
                onClick={() => { onLogout(); onClose(); }}
                className="inline-flex h-8 w-8 items-center justify-center rounded text-muted-foreground hover:bg-surface hover:text-foreground transition-colors"
                title="Sign out"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
