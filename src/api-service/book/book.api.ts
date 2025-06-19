import baseApi from "../api";

export const BookApi =  baseApi.injectEndpoints({
    endpoints : (builder) => ({

        //because it is querying and keeping the responses as cached, we do not need to specify the response type
        getBooksList: builder.query({
            query: () => '/books', //default method is get, thus not specified
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
                //in backend, the route is /employees with POST
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