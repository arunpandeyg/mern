import React, { useState } from 'react'
import { CiUser } from 'react-icons/ci'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { Link } from 'react-router'

const UserButton = () => {
  const [open, setOpen] = useState(false)
  const currentUser = true

  return currentUser ? (
    <div className='flex items-center justify-center gap-1 py-1 text-sm text-orange-600'>
      <Link to='/userProfile/:username'>
        <CiUser className='text-orange-600 rounded-full cursor-pointer relative' />
      </Link>
      <div
        onClick={() => {
          console.log('clicked')
          setOpen(prev => !prev)
        }}
        className='cursor-pointer'
      >
        <BsThreeDotsVertical />
      </div>

      {open && (
        <div className='flex flex-col absolute right-2 top-10 bg-white shadow-lg rounded-md p-2 z-50'>
          <Link
            to='/userProfile/:username'
            className='hover:bg-gray-100 p-1 cursor-pointer'
          >
            Profile
          </Link>
          <Link to='/setting' className='hover:bg-gray-100 p-1 cursor-pointer'>
            Settings
          </Link>
          <Link to='/signout' className='hover:bg-gray-100 p-1 cursor-pointer'>
            Signout
          </Link>
        </div>
      )}
    </div>
  ) : (
    <div className='flex items-center justify-center gap-1 py-1 text-sm text-orange-600'>
      <CiUser className='text-orange-600' />
      <p className='text-sm'>Sign Up</p>
    </div>
  )
}

export default UserButton
