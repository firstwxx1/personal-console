import { AppSidebar } from "@/components/layout/app-sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { GlobalSearch } from "@/components/search/global-search";
import { ServicesProvider } from "@/components/services/services-store";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <ServicesProvider>
      <div className="min-h-screen overflow-x-hidden bg-background">
        <AppSidebar />
        <div className="md:pl-60">
          <main className="mx-auto w-full min-w-0 max-w-[1400px] px-4 py-5 pb-24 md:px-6 md:py-6 md:pb-8 lg:px-8">
            {children}
          </main>
        </div>
        <MobileNav />
        <GlobalSearch />
      </div>
    </ServicesProvider>
  );
}
