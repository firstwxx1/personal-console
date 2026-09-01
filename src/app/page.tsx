export const dynamic = "force-dynamic";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { ProjectOverview } from "@/components/dashboard/project-overview";
import { QuickAccess } from "@/components/dashboard/quick-access";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { RecentNotes } from "@/components/dashboard/recent-notes";
import { SystemStatus } from "@/components/dashboard/system-status";
import { LiveMonitoring } from "@/components/dashboard/live-monitoring";
import { loadKomariServers } from "@/lib/komari/data";
export default async function DashboardPage() { const servers = await loadKomariServers(); return <div className="animate-rise-in space-y-3"><DashboardHeader /><LiveMonitoring initialServers={servers} /><div className="grid gap-3 xl:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]"><ProjectOverview /><QuickAccess /></div><div className="grid gap-3 lg:grid-cols-2"><RecentActivity /><RecentNotes /></div><SystemStatus /></div>; }
