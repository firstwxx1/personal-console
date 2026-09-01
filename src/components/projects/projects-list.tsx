"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Box, ExternalLink, Pencil, Plus, Search } from "lucide-react";
import { Button, Card } from "@/components/ui";
import { ProjectDashboard } from "@/components/projects/project-dashboard";
import { ProjectStatusBadge } from "@/components/projects/project-status";
import { projects } from "@/data/projects";
import { serviceSites } from "@/data/services";
import { vpsServers } from "@/data/vps";

export function ProjectsList() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const [vps, setVps] = useState("all");
  const [status, setStatus] = useState("all");
  const types = Array.from(new Set(projects.map((project) => project.type)));
  const list = useMemo(() => projects.filter((project) => {
    const terms = [project.name, project.description, project.notes, project.vpsName, project.type].join(" ").toLowerCase();
    return (!query || terms.includes(query.toLowerCase())) && (type === "all" || project.type === type) && (vps === "all" || project.vpsId === vps) && (status === "all" || project.status === status);
  }), [query, type, vps, status]);
  return <div className="animate-rise-in min-w-0 space-y-3">
    <div className="flex min-w-0 flex-col gap-3 sm:gap-4 md:flex-row md:items-end md:justify-between"><div className="min-w-0"><h1 className="text-xl font-semibold tracking-tight sm:text-2xl">项目管理</h1><p className="mt-2 text-sm text-muted-foreground">管理项目状态、备注、服务器与关联服务。</p></div><Button className="w-full shrink-0 sm:w-auto" onClick={() => window.alert("添加项目当前为原型功能，数据不会持久化。")}><Plus className="h-4 w-4" />添加项目</Button></div>
    <ProjectDashboard />
    <Card className="p-3"><div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4"><label className="relative min-w-0 sm:col-span-2 lg:col-span-1"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索名称、备注、类型或 VPS" className="h-10 w-full rounded-md border border-border bg-background pl-9 pr-3 text-sm outline-none focus:border-primary" /></label><Select value={type} onChange={setType}><option value="all">全部类型</option>{types.map((item) => <option key={item}>{item}</option>)}</Select><Select value={vps} onChange={setVps}><option value="all">全部 VPS</option>{vpsServers.map((server) => <option key={server.id} value={server.id}>{server.name}</option>)}</Select><Select value={status} onChange={setStatus}><option value="all">全部状态</option><option value="running">运行中</option><option value="stopped">已停止</option><option value="error">异常</option><option value="maintaining">维护中</option></Select></div></Card>
    <Card className="min-w-0 overflow-hidden"><div className="flex justify-between border-b border-border px-4 py-3 text-sm"><span>项目列表</span><span className="text-xs text-muted-foreground">共 {list.length} 个项目</span></div><div className="overflow-x-auto"><table className="w-full min-w-[900px] text-left text-sm"><thead className="bg-elevated/50 text-xs text-muted-foreground"><tr>{["项目", "所属 VPS", "关联服务", "状态", "最后更新", "操作"].map((label) => <th key={label} className="px-4 py-3 font-medium">{label}</th>)}</tr></thead><tbody className="divide-y divide-border">{list.map((project) => { const services = project.serviceIds.map((id) => serviceSites.find((site) => site.id === id)?.name).filter(Boolean); return <tr key={project.id} className="hover:bg-elevated/50"><td className="px-4 py-3"><Link href={`/projects/${project.id}`} className="flex items-center gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border bg-elevated"><Box className="h-4 w-4 text-muted-foreground" /></span><span className="min-w-0"><span className="block font-medium">{project.name}</span><span className="block max-w-[260px] truncate text-xs text-muted-foreground">{project.description}</span></span></Link></td><td className="px-4 py-3">{project.vpsName}</td><td className="px-4 py-3 text-xs text-muted-foreground">{services.join("、") || "未关联"}</td><td className="px-4 py-3"><ProjectStatusBadge status={project.status} pulse /></td><td className="px-4 py-3 text-muted-foreground">{project.updatedAt}</td><td className="px-4 py-3"><div className="flex justify-end gap-1"><Button variant="ghost" size="xs" onClick={() => window.open(project.url, "_blank", "noreferrer")}><ExternalLink className="h-3.5 w-3.5" />打开</Button><Link href={`/projects/${project.id}`} className="inline-flex h-8 items-center gap-1 rounded-md px-2.5 text-xs text-muted-foreground hover:bg-elevated"><Pencil className="h-3.5 w-3.5" />详情</Link></div></td></tr>; })}</tbody></table>{list.length === 0 ? <div className="p-10 text-center text-sm text-muted-foreground">没有符合当前筛选条件的项目。</div> : null}</div></Card>
  </div>;
}
function Select({ value, onChange, children }: { value: string; onChange: (value: string) => void; children: React.ReactNode }) { return <select value={value} onChange={(event) => onChange(event.target.value)} className="h-10 w-full rounded-md border border-border bg-card px-3 text-sm outline-none focus:border-primary">{children}</select>; }
