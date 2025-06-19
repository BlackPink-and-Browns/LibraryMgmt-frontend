import baseApi from "../api";

export const BorrowApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getAllBorrows: builder.query({
            query: () => ({
                url: `borrows/all/borrowed`,
                method: "GET",
            }),
            providesTags : ['BORROW']
        }),
        
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

export const { useCreateBorrowMutation, useIfOverdueQuery ,useGetAllBorrowsQuery} = BorrowApi