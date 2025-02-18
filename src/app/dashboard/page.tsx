"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { sessionApi } from "../../store/api/sessionApi";
import { tokenApi } from "../../store/api/tokenApi";
import { authApi } from "../../store/api/authApi";

const StatCard = dynamic(() => import("./_components/StatCard"), {
  ssr: false,
});

const SessionCard = dynamic(() => import("./_components/SessionCard"), {
  ssr: false,
});

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  const { data: sessionsData, isLoading: sessionsLoading } =
    sessionApi.useGetUserSessionsQuery();
  const { data: tokenData, isLoading: tokenLoading } =
    tokenApi.useGetBalanceQuery();
  const { data: user } = authApi.useGetCurrentUserQuery();

  useEffect(() => {
    setMounted(true);
  }, []);

  const sessions = sessionsData?.sessions || [];

  if (!mounted) {
    return null;
  }

  if (sessionsLoading || tokenLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff6b00]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">
            Welcome back, {user?.name || "User"}
          </h1>
          <p className="text-white/70">
            Track your learning progress and create new sessions
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon="🎟️"
          title="Tokens Remaining"
          value={`${tokenData?.balance || 0} tokens`}
          trend={
            tokenData?.usage?.[0]?.amount
              ? {
                  value: tokenData.usage[0].amount,
                  isPositive: tokenData.usage[0].action === "purchase",
                }
              : undefined
          }
        />
        <StatCard
          icon="📚"
          title="Completed Sessions"
          value={String(sessions.filter((s) => s.progress === 100).length)}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          icon="⭐"
          title="Average Score"
          value="85%"
          trend={{ value: 3, isPositive: true }}
        />
      </div>

      {/* Recent Activity Chart */}
      <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-6">
        <h2 className="text-lg font-bold text-white mb-4">Learning Activity</h2>
        <div className="h-64 flex items-center justify-center text-white/50">
          Chart component will be implemented here
        </div>
      </div>

      {/* Recent Sessions */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-white">Recent Sessions</h2>
          <Link
            href="/dashboard/sessions"
            className="text-[#ff6b00] hover:text-[#ff8533] text-sm font-medium transition-colors"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions.slice(0, 2).map((session) => (
            <SessionCard
              key={session.id}
              id={session.id}
              title={session.title}
              thumbnailUrl={session.thumbnailUrl}
              progress={session.progress}
              lastAccessed={session.lastAccessed}
            />
          ))}
          <Link
            href="/dashboard/new"
            className="block aspect-video bg-white/5 rounded-lg hover:bg-white/10 transition-colors p-6 flex items-center justify-center"
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-[#ff6b00] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-white mb-1">
                Create New Session
              </h3>
              <p className="text-sm text-white/70">
                Start learning from a new video
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
