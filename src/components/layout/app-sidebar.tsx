"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AlertTriangle,
  Globe2,
  Home,
  LayoutGrid,
  NotebookText,
  Server,
  Settings
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationItem {
  href: string;
  label: string;
  icon: LucideIcon;
  exact?: boolean;
}

const primaryNavigation: NavigationItem[] = [
  { href: "/", label: "仪表盘", icon: Home, exact: true },
  { href: "/projects", label: "项目管理", icon: LayoutGrid },
  { href: "/services", label: "服务网站", icon: Globe2 },
  { href: "/servers", label: "VPS 服务器", icon: Server },
  { href: "/notes", label: "笔记文档", icon: NotebookText }
];

export function AppSidebar() {
  const pathname = usePathname();
  const isActive = (href: string, exact = false) =>
    exact ? pathname === href : pathname.startsWith(href);

  const linkClass = (active: boolean) =>
    cn(
      "flex h-9 items-center gap-2.5 rounded-md px-2.5 text-sm transition-colors duration-150",
      active
        ? "bg-elevated text-foreground"
        : "text-muted-foreground hover:bg-elevated/70 hover:text-foreground"
    );

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col border-r border-border bg-card md:flex">
      <div className="border-b border-border px-4 py-4">
        <div className="text-xs text-muted-foreground">我的空间</div>
        <div className="mt-1 flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md border border-border bg-elevated text-[11px] font-semibold">
            PC
          </span>
          <span className="text-sm font-semibold tracking-tight">个人控制台</span>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {primaryNavigation.map((item) => {
          const active = isActive(item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={linkClass(active)}
              aria-current={active ? "page" : undefined}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}

        <div className="my-3 h-px bg-border" />
        <Link
          href="/monitoring"
          className={linkClass(isActive("/monitoring"))}
          aria-current={isActive("/monitoring") ? "page" : undefined}
        >
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <span>监控告警</span>
        </Link>
        <div className="my-3 h-px bg-border" />

        <Link
          href="/settings"
          className={linkClass(isActive("/settings"))}
          aria-current={isActive("/settings") ? "page" : undefined}
        >
          <Settings className="h-4 w-4 shrink-0" />
          <span>设置中心</span>
        </Link>
      </nav>

      <div className="border-t border-border p-3">
        <div className="flex items-center gap-2.5 rounded-md px-1 py-1.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-elevated text-xs font-semibold">
            C
          </span>
          <div className="min-w-0">
            <div className="truncate text-sm font-medium">Claw</div>
            <div className="truncate text-xs text-muted-foreground">个人空间</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
