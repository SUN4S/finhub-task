import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface FirstLoadState {
  firstLoad: boolean;
}

// Redux Toolkit created load tracker
// extraReducers: request that was handled by the api sets the state here
export const firstLoadSlice = createSlice({
  name: "firstLoad",
  initialState: {
    firstLoad: true,
  } as FirstLoadState,
  reducers: {
    toggleFirst: (
      state: FirstLoadState,
      action?: PayloadAction<{ loaded: boolean }>
    ) => {
      state.firstLoad = action!.payload.loaded;
    },
  },
  extraReducers: () => {},
});

// Action creators are generated for each case reducer function
export const { toggleFirst } = firstLoadSlice.actions;

export default firstLoadSlice.reducer;
