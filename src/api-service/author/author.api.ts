import baseApi from "../api";

const authorApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getAuthorDetails : builder.query({
            query: (id) => ({
                url : `/author/${id}`,
                method : 'GET'
            }),
            providesTags : ['BOOKS', 'AUTHORS']        
        }),
        getAllAuthors:builder.query({
            query:()=>({
                url:"/author",
                method:'GET'
            }),
            providesTags : ['BOOKS', 'AUTHORS']  
        }),
        createAuthor:builder.mutation({
            query:(payload)=>({
                url:'/author',
                method:'POST',
                body:payload
            }),
            invalidatesTags:['AUTHORS']
        })
    }),
});

export const { useGetAuthorDetailsQuery,useCreateAuthorMutation,useGetAllAuthorsQuery } = authorApi;