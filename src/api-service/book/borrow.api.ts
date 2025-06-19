import baseApi from "../api";

export const BorrowApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createBorrow: builder.mutation({
            query: (data) => ({
                url: `borrows`,
                method: "POST",
                body: data,
            }),
            invalidatesTags : ['BORROW']
        }),

        ifOverdue: builder.query({
            query: (id) => ({
                url: `books/overdue/check/${id}`,
                method: "GET",
            }),
            providesTags : ['BORROW']
        }),
    }),
});

export const { useCreateBorrowMutation, useIfOverdueQuery } = BorrowApi