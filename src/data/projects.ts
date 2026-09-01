export type ProjectStatus = "running" | "stopped" | "error" | "maintaining";
export type ProjectType = "AI 工具" | "管理面板" | "交易系统" | "监控服务" | "网站" | "机器人";

export interface Project {
  id: string;
  name: string;
  description: string;
  vpsId: string;
  vpsName: string;
  status: ProjectStatus;
  type: ProjectType;
  url: string;
  github: string;
  createdAt: string;
  updatedAt: string;
  uptime: string;
  notes: string;
  serviceIds: string[];
  activity: { time: string; detail: string }[];
  metrics: { cpu: number; memory: number; disk: number; network: string };
}

const activity = [{ time: "刚刚", detail: "已根据用户确认更新 VPS 归属" }];
const metrics = { cpu: 0, memory: 0, disk: 0, network: "—" };
const base = { createdAt: "—", updatedAt: "刚刚", uptime: "—", url: "", github: "", serviceIds: [], activity, metrics };

export const projects: Project[] = [
  { ...base, id: "serv00-usdt-scanner", name: "USDT Scanner", description: "USDT 扫描服务", vpsId: "02b0914c-0658-41e3-a6d0-12f88733118c", vpsName: "usdt-serv00", status: "running", type: "交易系统", notes: "用户确认：部署在 usdt-serv00，使用 PM2。" },
  { ...base, id: "serv00-okx-n8n-tunnel", name: "OKX n8n 隧道", description: "OKX n8n 隧道服务", vpsId: "02b0914c-0658-41e3-a6d0-12f88733118c", vpsName: "usdt-serv00", status: "running", type: "AI 工具", notes: "用户确认：部署在 usdt-serv00。" },
  { ...base, id: "gcp-credit-auto-trading-test", name: "自动化交易测试脚本", description: "自动化交易测试脚本", vpsId: "093f1f48-3e89-4bc9-9582-b24f715d605f", vpsName: "谷歌云-赠金", status: "running", type: "交易系统", notes: "用户确认：部署在谷歌云-赠金；仅按项目清单记录，不代表当前已启用实盘交易。" },
  { ...base, id: "gcp-credit-personal-console", name: "云端控制台", description: "个人控制台", vpsId: "093f1f48-3e89-4bc9-9582-b24f715d605f", vpsName: "谷歌云-赠金", status: "running", type: "管理面板", serviceIds: ["github"], notes: "用户确认：部署在谷歌云-赠金。" },
  { ...base, id: "servercheap-hermes", name: "Hermes", description: "Hermes 服务", vpsId: "5fb0837c-9b79-4fbe-829f-a4f3b3e4416f", vpsName: "servercheap", status: "running", type: "AI 工具", notes: "用户确认：部署在 servercheap。" },
  { ...base, id: "servercheap-okx-broadcast", name: "OKX 半自动交易播报", description: "OKX 半自动交易播报服务", vpsId: "5fb0837c-9b79-4fbe-829f-a4f3b3e4416f", vpsName: "servercheap", status: "running", type: "交易系统", notes: "用户确认：部署在 servercheap。" },
  { ...base, id: "servercheap-n8n-workflow", name: "n8n 工作流", description: "n8n 自动化工作流", vpsId: "5fb0837c-9b79-4fbe-829f-a4f3b3e4416f", vpsName: "servercheap", status: "running", type: "AI 工具", notes: "用户确认：部署在 servercheap。" },
  { ...base, id: "tencent-openclaw", name: "OpenClaw", description: "OpenClaw 服务", vpsId: "879278b0-705b-4e2f-8e0f-4e2db8f99add", vpsName: "腾讯云4G", status: "running", type: "AI 工具", serviceIds: ["github"], notes: "用户确认：部署在腾讯云4G。" }
];
