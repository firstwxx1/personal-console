import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { ProjectOverview } from "@/components/dashboard/project-overview";
import { QuickAccess } from "@/components/dashboard/quick-access";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { RecentNotes } from "@/components/dashboard/recent-notes";
import { StatsOverview } from "@/components/dashboard/stats-overview";
import { SystemStatus } from "@/components/dashboard/system-status";
import { VpsStatus } from "@/components/dashboard/vps-status";

export default function DashboardPage() {
  return (
    <div className="animate-rise-in space-y-3">
      <DashboardHeader />
      <StatsOverview />
      <VpsStatus />
      <div className="grid gap-3 xl:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <ProjectOverview />
        <QuickAccess />
      </div>
      <div className="grid gap-3 lg:grid-cols-2">
        <RecentActivity />
        <RecentNotes />
      </div>
      <SystemStatus />
    </div>
  );
}
