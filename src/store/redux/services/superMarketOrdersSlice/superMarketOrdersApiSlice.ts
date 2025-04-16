import { baseApiSlice } from "../baseApiSlice";

export const superMarketOrdersApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (build) => ({
    getSuperMarketOrders: build.query({
      query: ({ supermarket_id, params = {} }) => {
        return {
          url: `/store/supermarkets/${supermarket_id}/received-orders`,
          method: "GET",
        };
      },
    }),
    acceptOrder: build.mutation({
      query: ({ order_id }) => ({
        url: `/store/accept-customer-order/${order_id}/`,
        method: "PUT",
      }),
    }),
  }),
});

export const { useGetSuperMarketOrdersQuery, useAcceptOrderMutation } =
  superMarketOrdersApiSlice;
