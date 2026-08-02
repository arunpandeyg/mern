import React from 'react'
import { Link } from 'react-router'

const Footer = () => {
  return (
    <div className="flex justify-between  p-2 bg-orange-600 text-white">
      <Link to="/" className="flex gap-3 text-center justify-center">
        <img
          src="food.png"
          className="w-10 h-10 rounded-full hover:animate-spin"
          alt=""
        />{" "}
        <h1 className="text-2xl font-bold">Local Food</h1>
      </Link>
      <div className="text-center">
        <p className='mt-2'>© 2026 All copy rights reserved to Local Food</p>
      </div>
      <Link to="/contact" className="flex gap-3 text-center justify-center">
        
        <h1 className="text-2xl font-bold">Contact Us</h1>
      </Link>
    </div>
  )
}

export default Footer
