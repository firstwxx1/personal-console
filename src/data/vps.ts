export type VpsStatus = "online" | "offline" | "maintenance";

export interface VpsNetwork {
  download: string;
  upload: string;
}

export interface Vps {
  id: string;
  name: string;
  region: string;
  status: VpsStatus;
  ipAddress: string;
  uptime: string;
  cpu: number;
  memory: number;
  disk: number;
  network: VpsNetwork;
}

export const vpsServers: Vps[] = [
  {
    id: "vps-01",
    name: "VPS-01",
    region: "日本东京",
    status: "online",
    ipAddress: "203.0.113.10",
    uptime: "42 天",
    cpu: 12,
    memory: 43,
    disk: 38,
    network: { download: "2.1 MB/s", upload: "1.3 MB/s" }
  },
  {
    id: "vps-02",
    name: "VPS-02",
    region: "新加坡",
    status: "online",
    ipAddress: "203.0.113.20",
    uptime: "68 天",
    cpu: 24,
    memory: 57,
    disk: 46,
    network: { download: "4.8 MB/s", upload: "2.2 MB/s" }
  },
  {
    id: "vps-03",
    name: "VPS-03",
    region: "美国洛杉矶",
    status: "online",
    ipAddress: "203.0.113.30",
    uptime: "21 天",
    cpu: 9,
    memory: 35,
    disk: 29,
    network: { download: "1.6 MB/s", upload: "0.8 MB/s" }
  }
];
