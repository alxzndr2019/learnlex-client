"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import AuthModal from "./AuthModal";
import { useAuth } from "../../../contexts/AuthContext";

export default function Header() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user } = useAuth();

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl bg-black/50 backdrop-blur-sm border border-white/10 rounded-2xl z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/vercel.svg" alt="Logo" width={32} height={32} />
            <span className="font-bold text-xl text-white">LearnLex</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-white hover:text-[#ff6b00] transition-colors"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-white hover:text-[#ff6b00] transition-colors"
            >
              Pricing
            </Link>
            {user ? (
              <Link href="/dashboard">
                <button className="bg-[#ff6b00] text-white px-6 py-2 rounded-lg hover:bg-[#ff8533] transition-colors">
                  Dashboard
                </button>
              </Link>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-[#ff6b00] text-white px-6 py-2 rounded-lg hover:bg-[#ff8533] transition-colors"
              >
                Get Started
              </button>
            )}
          </nav>
        </div>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode="signup"
      />
    </header>
  );
}
