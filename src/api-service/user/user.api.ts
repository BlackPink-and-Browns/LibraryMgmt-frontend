import baseApi from "../api";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser:builder.query({
      query: () => ({
        url: "/employees",
        method: "GET",
      }),
      providesTags: ["BORROW"],
    }),

    getUserBorrowHistoryByAdmin:builder.query({
      query:(id)=>({
        url: `/employees/profile/admin/${id}`,
        method: "GET",
      })
    }),

    getUserBorrowHistory: builder.query({
      query: () => ({
        url: "/employees/profile",
        method: "GET",
      }),
      providesTags: ["BORROW"],
    }),
    
  }),
});

export const {
  useGetAllUserQuery,
  useGetUserBorrowHistoryQuery,
<<<<<<< Updated upstream
  useGetUserRequestsQuery,
  useRemoveRequestMutation,
  useGetUserBorrowHistoryByAdminQuery
=======
>>>>>>> Stashed changes
} = userApi;

