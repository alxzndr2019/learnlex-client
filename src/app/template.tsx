"use client";

import { usePathname } from "next/navigation";
import Header from "./_components/global/Header";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");

  return (
    <>
      {!isDashboard && <Header />}
      <main className={!isDashboard ? "pt-24 px-8 md:px-12 lg:px-16" : ""}>
        {children}
      </main>
    </>
  );
}
