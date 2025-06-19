import baseApi from "../api";

const borrowApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBorrowList: builder.query({
      query: () => ({
        url: "/borrows/books",
        method: "GET",
      }),
      providesTags: ["BORROWLIST"],
    }),
   
    
  }),
});

export const {
  useGetBorrowListQuery
} = borrowApi;

