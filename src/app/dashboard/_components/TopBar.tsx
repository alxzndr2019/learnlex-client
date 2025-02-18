"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function TopBar() {
  const pathname = usePathname();
  const isSessionPage = pathname.includes("/session/");

  return (
    <header className="fixed top-0 right-0 left-0 md:left-64 h-16 bg-black/50 backdrop-blur-sm border-b border-white/10 px-4 md:px-6 flex items-center justify-between z-50">
      {/* Back Button (Mobile Only) */}
      {isSessionPage ? (
        <Link
          href="/dashboard/sessions"
          className="md:hidden flex items-center text-white/70 hover:text-white"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="ml-2">Back</span>
        </Link>
      ) : (
        <div className="md:hidden">
          <Image
            src="/vercel.svg"
            alt="Logo"
            width={32}
            height={32}
            className="w-8 h-8"
          />
        </div>
      )}

      {/* Search Bar (Desktop Only) */}
      <div className="hidden md:block flex-1">
        <input
          type="search"
          placeholder="Search sessions..."
          className="w-96 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-[#ff6b00]/50"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* New Session Button (Desktop Only) */}
        <Link
          href="/dashboard/new"
          className="hidden md:flex bg-[#ff6b00] text-white px-4 py-2 rounded-lg hover:bg-[#ff8533] transition-colors"
        >
          + New Session
        </Link>

        {/* Profile Button */}
        <Link href="/dashboard/profile">
          <button className="flex items-center gap-2 hover:bg-white/10 p-2 rounded-lg transition-colors">
            <Image
              src="/useravater.jpg"
              alt="Profile"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="hidden md:inline text-sm font-medium text-white">
              {"User"}
            </span>
          </button>
        </Link>
      </div>
    </header>
  );
}
