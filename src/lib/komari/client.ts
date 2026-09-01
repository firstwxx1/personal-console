import type { KomariEnvelope, KomariLatestStatusMap, KomariLoadData, KomariNode, KomariRecent } from "./types";

const REQUEST_TIMEOUT_MS = 8000;

function getBaseUrl(): string {
  const value = process.env.KOMARI_URL?.trim();
  if (!value) throw new Error("KOMARI_URL is not configured");
  return value.replace(/\/$/, "");
}

async function getJson<T>(path: string, revalidate = 15): Promise<T> {
  const response = await fetch(`${getBaseUrl()}${path}`, {
    next: { revalidate },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
  if (!response.ok) throw new Error(`Komari request failed: ${response.status}`);
  const envelope = (await response.json()) as KomariEnvelope<T>;
  if (envelope.status !== "success") throw new Error(envelope.message || "Komari returned an error");
  return envelope.data;
}

async function postRpc<T>(method: string): Promise<T> {
  const response = await fetch(`${getBaseUrl()}/api/rpc2`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method }),
    cache: "no-store",
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
  if (!response.ok) throw new Error(`Komari RPC failed: ${response.status}`);
  const payload = (await response.json()) as { result?: T; error?: { message?: string } };
  if (payload.error || payload.result === undefined) throw new Error(payload.error?.message || "Komari RPC returned no result");
  return payload.result;
}

export function getKomariNodes(): Promise<KomariNode[]> { return getJson<KomariNode[]>("/api/nodes"); }
export function getKomariLatestStatus(): Promise<KomariLatestStatusMap> { return postRpc<KomariLatestStatusMap>("common:getNodesLatestStatus"); }
export function getKomariRecent(uuid: string): Promise<KomariRecent[]> { return getJson<KomariRecent[]>(`/api/recent/${encodeURIComponent(uuid)}`); }
export function getKomariLoadRecords(uuid: string, hours = 1): Promise<KomariLoadData> { return getJson<KomariLoadData>(`/api/records/load?uuid=${encodeURIComponent(uuid)}&hours=${hours}`); }
