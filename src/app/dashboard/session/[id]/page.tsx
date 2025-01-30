"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// interface Section {
//   title: string;
//   content: string[];
// }

const VideoMetadata = ({
  thumbnail,
  title,
  channel,
}: {
  thumbnail: string;
  title: string;
  channel: string;
}) => (
  <div className="bg-white rounded-xl overflow-hidden shadow-sm mb-8">
    <div className="relative aspect-video">
      <Image src={thumbnail} alt={title} fill className="object-cover" />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
        <button
          className="bg-white/90 p-4 rounded-full"
          aria-label="Play video"
        >
          <svg
            className="w-8 h-8 text-[#8811f0]"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
          </svg>
        </button>
      </div>
    </div>
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <div className="flex items-center gap-2 text-gray-600">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
          <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
        </svg>
        <span>{channel}</span>
      </div>
    </div>
  </div>
);

const SummarySection = ({
  title,
  content,
  isOpen,
  onToggle,
}: {
  title: string;
  content: string[];
  isOpen: boolean;
  onToggle: () => void;
}) => (
  <div className="border-b border-gray-200 last:border-0">
    <button
      className="w-full py-4 px-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
      onClick={onToggle}
    >
      <span className="font-medium">{title}</span>
      <svg
        className={`w-5 h-5 transform transition-transform ${
          isOpen ? "rotate-180" : ""
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>
    {isOpen && (
      <div className="px-6 pb-4">
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          {content.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

const StartTestButton = ({
  cost,
  onClick,
}: {
  cost: number;
  onClick: () => void;
}) => {
  const router = useRouter();

  const handleClick = () => {
    onClick();
    router.push(`${window.location.pathname}/test`);
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#8811f0] text-white px-8 py-4 rounded-lg font-medium hover:bg-[#7700d6] transition-colors flex items-center gap-3 shadow-lg"
    >
      <span>Start Test</span>
      <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded">
        <span>{cost}</span>
        <span>🎟️</span>
      </div>
    </button>
  );
};

export default function LearningSession() {
  const [openSection, setOpenSection] = useState<string | null>("keyPoints");

  // Mock data - replace with actual data fetching
  const sessionData = {
    thumbnail: "/course-thumbnail.jpg",
    title: "JavaScript Closures Explained",
    channel: "Programming with Mosh",
    summary: {
      keyPoints: [
        "Closures are functions that remember their lexical scope",
        "They maintain access to variables from their outer scope",
        "Useful for data privacy and maintaining state",
      ],
      steps: [
        "First, understand the concept of scope in JavaScript",
        "Learn how nested functions work",
        "Explore how variables are accessed in nested scopes",
        "Practice creating closures for practical applications",
      ],
      mistakes: [
        "Forgetting that closures keep references to outer variables",
        "Not considering memory implications",
        "Misunderstanding the scope chain",
      ],
    },
  };

  const handleTestStart = () => {
    // Implement test start logic
    console.log("Starting test...");
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <VideoMetadata
          thumbnail={sessionData.thumbnail}
          title={sessionData.title}
          channel={sessionData.channel}
        />

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-bold">Lesson Summary</h2>
          </div>

          <SummarySection
            title="Key Concepts"
            content={sessionData.summary.keyPoints}
            isOpen={openSection === "keyPoints"}
            onToggle={() =>
              setOpenSection(openSection === "keyPoints" ? null : "keyPoints")
            }
          />
          <SummarySection
            title="Step-by-Step Explanation"
            content={sessionData.summary.steps}
            isOpen={openSection === "steps"}
            onToggle={() =>
              setOpenSection(openSection === "steps" ? null : "steps")
            }
          />
          <SummarySection
            title="Common Mistakes"
            content={sessionData.summary.mistakes}
            isOpen={openSection === "mistakes"}
            onToggle={() =>
              setOpenSection(openSection === "mistakes" ? null : "mistakes")
            }
          />
        </div>

        <StartTestButton cost={3} onClick={handleTestStart} />
      </div>
    </div>
  );
}
