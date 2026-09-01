import type { Vps } from "@/data/vps";
import type { KomariLatestStatus, KomariNode } from "./types";

export interface KomariServer extends Vps { source: "komari" | "mock"; komariNode: KomariNode | null; live: KomariLatestStatus | null; }
export const KOMARI_FRESHNESS_TIMEOUT_SECONDS = 90;

function percent(used: number, total: number): number { return total > 0 ? Math.round((used / total) * 100) : 0; }
export function formatBytes(bytes: number): string { if (bytes >= 1024 ** 3) return `${(bytes / 1024 ** 3).toFixed(1)} GB`; if (bytes >= 1024 ** 2) return `${(bytes / 1024 ** 2).toFixed(1)} MB`; return `${Math.round(bytes / 1024)} KB`; }
export function formatRate(bytesPerSecond: number): string { return bytesPerSecond >= 1024 * 1024 ? `${(bytesPerSecond / (1024 * 1024)).toFixed(1)} MB/s` : `${Math.round(bytesPerSecond / 1024)} KB/s`; }
export function formatUptime(seconds: number): string { const days = Math.floor(seconds / 86400); const hours = Math.floor((seconds % 86400) / 3600); return `${days} 天 ${hours} 小时`; }
function isFresh(value: string): boolean { const age = (Date.now() - Date.parse(value)) / 1000; return Number.isFinite(age) && age >= 0 && age <= KOMARI_FRESHNESS_TIMEOUT_SECONDS; }

export function mapKomariServer(node: KomariNode, live: KomariLatestStatus | null, fallback?: Vps): KomariServer {
  const base: Vps = fallback ?? { id: node.uuid, name: node.name, region: node.region, status: "offline", ipAddress: "", os: node.os, uptime: "未知", cpu: 0, memory: 0, disk: 0, network: { download: "未知", upload: "未知" } };
  return { ...base, id: node.uuid, name: node.name, region: node.region, os: node.os, status: live && live.online && isFresh(live.time) ? "online" : "offline", uptime: live ? formatUptime(live.uptime) : base.uptime, cpu: live?.cpu ?? base.cpu, memory: live ? percent(live.ram, live.ram_total) : base.memory, disk: live ? percent(live.disk, live.disk_total) : base.disk, network: live ? { download: formatRate(live.net_in), upload: formatRate(live.net_out) } : base.network, source: "komari", komariNode: node, live };
}

export function mapMockServer(server: Vps): KomariServer { return { ...server, source: "mock", komariNode: null, live: null }; }
