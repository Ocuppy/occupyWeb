import { baseApiSlice } from "../baseApiSlice";

export const superMarketApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEstates: builder.query({
      query: () => ({
        url: "/admin/estates",
        method: "GET",
      }),
    }),
    getCategories: builder.query({
      query: () => ({
        url: "/admin/list-categories",
        method: "GET",
      }),
    }),
    addSupermarket: builder.mutation({
      query: (data) => ({
        url: `/store/supermarket/`,
        method: "POST",
        body: data,
      }),
    }),
    getUserSupermarkets: builder.query({
      query: (params) => {
        const queryString = new URLSearchParams(params).toString(); // Convert params to query string
        return {
          url: `/store/my-supermarkets/?${queryString}`,
          method: "GET",
        };
      },
      // Optionally, you can keep the transformResponse if needed
      // transformResponse: (response: { data: any }) => {
      //   return response.data || [];
      // },
    }),

    // getUserSupermarkets: builder.query({
    //   query: (data) => ({
    //     url: `/store/my-supermarkets/`,
    //     method: "GET",
    //     body: data,
    //   }),
    //   // console.log("data", data);
    //   // Optionally, you can keep the transform response
    //   // transformResponse: (response: { data: any }) => {
    //   //   console.log("response", response.data);
    //   //   return response.data || [];
    //   // },
    // }),
    // getUserSupermarkets: builder.query({
    //   query: (data) => ({
    //     url: `/store/supermarket/my-supermarkets/`,
    //     method: "GET",
    //     body: data,
    //   }),
    //   // Optional: Transform the response if needed
    //   transformResponse: (response: { data: any }) => {
    //     // If you want to do any data transformation before returning
    //     return response.data || [];
    //   },
    // }),
  }),
});

export const {
  useGetEstatesQuery,
  useGetCategoriesQuery,
  useGetUserSupermarketsQuery,
  useAddSupermarketMutation,
} = superMarketApiSlice;
