import { createSlice } from "@reduxjs/toolkit";
import apiSlice from "../api/apiSlice";

export const episodeSlice = createSlice({
  name: "episode",
  initialState: {
    episodeList: [],
  },
  reducers: {},
  extraReducers(builder) {
    builder.addMatcher(
      apiSlice.endpoints.getEpisodeList.matchFulfilled,
      (state, { payload }) => (state.episodeList = payload)
    );
  },
});

export default episodeSlice.reducer;
