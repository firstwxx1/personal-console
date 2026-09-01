"use client";

import {
  Activity,
  Bot,
  ChartLine,
  Cloud,
  Container,
  Github,
  Landmark,
  Mail,
  NotebookText,
  Triangle,
  Video
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { SectionPanel } from "@/components/dashboard/section-panel";
import { serviceCategories, type ServiceIcon, type ServiceSite } from "@/data/services";

const iconMap: Record<ServiceIcon, LucideIcon> = {
  github: Github,
  cloud: Cloud,
  triangle: Triangle,
  container: Container,
  bot: Bot,
  mail: Mail,
  video: Video,
  notebook: NotebookText,
  finance: Activity,
  chart: ChartLine,
  bank: Landmark,
  activity: Activity
};

export function QuickAccess() {
  const [sites, setSites] = useState<ServiceSite[]>([]);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    fetch("/api/services", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("load");
        setSites(await response.json() as ServiceSite[]);
      })
      .catch(() => setLoadError("快捷访问加载失败，请稍后重试。"));
  }, []);

  return (
    <SectionPanel title="快捷访问" actionLabel="管理网站" actionHref="/services">
      <div className="space-y-4 p-4">
        {loadError ? <p className="text-sm text-danger">{loadError}</p> : null}
        {!loadError && sites.length === 0 ? <p className="text-sm text-muted-foreground">还没有快捷网站，点击“管理网站”添加。</p> : null}
        {serviceCategories.map((category) => {
          const categorySites = sites.filter(
            (site) => site.category === category
          );
          if (categorySites.length === 0) return null;

          return (
            <section key={category}>
              <h3 className="mb-2 text-xs font-medium text-muted-foreground">
                {category}
              </h3>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-2">
                {categorySites.map((site) => {
                  const Icon = iconMap[site.icon];
                  return (
                    <a
                      key={site.id}
                      href={site.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex min-w-0 items-center gap-2 rounded-md border border-border bg-elevated/50 px-2.5 py-2 text-xs transition-colors duration-150 hover:border-input hover:bg-elevated"
                      title={site.description}
                    >
                      <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                      <span className="truncate font-medium">{site.name}</span>
                    </a>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </SectionPanel>
  );
}
