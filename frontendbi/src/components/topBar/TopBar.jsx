import React from 'react'
import { IoIosSearch } from 'react-icons/io'
import UserButton from '../userButton/UserButton'
import { Link } from 'react-router'
import Image from '../image/image'
import { Input } from '../ui/input'
import { IoHomeOutline } from 'react-icons/io5'
import { IoCreateOutline } from 'react-icons/io5'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { GrUpdate } from 'react-icons/gr'
import { MdOutlineMessage } from 'react-icons/md'
import { IoSettingsOutline } from 'react-icons/io5'

const TopBar = () => {
  return (
    <div className='w-full h-10 pl-2 pr-2 flex gap-5 text-orange-700 topBar'>
      <Link to='/' className='flex items-center  gap-2'>
        <Image
          path='bims/bharat.png'
          // src='bims/bharat.png'
          alt=''
          className='rounded-full hover:animate-spin pt-2 w-10 h-10'
        />
        <h1 className=' cursor-pointer '>BharatImage</h1>
      </Link>

      <div className='w-1/2 flex items-center justify-end gap-2  rounded-full mx-2'>
        <input
          type='text'
          placeholder='Search...'
          className='w-1/2 border border-gray-200 solid rounded-lg text-sm p-1'
        />
        <IoIosSearch className='h-4 w-4 text-orange-600 text-sm cursor-pointer' />
      </div>
      <div className='gap-5 flex items-center justify-center '>
        <Link to='/' className='menuIcon'>
          <IoHomeOutline className='hover:text-orange-700' />
        </Link>
        <Link to='/create' className='menuIcon'>
          <IoCreateOutline className='hover:text-orange-700' />
        </Link>
        <Link to='/notifications' className='menuIcon'>
          <IoIosNotificationsOutline className='hover:text-orange-700' />
        </Link>
        <Link to='/update' className='menuIcon'>
          <GrUpdate className='hover:text-orange-700' />
        </Link>
        <Link to='/messages' className='menuIcon'>
          <MdOutlineMessage className='hover:text-orange-700' />
        </Link>
        <Link to='/setting' className='menuIcon'>
          <IoSettingsOutline className='hover:text-orange-700' />
        </Link>
      </div>
      <div className='flex items-center search'>
        <UserButton />
      </div>
    </div>
  )
}

export default TopBar
