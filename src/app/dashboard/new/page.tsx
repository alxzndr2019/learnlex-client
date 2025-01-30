"use client";

import { useState } from "react";
import Image from "next/image";

const StepIndicator = ({ currentStep }: { currentStep: number }) => {
  const steps = ["Add Video", "Generate Content", "Review & Save"];

  return (
    <div className="flex justify-center mb-12">
      <div className="flex items-center space-x-4">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index + 1 === currentStep
                    ? "bg-[#8811f0] text-white"
                    : index + 1 < currentStep
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {index + 1 < currentStep ? (
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <span
                className={`text-sm mt-2 ${
                  index + 1 === currentStep
                    ? "text-[#8811f0] font-medium"
                    : "text-gray-500"
                }`}
              >
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-20 h-[2px] ${
                  index + 1 < currentStep ? "bg-green-500" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const YoutubeEmbedPreview = ({ url }: { url: string }) => {
  if (!url) return null;

  // Extract video ID from URL
  const videoId = url.match(
    /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([\w-]{11})/
  )?.[1];

  if (!videoId) return null;

  return (
    <div className="aspect-video w-full max-w-3xl mx-auto mb-8 rounded-xl overflow-hidden shadow-lg">
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="border-0"
      />
    </div>
  );
};

const ExampleCard = ({
  thumbnail,
  title,
}: {
  thumbnail: string;
  title: string;
}) => (
  <div className="flex-none w-72 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer">
    <div className="relative aspect-video">
      <Image src={thumbnail} alt={title} fill className="object-cover" />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
        <button
          className="bg-white/90 p-3 rounded-full"
          aria-label="Play example video"
        >
          <svg
            className="w-6 h-6 text-[#8811f0]"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
          </svg>
        </button>
      </div>
    </div>
    <div className="p-4">
      <h3 className="font-medium text-gray-900">{title}</h3>
    </div>
  </div>
);

export default function NewSession() {
  const [url, setUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Add your processing logic here
    setTimeout(() => {
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StepIndicator currentStep={1} />

        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto mb-16">
          <YoutubeEmbedPreview url={url} />

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </div>
              <input
                type="url"
                placeholder="Paste YouTube URL..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-[#8811f0] focus:ring-2 focus:ring-[#8811f0]/20 outline-none transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={isProcessing || !url}
              className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center min-w-[160px] ${
                isProcessing || !url
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-[#8811f0] text-white hover:bg-[#7700d6]"
              }`}
            >
              {isProcessing ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Analyzing...
                </>
              ) : (
                "Generate Lesson"
              )}
            </button>
          </div>
        </form>

        <div>
          <h2 className="text-lg font-bold mb-6">Popular Examples</h2>
          <div className="flex gap-6 overflow-x-auto pb-6">
            <ExampleCard
              thumbnail="/example-thumbnail.jpeg"
              title="React Hooks Explained"
            />
            <ExampleCard
              thumbnail="/example-thumbnail.jpeg"
              title="Advanced CSS Techniques"
            />
            <ExampleCard
              thumbnail="/example-thumbnail.jpeg"
              title="JavaScript ES6 Features"
            />
            <ExampleCard
              thumbnail="/example-thumbnail.jpeg"
              title="TypeScript Fundamentals"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
