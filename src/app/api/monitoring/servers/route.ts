import { NextResponse } from "next/server";
import { loadKomariServers } from "@/lib/komari/data";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(
    { data: await loadKomariServers() },
    { headers: { "Cache-Control": "no-store" } },
  );
}
