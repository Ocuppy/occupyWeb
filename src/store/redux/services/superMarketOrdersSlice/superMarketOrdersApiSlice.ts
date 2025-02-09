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
    }),
});

export const {
    useGetSuperMarketOrdersQuery
} = superMarketOrdersApiSlice;