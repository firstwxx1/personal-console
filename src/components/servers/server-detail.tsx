"use client";

import Link from "next/link";
import { ArrowDown, ArrowLeft, ArrowUp, Cpu, Database, HardDrive, MapPin, MemoryStick, Network, Server as ServerIcon, Wifi } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, Progress } from "@/components/ui";
import type { Project } from "@/data/projects";
import type { KomariServer } from "@/lib/komari/mapper";
import { formatBytes } from "@/lib/komari/mapper";
import type { KomariLoadData } from "@/lib/komari/types";
import { ServerStatusBadge } from "./server-status";

const INTERVAL = 3000;
const MAX_SAMPLES = 60;
type Sample = { cpu: number; memory: number; disk: number; upload: number; download: number; load: number };

export function ServerDetailLive({ initialServer, projects, history }: { initialServer: KomariServer; projects: Project[]; history: KomariLoadData | null }) {
  const [server, setServer] = useState(initialServer);
  const [samples, setSamples] = useState<Sample[]>([]);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let active = true;
    const refresh = async () => {
      try {
        const response = await fetch("/api/monitoring/servers", { cache: "no-store" });
        if (!response.ok) throw new Error("request failed");
        const payload = (await response.json()) as { data?: KomariServer[] };
        const next = payload.data?.find((item) => item.id === initialServer.id);
        if (!active || !next) return;
        setServer(next); setFailed(false);
        if (next.live) setSamples((old) => [...old, { cpu: next.cpu, memory: next.memory, disk: next.disk, upload: next.live!.net_out, download: next.live!.net_in, load: next.live!.load }].slice(-MAX_SAMPLES));
      } catch { if (active) setFailed(true); }
    };
    refresh();
    const timer = window.setInterval(refresh, INTERVAL);
    return () => { active = false; window.clearInterval(timer); };
  }, [initialServer.id]);
  const alerts = useMemo(() => [
    ...(server.status === "offline" ? ["服务器离线，无法获取最新数据"] : []),
    ...(server.cpu > 80 ? [`CPU 使用率 ${Math.round(server.cpu)}%，超过 80%`] : []),
    ...(server.memory > 85 ? [`内存使用率 ${Math.round(server.memory)}%，超过 85%`] : []),
    ...(server.disk > 90 ? [`磁盘使用率 ${Math.round(server.disk)}%，超过 90%`] : []),
    ...(failed ? ["实时数据更新失败，已保留上一份数据"] : []),
  ], [server, failed]);
  const metrics = [{ label: "CPU", value: server.cpu, icon: Cpu }, { label: "内存", value: server.memory, icon: MemoryStick }, { label: "磁盘", value: server.disk, icon: HardDrive }];
  return <div className="animate-rise-in min-w-0 space-y-4">
    <Link href="/servers" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" />返回 VPS 服务器</Link>
    <header className="flex flex-col gap-3 border-b border-border pb-4"><div className="flex flex-wrap items-center gap-2"><ServerIcon className="h-5 w-5 text-primary" /><h1 className="text-2xl font-semibold tracking-tight">{server.name}</h1><ServerStatusBadge status={server.status} /></div><div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground"><span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{server.region}</span><span className="font-mono">{server.ipAddress || "公网 IP 未提供"}</span></div></header>
    {alerts.length ? <div className="space-y-2">{alerts.map((alert) => <div key={alert} className="rounded-md border border-warning/30 bg-warning/10 px-3 py-2 text-sm text-warning">{alert}</div>)}</div> : null}
    <div className="grid gap-3 lg:grid-cols-[minmax(0,7fr)_minmax(280px,5fr)]"><Card><CardHeader><CardTitle>服务器信息</CardTitle></CardHeader><CardContent className="grid p-0 sm:grid-cols-2"><Info icon={Database} label="操作系统" value={server.os} /><Info icon={Wifi} label="UUID" value={server.id} mono /><Info icon={MapPin} label="地区" value={server.region} /><Info icon={ServerIcon} label="Uptime" value={server.uptime} /><Info icon={Network} label="最后更新时间" value={server.live ? formatTime(server.live.time) : "暂无"} /></CardContent></Card><Card><CardHeader><CardTitle>网络流量</CardTitle></CardHeader><CardContent className="space-y-3"><Traffic icon={ArrowDown} label="实时下载" value={server.network.download} /><Traffic icon={ArrowUp} label="实时上传" value={server.network.upload} />{server.live ? <><Traffic icon={ArrowDown} label="累计下载" value={formatBytes(server.live.net_total_down)} /><Traffic icon={ArrowUp} label="累计上传" value={formatBytes(server.live.net_total_up)} /></> : null}</CardContent></Card></div>
    <Card><CardHeader><CardTitle>资源使用</CardTitle></CardHeader><CardContent className="grid gap-4 sm:grid-cols-3">{metrics.map(({ label, value, icon: Icon }) => <div key={label} className="rounded-md border border-border bg-elevated/40 p-3"><div className="flex items-center justify-between text-sm"><span className="flex items-center gap-1.5 text-muted-foreground"><Icon className="h-4 w-4" />{label}</span><span className="font-mono">{Math.round(value)}%</span></div><Progress value={value} className="mt-3" /></div>)}</CardContent></Card>
    {server.live ? <Card><CardHeader><CardTitle>实时状态</CardTitle></CardHeader><CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><Metric label="内存 已用 / 总量" value={`${formatBytes(server.live.ram)} / ${formatBytes(server.live.ram_total)}`} /><Metric label="磁盘 已用 / 总量" value={`${formatBytes(server.live.disk)} / ${formatBytes(server.live.disk_total)}`} /><Metric label="Load 1 / 5 / 15" value={`${server.live.load.toFixed(2)} / ${server.live.load5.toFixed(2)} / ${server.live.load15.toFixed(2)}`} /><Metric label="TCP / UDP" value={`${server.live.connections} / ${server.live.connections_udp}`} /><Metric label="进程数" value={String(server.live.process)} /><Metric label="在线状态" value={server.status === "online" ? "在线" : "离线"} /></CardContent></Card> : null}
    <Card><CardHeader><CardTitle>实时监控图表 <span className="ml-1 text-xs font-normal text-muted-foreground">最近 3 分钟</span></CardTitle></CardHeader><CardContent className="grid gap-4 sm:grid-cols-2">{([ ["CPU", "cpu", "%"], ["内存", "memory", "%"], ["磁盘", "disk", "%"], ["上传 / 下载", "upload", "速率"], ["Load", "load", "load"] ] as [string, keyof Sample, string][]).map(([label, key, unit]) => <MiniChart key={label} label={label} values={samples.map((item) => item[key])} unit={unit} secondary={key === "upload" ? samples.map((item) => item.download) : undefined} />)}</CardContent></Card>
    {history?.records.length ? <Card><CardHeader><CardTitle>历史采样</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground">已获取 {history.records.length} 条负载记录，最近一条 CPU {history.records.at(-1)!.cpu.toFixed(1)}%。</CardContent></Card> : null}
    <Card><CardHeader><CardTitle>相关项目 <span className="ml-1 text-xs font-normal text-muted-foreground">{projects.length}</span></CardTitle></CardHeader><CardContent className="p-0">{projects.length ? projects.map((project) => <Link key={project.id} href={`/projects/${project.id}`} className="block border-b border-border px-4 py-3 text-sm hover:bg-elevated/50">{project.name}</Link>) : <div className="p-6 text-sm text-muted-foreground">暂无关联项目。</div>}</CardContent></Card>
  </div>;
}
function Info({ icon: Icon, label, value, mono }: { icon: typeof Database; label: string; value: string; mono?: boolean }) { return <div className="flex items-start gap-2.5 border-b border-border p-4"><Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" /><div className="min-w-0"><div className="text-xs text-muted-foreground">{label}</div><div className={`mt-1 truncate text-sm ${mono ? "font-mono" : ""}`}>{value}</div></div></div>; }
function Traffic({ icon: Icon, label, value }: { icon: typeof ArrowDown; label: string; value: string }) { return <div className="flex items-center justify-between text-sm"><span className="flex items-center gap-2 text-muted-foreground"><Icon className="h-4 w-4" />{label}</span><span className="font-mono">{value}</span></div>; }
function Metric({ label, value }: { label: string; value: string }) { return <div className="rounded-md border border-border bg-elevated/40 p-3"><div className="text-xs text-muted-foreground">{label}</div><div className="mt-1 truncate font-mono text-sm">{value}</div></div>; }
function MiniChart({ label, values, unit, secondary }: { label: string; values: number[]; unit: string; secondary?: number[] }) { const max=Math.max(...(secondary ? values.concat(secondary) : values), 1); const points=values.map((value,index)=>`${values.length < 2 ? 0 : index/(values.length-1)*100},${38-value/max*34}`).join(" "); const points2=secondary?.map((value,index)=>`${secondary.length < 2 ? 0 : index/(secondary.length-1)*100},${38-value/max*34}`).join(" "); return <div className="rounded-md border border-border bg-elevated/30 p-3"><div className="flex justify-between text-xs"><span className="font-medium">{label}</span><span className="text-muted-foreground">{values.length ? `${values.at(-1)!.toFixed(1)} ${unit}` : "等待采样"}</span></div><svg viewBox="0 0 100 40" preserveAspectRatio="none" className="mt-3 h-24 w-full"><path d="M0 38H100" stroke="currentColor" strokeOpacity=".15" vectorEffect="non-scaling-stroke" />{points ? <polyline points={points} fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" className="text-primary" /> : null}{points2 ? <polyline points={points2} fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" className="text-success" /> : null}</svg></div>; }
function formatTime(value: string): string { const date=new Date(value); return Number.isNaN(date.getTime()) ? value : date.toLocaleString("zh-CN", { hour12: false }); }
