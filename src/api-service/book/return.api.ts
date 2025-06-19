import baseApi from "../api";

const returnBookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    returnBook: builder.mutation({
      // Accepts { id, shelfId } as the argument
      query: ({ id, returned_shelf_no }) => ({
        url: `borrows/${id}`,
        method: 'PATCH',
        body: returned_shelf_no ? { returned_shelf_no } : 0,
      }),
      invalidatesTags: ['RETURN'],
    }),
  }),
});

export const { useReturnBookMutation } = returnBookApi;
