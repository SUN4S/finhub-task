import { SearchQueryProps } from "../models/stocks";
import { baseApi } from "./baseApi";

// Inject a new budgetApi into the baseApi
export const reportsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // query to get all weekly reports
    stockData: builder.query({
      query: (symbol: string) => ({
        url: `/stocks/getData/${symbol}`,
        method: "GET",
      }),
      providesTags: ["Stocks"],
    }),
    search: builder.mutation({
      query: (queryData: SearchQueryProps) => ({
        url: `/stocks/query`,
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        data: queryData,
      }),
      invalidatesTags: ["Stocks"],
    }),
  }),
});

export const { useLazyStockDataQuery, useSearchMutation } = reportsApi;
