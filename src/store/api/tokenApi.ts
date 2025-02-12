import { baseApi } from "./baseApi";
import { toast } from "@/hooks/use-toast";

interface TokenBalance {
  balance: number;
  usage: Array<{
    date: Date;
    amount: number;
    action: string;
  }>;
}

interface PurchaseTokensRequest {
  amount: number;
  paymentMethodId: string;
}

interface PurchaseTokensResponse {
  success: boolean;
  newBalance: number;
  transactionId: string;
}

export const tokenApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBalance: builder.query<TokenBalance, void>({
      query: () => "tokens/balance",
      providesTags: ["Token"],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.balance < 5) {
            toast({
              title: "Low Token Balance",
              description: `You have ${data.balance} tokens remaining. Consider purchasing more.`,
              variant: "destructive",
            });
          }
        } catch (error: any) {
          toast({
            title: "Error",
            description:
              error.error?.data?.error || "Failed to fetch token balance",
            variant: "destructive",
          });
        }
      },
    }),

    purchaseTokens: builder.mutation<
      PurchaseTokensResponse,
      PurchaseTokensRequest
    >({
      query: (body) => ({
        url: "tokens/purchase",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Token", "User"],
      async onQueryStarted({ amount }, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          toast({
            title: "Purchase Successful",
            description: `Successfully purchased ${amount} tokens. New balance: ${data.newBalance} tokens`,
            variant: "default",
          });
        } catch (error: any) {
          toast({
            title: "Purchase Failed",
            description:
              error.error?.data?.error || "Failed to purchase tokens",
            variant: "destructive",
          });
        }
      },
    }),
  }),
  overrideExisting: false,
});
