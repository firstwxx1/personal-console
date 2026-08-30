export interface DashboardStat {
  label: string;
  value: string;
  hint: string;
}

export interface RecentItem {
  id: string;
  name: string;
  description: string;
  type: "项目" | "网站" | "VPS";
  visitedAt: string;
}

export interface SystemMetric {
  id: string;
  label: string;
  value: string;
  series: number[];
}

export const dashboardStats: DashboardStat[] = [
  { label: "VPS 服务器", value: "3", hint: "全部在线" },
  { label: "运行中的项目", value: "12", hint: "10 个正常" },
  { label: "常用网站", value: "24", hint: "快速直达" },
  { label: "笔记文档", value: "7", hint: "最近更新 3 篇" }
];

export const recentItems: RecentItem[] = [
  { id: "3x-ui", name: "3X-UI", description: "VPS-02", type: "项目", visitedAt: "2 分钟前" },
  { id: "github", name: "GitHub", description: "开发工具", type: "网站", visitedAt: "5 分钟前" },
  { id: "mt5", name: "MT5", description: "VPS-03", type: "项目", visitedAt: "15 分钟前" },
  { id: "cloudflare", name: "Cloudflare", description: "服务器", type: "网站", visitedAt: "1 小时前" },
  { id: "vps-01", name: "VPS-01", description: "日本东京", type: "VPS", visitedAt: "2 小时前" }
];

export const systemMetrics: SystemMetric[] = [
  { id: "cpu", label: "CPU 使用率", value: "28%", series: [22, 26, 24, 31, 29, 35, 32, 28, 26, 31, 29, 28] },
  { id: "memory", label: "内存使用率", value: "47%", series: [42, 44, 45, 43, 47, 49, 48, 46, 47, 48, 47, 47] },
  { id: "disk", label: "磁盘使用率", value: "38%", series: [34, 35, 35, 36, 36, 37, 37, 38, 38, 38, 38, 38] },
  { id: "network", label: "网络流量", value: "2.1 MB/s", series: [12, 24, 18, 36, 28, 44, 32, 26, 38, 30, 24, 21] }
];
