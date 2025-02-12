"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Section from "../../_components/Section";
import { sessionApi } from "../../../../store/api/sessionApi";
import dynamic from "next/dynamic";
import type { YouTubeProps, YouTubeEvent, YouTubePlayer } from "react-youtube";

// Dynamically import YouTube component with no SSR
const YouTube = dynamic<YouTubeProps>(
  () => import("react-youtube").then((mod) => mod.default),
  { ssr: false }
);

const VideoPlayer = ({
  videoId,
  title,
  onProgress,
}: {
  videoId: string;
  title: string;
  onProgress: (progress: number) => void;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [player, setPlayer] = useState<YouTubePlayer | null>(null);

  const opts = {
    height: "500",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  // Use requestAnimationFrame for smoother progress updates
  const updateProgress = () => {
    if (isPlaying && player) {
      const duration = player.getDuration();
      const currentTime = player.getCurrentTime();
      const progress = (currentTime / duration) * 100;
      onProgress(progress);

      if (isPlaying) {
        requestAnimationFrame(updateProgress);
      }
    }
  };

  const handleStateChange = (event: YouTubeEvent) => {
    const newIsPlaying = event.data === 1; // YouTube.PlayerState.PLAYING
    setIsPlaying(newIsPlaying);

    if (newIsPlaying) {
      requestAnimationFrame(updateProgress);
    }
  };

  const handleReady = (event: { target: YouTubePlayer }) => {
    setPlayer(event.target);
  };

  return (
    <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
      <YouTube
        videoId={videoId}
        opts={opts}
        onStateChange={handleStateChange}
        onReady={handleReady}
        className="w-full"
        title={title}
      />
    </div>
  );
};

const VideoMetadata = ({
  thumbnail,
  title,
  channel,
  videoId,
  onProgress,
}: {
  thumbnail: string;
  title: string;
  channel: string;
  videoId: string;
  onProgress: (progress: number) => void;
}) => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <Section className="mb-8">
      {showVideo ? (
        <VideoPlayer videoId={videoId} title={title} onProgress={onProgress} />
      ) : (
        <div className="relative aspect-video rounded-lg overflow-hidden">
          <Image src={thumbnail} alt={title} fill className="object-cover" />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <button
              className="bg-white/90 p-4 rounded-full"
              aria-label="Play video"
              onClick={() => setShowVideo(true)}
            >
              <svg
                className="w-8 h-8 text-[#ff6b00]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            </button>
          </div>
        </div>
      )}
      <div className="mt-4">
        <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
        <div className="flex items-center gap-2 text-white/70">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
            <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
          </svg>
          <span>{channel}</span>
        </div>
      </div>
    </Section>
  );
};

export default function LearningSession() {
  const params = useParams();
  const router = useRouter();
  const [isStartingTest, setIsStartingTest] = useState(false);

  const { data: session, isLoading } = sessionApi.useGetSessionQuery(
    params.id as string
  );

  const [updateProgress] = sessionApi.useUpdateProgressMutation();
  const [startTest] = sessionApi.useStartTestMutation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff6b00]"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-white mb-2">
          Session not found
        </h2>
        <p className="text-white/70 mb-4">
          The session you&apos;re looking for doesn&apos;t exist or you
          don&apos;t have access to it.
        </p>
        <button
          onClick={() => router.push("/dashboard")}
          className="text-[#ff6b00] hover:text-[#ff6b00]/80"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const handleProgress = async (progress: number) => {
    try {
      await updateProgress({
        sessionId: session.id,
        progress: Math.round(progress),
      }).unwrap();
    } catch (error) {
      console.error("Failed to update progress:", error);
    }
  };

  const handleTestStart = async () => {
    setIsStartingTest(true);
    try {
      await startTest(session.id).unwrap();
      router.push(`/dashboard/session/${session.id}/test`);
    } catch (error) {
      console.error("Failed to start test:", error);
      setIsStartingTest(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <VideoMetadata
        thumbnail={session.thumbnailUrl}
        title={session.title}
        channel={session.channelTitle}
        videoId={session.videoId}
        onProgress={handleProgress}
      />

      <div className="grid gap-8">
        <Section>
          <h2 className="text-xl font-semibold text-white mb-4">Summary</h2>
          <p className="text-white/70 whitespace-pre-wrap">{session.summary}</p>
        </Section>

        <Section>
          <h2 className="text-xl font-semibold text-white mb-4">Key Points</h2>
          <ul className="list-disc list-inside space-y-2 text-white/70">
            {session.keyPoints?.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </Section>

        <Section>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">
              Test Your Knowledge
            </h2>
            <button
              onClick={handleTestStart}
              disabled={isStartingTest}
              className="px-4 py-2 bg-[#ff6b00] text-white rounded-lg hover:bg-[#ff6b00]/80 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isStartingTest ? "Starting Test..." : "Start Test"}
            </button>
          </div>
        </Section>
      </div>
    </div>
  );
}
