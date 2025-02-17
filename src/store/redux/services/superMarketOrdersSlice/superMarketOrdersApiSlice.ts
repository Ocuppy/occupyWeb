import { baseApiSlice } from "../baseApiSlice";

export const superMarketOrdersApiSlice = baseApiSlice.injectEndpoints({
    endpoints: (build) => ({
        getSuperMarketOrders: build.query({
            query: (supermarketId) => {
                const queryString = new URLSearchParams(supermarketId).toString();
                return {
                    url: `/store/supermarkets/${queryString}/received-orders`,
                    method: "GET"
                }
            }
        })
    }),
});

export const {
    useGetSuperMarketOrdersQuery
} = superMarketOrdersApiSlice;