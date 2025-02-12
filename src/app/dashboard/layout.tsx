import Sidebar from "./_components/Sidebar";
import TopBar from "./_components/TopBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-[#1a0f00]">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-64">
          <TopBar />
          <main className="p-6 mt-16">
            <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
