import Link from "next/link";
import { Box, ExternalLink, Settings2 } from "lucide-react";
import { StatusBadge } from "@/components/ui";
import { SectionPanel } from "@/components/dashboard/section-panel";
import { projects } from "@/data/projects";

const actionClass =
  "inline-flex h-7 items-center justify-center gap-1 rounded-md border border-border px-2.5 text-xs font-medium text-muted-foreground transition-colors duration-150 hover:border-input hover:bg-elevated hover:text-foreground";

export function ProjectOverview() {
  return (
    <SectionPanel title="项目概览" actionLabel="查看全部" actionHref="/projects">
      <ul className="divide-y divide-border">
        {projects.map((project) => (
          <li
            key={project.id}
            className="p-3 transition-colors duration-150 hover:bg-elevated/50"
          >
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border bg-elevated">
                <Box className="h-4 w-4 text-muted-foreground" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium">{project.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {project.vpsName}
                  </span>
                  <StatusBadge tone="success" className="ml-auto">
                    运行中
                  </StatusBadge>
                </div>
                <p className="mt-1 truncate text-xs text-muted-foreground">
                  {project.description}
                </p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className={actionClass}
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    打开
                  </a>
                  <Link href={`/projects/${project.id}`} className={actionClass}>
                    <Settings2 className="h-3.5 w-3.5" />
                    管理
                  </Link>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </SectionPanel>
  );
}
