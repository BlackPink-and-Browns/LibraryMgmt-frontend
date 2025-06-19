import baseApi from "../api";

const requestApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getRequests: builder.query({
            query: () => '/requests/books',
            providesTags: ['REQUEST'],
        }),
        
        removeRequest: builder.mutation({
            query: (waitlistIds: number[] | null) => ({
                url: '/requests/books',
                method: 'PATCH',
                body: waitlistIds ? { waitlistIds } : null,
            }),
            invalidatesTags: ['REQUEST'],
        }),
    }),
})

export const {useGetRequestsQuery,useRemoveRequestMutation}= requestApi;