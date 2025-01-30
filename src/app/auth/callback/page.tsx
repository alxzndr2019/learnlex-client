"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../../../contexts/AuthContext";

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser } = useAuth();

  useEffect(() => {
    if (!searchParams) return;

    const token = searchParams.get("token");
    const userStr = searchParams.get("user");

    if (token && userStr) {
      localStorage.setItem("token", token);
      try {
        const user = JSON.parse(decodeURIComponent(userStr));
        setUser(user);
        router.push("/dashboard");
      } catch (error) {
        console.error("Error parsing user data:", error);
        router.push("/");
      }
    } else {
      router.push("/");
    }
  }, [router, searchParams, setUser]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Logging you in...</h1>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8811f0] mx-auto"></div>
      </div>
    </div>
  );
}
