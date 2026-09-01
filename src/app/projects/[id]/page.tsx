import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/projects/project-detail";
import { projects } from "@/data/projects";
import { vpsServers } from "@/data/vps";

export default async function ProjectDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find((item) => item.id === id);
  const server = project
    ? vpsServers.find((item) => item.id === project.vpsId)
    : undefined;

  if (!project || !server) {
    notFound();
  }

  return <ProjectDetail project={project} server={server} />;
}
