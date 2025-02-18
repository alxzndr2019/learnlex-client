import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "@/hooks/use-toast";

// const BASE_URL = "http://localhost:4444/api";
const BASE_URL = "/api"; // Use relative path instead of full URL

const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      // The token will be automatically included in requests
      // when using cookies, so we don't need to manually set it
      return headers;
    },
    credentials: "include", // This is important to include cookies in requests
  }),
  endpoints: () => ({}),
  tagTypes: ["User", "Session", "Token", "Test"],
});

// Add response/error handling to all endpoints
const enhancedBaseApi = baseApi.enhanceEndpoints({
  addTagTypes: ["User", "Session", "Token", "Test"],
  endpoints: {
    // Enhance mutations
    mutation: {
      async onQueryStarted(
        _: unknown,
        { queryFulfilled }: { queryFulfilled: Promise<unknown> }
      ) {
        try {
          await queryFulfilled;
          toast({
            title: "Success",
            description: "Operation completed successfully",
            variant: "default",
          });
        } catch (error: unknown) {
          const err = error as { error: { data: { error: string } } };
          toast({
            title: "Error",
            description: err.error?.data?.error || "An error occurred",
            variant: "destructive",
          });
        }
      },
    },
    // Enhance queries
    query: {
      async onQueryStarted(
        _: unknown,
        { queryFulfilled }: { queryFulfilled: Promise<unknown> }
      ) {
        try {
          await queryFulfilled;
        } catch (error: unknown) {
          const err = error as { error: { data: { error: string } } };
          toast({
            title: "Error",
            description: err.error?.data?.error || "Failed to fetch data",
            variant: "destructive",
          });
        }
      },
    },
  },
});

export { enhancedBaseApi as baseApi };
