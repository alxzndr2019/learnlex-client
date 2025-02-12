"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Section from "../_components/Section";
import { sessionApi } from "../../../store/api/sessionApi";

export default function NewSession() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [processVideo, { isLoading }] = sessionApi.useProcessVideoMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await processVideo({ url }).unwrap();
      router.push(`/dashboard/session/${result.id}`);
    } catch (error) {
      console.error("Failed to process video:", error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Section>
        <h1 className="text-2xl font-bold text-white mb-6">
          Create New Learning Session
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="videoUrl"
              className="block text-sm font-medium text-white/70 mb-2"
            >
              YouTube Video URL
            </label>
            <input
              type="url"
              id="videoUrl"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://youtube.com/watch?v=..."
              className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#ff6b00] focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#ff6b00] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#ff8533] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Processing Video...
              </>
            ) : (
              "Create Session"
            )}
          </button>
        </form>

        <div className="mt-8 border-t border-white/10 pt-6">
          <h2 className="text-lg font-medium text-white mb-4">Tips</h2>
          <ul className="list-disc list-inside space-y-2 text-white/70">
            <li>Use educational videos for best results</li>
            <li>Ensure video has clear audio and subtitles if possible</li>
            <li>Videos should be between 5-30 minutes for optimal learning</li>
            <li>Processing may take a few minutes for longer videos</li>
          </ul>
        </div>
      </Section>
    </div>
  );
}
