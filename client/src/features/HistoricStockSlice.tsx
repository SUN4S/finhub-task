import { HistoricStockFetchState, HistoricStockState } from "../models/stocks";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { stocksApi } from "../services/stocks";

// Redux Toolkit created General Stock Data slice
// extraReducers: request that was handled by the api sets the state here
export const historicStockSlice = createSlice({
  name: "historicStock",
  initialState: {
    data: {},
    isLoading: false,
    isSuccess: false,
  } as HistoricStockFetchState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      // Function to add response data to store loading/success state
      stocksApi.endpoints.stockData.matchPending,
      (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      }
    );
    builder.addMatcher(
      // Function to add response data to store loading/success state
      stocksApi.endpoints.stockData.matchRejected,
      (state) => {
        state.isLoading = false;
        state.isSuccess = false;
      }
    );
    builder.addMatcher(
      // Function to add response data to store historic stock data
      stocksApi.endpoints.stockData.matchFulfilled,
      (state, action?: PayloadAction<HistoricStockState>) => {
        if (action?.payload) {
          state.data = action.payload;
          state.isLoading = false;
          state.isSuccess = true;
        }
      }
    );
    builder.addMatcher(
      // Function to add response data to store loading/success state
      stocksApi.endpoints.updateData.matchPending,
      (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      }
    );
    builder.addMatcher(
      // Function to add response data to store loading/success state
      stocksApi.endpoints.updateData.matchRejected,
      (state) => {
        state.isLoading = false;
        state.isSuccess = false;
      }
    );
    builder.addMatcher(
      // Function to add response data to store updated historic stock data
      stocksApi.endpoints.updateData.matchFulfilled,
      (state, action?: PayloadAction<HistoricStockState>) => {
        if (action?.payload) {
          state.data = action.payload;
          state.isLoading = false;
          state.isSuccess = true;
        }
      }
    );
  },
});

// Action creators are generated for each case reducer function
//export const {} = expenseSlice.actions;

export default historicStockSlice.reducer;
