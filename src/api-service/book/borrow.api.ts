import baseApi from "../api";
import type { IfOverdueResponse } from "./types";

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

        ifOverdue: builder.query<IfOverdueResponse, void>({
            query: () => ({
                url: `books/overdue/check/`,
                method: "GET",
            }),
            providesTags : ['BORROW']
        }),
    }),
});

export const { useCreateBorrowMutation, useIfOverdueQuery } = BorrowApi