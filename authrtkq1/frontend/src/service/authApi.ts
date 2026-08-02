import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000" as string,
  }),
  endpoints: (builder) => ({
    signin: builder.mutation({
      query: (body: { email: string; password: string }) => {
        return {
          url: "/api/v1/auth/signin",
          method: "POST",
          body,
        };
      },
    }),
    signup: builder.mutation({
      query: (formData) => ({
        url: "/api/v1/auth/signup",
        method: "POST",
        body: formData, // FormData
      }),
    }),

    // signup: builder.mutation({
    //   query: (body: {
    //     name: string;
    //     email: string;
    //     password: string;
    //     phone: string;
    //     gender: string;
    //     image: string;
    //   }) => {
    //     return {
    //       url: "/api/v1/auth/signup",
    //       method: "POST",
    //       body,
    //     };
    //   },
    // }),
  }),
});

export const { useSigninMutation, useSignupMutation } = authApi;
