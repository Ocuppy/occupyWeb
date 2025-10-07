import { baseApiSlice } from "../baseApiSlice";

interface Supermarket {
  id: string;
  is_online: boolean;
}

export const superMarketApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateSupermarketStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/store/supermarkets/online-offline-switch/${id}/`,
        method: 'PATCH',
        body: { is_online: status },
      }),
      // Optional: Add optimistic update logic
      async onQueryStarted({ id, status }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          superMarketApiSlice.util.updateQueryData(
            'getUserSupermarkets',
            undefined,
            (draft: Supermarket[]) => {
              const supermarket = draft.find(s => s.id === id);
              if (supermarket) {
                supermarket.is_online = status;
              }
            })
          );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

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

    editProduct: builder.mutation({
      query: ({ product_id, ...body }) => {
        const formData = new FormData();

        // formData.append("id", product_id);

        Object.keys(body).forEach((key) => {
          if (key === "product_image" && body[key] instanceof File) {
            formData.append("product_image", body[key]);
          } else {
            formData.append(key, body[key]);
          }
        });

        return {
          url: `/store/edit-product/${product_id}/`,
          method: "PATCH",
          body: formData,
          headers: {}  
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
        };
      },
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

    getProductDetail: builder.query({
      query: ({ productId }) => {
        return {
          url: `/store/customers/supermarketproducts/${productId}/`,
          method: "GET",
        };
      },
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
  useEditProductMutation,
  useGetProductDetailQuery,
  useUpdateSupermarketStatusMutation,
} = superMarketApiSlice;
