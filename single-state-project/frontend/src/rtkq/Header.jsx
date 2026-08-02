import React from 'react'
import { Link } from 'react-router'

const Header = () => {
  return (
    <div className="flex bg-gray-300 text-gray-700 w-full h-14 text-center justify-between px-3 font-bold text-2xl shadow-md shadow-gray-200">
      <Link to="/" className="flex gap-4 my-3">
        <img src="/state.png" alt="state" className="w-10 h-10" />
        <h1>Home</h1>
      </Link>
      <Link to="/auth/signin" className="flex gap-4 my-3">        
        <h2>Sign In</h2>
      </Link>
    </div>
  )
}

export default Header
