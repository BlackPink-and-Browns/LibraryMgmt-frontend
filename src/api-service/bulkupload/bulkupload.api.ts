import baseApi from "../api";

const bulkApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTemplate: builder.query<Blob, void>({
      query: () => ({
        url: "/books/bulk",
        method: "GET",
        responseHandler: (response) => response.blob(), // important!
        responseType: 'blob' as const,
      }),
      providesTags: ["BORROWLIST"],
    }),
  }),
});

export const {
  useGetTemplateQuery,
} = bulkApi;
