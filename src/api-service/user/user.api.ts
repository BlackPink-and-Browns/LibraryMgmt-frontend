import baseApi from "../api";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserBorrowHistory: builder.query({
      query: () => ({
        url: "/employees/profile",
        method: "GET",
      }),
      providesTags: ["BORROW"],
    }),
    getUserRequests: builder.query({
      query: () => ({
        url: "requests/books",
        method: "GET",
      }),
      providesTags: ["REQUEST"],
    }),
    removeRequest: builder.mutation({
      query: (waitlistIds: number[] | null) => ({
        url: `/requests/books`,
        method: "PATCH",
        body: waitlistIds ? { waitlistIds } : null,
      }),
      invalidatesTags: ["REQUEST"], 
    }),
  }),
});

export const {
  useGetUserBorrowHistoryQuery,
  useGetUserRequestsQuery,
  useRemoveRequestMutation,
} = userApi;

