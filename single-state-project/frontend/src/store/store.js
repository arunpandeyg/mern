import { configureStore } from "@reduxjs/toolkit";
import {signinApi} from '@/service/signinApi'
import { authApi } from "@/service/authApi";
import authReducer from '@/service/authSlice'
import { setupListeners } from "@reduxjs/toolkit/query/react";


export const store = configureStore({
    reducer: { 
        auth: authReducer, 
        [signinApi.reducerPath]: signinApi.reducer,     
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(signinApi.middleware, authApi.middleware),
});


setupListeners(store.dispatch);

