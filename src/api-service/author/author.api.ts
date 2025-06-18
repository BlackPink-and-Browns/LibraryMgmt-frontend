import baseApi from "../api";

const authorApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getAuthorDetails : builder.query({
            query: (id) => ({
                url : `/authors/${id}`,
                method : 'GET'
            }),
            providesTags : ['BOOKS', 'AUTHORS']        
        }),
    }),
});

export const { useGetAuthorDetailsQuery } = authorApi;