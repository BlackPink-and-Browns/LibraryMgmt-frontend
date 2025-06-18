import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://librarymanagement-backend-f008.onrender.com",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token")
       
            if(token) {
                headers.set("Authorization",`Bearer ${token}`)
            }
            return headers
        }
    }),
    refetchOnMountOrArgChange: true,
    refetchOnReconnect:true,
    endpoints: () => ({}),
    tagTypes: ['BOOKS','AUTHORS','DEPARTMENTS', 'REVIEWS']
})

export default baseApi