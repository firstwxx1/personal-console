"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Activity,
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  Box,
  ExternalLink,
  FileText,
  Github,
  HardDrive,
  MemoryStick,
  Network,
  RotateCw,
  Server,
  Square,
  Terminal
} from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Progress
} from "@/components/ui";
import { ProjectStatusBadge } from "@/components/projects/project-status";
import type { Project } from "@/data/projects";
import { serviceSites } from "@/data/services";
import type { Vps } from "@/data/vps";

export function ProjectDetail({
  project,
  server
}: {
  project: Project;
  server: Vps;
}) {
  const [feedback, setFeedback] = useState<string | null>(null);
  const showPrototypeFeedback = (action: string) => setFeedback(`${action}当前为原型功能，尚未接入真实运维操作。`);
  const metrics = [
    { label: "CPU", value: project.metrics.cpu, icon: Activity },
    { label: "内存", value: project.metrics.memory, icon: MemoryStick },
    { label: "磁盘", value: project.metrics.disk, icon: HardDrive }
  ];
  const linkedServices = project.serviceIds.map((id) => serviceSites.find((service) => service.id === id)).filter((service): service is NonNullable<typeof service> => Boolean(service));
  const runtimeServices = serviceSites.filter((service) => service.runtimeType !== "external" && (service.projectIds.includes(project.id) || project.serviceIds.includes(service.id)));
  const details = [
    { label: "所属 VPS", value: server.name + " · " + server.region, icon: Server },
    { label: "项目类型", value: project.type, icon: Box },
    { label: "访问地址", value: project.url, icon: ExternalLink, href: project.url },
    { label: "GitHub", value: project.github, icon: Github, href: project.github },
    { label: "创建时间", value: project.createdAt, icon: FileText },
    { label: "最后更新时间", value: project.updatedAt, icon: RotateCw },
    { label: "运行时间", value: project.uptime, icon: Activity }
  ];

  return (
    <div className="animate-rise-in min-w-0 space-y-3">
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        返回项目管理
      </Link>

      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-elevated">
            <Box className="h-5 w-5 text-muted-foreground" />
          </span>
          <div className="min-w-0">
            <div className="flex min-w-0 flex-wrap items-center gap-2">
              <h1 className="min-w-0 break-words text-xl font-semibold tracking-tight sm:text-2xl">{project.name}</h1>
              <ProjectStatusBadge status={project.status} pulse />
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{project.description}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
          <a href={project.url} target="_blank" rel="noreferrer" className="inline-flex h-9 items-center justify-center gap-1.5 whitespace-nowrap rounded-md border border-border bg-elevated px-4 text-sm font-medium transition-colors hover:border-input hover:bg-subtle"><ExternalLink className="h-4 w-4" />打开项目</a>
          <Button variant="secondary" onClick={() => showPrototypeFeedback("SSH 连接") }><Terminal className="h-4 w-4" />SSH 连接</Button>
          <Button variant="secondary" onClick={() => showPrototypeFeedback("查看日志") }><FileText className="h-4 w-4" />查看日志</Button>
          <Button variant="outline" onClick={() => showPrototypeFeedback("重启项目") }><RotateCw className="h-4 w-4" />重启项目</Button>
          <Button className="w-full" variant="destructive" onClick={() => showPrototypeFeedback("停止项目") }><Square className="h-3.5 w-3.5" />停止项目</Button>
        </div>
        {feedback && <p className="col-span-full text-xs text-muted-foreground sm:text-right">{feedback}</p>}
      </div>

      <div className="grid gap-3 xl:grid-cols-[minmax(0,7fr)_minmax(320px,5fr)]">
        <Card>
          <CardHeader><CardTitle>基本信息</CardTitle></CardHeader>
          <CardContent className="grid p-0 sm:grid-cols-2">
            {details.map((detail) => (
              <div key={detail.label} className="flex min-w-0 items-start gap-2.5 border-b border-border p-4">
                <detail.icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <div className="min-w-0">
                  <div className="text-xs text-muted-foreground">{detail.label}</div>
                  {detail.href ? (
                    <a href={detail.href} target="_blank" rel="noreferrer" className="mt-1 block truncate text-sm text-primary hover:underline">{detail.value}</a>
                  ) : (
                    <div className="mt-1 text-sm">{detail.value}</div>
                  )}
                </div>
              </div>
            ))}
            <div className="flex items-start gap-2.5 border-b border-border p-4">
              <Activity className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              <div><div className="text-xs text-muted-foreground">当前状态</div><div className="mt-1"><ProjectStatusBadge status={project.status} pulse /></div></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>所属服务器</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-elevated"><Server className="h-4 w-4 text-muted-foreground" /></span>
              <div>
                <div className="text-sm font-medium">{server.name}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">{server.region} · {server.ipAddress}</div>
                <div className="mt-3 grid grid-cols-2 gap-x-5 gap-y-2 text-xs text-muted-foreground">
                  <span>CPU {server.cpu}%</span><span>内存 {server.memory}%</span><span>磁盘 {server.disk}%</span><span>在线 {server.uptime}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>运行监控</CardTitle></CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-lg border border-border bg-elevated/50 p-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><metric.icon className="h-3.5 w-3.5" />{metric.label}</span>
                <span className="font-mono text-foreground">{metric.value}%</span>
              </div>
              <Progress value={metric.value} className="mt-3" />
            </div>
          ))}
          <div className="rounded-lg border border-border bg-elevated/50 p-3">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><Network className="h-3.5 w-3.5" />网络</span>
              <span className="font-mono text-foreground">{project.metrics.network}</span>
            </div>
            <div className="mt-3 flex justify-between text-xs text-muted-foreground">
              <span><ArrowDown className="mr-1 inline h-3.5 w-3.5" />下载</span>
              <span><ArrowUp className="mr-1 inline h-3.5 w-3.5" />上传</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-3 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>项目备注</CardTitle></CardHeader>
          <CardContent><p className="text-sm leading-6 text-muted-foreground">{project.notes || "暂无备注。"}</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>关联资源</CardTitle></CardHeader>
          <CardContent className="space-y-2">{linkedServices.length ? linkedServices.map((service) => <Link key={service.id} href={`/services/${service.id}`} className="flex items-center justify-between rounded-md border border-border px-3 py-2 text-sm transition-colors hover:bg-elevated"><span>{service.name}</span><span className="text-xs text-muted-foreground">{service.category}</span></Link>) : <p className="text-sm text-muted-foreground">暂无关联服务。</p>}</CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>运行明细</CardTitle></CardHeader>
        <CardContent className="space-y-2">{runtimeServices.length ? runtimeServices.map((service) => <Link key={service.id} href={`/services/${service.id}`} className="grid gap-2 rounded-md border border-border px-3 py-3 transition-colors hover:bg-elevated sm:grid-cols-[minmax(0,1fr)_120px_160px]"><span className="min-w-0"><span className="block truncate text-sm font-medium">{service.runtimeName}</span><span className="mt-1 block truncate text-xs text-muted-foreground">{service.name}</span></span><span className="text-xs text-muted-foreground">{service.runtimeType}</span><span className="text-xs text-muted-foreground">{service.port} · {service.lastVerifiedAt}</span></Link>) : <p className="text-sm text-muted-foreground">暂无已登记的运行明细。</p>}</CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>项目最近活动</CardTitle></CardHeader>
        <CardContent className="p-0"><ul className="divide-y divide-border">{project.activity.map((item) => <li key={`${item.time}-${item.detail}`} className="flex gap-4 px-4 py-3 text-sm"><span className="w-20 shrink-0 text-xs text-muted-foreground">{item.time}</span><span>{item.detail}</span></li>)}</ul></CardContent>
      </Card>
    </div>
  );
}
