import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {setCredentials, signin, signout, signup} from '../../reduxtk/auth/authSlice'

// export const apiSlice = createApi({
//         baseQuery: fetchBaseQuery({
//         baseUrl: 'http://localhost:5000',
//         credentials: 'include',
//         prepareHeaders: (headers, {getState}) => {
//             const token = getState().auth.token
//             if(token) {
//                 headers.set('authorization', `Bearer ${token}`)
//             }
//             return headers
//         }
//     }),
//     tagTypes: ['User'],
//     endpoints: (builder) => ({}),
// })

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000',
    credentials: 'include',
    prepareHeaders: (headers, {getState}) => {
        const token = getState().auth.token
        if(token) {
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    if(result?.error?.status === 403) {
        console.log('Sending refresh token')
        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)
        if(refreshResult?.data) {
            const user = api.getState().auth.user
            api.dispatch(setCredentials({...refreshResult.data, user}))
            result = await baseQuery(args, api, extraOptions)
        } else if(result?.error?.status === 401) {
            api.dispatch(signout())
        } else if(result?.error?.status === 404) {
            api.dispatch(signin())
        } else {
            api.dispatch(signup())
        }      
    }
    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['User'],
    endpoints: (builder) => ({


    }),
})

export const userApiSlice = apiSlice.injectEndpoints({
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
})



export const {useSignupMutation, useSigninMutation, useSignoutMutation} = userApiSlice