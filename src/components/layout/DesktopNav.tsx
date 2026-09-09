"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { NAV_GROUPS } from "@/lib/site";
import { NavIcon } from "./NavIcon";

export function DesktopNav() {
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const openGroup = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveGroup(label);
  };

  const closeGroup = () => {
    timeoutRef.current = setTimeout(() => setActiveGroup(null), 150);
  };

  return (
    <nav className="hidden items-center gap-1 lg:flex">
      {NAV_GROUPS.map((group) => {
        if (group.directLink && group.href) {
          return (
            <Link
              key={group.label}
              href={group.href}
              className="rounded-md px-3 py-1.5 text-sm font-medium text-secondary-foreground hover:bg-surface-alt hover:text-foreground transition-colors"
            >
              {group.label}
            </Link>
          );
        }

        return (
          <div
            key={group.label}
            className="nav-group relative"
            onMouseEnter={() => openGroup(group.label)}
            onMouseLeave={closeGroup}
          >
            <button
              type="button"
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                activeGroup === group.label
                  ? "bg-surface-alt text-foreground"
                  : "text-secondary-foreground hover:bg-surface-alt hover:text-foreground"
              }`}
            >
              {group.label}
              <svg
                className="h-3 w-3 opacity-60"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>

            {/* ── Dropdown Panel ── */}
            <div
              className={`nav-dropdown absolute left-0 top-full pt-2 ${
                activeGroup === group.label ? "opacity-100 visible" : ""
              }`}
            >
              <div className="relative rounded-md border border-border bg-surface p-2 shadow-md min-w-[320px]">
                <div className="space-y-1">
                  {group.items.filter((item) => !item.hidden).map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group flex items-start gap-3 rounded-md px-3 py-2.5 transition-colors hover:bg-surface-alt"
                      onClick={() => setActiveGroup(null)}
                    >
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border bg-surface text-muted-foreground group-hover:border-primary/50 group-hover:text-primary-text transition-colors">
                        <NavIcon name={item.icon} className="h-4 w-4" />
                      </span>
                      <div>
                        <span className="block text-sm font-medium text-foreground group-hover:text-primary-text transition-colors">
                          {item.label}
                        </span>
                        <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </nav>
  );
}
