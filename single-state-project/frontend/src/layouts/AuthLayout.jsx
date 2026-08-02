import Header from '@/auth/Header'
import Footer from '@/auth/Footer'
import React from 'react'
import { Outlet } from "react-router";


const AuthLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default AuthLayout
