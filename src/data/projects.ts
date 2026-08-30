export type ProjectStatus = "running" | "stopped" | "error" | "maintaining";

export interface Project {
  id: string;
  name: string;
  description: string;
  vpsId: string;
  vpsName: string;
  status: ProjectStatus;
  url: string;
  updatedAt: string;
}

export const projects: Project[] = [
  {
    id: "openclaw",
    name: "OpenClaw",
    description: "AI 助手 & 自动化工具",
    vpsId: "vps-01",
    vpsName: "VPS-01",
    status: "running",
    url: "https://openclaw.example.com",
    updatedAt: "10 分钟前"
  },
  {
    id: "3x-ui",
    name: "3X-UI",
    description: "代理管理面板",
    vpsId: "vps-02",
    vpsName: "VPS-02",
    status: "running",
    url: "https://panel.example.com",
    updatedAt: "2 分钟前"
  },
  {
    id: "mt5",
    name: "MT5",
    description: "交易自动化系统",
    vpsId: "vps-03",
    vpsName: "VPS-03",
    status: "running",
    url: "https://mt5.example.com",
    updatedAt: "15 分钟前"
  },
  {
    id: "monitoring",
    name: "监控面板",
    description: "系统监控 & 告警",
    vpsId: "vps-01",
    vpsName: "VPS-01",
    status: "running",
    url: "https://monitor.example.com",
    updatedAt: "1 小时前"
  },
  {
    id: "blog",
    name: "博客网站",
    description: "个人博客 & 文章",
    vpsId: "vps-02",
    vpsName: "VPS-02",
    status: "running",
    url: "https://blog.example.com",
    updatedAt: "3 小时前"
  },
  {
    id: "telegram-bot",
    name: "Telegram Bot",
    description: "自动化机器人",
    vpsId: "vps-03",
    vpsName: "VPS-03",
    status: "running",
    url: "https://bot.example.com",
    updatedAt: "30 分钟前"
  }
];
