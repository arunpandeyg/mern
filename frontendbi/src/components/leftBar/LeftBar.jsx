import React from 'react'
import { Link } from 'react-router'
import { IoHomeOutline } from 'react-icons/io5'
import { IoCreateOutline } from 'react-icons/io5'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { GrUpdate } from 'react-icons/gr'
import { MdOutlineMessage } from 'react-icons/md'
import { IoSettingsOutline } from 'react-icons/io5'

const LeftBar = () => {
  return (
    <div className='flex flex-col items-center justify-between w-10 h-screen text-orange-700'>
      <div className='gap-5 flex flex-col items-center justify-center'>
        <Link to='/' className='menuIcon'>
          <img src='/bharat.png' alt='' className='rounded-full hover:animate-spin pt-2' />
        </Link>
        <Link to='/explore' className='menuIcon'>
          <IoHomeOutline className='hover:text-orange-700' />
        </Link>
        <Link to='/notifications' className='menuIcon'>
          <IoCreateOutline className='hover:text-orange-700' />
        </Link>
        <Link to='/notifications' className='menuIcon'>
          <IoIosNotificationsOutline className='hover:text-orange-700' />
        </Link>
        <Link to='/messages' className='menuIcon'>
          <GrUpdate className='hover:text-orange-700' />
        </Link>
        <Link to='/messages' className='menuIcon'>
          <MdOutlineMessage className='hover:text-orange-700' />
        </Link>
      </div>
      <div>
        <Link to='/messages' className='menuIcon'>
          <IoSettingsOutline  className='hover:text-orange-700' />
        </Link>
      </div>
    </div>
  )
}

export default LeftBar



