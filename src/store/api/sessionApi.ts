import { baseApi } from "./baseApi";
import { toast } from "@/hooks/use-toast";

export interface Session {
  id: string;
  videoId: string;
  title: string;
  channelTitle: string;
  thumbnailUrl: string;
  duration: string;
  status: string;
  summary: string;
  keyPoints: string[];
  progress: number;
  lastAccessed: string;
}

interface ProcessVideoRequest {
  url: string;
}

interface TestQuestion {
  id: string;
  text: string;
  options: string[];
}

export const sessionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    processVideo: builder.mutation<Session, ProcessVideoRequest>({
      query: (body) => ({
        url: "videos",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Session"],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast({
            title: "Video Processing Started",
            description:
              "Your video is being processed. This may take a few minutes.",
            variant: "default",
          });
        } catch (error) {
          toast({
            title: "Processing Failed",
            description:
              error instanceof Error
                ? error.message
                : "Failed to process video",
            variant: "destructive",
          });
        }
      },
    }),

    getSession: builder.query<Session, string>({
      query: (id) => `/videos/${id}`,
    }),

    getUserSessions: builder.query<{ sessions: Session[] }, void>({
      query: () => `/videos/user/sessions`,
    }),

    updateProgress: builder.mutation<
      void,
      { sessionId: string; progress: number }
    >({
      query: ({ sessionId, progress }) => ({
        url: `/videos/${sessionId}/progress`,
        method: "POST",
        body: { progress },
      }),
    }),

    startTest: builder.mutation<
      { testId: string; questions: TestQuestion[] },
      string
    >({
      query: (sessionId) => ({
        url: `/videos/${sessionId}/test`,
        method: "POST",
      }),
    }),

    submitAnswer: builder.mutation<
      { correct: boolean; explanation: string },
      { questionId: string; answer: number }
    >({
      query: ({ questionId, answer }) => ({
        url: `/videos/${questionId}/test/answer`,
        method: "POST",
        body: { answer },
      }),
    }),

    getTestResults: builder.query<
      {
        score: number;
        totalQuestions: number;
        completedAt: string;
        answers: Array<{
          questionId: string;
          answer: number;
          isCorrect: boolean;
        }>;
      },
      string
    >({
      query: (sessionId) => `/videos/${sessionId}/test/results`,
    }),
  }),
  overrideExisting: false,
});
