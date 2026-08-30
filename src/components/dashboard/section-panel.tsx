import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui";
import { cn } from "@/lib/utils";

interface SectionPanelProps {
  title: string;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
  children: React.ReactNode;
}

export function SectionPanel({
  title,
  actionLabel,
  actionHref,
  className,
  children
}: SectionPanelProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
        <h2 className="text-sm font-semibold tracking-tight">{title}</h2>
        {actionLabel && actionHref ? (
          <Link
            href={actionHref}
            className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors duration-150 hover:text-foreground"
          >
            {actionLabel}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        ) : null}
      </div>
      {children}
    </Card>
  );
}
