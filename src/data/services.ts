export const serviceCategories = [
  "开发工具",
  "AI",
  "金融",
  "服务器",
  "其他"
] as const;

export type ServiceCategory = (typeof serviceCategories)[number];
export type ServiceIcon =
  | "github"
  | "cloud"
  | "triangle"
  | "container"
  | "bot"
  | "mail"
  | "video"
  | "notebook"
  | "finance"
  | "chart"
  | "bank"
  | "activity";

export interface ServiceSite {
  id: string;
  name: string;
  description: string;
  category: ServiceCategory;
  url: string;
  icon: ServiceIcon;
}

export const serviceSites: ServiceSite[] = [
  { id: "github", name: "GitHub", description: "代码仓库", category: "开发工具", url: "https://github.com", icon: "github" },
  { id: "cloudflare", name: "Cloudflare", description: "域名与 CDN", category: "服务器", url: "https://dash.cloudflare.com", icon: "cloud" },
  { id: "vercel", name: "Vercel", description: "应用部署", category: "开发工具", url: "https://vercel.com", icon: "triangle" },
  { id: "docker-hub", name: "Docker Hub", description: "容器镜像", category: "开发工具", url: "https://hub.docker.com", icon: "container" },
  { id: "chatgpt", name: "ChatGPT", description: "AI 助手", category: "AI", url: "https://chatgpt.com", icon: "bot" },
  { id: "gmail", name: "Gmail", description: "邮件", category: "其他", url: "https://mail.google.com", icon: "mail" },
  { id: "youtube", name: "YouTube", description: "视频", category: "其他", url: "https://youtube.com", icon: "video" },
  { id: "notion", name: "Notion", description: "文档协作", category: "其他", url: "https://notion.so", icon: "notebook" },
  { id: "binance", name: "Binance", description: "加密资产交易", category: "金融", url: "https://binance.com", icon: "finance" },
  { id: "tradingview", name: "TradingView", description: "行情与图表", category: "金融", url: "https://tradingview.com", icon: "chart" },
  { id: "longbridge", name: "Longbridge", description: "证券交易", category: "金融", url: "https://longbridge.com", icon: "bank" },
  { id: "firstrade", name: "Firstrade", description: "美股券商", category: "金融", url: "https://firstrade.com", icon: "activity" }
];
