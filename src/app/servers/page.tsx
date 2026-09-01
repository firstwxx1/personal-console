export const dynamic = "force-dynamic";

import { ServersList } from "@/components/servers/servers-list";
import { loadKomariServers } from "@/lib/komari/data";

export default async function ServersPage() {
  return <ServersList servers={await loadKomariServers()} />;
}
