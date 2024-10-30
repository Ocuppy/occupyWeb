import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseApiUrl = "http://ec2-34-239-249-147.compute-1.amazonaws.com/api";

const noAuthEndPoints = [
  "/accounts/account/activate/",
  "/accounts/token/",
  "/accounts/accounts/request-password-change",
  "/accounts/accounts/change-password/",
];

const baseQuery = fetchBaseQuery({
  baseUrl: baseApiUrl,
  // mode: "no-cors",
  prepareHeaders: (headers, { endpoint }) => {
    // headers.set("Access-Control-Allow-Origin", "*");
    const sessionToken = sessionStorage.getItem("token");
    const isAuthRequest = noAuthEndPoints.some((patter) =>
      endpoint.endsWith(patter),
    );
    if (sessionToken && isAuthRequest) {
      headers.set("Authorization", `Bearer ${sessionToken}`);
    }
    return headers;
  },
});

export const baseApiSlice = createApi({
  reducerPath: "occupyWeb",
  baseQuery,
  endpoints: (builder) => ({}),
});
