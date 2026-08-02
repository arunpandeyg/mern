import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Slice";
import productsReducer from "./ProductSlice";
import { authUser } from "./auth/AuthSlice";
import { signupUser } from "./SignupSlice";
import { apiSlice } from "@/app/api/apiSlice";
import  authReducer  from "../reduxtk/auth/AuthSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    cart: cartReducer,
    products: productsReducer,
    authUser: authUser,
    signupUser: signupUser,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
