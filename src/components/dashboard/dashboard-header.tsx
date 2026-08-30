import { DashboardActions } from "@/components/layout/dashboard-actions";

export function DashboardHeader() {
  return (
    <header className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          晚上好，Claw 🌙
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          这是属于你的数字空间，祝你度过高效的一天！
        </p>
      </div>
      <DashboardActions />
    </header>
  );
}
