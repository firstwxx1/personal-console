"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe2, Home, LayoutGrid, MoreHorizontal } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
interface MobileNavigationItem { href: string; label: string; icon: LucideIcon; exact?: boolean; }
const navigation: MobileNavigationItem[] = [
  { href: "/", label: "首页", icon: Home, exact: true },
  { href: "/projects", label: "项目", icon: LayoutGrid },
  { href: "/services", label: "网站", icon: Globe2 },
  { href: "/settings", label: "更多", icon: MoreHorizontal }
];
export function MobileNav() { const pathname = usePathname(); return <nav className="fixed inset-x-0 bottom-0 z-40 grid min-h-16 grid-cols-5 border-t border-border bg-card pb-[env(safe-area-inset-bottom)] md:hidden">{navigation.map((item) => { const active = item.exact ? pathname === item.href : pathname.startsWith(item.href); return <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} className={cn("flex min-h-16 touch-manipulation flex-col items-center justify-center gap-1 px-1 text-[11px] transition-colors duration-150", active ? "text-foreground" : "text-muted-foreground hover:text-foreground")}><item.icon className="h-[18px] w-[18px]" /><span>{item.label}</span></Link>; })}</nav>; }
