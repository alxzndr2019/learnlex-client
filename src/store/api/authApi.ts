import { baseApi } from "./baseApi";
import { toast } from "@/hooks/use-toast";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface User {
  id: string;
  email: string;
  name: string;
  picture: string;
  tokens: number;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUser: builder.query<User, void>({
      query: () => "auth/me",
      providesTags: ["User"],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          toast({
            title: "Welcome Back!",
            description: `Logged in as ${data.name}`,
            variant: "default",
          });
        } catch (error: unknown) {
          const err = error as FetchBaseQueryError;
          toast({
            title: "Authentication Error",
            description:
              (err.data as { error: string })?.error ||
              "Failed to get user information",
            variant: "destructive",
          });
        }
      },
    }),
  }),
  overrideExisting: false,
});
