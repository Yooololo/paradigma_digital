import { createSlice } from "@reduxjs/toolkit";
import apiSlice from "../api/apiSlice";

export const podcastSlice = createSlice({
  name: "podcast",
  initialState: {
    podcast: {},
  },
  reducers: {},
  extraReducers(builder) {
    builder.addMatcher(
      apiSlice.endpoints.getPodcastDetail.matchFulfilled,
      (state, { payload }) => (state.podcast = payload)
    );
  },
});

export default podcastSlice.reducer;
