import Link from "next/link";
import Image from "next/image";

const SidebarLink = ({
  href,
  icon,
  children,
}: {
  href: string;
  icon: string;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
  >
    <span className="text-xl">{icon}</span>
    <span>{children}</span>
  </Link>
);

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 p-6 bg-black/50 backdrop-blur-sm border-r border-white/10">
      {/* Logo */}
      <Link href="/dashboard" className="flex items-center gap-2 mb-8">
        <Image src="/vercel.svg" alt="Logo" width={32} height={32} />
        <span className="font-bold text-xl text-white">LearnLex</span>
      </Link>

      <nav className="space-y-1">
        <SidebarLink href="/dashboard" icon="📊">
          Overview
        </SidebarLink>
        <SidebarLink href="/dashboard/sessions" icon="📚">
          My Sessions
        </SidebarLink>
        <SidebarLink href="/dashboard/progress" icon="📈">
          Progress
        </SidebarLink>
        <SidebarLink href="/dashboard/settings" icon="⚙️">
          Settings
        </SidebarLink>
      </nav>

      {/* Token Balance */}
      <div className="mt-8 p-4 bg-[#ff6b00]/10 rounded-xl border border-[#ff6b00]/20">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white/70">Tokens Balance</span>
          <span className="text-[#ff6b00]">🎟️</span>
        </div>
        <div className="text-2xl font-bold text-white">15</div>
        <button className="mt-3 w-full px-3 py-2 bg-[#ff6b00] text-white rounded-lg hover:bg-[#ff8533] transition-colors text-sm">
          Get More Tokens
        </button>
      </div>
    </aside>
  );
}
