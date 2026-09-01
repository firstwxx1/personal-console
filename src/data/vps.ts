export type VpsStatus = "online" | "offline" | "maintenance";

export interface VpsNetwork { download: string; upload: string; }
export interface Vps {
  id: string; name: string; region: string; status: VpsStatus; ipAddress: string;
  os: string; uptime: string; cpu: number; memory: number; disk: number;
  network: VpsNetwork;
}

export const vpsServers: Vps[] = [
  { id: "6f19ae04-7d65-4787-9ab0-42abe9b2ab33", name: "Racknerd美国", region: "🇺🇸", status: "online", ipAddress: "107.172.83.41", os: "Ubuntu 20.04 LTS", uptime: "49 天 3 小时", cpu: 82, memory: 60, disk: 89, network: { download: "30 KB/s", upload: "118 KB/s" } },
  { id: "879278b0-705b-4e2f-8e0f-4e2db8f99add", name: "腾讯云4G", region: "🇨🇳", status: "online", ipAddress: "124.222.59.251", os: "Ubuntu 24.04.4 LTS", uptime: "33 天 15 小时", cpu: 3, memory: 24, disk: 43, network: { download: "42 KB/s", upload: "22 KB/s" } },
  { id: "bfe71e5c-4098-43bf-94bb-33234d5da351", name: "firstwxx2-谷歌云免费", region: "🇺🇸", status: "online", ipAddress: "35.212.200.63", os: "Ubuntu 22.04.5 LTS", uptime: "44 天 2 小时", cpu: 9, memory: 38, disk: 61, network: { download: "5 KB/s", upload: "26 KB/s" } },
  { id: "02b0914c-0658-41e3-a6d0-12f88733118c", name: "usdt-serv00", region: "🇵🇱", status: "online", ipAddress: "panel13.serv00.com", os: "FreeBSD 14.3-RELEASE-p17", uptime: "在线", cpu: 0, memory: 0, disk: 0, network: { download: "—", upload: "—" } },
  { id: "093f1f48-3e89-4bc9-9582-b24f715d605f", name: "谷歌云-赠金", region: "🇯🇵", status: "online", ipAddress: "34.146.148.215", os: "Ubuntu 22.04.5 LTS", uptime: "在线", cpu: 0, memory: 0, disk: 0, network: { download: "—", upload: "—" } },
  { id: "5fb0837c-9b79-4fbe-829f-a4f3b3e4416f", name: "servercheap", region: "🇺🇸", status: "online", ipAddress: "172.82.74.159", os: "Ubuntu 24.04.3 LTS", uptime: "在线", cpu: 0, memory: 0, disk: 0, network: { download: "—", upload: "—" } }
];
