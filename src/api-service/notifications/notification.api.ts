import baseApi from "../api";
import type { notification } from "./types";

const ReviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<notification[], { read?: string }>({
      query: ({ read = '' }) => `/notifications?read=${read}`,
      providesTags: ['NOTIFICATIONS'],
    }),

    markNotificationRead: builder.mutation<void, number>({
      query: (id) => ({
        url: `/notifications/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['NOTIFICATIONS'],
    }),
  })
});

export const {
  useGetNotificationsQuery,
  useMarkNotificationReadMutation,
} = ReviewApi;