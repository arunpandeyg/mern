import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'


export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/v1',
    }),
    endpoints: (builder) => ({
        signin: builder.mutation({
           query: (body: {email: string, password: string}) => { 
            return {                
                url: '/auth/signin',
                method: 'POST',
                body,
            }
           }
        }),
        signup: builder.mutation({
           query: (body: {name: string, email: string, password: string, confirmPassword: string, phone: string, gender: string, image: string}) => { 
            return {                
                url: '/auth/signup',
                method: 'POST',
                body,
            }
           }
        }),       
    })
})

export const {useSigninMutation, useSignupMutation} = authApi;