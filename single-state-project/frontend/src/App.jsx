import React, { useEffect } from "react";
import AppLayout from "./layouts/AppLayout";
import ContextLayout from "./layouts/ContextLayout";
import LocalStorageLayout from "./layouts/LocalStorageLayout";
import RtkLayout from "./layouts/RtkLayout";
import RtkqLayout from "./layouts/RtkqLayout";
import ZustandLayout from "./layouts/ZustandLayout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import { createBrowserRouter, RouterProvider } from "react-router";
import ContextPage from "./context/ContextPage";
import ProductContext from "./context/ProductContext";
import Local from "./local-storage/Local";
import Storage from "./local-storage/Storage";
import Rtk from "./rtk/Rtk";
import RtkProduct from "./rtk/RtkProduct";
import Signin from "./rtkq/Signin";
import Signup from "./rtkq/Signup";
import Dashboard from "./rtkq/Dashboard";
import Zust from "./zuxtand/Zust";
import ZustProduct from "./zuxtand/ZustProduct";
import ProfilePage from "./pages/ProfilePage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UsersPage from "./pages/UsersPage";
import AuthLayout from "./layouts/AuthLayout";
import AuthPage from "./auth/AuthPage";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "./service/authSlice";




function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user") || "null");
  // if (user) {
  //   dispatch({
  //     type: "auth/setUser",
  //     payload: {
  //       user: user.user,
  //       token: user.token,
  //     },
  //   });
  // }
  useEffect(() => {
    dispatch(setUser(user));
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/users",
          element: <UsersPage />,
        },
        {
          path: "/profile",
          element: <ProfilePage />,
        },
        {
          path: "/products",
          element: <Products />,
        },
      ],
    },
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        {
          path: "/auth/signin",
          element: <AuthPage />,
        },             
      ],
    },
    {
      path: "/context",
      element: <ContextLayout />,
      children: [
        {
          path: "/context/context",
          element: <ContextPage  />,
        },
        {
          path: "/context/product",
          element: <ProductContext />,
        },
      ],
    },
    {
      path: "/localstorage",
      element: <LocalStorageLayout />,
      children: [
        {
          path: "/localstorage/local",
          element: <Local />,
        },
        {
          path: "/localstorage/storage",
          element: <Storage />,
        },
      ],
    },
    {
      path: "/rtk",
      element: <RtkLayout />,
      children: [
        {
          path: "/rtk/rtk",
          element: <Rtk />,
        },
        {
          path: "/rtk/products",
          element: <RtkProduct />,
        },
      ],
    },
    {
      path: "/rtkq",
      element: <RtkqLayout />,
      children: [
        {
          path: "/rtkq/signin",
          element: <Signin />,
          
        },
        {
          path: "/rtkq/signup",
          element: <Signup />,
          
        },
        {
          path: "/rtkq/dashboard",
          element: <Dashboard />,
        },
      ],
    },
    {
      path: "/zustand",
      element: <ZustandLayout />,
      children: [
        {
          path: "/zustand/zustand",
          element: <Zust />,
        },
        {
          path: "/zustand/products",
          element: <ZustProduct />,
        },
      ],
    },
    {
      path: "*",
      element: <h1>404</h1>,
    },
  ]);

  const queryClient = new QueryClient();

  return (
    <div>
      <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      </QueryClientProvider>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} theme="dark" colorScheme="dark" />
    </div>
  );
}

export default App;
