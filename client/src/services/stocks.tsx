import { StockDataModel } from "../models/stocks";
import { baseApi } from "./baseApi";

// Inject a new budgetApi into the baseApi
export const stocksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    search: builder.query({
      query: (query: string) => ({
        url: `/stocks/query/${query}`,
        method: "GET",
      }),
      providesTags: ["Stocks"],
    }),
    stockData: builder.query({
      query: (symbol: string) => ({
        url: `/stocks/getData/${symbol}`,
        method: "GET",
      }),
      providesTags: ["Stocks"],
    }),
    updateData: builder.mutation({
      query: (updateData: StockDataModel) => ({
        url: `/stocks/updateData`,
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        data: updateData,
      }),
      invalidatesTags: ["Stocks"],
    }),
  }),
});

export const { useStockDataQuery, useLazySearchQuery, useUpdateDataMutation } =
  stocksApi;
