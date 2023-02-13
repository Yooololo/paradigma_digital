import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const allOrigins = "https://api.allorigins.win/raw?url=";
const baseUrl = "https://itunes.apple.com/";

const apiSlice = createApi({
  reducerPath: "podcastsStore",
  baseQuery: fetchBaseQuery({
    baseUrl: "",
  }),
  keepUnusedDataFor: 86400,
  endpoints: (builder) => ({
    getTopNPodcasts: builder.query({
      query: (maxResults: number = 100) =>
        `${baseUrl}us/rss/toppodcasts/limit=${maxResults}/genre=1310/json`,
    }),
    getPodcastDetail: builder.query({
      query: (podcastId: string) => ({
        url: `${allOrigins}${baseUrl}lookup?id=${podcastId}`,
      }),
    }),
    getEpisodeList: builder.query({
      query: (podcastId: string) => ({
        url: `${baseUrl}lookup?id=${podcastId}&entity=podcastEpisode`,
      }),
    }),
  }),
});

export const {
  useGetTopNPodcastsQuery,
  useGetPodcastDetailQuery,
  useGetEpisodeListQuery,
} = apiSlice;

export default apiSlice;
