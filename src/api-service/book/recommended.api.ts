import baseApi from "../api";

const recommendedApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getRecommended: builder.query({
            query: () => '/books/recommended',
            providesTags: ['REQUEST'],
        }),
    }),
})

export const {useGetRecommendedQuery}= recommendedApi;