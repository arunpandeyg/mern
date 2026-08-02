import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div className='w-full flex flex-col  sm:flex-row items-center justify-between px-4 h-15 bg-gradient-to-b from-orange-400 to-orange-200 z-99 sticky top-0'>
      <Link href="/" className='flex cursor-pointer'>
        <Image src="/images/logo.png" alt="Wedding" width={30} height={30}  className='rounded-full'/>
        <h1 className='text-2xl font-bold text-white'>Shubh Vivah</h1>
      </Link>
      <div className='flex gap-4 text-white cursor-pointer'>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </div>
      <div><Link href="/users/signup" className='text-white font-bold'>Sign Up</Link></div>
    </div>
  )
}

export default Header
