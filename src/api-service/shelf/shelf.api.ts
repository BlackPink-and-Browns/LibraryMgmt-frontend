import baseApi from "../api";


export const ShelfApi =  baseApi.injectEndpoints({
    endpoints : (builder) => ({

        getShelfList:builder.query({
            query:()=>'/shelves',
            providesTags:['SHELFS']

        }),

        getShelfDetails : builder.query({
            
            query: (id) => ({
                url : `/shelves/${id}`,
                method : 'GET'
            }),
            providesTags : ['SHELFS']        
        }),
        getShelfCount:builder.query({
            query: () => ({
                url : `/shelves/count`,
                method : 'GET'
            }),
            providesTags : ['SHELFS']
        }),
        createShelf:builder.mutation({
                query : (payload) => ({
                url : '/shelves',
                method : 'POST',
                body : payload
            }),
            invalidatesTags:['SHELFS']
        }),
        
    })
})

export const { useGetShelfListQuery,useGetShelfCountQuery,useGetShelfDetailsQuery,useCreateShelfMutation
} = ShelfApi