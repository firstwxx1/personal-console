import { Fragment, type ReactNode } from "react";

export function headingId(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-").replace(/^-|-$/g, "");
}

function inline(text: string) {
  return text.split(/(!\[[^\]]*\]\([^)]*\)|\[[^\]]+\]\([^)]*\))/g).map((part, index) => {
    const image = part.match(/^!\[([^\]]*)\]\(([^)]*)\)$/);
    if (image) return <span key={index} className="my-2 block rounded-md border border-border bg-elevated px-3 py-5 text-center text-xs text-muted-foreground">图片：{image[1] || image[2]}</span>;
    const link = part.match(/^\[([^\]]+)\]\(([^)]*)\)$/);
    if (link) return <a key={index} href={link[2]} target="_blank" rel="noreferrer" className="text-primary underline underline-offset-2">{link[1]}</a>;
    return <Fragment key={index}>{part}</Fragment>;
  });
}

export function MarkdownContent({ content }: { content: string }) {
  const lines = content.split(/\r?\n/);
  const blocks: ReactNode[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i += 1; continue; }
    if (line.startsWith("```")) { const language = line.slice(3).trim(); const code: string[] = []; i += 1; while (i < lines.length && !lines[i].startsWith("```")) code.push(lines[i++]); i += 1; blocks.push(<pre key={blocks.length} className="my-4 overflow-x-auto rounded-md border border-border bg-elevated p-3 text-xs leading-5"><code data-language={language}>{code.join("\n")}</code></pre>); continue; }
    const heading = line.match(/^(#{2,3})\s+(.+)/);
    if (heading) { const Tag = heading[1].length === 2 ? "h2" : "h3"; blocks.push(<Tag key={blocks.length} id={headingId(heading[2])} className={`${Tag === "h2" ? "mt-8 text-xl" : "mt-6 text-lg"} scroll-mt-4 font-semibold tracking-tight`}>{inline(heading[2])}</Tag>); i += 1; continue; }
    if (line.startsWith("> ")) { blocks.push(<blockquote key={blocks.length} className="my-4 border-l-2 border-primary/50 pl-4 text-sm italic text-muted-foreground">{inline(line.slice(2))}</blockquote>); i += 1; continue; }
    if (/^[-*]\s+/.test(line)) { const items: string[] = []; while (i < lines.length && /^[-*]\s+/.test(lines[i])) items.push(lines[i++].replace(/^[-*]\s+/, "")); blocks.push(<ul key={blocks.length} className="my-4 list-disc space-y-1 pl-5 text-sm leading-6">{items.map((item, index) => <li key={index}>{inline(item)}</li>)}</ul>); continue; }
    if (/^\d+\.\s+/.test(line)) { const items: string[] = []; while (i < lines.length && /^\d+\.\s+/.test(lines[i])) items.push(lines[i++].replace(/^\d+\.\s+/, "")); blocks.push(<ol key={blocks.length} className="my-4 list-decimal space-y-1 pl-5 text-sm leading-6">{items.map((item, index) => <li key={index}>{inline(item)}</li>)}</ol>); continue; }
    const paragraph = [line]; i += 1; while (i < lines.length && lines[i].trim() && !/^(#{2,3}|```|> |[-*]\s|\d+\.\s)/.test(lines[i])) paragraph.push(lines[i++]); blocks.push(<p key={blocks.length} className="my-4 text-sm leading-7 text-foreground/90">{inline(paragraph.join(" "))}</p>);
  }
  return <div>{blocks}</div>;
}
