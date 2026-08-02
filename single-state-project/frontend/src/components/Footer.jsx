import React from 'react'
import { Link } from 'react-router'

const Footer = () => {
  return (
    <div className='flex bg-gray-300 text-gray-700 w-full h-12 items-center justify-between text-xl shadow-md shadow-gray-200'>
      <Link to="/" className="flex gap-4 items-center">
        <img src="/pen.png" alt="state" className="w-10 h-10 rounded-full " />
        <h1>State Management</h1>
      </Link>
      <div>
        <p>Copyright &copy; 2026 All rights reserved</p>
      </div>
      <Link to="/pp">
        <p>Privacy Policy</p>
      </Link>
    </div>
  )
}

export default Footer
