import React from 'react'
import { Link } from 'react-router'

const Footer = () => {
  return (
    <div className='flex items-center justify-between bg-gray-800 text-white px-3 sticky top-0 z-99 h-11'>
      <div className='flex items-center justify-center'>
        <img
          src='/b3.png'
          alt='home'
          className='w-8 h-8 rounded-full hover:animate-spin'
        />
      </div>
      <div className='flex items-center justify-center gap-5'>
        <p className='text-[8px]'>© 2023 Akhil Bhartiye Savarna Parishad All rights reserved</p>
      </div>
      <div>
        <Link to='/privacy' className='text-sm hover:bg-white hover:text-gray-800 rounded-lg p-2'>Privacy Policy</Link>
      </div>
    </div>
  )
}

export default Footer
