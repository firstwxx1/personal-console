import { vpsServers } from "@/data/vps";
import { getKomariLatestStatus, getKomariLoadRecords, getKomariNodes } from "./client";
import { mapKomariServer, mapMockServer, type KomariServer } from "./mapper";
import type { KomariLatestStatusMap, KomariLoadData } from "./types";

export async function loadKomariServers(): Promise<KomariServer[]> {
  let nodes;
  try {
    nodes = (await getKomariNodes()).filter((node) => !node.hidden);
  } catch (error) {
    console.error("Komari monitoring fallback", error instanceof Error ? error.name : "unknown error");
    return vpsServers.map(mapMockServer);
  }

  let statuses: KomariLatestStatusMap = {};
  try {
    statuses = await getKomariLatestStatus();
  } catch (error) {
    console.error("Komari RPC fallback", error instanceof Error ? error.name : "unknown error");
  }

  return nodes.map((node) => mapKomariServer(node, statuses[node.uuid] ?? null, vpsServers.find((server) => server.name === node.name)));
}

export async function loadKomariHistory(uuid: string): Promise<KomariLoadData | null> {
  try { return await getKomariLoadRecords(uuid); }
  catch (error) { console.error("Komari history unavailable", error instanceof Error ? error.name : "unknown error"); return null; }
}
