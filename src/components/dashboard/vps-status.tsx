import { ArrowDown, ArrowUp, Clock3, Network } from "lucide-react";
import { Progress, StatusBadge } from "@/components/ui";
import { SectionPanel } from "@/components/dashboard/section-panel";
import type { KomariServer } from "@/lib/komari/mapper";

export function VpsStatus({ servers }: { servers: KomariServer[] }) {
  return (
    <SectionPanel title="VPS 状态" actionLabel="查看全部" actionHref="/servers">
      <div className="grid gap-3 p-4 lg:grid-cols-3">
        {servers.map((server) => (
          <article key={server.id} className="rounded-lg border border-border bg-elevated/50 p-3 transition-colors duration-150 hover:border-input">
            <div className="flex min-w-0 items-start justify-between gap-2">
              <div className="min-w-0"><div className="truncate text-sm font-semibold">{server.name}</div><div className="mt-0.5 text-xs text-muted-foreground">{server.region}</div></div>
              <StatusBadge tone={server.status === "online" ? "success" : "danger"} pulse={server.status === "online"}>{server.status === "online" ? "在线" : "离线"}</StatusBadge>
            </div>
            <dl className="mt-3 space-y-2.5">
              {[{ label: "CPU", value: server.cpu }, { label: "内存", value: server.memory }, { label: "磁盘", value: server.disk }].map((resource) => (
                <div key={resource.label}><dt className="mb-1 flex items-center justify-between text-xs"><span className="font-medium">{resource.label}</span><span className="text-muted-foreground">{Math.round(resource.value)}%</span></dt><dd><Progress value={resource.value} className="h-1" /></dd></div>
              ))}
            </dl>
            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-border pt-3 text-xs">
              <div className="flex items-center gap-1.5 text-muted-foreground"><ArrowDown className="h-3.5 w-3.5 shrink-0" />{server.network.download}</div>
              <div className="flex items-center justify-end gap-1.5 text-muted-foreground"><ArrowUp className="h-3.5 w-3.5 shrink-0" />{server.network.upload}</div>
              <div className="flex items-center gap-1.5 text-muted-foreground"><Network className="h-3.5 w-3.5" />{server.ipAddress || "公网 IP 未由 Komari 提供"}</div>
              <div className="flex items-center justify-end gap-1.5 text-muted-foreground"><Clock3 className="h-3.5 w-3.5" />{server.uptime}</div>
            </div>
          </article>
        ))}
      </div>
    </SectionPanel>
  );
}
