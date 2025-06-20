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
        getAllAuthors:builder.query({
            query:()=>({
                url:"/authors",
                method:'GET'
            }),
            providesTags : ['BOOKS', 'AUTHORS']  
        }),
        createAuthor:builder.mutation({
            query:(payload)=>({
                url:'/authors',
                method:'POST',
                body:payload
            }),
            invalidatesTags:['AUTHORS','BOOKS']
        })
    }),
});

export const { useGetAuthorDetailsQuery,useCreateAuthorMutation,useGetAllAuthorsQuery } = authorApi;