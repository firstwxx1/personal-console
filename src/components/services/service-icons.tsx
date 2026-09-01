import {
  Activity,
  Bot,
  ChartLine,
  Cloud,
  Container,
  Github,
  Landmark,
  Mail,
  NotebookText,
  Triangle,
  Video
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ServiceIcon } from "@/data/services";

const iconMap: Record<ServiceIcon, LucideIcon> = {
  github: Github,
  cloud: Cloud,
  triangle: Triangle,
  container: Container,
  bot: Bot,
  mail: Mail,
  video: Video,
  notebook: NotebookText,
  finance: Activity,
  chart: ChartLine,
  bank: Landmark,
  activity: Activity
};

export function ServiceIconView({ icon, className }: { icon: ServiceIcon; className?: string }) {
  const Icon = iconMap[icon];
  return <Icon className={className} aria-hidden="true" />;
}
