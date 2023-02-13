import { configureStore } from "@reduxjs/toolkit";
import podcastsReducer from "./slices/podcastsSlice";
import podcastReducer from "./slices/podcastSlice";
import episodeReducer from "./slices/episodeSlice";
import apiSlice from "./api/apiSlice";

export const createStore = () =>
  configureStore({
    reducer: {
      podcasts: podcastsReducer,
      podcast: podcastReducer,
      episode: episodeReducer,
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  });

export const store = createStore();
