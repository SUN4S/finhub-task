import { GeneralStockFetchState, GeneralStockState } from "../models/stocks";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { stocksApi } from "../services/stocks";

// Redux Toolkit created General Stock Data slice
// extraReducers: request that was handled by the api sets the state here
export const generalStockSlice = createSlice({
  name: "generalStock",
  initialState: {
    data: {},
    isLoading: false,
    isSuccess: false,
  } as GeneralStockFetchState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      // Function to add response data to store loading/success state
      stocksApi.endpoints.search.matchPending,
      (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      }
    );
    builder.addMatcher(
      // Function to add response data to store loading/success state
      stocksApi.endpoints.search.matchRejected,
      (state) => {
        state.isLoading = false;
        state.isSuccess = false;
      }
    );
    builder.addMatcher(
      // Function to add response data to store general stock data
      stocksApi.endpoints.search.matchFulfilled,
      (state, action?: PayloadAction<GeneralStockState>) => {
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

export default generalStockSlice.reducer;
