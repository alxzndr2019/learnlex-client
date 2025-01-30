"use client";

import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import AuthModal from "./AuthModal";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const { user } = useAuth();

  const openLoginModal = () => {
    setAuthMode("login");
    setIsAuthModalOpen(true);
  };

  const openSignupModal = () => {
    setAuthMode("signup");
    setIsAuthModalOpen(true);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-900/80 backdrop-blur-sm shadow-lg z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-xl font-bold text-white">LearnLex</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <a
            href="#features"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Pricing
          </a>
          <a
            href="#about"
            className="text-gray-300 hover:text-white transition-colors"
          >
            About
          </a>
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <button
              onClick={() => router.push("/dashboard")}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Dashboard
            </button>
          ) : (
            <>
              <button
                onClick={openLoginModal}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Log in
              </button>
              <button
                onClick={openSignupModal}
                className="bg-[#8811f0] text-white px-4 py-2 rounded-lg hover:bg-[#8811f0] transition-colors"
              >
                Sign up
              </button>
            </>
          )}
        </div>

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          mode={authMode}
        />
      </nav>
    </header>
  );
}
