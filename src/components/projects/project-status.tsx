import { StatusBadge, type StatusTone } from "@/components/ui";
import type { ProjectStatus } from "@/data/projects";

const statusConfig: Record<ProjectStatus, { label: string; tone: StatusTone }> = {
  running: { label: "运行中", tone: "success" },
  stopped: { label: "已停止", tone: "neutral" },
  error: { label: "异常", tone: "danger" },
  maintaining: { label: "维护中", tone: "warning" }
};

export function ProjectStatusBadge({ status, pulse = false }: { status: ProjectStatus; pulse?: boolean }) {
  const config = statusConfig[status];
  return <StatusBadge tone={config.tone} pulse={pulse && status === "running"}>{config.label}</StatusBadge>;
}
