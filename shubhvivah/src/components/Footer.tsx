import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='w-full h-15 flex flex-col  sm:flex-row items-center justify-between px-4 bg-gradient-to-b from-orange-400 to-orange-200 z-99 sticky bottom-0 gap-3'>
      <Link href="/" className='flex cursor-pointer'>
        <Image src="/logo.png" alt="Wedding" width={30} height={30}  className='rounded-full'/>
        <h1 className='text-xl  text-white hover:underline'>Arun Pandey</h1>
      </Link>
      <h1 className='text-sm text-white'>&copy; All rights reserved<Link href="/about" className='text-md text-white hover:underline'> Arun Pandey </Link></h1>
      <Link href="/contact" className='text-md text-white hover:underline'>Contact</Link>
    </div>
  )
}

export default Footer
