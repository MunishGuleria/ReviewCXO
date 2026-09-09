"use client";

import Link from "next/link";
import { NAV_GROUPS } from "@/lib/site";
import { NavIcon } from "./NavIcon";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/60 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 z-50 w-[min(85vw,360px)] bg-surface border-l border-border shadow-xl overflow-y-auto">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-surface px-6 py-4">
          <span className="text-base font-bold text-foreground">
            Reviews<span className="text-primary-text">_CXO</span>
          </span>
          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-surface-alt hover:text-foreground transition-colors"
            onClick={onClose}
            aria-label="Close menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="px-6 py-6 space-y-6">
          {NAV_GROUPS.map((group) => {
            if (group.directLink && group.href) {
              return (
                <Link
                  key={group.label}
                  href={group.href}
                  className="block text-sm font-medium text-secondary-foreground hover:text-foreground transition-colors"
                  onClick={onClose}
                >
                  {group.label}
                </Link>
              );
            }

            return (
              <div key={group.label}>
                <p className="mb-2 text-xs font-semibold text-secondary-foreground">
                  {group.label}
                </p>
                <div className="space-y-1">
                  {group.items.filter((item) => !item.hidden).map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group flex items-center gap-3 rounded-md px-3 py-2.5 transition-colors hover:bg-surface-alt"
                      onClick={onClose}
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border bg-surface text-muted-foreground group-hover:border-primary/50 group-hover:text-primary-text transition-colors">
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

          <div className="pt-2">
            <Link
              href="/newsletter"
              className="btn-primary w-full"
              onClick={onClose}
            >
              Subscribe to Research
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
