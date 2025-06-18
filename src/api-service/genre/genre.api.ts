import baseApi from "../api";

const genreApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getGenreDetails : builder.query({
            query: (id) => ({
                url : `/genres/${id}`,
                method : 'GET'
            }),
            providesTags : ['GENRES']        
        }),
        getAllGenre:builder.query({
            query:()=>({
                url:"/genres",
                method:'GET'
            }),providesTags : ['GENRES']      
        }),
        createGenre:builder.mutation({
            query:(payload)=>({
                url:'/genres',
                method:'POST',
                body:payload
            }),
            invalidatesTags:['GENRES']
        })
    }),
});

export const { useGetAllGenreQuery,useCreateGenreMutation ,useGetGenreDetailsQuery} = genreApi;