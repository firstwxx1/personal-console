import { Activity, Cpu, MemoryStick, Server } from "lucide-react";
import { Card } from "@/components/ui";
import type { KomariServer } from "@/lib/komari/mapper";

export function StatsOverview({ servers }: { servers: KomariServer[] }) {
  const online = servers.filter((server) => server.status === "online").length;
  const average = (key: "cpu" | "memory") => servers.length ? Math.round(servers.reduce((sum, server) => sum + server[key], 0) / servers.length) : 0;
  const stats = [
    { label: "服务器总数", value: servers.length, hint: `${online} 台在线 / ${servers.length - online} 台离线`, icon: Server },
    { label: "在线状态", value: `${online}/${servers.length}`, hint: "在线 / 总数", icon: Activity },
    { label: "平均 CPU", value: `${average("cpu")}%`, hint: "全量实时平均", icon: Cpu },
    { label: "平均内存", value: `${average("memory")}%`, hint: "全量实时平均", icon: MemoryStick },
  ];
  return <section aria-label="数据概览" className="grid grid-cols-2 gap-3 lg:grid-cols-4">{stats.map(({ label, value, hint, icon: Icon }) => <Card key={label} className="p-4"><div className="flex items-center justify-between gap-2"><span className="text-xs text-muted-foreground">{label}</span><Icon className="h-4 w-4 text-muted-foreground/70" /></div><div className="mt-3 text-2xl font-semibold leading-none tracking-tight">{value}</div><div className="mt-2 text-xs text-muted-foreground">{hint}</div></Card>)}</section>;
}
