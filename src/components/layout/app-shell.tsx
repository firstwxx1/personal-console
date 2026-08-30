import { AppSidebar } from "@/components/layout/app-sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <div className="md:pl-60">
        <main className="mx-auto w-full max-w-[1400px] px-4 py-6 pb-24 md:px-6 md:pb-8 lg:px-8">
          {children}
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
