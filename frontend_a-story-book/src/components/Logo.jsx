import React from 'react'
import { Link } from 'react-router'

const Logo = () => {
  return (
    <Link to='/' className='flex items-center space-x-2 bg-gray-800 text-white'>
      <img src="/b.png" alt="logo" className='w-10 h-10 rounded-full' />
      <h3>Bharat Stories</h3>
    </Link>
  )
}

export default Logo
