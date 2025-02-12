import Link from "next/link";
import Image from "next/image";

export default function TopBar() {
  return (
    <header className="fixed top-0 right-0 left-64 h-16 bg-black/50 backdrop-blur-sm border-b border-white/10 px-6 flex items-center justify-between z-50">
      <div className="flex-1">
        <input
          type="search"
          placeholder="Search sessions..."
          className="w-96 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-[#ff6b00]/50"
        />
      </div>
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/new"
          className="bg-[#ff6b00] text-white px-4 py-2 rounded-lg hover:bg-[#ff8533] transition-colors"
        >
          + New Session
        </Link>
        <Link href="/dashboard/profile">
          <button className="flex items-center gap-2 hover:bg-white/10 p-2 rounded-lg transition-colors">
            <Image
              src={"/useravater.jpg"}
              alt="Profile"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="text-sm font-medium text-white">{"User"}</span>
          </button>
        </Link>
      </div>
    </header>
  );
}
