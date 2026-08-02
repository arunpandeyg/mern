import React from 'react'
import { Link } from 'react-router'

const Footer = () => {
  return (
    <div className='flex justify-between p-2 bg-gray-800 text-white text-sm'>
      <div>
        <img src="p.png" alt="image" className='w-6 h-6 rounded-full' />
      </div>
      <div>
        <p className='text-sm'>All &copy; Rights Reserved 2026 | Rashtriye Brahman Ekta Prishad</p>
      </div>
      <div>
        <Link>Privacy Policy</Link></div>     
    </div>
  )
}

export default Footer
