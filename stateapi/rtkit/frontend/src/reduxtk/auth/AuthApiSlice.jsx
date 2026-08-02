import { apiSlice } from "@/app/api/apiSlice";


export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        signup: builder.mutation({
            query: (credentials) => ({
                url: '/auth/signup',
                method: 'POST',
                body: { ...credentials },
            }),
        }),
        signin: builder.mutation({
            query: (credentials) => ({
                url: '/auth/signin',
                method: 'POST',
                body: { ...credentials },
            }),
        }),
        signout: builder.mutation({
            query: () => ({
                url: '/auth/signout',
                method: 'POST',
            }),
        }),
    }),
});

export const { useSignupMutation, useSigninMutation, useSignoutMutation } = authApiSlice
