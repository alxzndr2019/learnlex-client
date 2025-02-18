import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Session {
  id: string;
  title: string;
  thumbnailUrl: string;
  channelTitle: string;
  videoId: string;
  progress: number;
  lastAccessed: string;
  summary: string;
  keyPoints: string[];
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

export const sessionApi = createApi({
  reducerPath: "sessionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4444/api/videos",
    credentials: "include",
  }),
  tagTypes: ["Session", "Sessions"],
  endpoints: (builder) => ({
    getUserSessions: builder.query<{ sessions: Session[] }, void>({
      query: () => "/user/sessions",
      providesTags: ["Sessions"],
      keepUnusedDataFor: 300, // Cache for 5 minutes
    }),
    getSession: builder.query<Session, string>({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Session", id }],
      keepUnusedDataFor: 300, // Cache for 5 minutes
    }),
    processVideo: builder.mutation<Session, { url: string }>({
      query: (body) => ({
        url: "sessions",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Sessions"],
    }),
    updateProgress: builder.mutation<
      void,
      { sessionId: string; progress: number }
    >({
      query: ({ sessionId, progress }) => ({
        url: `sessions/${sessionId}/progress`,
        method: "PUT",
        body: { progress },
      }),
      invalidatesTags: (result, error, { sessionId }) => [
        { type: "Session", id: sessionId },
        "Sessions",
      ],
      // Optimistic update
      async onQueryStarted(
        { sessionId, progress },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          sessionApi.util.updateQueryData("getSession", sessionId, (draft) => {
            if (draft) {
              draft.progress = progress;
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    startTest: builder.mutation<void, string>({
      query: (sessionId) => ({
        url: `sessions/${sessionId}/test`,
        method: "POST",
      }),
      invalidatesTags: (result, error, sessionId) => [
        { type: "Session", id: sessionId },
      ],
    }),
    submitAnswer: builder.mutation<
      { correct: boolean },
      { sessionId: string; body: { questionId: string; answer: number } }
    >({
      query: ({ sessionId, body }) => ({
        url: `sessions/${sessionId}/answer`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, { sessionId }) => [
        { type: "Session", id: sessionId },
      ],
    }),
  }),
});
