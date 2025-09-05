// import { baseApiSlice } from "../baseApiSlice";

// const myHeaders = new Headers();
// myHeaders.append("Accept", "application/json");
// myHeaders.append("Content-Type", "application/json");

// const profileApiSlice = baseApiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     getSupermarketProfile: builder.query({
//       query: (id) => ({
//         headers: myHeaders,
//         url: `/accounts/account/user/${id}`,
//         method: "GET",
//       }),
//     }),
//     updateBuyerAccount: builder.mutation({
//       query: (data) => ({
//         headers: myHeaders,
//         url: "/buyer/update-profile",
//         body: data,
//         method: "POST",
//       }),
//     }),

//   }),
// });

// export const { useGetSupermarketProfileQuery, useUpdateBuyerAccountMutation } =
//   profileApiSlice;

import { baseApiSlice } from "../baseApiSlice";

const myHeaders = new Headers();
myHeaders.append("Accept", "application/json");
myHeaders.append("Content-Type", "application/json");

const profileApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSupermarketProfile: builder.query({
      query: (id) => ({
        headers: myHeaders,
        url: `/accounts/account/user/${id}`,
        method: "GET",
      }),
    }),

    updateBuyerAccount: builder.mutation({
      query: (data) => ({
        headers: myHeaders,
        url: "/buyer/update-profile",
        body: data,
        method: "POST",
      }),
    }),
  }),
});

export const { useGetSupermarketProfileQuery, useUpdateBuyerAccountMutation } =
  profileApiSlice;
