import React from 'react'
import { Link } from 'react-router'

const Footer = () => {
  return (
    <div className='bg-orange-800 text-white p-2 flex items-center justify-between font-bold'>
      <div><h1 className='text-center py-2'>&copy; All Right Reserved </h1></div>
      
      <div className='flex gap-4'>
        <Link to='/about'>About Us</Link>
        <Link to='/contact'>Contact</Link>
      </div>
      <Link to="/">ArunPandey</Link>
    </div>
  )
}

export default Footer
