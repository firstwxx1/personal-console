import Link from "next/link";
import { Box, Globe2, Server } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionPanel } from "@/components/dashboard/section-panel";
import { recentItems } from "@/data/dashboard";
import { serviceSites } from "@/data/services";

const typeIcons = {
  项目: Box,
  网站: Globe2,
  VPS: Server
} satisfies Record<(typeof recentItems)[number]["type"], LucideIcon>;

export function RecentActivity() {
  return (
    <SectionPanel title="最近访问">
      <ul className="divide-y divide-border">
        {recentItems.map((item) => {
          const Icon = typeIcons[item.type];
          const service = serviceSites.find((site) => site.id === item.id);
          const href =
            item.type === "网站"
              ? service?.url ?? "/services"
              : item.type === "项目"
                ? `/projects/${item.id}`
                : `/servers/${item.id}`;

          return (
            <li key={`${item.type}-${item.id}`}>
              <Link
                href={href}
                className="flex items-center gap-3 px-4 py-3 transition-colors duration-150 hover:bg-elevated/50"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border bg-elevated">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">
                    {item.name}
                  </span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {item.description} · {item.type}
                  </span>
                </span>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {item.visitedAt}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </SectionPanel>
  );
}
