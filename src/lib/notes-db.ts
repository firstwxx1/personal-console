import path from "node:path";
import { mkdirSync } from "node:fs";
import { DatabaseSync } from "node:sqlite";
import { notes as seedNotes, type Note, type NoteCategory } from "@/data/notes";
import { serviceSites as seedServices, type ServiceCategory, type ServiceIcon, type ServiceSite } from "@/data/services";

const dbPath = process.env.NOTES_DB_PATH || path.join(process.cwd(), ".data", "notes.db");
let database: DatabaseSync | undefined;

function getDatabase() {
  if (!database) {
    mkdirSync(path.dirname(dbPath), { recursive: true });
    database = new DatabaseSync(dbPath);
    database.exec(`CREATE TABLE IF NOT EXISTS notes (id TEXT PRIMARY KEY, slug TEXT NOT NULL UNIQUE, title TEXT NOT NULL, excerpt TEXT NOT NULL, description TEXT NOT NULL, category TEXT NOT NULL, tags TEXT NOT NULL, content TEXT NOT NULL, created_at TEXT NOT NULL, updated_at TEXT NOT NULL)`);
    database.exec(`CREATE TABLE IF NOT EXISTS services (id TEXT PRIMARY KEY, name TEXT NOT NULL, description TEXT NOT NULL, category TEXT NOT NULL, url TEXT NOT NULL, icon TEXT NOT NULL, status TEXT NOT NULL, notes TEXT NOT NULL, project_ids TEXT NOT NULL, vps_ids TEXT NOT NULL, runtime_type TEXT NOT NULL, runtime_name TEXT NOT NULL, port TEXT NOT NULL, verification_source TEXT NOT NULL, last_verified_at TEXT NOT NULL, show_in_quick_access INTEGER NOT NULL DEFAULT 1)`);
    const serviceColumns = database.prepare("PRAGMA table_info(services)").all() as Record<string, unknown>[];
    if (!serviceColumns.some((column) => column.name === "show_in_quick_access")) database.exec("ALTER TABLE services ADD COLUMN show_in_quick_access INTEGER NOT NULL DEFAULT 1");
    const count = Number(database.prepare("SELECT COUNT(*) AS count FROM notes").get()?.count ?? 0);
    if (count === 0) {
      const insert = database.prepare("INSERT INTO notes (id, slug, title, excerpt, description, category, tags, content, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
      for (const note of seedNotes) insert.run(note.id, note.slug, note.title, note.excerpt, note.description, note.category, JSON.stringify(note.tags), note.content, note.createdAt, note.updatedAt);
    }
    const serviceCount = Number(database.prepare("SELECT COUNT(*) AS count FROM services").get()?.count ?? 0);
    if (serviceCount === 0) {
      const insert = database.prepare("INSERT INTO services (id, name, description, category, url, icon, status, notes, project_ids, vps_ids, runtime_type, runtime_name, port, verification_source, last_verified_at, show_in_quick_access) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
      for (const service of seedServices.filter((item) => item.runtimeType === "external")) insert.run(service.id, service.name, service.description, service.category, service.url, service.icon, service.status, service.notes, JSON.stringify(service.projectIds), JSON.stringify(service.vpsIds), service.runtimeType, service.runtimeName, service.port, service.verificationSource, service.lastVerifiedAt, service.showInQuickAccess ? 1 : 0);
    }
  }
  return database;
}

function mapNote(row: Record<string, unknown>): Note {
  return { id: String(row.id), slug: String(row.slug), title: String(row.title), excerpt: String(row.excerpt), description: String(row.description), category: String(row.category) as NoteCategory, tags: JSON.parse(String(row.tags)) as string[], content: String(row.content), createdAt: String(row.created_at), updatedAt: String(row.updated_at) };
}

export function getNotes(): Note[] {
  return (getDatabase().prepare("SELECT * FROM notes ORDER BY updated_at DESC, created_at DESC").all() as Record<string, unknown>[]).map(mapNote);
}

export function getNoteBySlug(slug: string): Note | undefined {
  const row = getDatabase().prepare("SELECT * FROM notes WHERE slug = ?").get(slug) as Record<string, unknown> | undefined;
  return row ? mapNote(row) : undefined;
}

export function createNote(input: { title: string; category: NoteCategory; tags: string[]; content: string }): Note {
  const title = input.title.trim();
  const content = input.content.trim();
  const excerpt = content.replace(/[#*_`>\n]/g, " ").replace(/\s+/g, " ").slice(0, 120);
  const today = new Date().toISOString().slice(0, 10);
  const slugBase = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "note";
  const slug = `${slugBase}-${Date.now()}`;
  const note: Note = { id: `note-${Date.now()}`, slug, title, excerpt, description: excerpt, category: input.category, tags: input.tags, content, createdAt: today, updatedAt: today };
  getDatabase().prepare("INSERT INTO notes (id, slug, title, excerpt, description, category, tags, content, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)").run(note.id, note.slug, note.title, note.excerpt, note.description, note.category, JSON.stringify(note.tags), note.content, note.createdAt, note.updatedAt);
  return note;
}

export function deleteNote(id: string): boolean {
  const result = getDatabase().prepare("DELETE FROM notes WHERE id = ?").run(id);
  return Number(result.changes) === 1;
}

function mapService(row: Record<string, unknown>): ServiceSite {
  return { id: String(row.id), name: String(row.name), description: String(row.description), category: String(row.category) as ServiceCategory, url: String(row.url), icon: String(row.icon) as ServiceIcon, showInQuickAccess: Number(row.show_in_quick_access ?? 1) === 1, status: "external", notes: String(row.notes), projectIds: JSON.parse(String(row.project_ids)) as string[], vpsIds: JSON.parse(String(row.vps_ids)) as string[], runtimeType: "external", runtimeName: "第三方服务", port: "—", verificationSource: "unknown", lastVerifiedAt: "—" };
}

export function getExternalServices(): ServiceSite[] {
  return (getDatabase().prepare("SELECT * FROM services ORDER BY name COLLATE NOCASE").all() as Record<string, unknown>[]).map(mapService);
}

export function createExternalService(input: { name: string; description: string; url: string; category: ServiceCategory; notes: string; icon: ServiceIcon; showInQuickAccess?: boolean }): ServiceSite {
  const name = input.name.trim();
  const id = `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "website"}-${Date.now()}`;
  const service: ServiceSite = { id, name, description: input.description.trim(), category: input.category, url: input.url.trim(), icon: input.icon, showInQuickAccess: input.showInQuickAccess !== false, status: "external", notes: input.notes.trim(), projectIds: [], vpsIds: [], runtimeType: "external", runtimeName: "第三方服务", port: "—", verificationSource: "unknown", lastVerifiedAt: "—" };
  getDatabase().prepare("INSERT INTO services (id, name, description, category, url, icon, status, notes, project_ids, vps_ids, runtime_type, runtime_name, port, verification_source, last_verified_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)").run(service.id, service.name, service.description, service.category, service.url, service.icon, service.status, service.notes, "[]", "[]", service.runtimeType, service.runtimeName, service.port, service.verificationSource, service.lastVerifiedAt);
  return service;
}

export function updateExternalService(id: string, input: { name: string; description: string; url: string; category: ServiceCategory; notes: string; icon: ServiceIcon; showInQuickAccess?: boolean }): ServiceSite | undefined {
  const result = getDatabase().prepare("UPDATE services SET name = ?, description = ?, category = ?, url = ?, notes = ?, icon = ?, show_in_quick_access = ? WHERE id = ? AND runtime_type = 'external'").run(input.name.trim(), input.description.trim(), input.category, input.url.trim(), input.notes.trim(), input.icon, input.showInQuickAccess !== false ? 1 : 0, id);
  if (Number(result.changes) !== 1) return undefined;
  const row = getDatabase().prepare("SELECT * FROM services WHERE id = ?").get(id) as Record<string, unknown> | undefined;
  return row ? mapService(row) : undefined;
}

export function deleteExternalService(id: string): boolean {
  const result = getDatabase().prepare("DELETE FROM services WHERE id = ?").run(id);
  return Number(result.changes) === 1;
}
