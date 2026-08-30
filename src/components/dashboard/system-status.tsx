import { SectionPanel } from "@/components/dashboard/section-panel";
import { systemMetrics } from "@/data/dashboard";

function Sparkline({ values }: { values: number[] }) {
  const points = values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * 96;
      const y = 30 - (value / 100) * 28;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <svg
      viewBox="0 0 96 32"
      role="presentation"
      className="mt-3 h-10 w-full text-primary/70"
      preserveAspectRatio="none"
    >
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function SystemStatus() {
  return (
    <SectionPanel title="系统状态">
      <div className="grid gap-3 p-4 sm:grid-cols-2 xl:grid-cols-4">
        {systemMetrics.map((metric) => (
          <article
            key={metric.id}
            className="rounded-lg border border-border bg-elevated/50 p-3"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs text-muted-foreground">{metric.label}</span>
              <span className="font-mono text-xs">{metric.value}</span>
            </div>
            <Sparkline values={metric.series} />
          </article>
        ))}
      </div>
    </SectionPanel>
  );
}
