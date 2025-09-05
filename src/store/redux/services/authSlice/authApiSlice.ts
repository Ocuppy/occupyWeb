import { baseApiSlice } from "../baseApiSlice";

let myHeaders = new Headers();
myHeaders.append("Accept", "*/*");
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Connection", "keep-alive");
myHeaders.append("Accept-Encoding", "gzip, defalte, br");

export const authApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (credentials) => ({
        headers: myHeaders,
        url: "/accounts/account/register/",
        method: "POST",
        body: JSON.stringify(credentials),
      }),
    }),
    verifyAccount: builder.mutation({
      query: (otp) => ({
        headers: myHeaders,
        url: "/accounts/account/activate/",
        method: "POST",
        body: { ...otp },
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        headers: myHeaders,
        url: "/accounts/token/",
        method: "POST",
        body: credentials,
      }),
    }),
    sendOtpToResetPwd: builder.mutation({
      query: (credentials) => ({
        headers: myHeaders,
        url: "/accounts/accounts/request-password-change/",
        method: "POST",
        body: credentials,
      }),
    }),
    resetPwd: builder.mutation({
      query: (credentials) => ({
        headers: myHeaders,
        url: "/accounts/accounts/change-password/",
        method: "POST",
        body: credentials,
      }),
    }),
    updateNotificationToken: builder.mutation({
      query: ({ id, token }: { id: string; token: string | null }) => ({
        headers: myHeaders,
        url: `/accounts/accounts/update-notification-token/${id}/`,
        method: "PUT",
        body: { notification_token: token ?? '' }
      })
    })
  }),
});

export const {
  useSignUpMutation,
  useVerifyAccountMutation,
  useLoginMutation,
  useResetPwdMutation,
  useSendOtpToResetPwdMutation,
  useUpdateNotificationTokenMutation
} = authApiSlice;
