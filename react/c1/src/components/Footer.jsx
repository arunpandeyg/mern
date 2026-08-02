import React from 'react'
import { Link } from 'react-router'

function Footer() {
  return (
    <footer className='flex justify-center items-center p-4 bg-gray-800 text-white'>
      <p className='text-sm'>© {new Date().getFullYear()} Practice. All rights reserved.  </p>
      <Link to="/"><span className='underline cursor-pointer ml-4'>Arun Pandey</span></Link>
    </footer>
  )
} 

export default Footer
