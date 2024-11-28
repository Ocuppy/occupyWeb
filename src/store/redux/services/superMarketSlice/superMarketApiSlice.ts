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
  }),
});

export const {
  useGetEstatesQuery,
  useGetCategoriesQuery,
  useAddSupermarketMutation,
} = superMarketApiSlice;
