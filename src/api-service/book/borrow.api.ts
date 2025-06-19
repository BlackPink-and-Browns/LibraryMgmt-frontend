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

        getBorrowStatusList : builder.query({
            query : () => 'borrows/books?status=BORROWED',
            providesTags : ['BORROW']
        })
    }),
});

export const { useCreateBorrowMutation, useGetBorrowStatusListQuery } = BorrowApi
