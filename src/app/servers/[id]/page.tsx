import { notFound } from "next/navigation";
import { ServerDetailLive } from "@/components/servers/server-detail";
import { projects } from "@/data/projects";
import { loadKomariHistory, loadKomariServers } from "@/lib/komari/data";

export default async function ServerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const server = (await loadKomariServers()).find((item) => item.id === id);
  if (!server) notFound();
  const history = server.source === "komari" ? await loadKomariHistory(server.id) : null;
  return <ServerDetailLive initialServer={server} projects={projects.filter((project) => project.vpsId === server.id || project.vpsName === server.name)} history={history} />;
}
