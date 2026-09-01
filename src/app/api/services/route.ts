import { NextResponse } from "next/server";
import { createExternalService, deleteExternalService, getExternalServices, updateExternalService } from "@/lib/notes-db";
import { serviceCategories, type ServiceCategory } from "@/data/services";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(getExternalServices());
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as { name?: unknown; description?: unknown; url?: unknown; category?: unknown; notes?: unknown; icon?: unknown; showInQuickAccess?: unknown };
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const category = body.category;
    if (!name || typeof category !== "string" || !serviceCategories.includes(category as ServiceCategory)) {
      return NextResponse.json({ error: "名称和分类不能为空。" }, { status: 400 });
    }
    const url = typeof body.url === "string" ? body.url.trim() : "";
    if (url && !/^https?:\/\//i.test(url)) return NextResponse.json({ error: "网址必须以 http:// 或 https:// 开头。" }, { status: 400 });
    return NextResponse.json(createExternalService({ name, category: category as ServiceCategory, description: typeof body.description === "string" ? body.description : "", url, notes: typeof body.notes === "string" ? body.notes : "", icon: typeof body.icon === "string" ? body.icon as "github" : "github", showInQuickAccess: body.showInQuickAccess !== false }), { status: 201 });
  } catch {
    return NextResponse.json({ error: "无法保存网站。" }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json() as { id?: unknown; name?: unknown; description?: unknown; url?: unknown; category?: unknown; notes?: unknown; icon?: unknown; showInQuickAccess?: unknown };
    const id = typeof body.id === "string" ? body.id.trim() : "";
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const category = body.category;
    if (!id || !name || typeof category !== "string" || !serviceCategories.includes(category as ServiceCategory)) {
      return NextResponse.json({ error: "网站 ID、名称和分类不能为空。" }, { status: 400 });
    }
    const url = typeof body.url === "string" ? body.url.trim() : "";
    if (url && !/^https?:\/\//i.test(url)) return NextResponse.json({ error: "网址必须以 http:// 或 https:// 开头。" }, { status: 400 });
    const updated = updateExternalService(id, { name, category: category as ServiceCategory, description: typeof body.description === "string" ? body.description : "", url, notes: typeof body.notes === "string" ? body.notes : "", icon: typeof body.icon === "string" ? body.icon as "github" : "github", showInQuickAccess: body.showInQuickAccess !== false });
    return updated ? NextResponse.json(updated) : NextResponse.json({ error: "网站不存在。" }, { status: 404 });
  } catch {
    return NextResponse.json({ error: "无法保存网站。" }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  const id = new URL(request.url).searchParams.get("id")?.trim();
  if (!id) return NextResponse.json({ error: "缺少网站 ID。" }, { status: 400 });
  return deleteExternalService(id) ? new NextResponse(null, { status: 204 }) : NextResponse.json({ error: "网站不存在。" }, { status: 404 });
}
