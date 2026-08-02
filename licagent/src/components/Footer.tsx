import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='flex flex-col sm:flex-row w-full h-12 items-center justify-between bg-gradient-to-b from-gray-500 to-gray-300 text-white px-3'>
      <Link href='/'>
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold">
                AP
              </div>
      {/* <Image src='/logo.png' alt='logo' width={30} height={30} className='cursor-pointer rounded-full'/> */}
      </Link>      
      <h1>&copy; {new Date().getFullYear()} All rights reserved<Link href='/about'>Arun Pandey</Link></h1>
      <Link href='/contact'>Contact</Link>
    </div>
  )
}

export default Footer
