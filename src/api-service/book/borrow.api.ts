import baseApi from "../api";
import type { IfOverdueResponse } from "./types";

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

        ifOverdue: builder.query<IfOverdueResponse, void>({
            query: () => ({
                url: `books/overdue/check/`,
                method: "GET",
            }),
        }), 
        getBorrowStatusList : builder.query({
            query : () => 'borrows/books?status=BORROWED',
            providesTags : ['BORROW']
        })
    }),
});

export const { useCreateBorrowMutation, useGetBorrowStatusListQuery ,useGetAllBorrowsQuery} = BorrowApi
