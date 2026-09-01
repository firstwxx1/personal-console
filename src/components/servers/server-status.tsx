import { StatusBadge } from "@/components/ui";
import type { VpsStatus } from "@/data/vps";

const labels: Record<VpsStatus, string> = { online: "运行中", offline: "已离线", maintenance: "维护中" };
const tones = { online: "success", offline: "danger", maintenance: "warning" } as const;

export function ServerStatusBadge({ status }: { status: VpsStatus }) {
  return <StatusBadge tone={tones[status]} pulse={status === "online"}>{labels[status]}</StatusBadge>;
}
