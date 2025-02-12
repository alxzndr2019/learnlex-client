"use client";

import { useState } from "react";
import Link from "next/link";
import SessionCard from "../_components/SessionCard";
import { sessionApi } from "../../../store/api/sessionApi";

export default function Sessions() {
  const { data: sessionsData, isLoading } =
    sessionApi.useGetUserSessionsQuery();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"recent" | "progress">("recent");

  const sessions = sessionsData?.sessions || [];

  // Filter and sort sessions
  const filteredSessions = sessions
    .filter((session) =>
      session.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "recent") {
        // Convert dates to UTC timestamps to ensure consistent sorting
        const dateA = new Date(a.lastAccessed).toISOString();
        const dateB = new Date(b.lastAccessed).toISOString();
        return dateB.localeCompare(dateA);
      }
      return b.progress - a.progress;
    });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff6b00]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Your Sessions</h1>
          <p className="text-white/70">
            View and manage all your learning sessions
          </p>
        </div>
        <Link
          href="/dashboard/new"
          className="bg-[#ff6b00] text-white px-4 py-2 rounded-lg hover:bg-[#ff6b00]/80 transition-colors flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
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
          <span>New Session</span>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search sessions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/50"
              aria-label="Search sessions"
            />
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="sort-by" className="text-white/70">
            Sort by:
          </label>
          <select
            id="sort-by"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "recent" | "progress")}
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/50"
          >
            <option value="recent">Most Recent</option>
            <option value="progress">Progress</option>
          </select>
        </div>
      </div>

      {/* Sessions Grid */}
      {filteredSessions.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-white/50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20 12H4M12 4v16"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">
            No sessions found
          </h2>
          <p className="text-white/70 mb-6">
            {searchQuery
              ? "Try adjusting your search query"
              : "Start by creating a new learning session"}
          </p>
          <Link
            href="/dashboard/new"
            className="inline-flex items-center gap-2 bg-[#ff6b00] text-white px-6 py-3 rounded-lg hover:bg-[#ff6b00]/80 transition-colors"
          >
            <svg
              className="w-5 h-5"
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
            <span>Create New Session</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSessions.map((session) => (
            <SessionCard
              key={session.id}
              id={session.id}
              title={session.title}
              thumbnailUrl={session.thumbnailUrl}
              progress={session.progress}
              lastAccessed={session.lastAccessed}
            />
          ))}
        </div>
      )}
    </div>
  );
}
