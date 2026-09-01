import Link from "next/link";

export function NoteToc({ headings }: { headings: { id: string; text: string; level: number }[] }) {
  if (!headings.length) return null;
  return <nav aria-label="文章目录" className="rounded-md border border-border bg-elevated/30 p-3"><div className="mb-2 text-xs font-semibold text-muted-foreground">目录</div><ul className="space-y-1.5 text-xs">{headings.map((heading) => <li key={heading.id} className={heading.level === 3 ? "pl-3" : undefined}><Link href={`#${heading.id}`} className="text-muted-foreground hover:text-foreground">{heading.text}</Link></li>)}</ul></nav>;
}
