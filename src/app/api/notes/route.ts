import { NextResponse } from "next/server";
import { createNote, deleteNote, getNotes } from "@/lib/notes-db";
import { noteCategories, type NoteCategory } from "@/data/notes";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(getNotes());
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as { title?: unknown; category?: unknown; tags?: unknown; content?: unknown };
    const title = typeof body.title === "string" ? body.title.trim() : "";
    const content = typeof body.content === "string" ? body.content.trim() : "";
    const category = body.category;
    const tags = Array.isArray(body.tags) ? body.tags.filter((tag): tag is string => typeof tag === "string").map((tag) => tag.trim()).filter(Boolean) : [];
    if (!title || !content || typeof category !== "string" || !noteCategories.includes(category as NoteCategory)) {
      return NextResponse.json({ error: "标题、分类和内容不能为空。" }, { status: 400 });
    }
    return NextResponse.json(createNote({ title, category: category as NoteCategory, tags, content }), { status: 201 });
  } catch {
    return NextResponse.json({ error: "无法保存笔记。" }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  const id = new URL(request.url).searchParams.get("id")?.trim();
  if (!id) return NextResponse.json({ error: "缺少笔记 ID。" }, { status: 400 });
  return deleteNote(id) ? new NextResponse(null, { status: 204 }) : NextResponse.json({ error: "笔记不存在。" }, { status: 404 });
}
