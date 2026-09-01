"use client";
import Link from "next/link";
import { ExternalLink, FolderKanban, Pencil, Plus, Search, Server, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Badge, Button, Card } from "@/components/ui";
import { serviceCategories, serviceSites, type RuntimeType, type ServiceCategory, type ServiceSite, type ServiceStatus } from "@/data/services";
import { projects } from "@/data/projects";
import { vpsServers } from "@/data/vps";
import { ServiceIconView } from "@/components/services/service-icons";
import { ServiceStatusBadge } from "@/components/services/service-detail";
import { ServiceForm } from "@/components/services/service-form";

type Filter<T extends string> = "all" | T;
const runtimeLabels: Record<RuntimeType, string> = { systemd: "systemd", docker: "Docker", pm2: "PM2", external: "外部服务", unknown: "待确认" };

export function ServicesList({ kind = "website" }: { kind?: "website" | "runtime" }) {
  const isWebsite = kind === "website";
  const [records, setRecords] = useState<ServiceSite[]>(serviceSites);
  const [loadError, setLoadError] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingWebsite, setEditingWebsite] = useState<ServiceSite | undefined>();
  const source = records.filter((x) => isWebsite ? x.runtimeType === "external" : x.runtimeType !== "external");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Filter<ServiceCategory>>("all");
  const [status, setStatus] = useState<Filter<ServiceStatus>>("all");
  const [vpsId, setVpsId] = useState("all");
  const [runtime, setRuntime] = useState<Filter<RuntimeType>>("all");
  useEffect(() => {
    if (!isWebsite) return;
    fetch("/api/services", { cache: "no-store" }).then(async (response) => {
      if (!response.ok) throw new Error("load");
      setRecords(await response.json() as ServiceSite[]);
    }).catch(() => setLoadError("网站加载失败，请稍后重试。"));
  }, [isWebsite]);
  const visible = useMemo(() => { const q = query.trim().toLowerCase(); return source.filter((x) => (category === "all" || x.category === category) && (status === "all" || x.status === status) && (isWebsite || vpsId === "all" || x.vpsIds.includes(vpsId)) && (isWebsite || runtime === "all" || x.runtimeType === runtime) && (!q || `${x.name} ${x.description} ${x.notes} ${x.category} ${x.runtimeName}`.toLowerCase().includes(q))); }, [source, query, category, status, vpsId, runtime, isWebsite]);
  const addWebsite = async (draft: Omit<ServiceSite, "id">) => {
    if (!isWebsite) return;
    const response = await fetch("/api/services", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(draft) });
    if (!response.ok) throw new Error("save");
    const created = await response.json() as ServiceSite;
    setRecords((current) => [...current, created]);
  };
  const saveWebsite = async (draft: Omit<ServiceSite, "id">) => {
    if (!editingWebsite) return addWebsite(draft);
    const response = await fetch("/api/services", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: editingWebsite.id, ...draft }) });
    if (!response.ok) throw new Error("save");
    const updated = await response.json() as ServiceSite;
    setRecords((current) => current.map((item) => item.id === updated.id ? updated : item));
  };
  const toggleQuickAccess = async (service: ServiceSite) => { const response = await fetch("/api/services", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: service.id, name: service.name, description: service.description, url: service.url, category: service.category, notes: service.notes, icon: service.icon, showInQuickAccess: !(service.showInQuickAccess !== false) }) }); if (!response.ok) { setLoadError("快捷访问设置保存失败，请稍后重试。"); return; } const updated = await response.json() as ServiceSite; setRecords((current) => current.map((item) => item.id === updated.id ? updated : item)); };
  const removeWebsite = async (service: ServiceSite) => { if (!window.confirm(`确定删除网站“${service.name}”吗？`)) return; const response = await fetch(`/api/services?id=${encodeURIComponent(service.id)}`, { method: "DELETE" }); if (!response.ok) { setLoadError("删除失败，请稍后重试。"); return; } setRecords((current) => current.filter((item) => item.id !== service.id)); };
  const running = source.filter((x) => x.status === "running").length;
  const review = source.filter((x) => x.status === "maintaining").length;
  return <div className="animate-rise-in min-w-0 space-y-3">
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><div><h1 className="text-xl font-semibold tracking-tight sm:text-2xl">{isWebsite ? "常用网站" : "运行明细"}</h1><p className="mt-2 text-sm text-muted-foreground">{isWebsite ? "集中管理常用网站与外部工作入口。" : "查看 VPS 上运行的 systemd、Docker、PM2 服务。"}</p></div><div className="flex flex-col gap-2 sm:flex-row"><Button className="w-full sm:w-auto" onClick={() => { setEditingWebsite(undefined); setFormOpen(true); }}><Plus className="h-4 w-4" />{isWebsite ? "添加网站" : "添加运行服务"}</Button></div></div>
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4"><Stat label={isWebsite ? "网站总数" : "运行明细"} value={source.length} /><Stat label="运行中" value={running} tone="text-success" /><Stat label="待核验" value={review} tone="text-warning" /><Stat label={isWebsite ? "已配置入口" : "已关联 VPS"} value={isWebsite ? source.filter((x) => Boolean(x.url)).length : source.filter((x) => x.vpsIds.length > 0).length} tone="text-info" /></div>
    <Card className="p-3"><div className={`grid gap-2 sm:grid-cols-2 ${isWebsite ? "lg:grid-cols-3" : "lg:grid-cols-5"}`}><label className="relative min-w-0 lg:col-span-2"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={isWebsite ? "搜索网站名称、描述或分类" : "搜索服务名称、备注或运行标识"} className="h-10 w-full rounded-md border border-border bg-background pl-9 pr-3 text-sm outline-none focus:border-primary" /></label><Select value={category} onChange={(v) => setCategory(v as Filter<ServiceCategory>)}><option value="all">全部分类</option>{serviceCategories.map((x) => <option key={x}>{x}</option>)}</Select><Select value={status} onChange={(v) => setStatus(v as Filter<ServiceStatus>)}><option value="all">全部状态</option><option value="running">运行中</option><option value="maintaining">待核验</option><option value="error">异常</option><option value="stopped">已停止</option><option value="external">外部服务</option></Select>{!isWebsite && <><Select value={vpsId} onChange={setVpsId}><option value="all">全部 VPS</option>{vpsServers.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}</Select><Select value={runtime} onChange={(v) => setRuntime(v as Filter<RuntimeType>)}><option value="all">全部运行方式</option>{Object.entries(runtimeLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</Select></>}</div></Card>
    <Card className="min-w-0 overflow-hidden"><div className="flex items-center justify-between border-b border-border px-4 py-3"><div><h2 className="text-sm font-semibold">{isWebsite ? "网站列表" : "运行明细列表"}</h2><p className="mt-1 text-xs text-muted-foreground">当前显示 {visible.length} / {source.length} 个</p></div><Badge variant="neutral">{isWebsite ? "外部网站入口" : "Project ↔ Service ↔ VPS"}</Badge></div><div className="divide-y divide-border">{visible.map((service) => { const linkedProjects = projects.filter((p) => service.projectIds.includes(p.id) || p.serviceIds.includes(service.id)); const linkedVps = vpsServers.filter((v) => service.vpsIds.includes(v.id) || linkedProjects.some((p) => p.vpsId === v.id)); return <article key={service.id} className={`grid gap-3 p-4 transition-colors hover:bg-elevated/40 md:items-center ${isWebsite ? "md:grid-cols-[minmax(0,1fr)_220px_auto]" : "md:grid-cols-[minmax(0,1fr)_170px_170px_auto]"}`}><Link href={`/services/${service.id}`} className="flex min-w-0 items-center gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border bg-elevated text-primary"><ServiceIconView icon={service.icon} className="h-5 w-5" /></span><span className="min-w-0"><span className="block truncate text-sm font-medium">{service.name}</span><span className="block truncate text-xs text-muted-foreground">{isWebsite ? service.description : `${service.runtimeName} · ${service.port}`}</span><span className="mt-1 flex items-center gap-2"><Badge variant="neutral">{service.category}</Badge>{!isWebsite && <ServiceStatusBadge status={service.status} />}</span></span></Link>{isWebsite ? <div className="min-w-0 text-xs"><span className="text-muted-foreground">用途</span><span className="mt-1 block truncate">{service.description || "暂无描述"}</span></div> : <><div className="min-w-0 text-xs"><span className="flex items-center gap-1 text-muted-foreground"><FolderKanban className="h-3.5 w-3.5" />所属 Project</span><span className="mt-1 block truncate">{linkedProjects.map((p) => p.name).join("、") || "未关联"}</span></div><div className="min-w-0 text-xs"><span className="flex items-center gap-1 text-muted-foreground"><Server className="h-3.5 w-3.5" />运行 VPS</span><span className="mt-1 block truncate">{linkedVps.map((v) => v.name).join("、") || "未关联"}</span></div></>}<div className="flex gap-1 md:justify-end"><Link href={`/services/${service.id}`} className="inline-flex h-8 items-center rounded-md px-2.5 text-xs text-muted-foreground hover:bg-elevated">详情</Link>{service.url && <a href={service.url} target="_blank" rel="noreferrer"><Button variant="ghost" size="xs"><ExternalLink className="h-3.5 w-3.5" />打开</Button></a>}{isWebsite && <label className="flex h-8 items-center gap-1.5 px-1.5 text-xs text-muted-foreground" title="显示在首页快捷访问"><input type="checkbox" checked={service.showInQuickAccess !== false} onChange={() => toggleQuickAccess(service)} aria-label={`显示${service.name}在首页快捷访问`} className="h-4 w-4 accent-primary" />首页</label>}{isWebsite && <Button variant="ghost" size="icon" aria-label={`编辑${service.name}`} title="编辑网站" onClick={() => { setEditingWebsite(service); setFormOpen(true); }}><Pencil className="h-4 w-4" /></Button>}{isWebsite && <Button variant="ghost" size="icon" aria-label={`删除${service.name}`} title="删除网站" onClick={() => removeWebsite(service)}><Trash2 className="h-4 w-4 text-danger" /></Button>}</div></article>; })}</div>{visible.length === 0 && <div className="p-10 text-center text-sm text-muted-foreground">没有符合当前筛选条件的记录。</div>}</Card>
    {loadError && <div className="rounded-md border border-danger/30 bg-danger/10 px-3 py-2 text-sm text-danger">{loadError}</div>}
    {formOpen && <ServiceForm initial={editingWebsite} onClose={() => { setFormOpen(false); setEditingWebsite(undefined); }} onSave={saveWebsite} />}
  </div>;
}
function Stat({ label, value, tone = "" }: { label: string; value: number; tone?: string }) { return <Card className="p-3"><p className="text-xs text-muted-foreground">{label}</p><p className={`mt-1 text-xl font-semibold ${tone}`}>{value}</p></Card>; }
function Select({ value, onChange, children }: { value: string; onChange: (value: string) => void; children: React.ReactNode }) { return <select value={value} onChange={(e) => onChange(e.target.value)} className="h-10 w-full rounded-md border border-border bg-card px-3 text-sm outline-none focus:border-primary">{children}</select>; }
