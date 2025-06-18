import baseApi from "../api";

const ReviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReviewsByBookId: builder.query({
      query: (bookId) => `/reviews/books/${bookId}`,
      providesTags: ['REVIEWS'],
    }),

    getReviewsByUserId: builder.query({
      query: (userId) => `/reviews/users/${userId}`,
      providesTags: ['REVIEWS'],
    }),

    createReview: builder.mutation({
      query: (payload) => ({
        url: `/reviews`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['REVIEWS'],
    }),

    updateReview: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/reviews/${id}`,
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['REVIEWS'],
    }),

    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/reviews/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['REVIEWS'],
    }),
  }),
});

export const { useCreateReviewMutation,
    useDeleteReviewMutation,
    useGetReviewsByBookIdQuery,
    useUpdateReviewMutation,
    useGetReviewsByUserIdQuery,
} = ReviewApi