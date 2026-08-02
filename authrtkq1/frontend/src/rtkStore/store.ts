import {configureStore} from '@reduxjs/toolkit'
import {authApi} from '../service/authApi'
import {setupListeners} from '@reduxjs/toolkit/query'
import authReducer from '../features/auth/authSlice.ts'


export const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
    devTools: true
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)

export default store