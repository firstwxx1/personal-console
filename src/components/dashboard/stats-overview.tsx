import { FileText, Globe2, Layers, Server } from "lucide-react";
import { Card } from "@/components/ui";
import { dashboardStats } from "@/data/dashboard";

const icons = [Server, Layers, Globe2, FileText];

export function StatsOverview() {
  return (
    <section
      aria-label="数据概览"
      className="grid grid-cols-2 gap-3 lg:grid-cols-4"
    >
      {dashboardStats.map((stat, index) => {
        const Icon = icons[index];
        return (
          <Card key={stat.label} className="p-4">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs text-muted-foreground">{stat.label}</span>
              <Icon className="h-4 w-4 text-muted-foreground/70" />
            </div>
            <div className="mt-3 text-2xl font-semibold leading-none tracking-tight">
              {stat.value}
            </div>
            <div className="mt-2 text-xs text-muted-foreground">{stat.hint}</div>
          </Card>
        );
      })}
    </section>
  );
}
