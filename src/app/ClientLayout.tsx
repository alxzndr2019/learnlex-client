"use client";

import { Providers } from "../providers/Providers";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Providers>{children}</Providers>;
}
