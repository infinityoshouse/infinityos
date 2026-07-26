import { Sidebar } from "@/modules/dashboard/components/Sidebar";
import { Header } from "@/modules/dashboard/components/Header";
import { KPIGrid } from "@/modules/dashboard/components/KPIGrid";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-[#090909]">
      <Sidebar />

      <main className="flex-1">
        <Header />

        <div className="p-8">
          <KPIGrid />
        </div>
      </main>
    </div>
  );
}
