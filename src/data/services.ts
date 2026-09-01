export const serviceCategories = ["开发工具", "管理面板", "AI", "娱乐", "金融", "服务器", "其他"] as const;
export type ServiceCategory = (typeof serviceCategories)[number];
export type ServiceStatus = "running" | "stopped" | "error" | "maintaining" | "external";
export type RuntimeType = "systemd" | "docker" | "pm2" | "external" | "unknown";
export type VerificationSource = "ssh" | "komari" | "user" | "unknown";
export type ServiceIcon = "github" | "cloud" | "triangle" | "container" | "bot" | "mail" | "video" | "notebook" | "finance" | "chart" | "bank" | "activity";

export interface ServiceSite {
  id: string; name: string; description: string; category: ServiceCategory; url: string; icon: ServiceIcon;
  showInQuickAccess?: boolean;
  status: ServiceStatus; notes: string; projectIds: string[]; vpsIds: string[];
  runtimeType: RuntimeType; runtimeName: string; port: string; verificationSource: VerificationSource; lastVerifiedAt: string;
}

const external = { showInQuickAccess: true, status: "external" as const, runtimeType: "external" as const, runtimeName: "第三方服务", port: "—", verificationSource: "unknown" as const, lastVerifiedAt: "—", projectIds: [], vpsIds: [] };
export const serviceSites: ServiceSite[] = [
  { ...external, id: "github", name: "GitHub", description: "代码仓库与协作", category: "开发工具", url: "https://github.com", icon: "github", notes: "外部代码托管服务；关联项目的仓库入口由项目页面维护。", projectIds: ["gcp-credit-personal-console", "tencent-openclaw"] },
  { ...external, id: "cloudflare", name: "Cloudflare", description: "域名与 CDN", category: "服务器", url: "https://dash.cloudflare.com", icon: "cloud", notes: "外部域名与 CDN 服务。" },
  { ...external, id: "docker-hub", name: "Docker Hub", description: "容器镜像", category: "开发工具", url: "https://hub.docker.com", icon: "container", notes: "外部容器镜像服务。" },
  { ...external, id: "chatgpt", name: "ChatGPT", description: "AI 助手", category: "AI", url: "https://chatgpt.com", icon: "bot", notes: "外部 AI 服务。" },
  { ...external, id: "tradingview", name: "TradingView", description: "行情与图表", category: "金融", url: "https://tradingview.com", icon: "chart", notes: "外部行情与图表服务。" },
  { id: "openclaw-gateway", name: "OpenClaw Gateway", description: "OpenClaw 网关服务", category: "AI", url: "", icon: "bot", status: "running", notes: "用户确认部署于腾讯云4G；运行状态由 VPS 侧只读核验确认。", projectIds: ["tencent-openclaw"], vpsIds: ["879278b0-705b-4e2f-8e0f-4e2db8f99add"], runtimeType: "unknown", runtimeName: "OpenClaw Gateway 进程", port: "—", verificationSource: "ssh", lastVerifiedAt: "最近一次只读核验" },
  { id: "personal-console-service", name: "云端控制台", description: "个人控制台服务", category: "管理面板", url: "", icon: "activity", status: "running", notes: "部署于谷歌云-赠金；服务状态由 VPS 侧只读核验确认。", projectIds: ["gcp-credit-personal-console"], vpsIds: ["093f1f48-3e89-4bc9-9582-b24f715d605f"], runtimeType: "systemd", runtimeName: "personal-console.service", port: "127.0.0.1:3001", verificationSource: "ssh", lastVerifiedAt: "最近一次只读核验" },
  { id: "hermes-gateway", name: "Hermes Gateway", description: "Hermes 网关服务", category: "AI", url: "", icon: "bot", status: "running", notes: "部署于 servercheap；服务状态由 VPS 侧只读核验确认。", projectIds: ["servercheap-hermes"], vpsIds: ["5fb0837c-9b79-4fbe-829f-a4f3b3e4416f"], runtimeType: "systemd", runtimeName: "hermes-gateway.service", port: "—", verificationSource: "ssh", lastVerifiedAt: "最近一次只读核验" },
  { id: "n8n-workflow", name: "n8n 工作流", description: "自动化工作流服务", category: "AI", url: "", icon: "activity", status: "running", notes: "用户确认部署于 servercheap；当前服务状态已在 VPS 侧核验。", projectIds: ["servercheap-n8n-workflow"], vpsIds: ["5fb0837c-9b79-4fbe-829f-a4f3b3e4416f"], runtimeType: "systemd", runtimeName: "okx-demo-n8n.service", port: "—", verificationSource: "ssh", lastVerifiedAt: "最近一次只读核验" },
  { id: "okx-n8n-tunnel", name: "OKX n8n 隧道", description: "OKX n8n 隧道服务", category: "服务器", url: "", icon: "cloud", status: "maintaining", notes: "用户确认部署于 usdt-serv00；该节点当前需要交互式认证，尚待 VPS 侧复核。", projectIds: ["serv00-okx-n8n-tunnel"], vpsIds: ["02b0914c-0658-41e3-a6d0-12f88733118c"], runtimeType: "unknown", runtimeName: "待 VPS 复核", port: "—", verificationSource: "user", lastVerifiedAt: "尚未完成 VPS 复核" },
  { id: "usdt-scanner", name: "USDT Scanner", description: "USDT 扫描服务", category: "金融", url: "", icon: "finance", status: "maintaining", notes: "用户确认使用 PM2 部署于 usdt-serv00；该节点当前需要交互式认证，尚待 VPS 侧复核。", projectIds: ["serv00-usdt-scanner"], vpsIds: ["02b0914c-0658-41e3-a6d0-12f88733118c"], runtimeType: "pm2", runtimeName: "USDT Scanner", port: "—", verificationSource: "user", lastVerifiedAt: "尚未完成 VPS 复核" },
  { id: "okx-broadcast", name: "OKX 半自动交易播报", description: "OKX 半自动交易播报服务", category: "金融", url: "", icon: "finance", status: "running", notes: "部署于 servercheap；服务状态由 VPS 侧只读核验确认。", projectIds: ["servercheap-okx-broadcast"], vpsIds: ["5fb0837c-9b79-4fbe-829f-a4f3b3e4416f"], runtimeType: "systemd", runtimeName: "okx-demo-report-http.service", port: "—", verificationSource: "ssh", lastVerifiedAt: "最近一次只读核验" },
  { id: "auto-trading-test", name: "自动化交易测试脚本", description: "自动化交易测试脚本", category: "金融", url: "", icon: "chart", status: "running", notes: "部署于谷歌云-赠金；仅表示服务进程存在，不代表已启用实盘交易。", projectIds: ["gcp-credit-auto-trading-test"], vpsIds: ["093f1f48-3e89-4bc9-9582-b24f715d605f"], runtimeType: "systemd", runtimeName: "freqtrade-grid-queue.service", port: "—", verificationSource: "ssh", lastVerifiedAt: "最近一次只读核验" }
];
