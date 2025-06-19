import baseApi from "../api";

const analyticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAnalytics: builder.query<any, void>({
      query: () => ({
        url: "/analytics",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAnalyticsQuery } = analyticsApi;
