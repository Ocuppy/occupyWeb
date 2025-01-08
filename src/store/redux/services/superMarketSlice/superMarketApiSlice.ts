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
    }),

    addProduct: builder.mutation({
      query: ({ supermarket_id, category, ...body }) => {
        const formData = new FormData();

        // Append supermarket_id
        formData.append("supermarket_id", supermarket_id);

        if (category) {
          // Choose one of these based on your exact data structure:
          formData.append("category", category.value); // If it's an object with value
          // OR
          formData.append("category", category); // If it's a direct ID
        }

        // Append other fields
        Object.keys(body).forEach((key) => {
          if (key === "product_image" && body[key] instanceof File) {
            formData.append("product_image", body[key]);
          } else {
            formData.append(key, body[key]);
          }
        });

        return {
          url: `/store/supermarkets/${supermarket_id}/add-products`,
          method: "POST",
          body: formData,
          // Remove Content-Type header to let browser set it automatically
          headers: {
            // Optionally, you might need to explicitly set this
            // 'Content-Type': 'multipart/form-data'
          },
        };
      },
    }),

    deleteProduct: builder.mutation({
      query: ({ product_id }) => {
        const formData = new FormData();

        // Append product_id
        formData.append("id", product_id);

        return {
          url: `/store/destroy-product/${product_id}/`,
          method: "DELETE",
        }
      }
    }),

    getProducts: builder.query({
      query: ({ supermarket_id, params = {} }) => {
        const queryString = new URLSearchParams(params).toString();
        return {
          url: `/store/customers/${supermarket_id}/products${queryString ? `?${queryString}` : ""}`,
          method: "GET",
        };
      },
      // Add data transformation to handle the response
    }),
  }),
});

export const {
  useGetEstatesQuery,
  useGetCategoriesQuery,
  useGetUserSupermarketsQuery,
  useAddSupermarketMutation,
  useAddProductMutation,
  useGetProductsQuery,
  useDeleteProductMutation,
} = superMarketApiSlice;
