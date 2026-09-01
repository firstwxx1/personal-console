import { Activity, Box, CircleAlert, PauseCircle } from "lucide-react";
import { Card } from "@/components/ui";
import { projects } from "@/data/projects";
import { ProjectStatusBadge } from "./project-status";

export function ProjectDashboard() {
  const running = projects.filter((project) => project.status === "running").length;
  const unhealthy = projects.filter((project) => project.status === "error").length;
  const paused = projects.filter((project) => project.status === "stopped" || project.status === "maintaining").length;
  const stats = [
    { label: "全部项目", value: projects.length, hint: "已纳入管理", icon: Box },
    { label: "运行中", value: running, hint: "状态正常", icon: Activity },
    { label: "需关注", value: unhealthy, hint: "异常项目", icon: CircleAlert },
    { label: "已暂停", value: paused, hint: "停止或维护", icon: PauseCircle },
  ];
  const recent = [...projects].sort((a, b) => a.updatedAt.localeCompare(b.updatedAt, "zh-CN")).slice(0, 4);
  return <div className="grid gap-3 xl:grid-cols-[minmax(0,7fr)_minmax(280px,5fr)]"><section className="grid grid-cols-2 gap-3 lg:grid-cols-4">{stats.map(({ label, value, hint, icon: Icon }) => <Card key={label} className="p-4"><div className="flex items-center justify-between text-xs text-muted-foreground"><span>{label}</span><Icon className="h-4 w-4" /></div><div className="mt-3 text-2xl font-semibold">{value}</div><div className="mt-2 text-xs text-muted-foreground">{hint}</div></Card>)}</section><Card className="overflow-hidden"><div className="border-b border-border px-4 py-3 text-sm font-medium">项目最近活动</div><ul className="divide-y divide-border">{recent.map((project) => <li key={project.id} className="flex items-center gap-3 px-4 py-2.5"><span className="min-w-0 flex-1"><span className="block truncate text-sm">{project.name}</span><span className="block truncate text-xs text-muted-foreground">{project.updatedAt} · {project.vpsName}</span></span><ProjectStatusBadge status={project.status} /></li>)}</ul></Card></div>;
}
