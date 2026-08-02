import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const signinApi = createApi({
  reducerPath: "signinApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1/auth" }),
  endpoints: (builder) => ({
    signin: builder.mutation({
      query: (credentials) => ({
        url: "/signin",
        method: "POST",
        body: credentials,
      }),
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: "/signup",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useSigninMutation, useSignupMutation } = signinApi;
