"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useAuth } from "../../../contexts/AuthContext";
import { LogIn } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: "login" | "signup";
}

export default function AuthModal({
  isOpen,
  onClose,
  mode = "login",
}: AuthModalProps) {
  const { login } = useAuth();

  const handleLogin = async () => {
    await login();
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-black/80 backdrop-blur-sm p-8 text-left align-middle shadow-xl transition-all border border-white/10">
                <div className="flex flex-col items-center">
                  <Dialog.Title className="text-2xl font-bold mb-8 text-white">
                    {mode === "login" ? "Welcome Back" : "Join LearnLex"}
                  </Dialog.Title>

                  <button
                    onClick={handleLogin}
                    className="w-full flex items-center justify-center gap-3 bg-[#ff6b00] hover:bg-[#ff8533] text-white px-6 py-4 rounded-lg font-medium transition-colors"
                  >
                    <LogIn className="w-5 h-5" />
                    Continue with Google
                  </button>

                  <p className="mt-6 text-sm text-gray-400 text-center">
                    By continuing, you agree to our{" "}
                    <a
                      href="#"
                      className="font-medium text-[#ff6b00] hover:text-[#ff8533]"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="#"
                      className="font-medium text-[#ff6b00] hover:text-[#ff8533]"
                    >
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
