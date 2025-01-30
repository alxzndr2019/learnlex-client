import Link from "next/link";
import Image from "next/image";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Image src="/vercel.svg" alt="Logo" width={32} height={32} />
              <span className="font-bold text-xl">EduTube</span>
            </Link>

            {/* Profile Menu */}
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard/new"
                className="text-[#8811f0] hover:text-[#7700d6] font-medium"
              >
                + New Session
              </Link>
              <Link href="/dashboard/profile">
                <button className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg transition-colors">
                  <Image
                    src={"/useravater.jpg"}
                    alt="Profile"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span className="text-sm font-medium">{"User"}</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16">{children}</main>
    </div>
  );
}
