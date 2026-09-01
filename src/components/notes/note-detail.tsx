import Link from "next/link";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { Badge, Card } from "@/components/ui";
import type { Note } from "@/data/notes";
import { headingId, MarkdownContent } from "./markdown-content";
import { NoteToc } from "./note-toc";

export function NoteDetail({ note }: { note: Note }) {
  const headings = note.content.split(/\r?\n/).flatMap((line) => { const match = line.match(/^(#{2,3})\s+(.+)/); return match ? [{ id: headingId(match[2]), text: match[2], level: match[1].length }] : []; });
  return <div className="animate-rise-in min-w-0 space-y-5"><Link href="/notes" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" />返回笔记</Link><header className="border-b border-border pb-5"><div className="flex flex-wrap items-center gap-2"><Badge variant="info">{note.category}</Badge>{note.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}</div><h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{note.title}</h1><p className="mt-2 max-w-3xl text-sm text-muted-foreground sm:text-base">{note.excerpt}</p><div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground"><span className="inline-flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" />创建于 {note.createdAt}</span><span>更新于 {note.updatedAt}</span></div></header><div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_220px]"><article className="min-w-0"><Card className="p-4 sm:p-8"><MarkdownContent content={note.content} /></Card></article><aside className="order-first lg:order-none"><div className="lg:sticky lg:top-4"><NoteToc headings={headings} /></div></aside></div></div>;
}
