import Link from "next/link";
import { FileText } from "lucide-react";
import { SectionPanel } from "@/components/dashboard/section-panel";
import { notes } from "@/data/notes";

export function RecentNotes() {
  return (
    <SectionPanel title="最近笔记" actionLabel="查看全部" actionHref="/notes">
      <ul className="divide-y divide-border">
        {notes.map((note) => (
          <li key={note.slug}>
            <Link
              href={`/notes/${note.slug}`}
              className="flex items-start gap-3 px-4 py-3 transition-colors duration-150 hover:bg-elevated/50"
            >
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border bg-elevated">
                <FileText className="h-4 w-4 text-muted-foreground" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium">
                  {note.title}
                </span>
                <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                  {note.description}
                </span>
              </span>
              <span className="shrink-0 text-xs text-muted-foreground">
                {note.updatedAt}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </SectionPanel>
  );
}
