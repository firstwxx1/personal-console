export interface Note {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  updatedAt: string;
}

export const notes: Note[] = [
  {
    slug: "deploy-openclaw",
    title: "如何部署 OpenClaw",
    description: "记录环境准备、端口规划和进程守护配置。",
    category: "教程",
    tags: ["OpenClaw", "部署"],
    updatedAt: "2 小时前"
  },
  {
    slug: "vps-security-checklist",
    title: "VPS 安全设置记录",
    description: "防火墙、密钥登录和基础安全加固清单。",
    category: "VPS",
    tags: ["安全", "VPS"],
    updatedAt: "1 天前"
  },
  {
    slug: "mt5-ea-strategy",
    title: "MT5 EA 策略开发笔记",
    description: "策略参数、回测流程和风险控制记录。",
    category: "交易",
    tags: ["MT5", "EA"],
    updatedAt: "3 天前"
  },
  {
    slug: "3x-ui-guide",
    title: "3X-UI 使用教程",
    description: "节点配置、证书更新和常见问题处理。",
    category: "VPS",
    tags: ["3X-UI", "代理"],
    updatedAt: "5 天前"
  }
];
