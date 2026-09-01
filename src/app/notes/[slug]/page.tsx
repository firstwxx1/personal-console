import { notFound } from "next/navigation";
import { NoteDetail } from "@/components/notes/note-detail";
import { getNoteBySlug } from "@/lib/notes-db";

export const dynamic = "force-dynamic";

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = getNoteBySlug(slug);
  if (!note) notFound();
  return <NoteDetail note={note} />;
}
