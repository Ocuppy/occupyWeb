import { baseApiSlice } from "../baseApiSlice";

export const superMarketApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEstates: builder.query({
      query: () => ({
        url: "/admin/estates",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetEstatesQuery } = superMarketApiSlice;
