import { notes } from "@/data/notes";
import { projects } from "@/data/projects";
import { serviceSites, type ServiceSite } from "@/data/services";
import { vpsServers } from "@/data/vps";

export type SearchResultType = "project" | "server" | "service" | "note";

export interface SearchResult {
  id: string;
  type: SearchResultType;
  typeLabel: string;
  title: string;
  description: string;
  href: string;
  external?: boolean;
}

type IndexedSearchResult = SearchResult & { searchable: string[] };

function createSearchResults(services: ServiceSite[]): IndexedSearchResult[] {
  return [
    ...projects.map((project) => ({
      id: `project:${project.id}`, type: "project" as const, typeLabel: "项目", title: project.name,
      description: `${project.description} · ${project.type} · ${project.vpsName}`, href: `/projects/${project.id}`,
      searchable: [project.name, project.description, project.type, project.vpsName]
    })),
    ...vpsServers.map((server) => ({
      id: `server:${server.id}`, type: "server" as const, typeLabel: "服务器", title: server.name,
      description: `${server.region} · ${server.ipAddress} · ${server.os}`, href: `/servers/${server.id}`,
      searchable: [server.name, server.region, server.ipAddress, server.os]
    })),
    ...services.map((service) => ({
      id: `service:${service.id}`, type: "service" as const, typeLabel: "网站", title: service.name,
      description: `${service.description} · ${service.category}`, href: service.url, external: true,
      searchable: [service.name, service.description, service.category]
    })),
    ...notes.map((note) => ({
      id: `note:${note.id}`, type: "note" as const, typeLabel: "笔记", title: note.title,
      description: `${note.excerpt} · ${note.category} · ${note.tags.join("、")}`, href: `/notes/${note.slug}`,
      searchable: [note.title, note.excerpt, note.category, ...note.tags]
    }))
  ];
}

const toSearchResult = ({ searchable, ...result }: IndexedSearchResult): SearchResult => {
  void searchable;
  return result;
};

export function searchLocalResults(query: string, services: ServiceSite[] = serviceSites): SearchResult[] {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const searchResults = createSearchResults(services);
  if (!normalizedQuery) return searchResults.slice(0, 8).map(toSearchResult);
  return searchResults.filter((result) => result.searchable.some((field) => field.toLocaleLowerCase().includes(normalizedQuery))).map(toSearchResult);
}
