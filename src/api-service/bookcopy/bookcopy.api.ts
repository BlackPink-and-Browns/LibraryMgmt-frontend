import baseApi from "../api";

export const BookCopyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getBooksCopyList: builder.query({
      query: (id) => `/books/copies/${id}`,
      providesTags: ['BOOKSCOPIES'],
    }),

    createBookCopy: builder.mutation({
      query: (payload) => ({
        url: '/books/copies',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['BOOKSCOPIES'],
    }),

    editBookCopy: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/books/copies/${id}`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['BOOKSCOPIES'],
    }),

    deleteBookCopy: builder.mutation({
      query: (id) => ({
        url: `/books/copies/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['BOOKSCOPIES'],
    }),

  }),
});

export const {
  useGetBooksCopyListQuery,
  useCreateBookCopyMutation,
  useEditBookCopyMutation,
  useDeleteBookCopyMutation,
} = BookCopyApi;
