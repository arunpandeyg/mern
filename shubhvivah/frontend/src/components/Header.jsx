import React from 'react'
import { Link } from 'react-router'
import { GoSignIn } from "react-icons/go";

const Navbar = () => {
  return (
    <div className='flex justify-between items-center bg-orange-800 text-white pl-3 pr-3  font-bold'>
      <div >
        <Link className='flex items-center space-x-4' to="/">
        
        <img src="/logo.png" alt="logo" className='w-24 h-15' />
        <h1>Shubh Vivah</h1>
        </Link>
      </div>
      <div className='flex space-x-4'>
        <Link to="/">Home</Link>
        <Link to="/Search">Search</Link>
        <Link to="/create">Create Profile</Link>
      </div>
      <div >
        <Link className='flex items-center gap-3  text-white hover:text-orange-600' to="/signin"><GoSignIn /> Sign In</Link>
      </div>

    </div>
  )
}

export default Navbar
