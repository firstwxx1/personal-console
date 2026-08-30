import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge, type BadgeProps } from "@/components/ui/badge";

export type StatusTone =
  | "neutral"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info";

const toneStyles: Record<StatusTone, string> = {
  neutral: "bg-muted-foreground",
  primary: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  info: "bg-info"
};

export interface StatusBadgeProps extends Omit<BadgeProps, "variant"> {
  tone: StatusTone;
  pulse?: boolean;
}

export function StatusBadge({
  tone,
  pulse = false,
  className,
  children,
  ...props
}: StatusBadgeProps) {
  return (
    <Badge variant={tone} className={className} {...props}>
      <span className="relative flex h-1.5 w-1.5">
        {pulse ? (
          <span
            className={cn(
              "absolute inline-flex h-full w-full animate-ping rounded-full opacity-60",
              toneStyles[tone]
            )}
          />
        ) : null}
        <span
          className={cn(
            "relative inline-flex h-1.5 w-1.5 rounded-full",
            toneStyles[tone]
          )}
        />
      </span>
      {children}
    </Badge>
  );
}
