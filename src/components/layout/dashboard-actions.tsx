"use client";

import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export function DashboardActions() {
  const openSearch = () => window.dispatchEvent(new Event("personal-console:open-search"));

  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      <button
        type="button"
        className="flex h-9 min-w-9 items-center gap-2 rounded-md border border-border bg-card px-2.5 text-sm text-muted-foreground transition-colors duration-150 hover:border-input hover:text-foreground"
        aria-label="全局搜索"
        title="全局搜索"
        onClick={openSearch}
      >
        <Search className="h-4 w-4" />
        <span className="hidden lg:inline">搜索</span>
        <kbd className="hidden rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] lg:inline">
          Ctrl K
        </kbd>
      </button>

      <Button
        variant="ghost"
        size="icon"
        className="relative h-9 w-9 shrink-0"
        aria-label="通知"
        title="通知"
      >
        <Bell className="h-4 w-4" />
        <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary" />
      </Button>

      <ThemeToggle />

      <button
        type="button"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-elevated text-xs font-semibold transition-colors duration-150 hover:border-input"
        aria-label="用户头像"
        title="Claw"
      >
        C
      </button>
    </div>
  );
}
