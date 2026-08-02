import React from 'react'
import Logo from './Logo'
import Navbar from './Navbar'
import Search from './Search'
import MobileBar from './MobileBar'

const Header = () => {
  return (
    <div className='flex items-center justify-between px-4 py-1 bg-gray-800 text-white'>
      <div>
        <Logo />
      </div>
      <div className='hidden md:block'>
        <div className='flex items-center gap-4'>
          <div>
            <Search />
          </div>
          <div>
            <Navbar />
          </div>
        </div>
      </div>
      <div className='md:hidden'>
        <MobileBar />
      </div>
    </div>
  )
}

export default Header
