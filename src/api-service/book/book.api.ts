import baseApi from "../api";

export const BookApi =  baseApi.injectEndpoints({
    endpoints : (builder) => ({
        getBooksList: builder.query({
            query: () => '/books', 
            providesTags : ['BOOKS']
        }),
        getBookDetails : builder.query({
            
            query: (id) => ({
                url : `/books/${id}`,
                method : 'GET'
            }),
            providesTags : ['BOOKS']        
        }),
        createBook : builder.mutation({
            query : (payload) => ({
                url : '/books',
                method : 'POST',
                body : payload
            }),
            invalidatesTags:['BOOKS']
        }),
        editBook : builder.mutation({
            query : ({id, payload}) => ({
                url : `/books/${id}`,
                method : 'PATCH',
                body : payload
            }),
            invalidatesTags:['BOOKS']
        }),

        deleteBook : builder.mutation({
            query: (id) => ({
                url : `/books/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags : ['BOOKS']
        })
    })
})

export const { useCreateBookMutation, 
    useDeleteBookMutation, 
    useEditBookMutation, 
    useGetBookDetailsQuery,
    useGetBooksListQuery
} = BookApi