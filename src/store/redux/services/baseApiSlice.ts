import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const baseApiUrl = "http://ec2-34-239-249-147.compute-1.amazonaws.com/api";

const baseApiUrl = "https://backend.occupymart.com";

const noAuthEndPoints = [
  "signUp",
  "verifyAccount",
  "login",
  "sendOtpToResetPwd",
  "resetPwd",
];

const baseQuery = fetchBaseQuery({
  baseUrl: baseApiUrl,
  // mode: "no-cors",
  prepareHeaders: (headers, { endpoint }) => {
    // headers.set("Access-Control-Allow-Origin", "*");
    const sessionToken = sessionStorage.getItem("token");
    const isNoAuthRequest = noAuthEndPoints.some((patter) => {
      return endpoint.endsWith(patter);
    });
    if (sessionToken && !isNoAuthRequest) {
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
