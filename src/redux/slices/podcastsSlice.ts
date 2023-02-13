import { createSlice } from "@reduxjs/toolkit";
import apiSlice from "../api/apiSlice";

const initialState = {
  podcasts: [],
};
export const podcastsSlice = createSlice({
  name: "podcasts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addMatcher(
      apiSlice.endpoints.getTopNPodcasts.matchFulfilled,
      (state, { payload }) => (state.podcasts = payload)
    );
  },
});

export default podcastsSlice.reducer;
