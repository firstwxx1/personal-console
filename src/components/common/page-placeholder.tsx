import Link from "next/link";
import { ArrowLeft, CircleSlash } from "lucide-react";
import { Badge, Card } from "@/components/ui";

interface PagePlaceholderProps {
  title: string;
  description: string;
}

export function PagePlaceholder({ title, description }: PagePlaceholderProps) {
  return (
    <Card className="mx-auto mt-10 max-w-2xl p-6">
      <Badge>待开发</Badge>
      <div className="mt-4 flex items-center gap-3">
        <CircleSlash className="h-5 w-5 text-muted-foreground" />
        <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
      </div>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
      <Link
        href="/"
        className="mt-5 inline-flex h-8 items-center gap-2 rounded-md border border-border px-3 text-xs font-medium text-muted-foreground transition-colors duration-150 hover:border-input hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        返回仪表盘
      </Link>
    </Card>
  );
}
