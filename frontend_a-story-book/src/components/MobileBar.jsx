import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { Link } from 'react-router'
import { IoHomeOutline } from 'react-icons/io5'
import { TbChartBarPopular } from 'react-icons/tb'
import { IoIosTrendingUp } from 'react-icons/io'
import { SiGnuprivacyguard } from 'react-icons/si'
import { TfiWrite } from "react-icons/tfi";
import { useDispatch, useSelector } from 'react-redux'
import { signoutUser } from '../store/authSlice'
import { Button } from '../components/ui/button'
import { useNavigate } from 'react-router'

const MobileBar = () => {
  const [open, setOpen] = useState(false)
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const signout = async () => {
    await dispatch(signoutUser())
    navigate('/signin')
  }

  // if (!user) return null

  return (
    <div className='block md:hidden'>
      <div
        className='cursor-pointer text-center'
        onClick={() => setOpen(prev => !prev)}
      >
        {open ? <IoClose /> : <BsThreeDotsVertical />}
      </div>
      <div
        className={`w-full h-screen flex flex-col items-center justify-center absolute gap-4 bg-gray-800 text-white py-1 ${
          open ? 'right-0' : '-right-full'
        } top-10 transition-all duration-300 ease-in-out overflow-hidden `}
      >
        <Link to='/'>
          {' '}
          <IoHomeOutline />
        </Link>
        <Link to='/trending'>
          <IoIosTrendingUp />
        </Link>
        <Link to='/most-popular'>
          <TbChartBarPopular />
        </Link>
        <Link to='/story'>
          <TfiWrite />
        </Link>
        {!user ? (
          <Link to='/signup'>
            <SiGnuprivacyguard />
          </Link>
        ) : (
          <div className='flex gap-4'>
            <span className='mt-2 text-sm'>{user.name}</span>
            <Button
              onClick={signout}
              variant='outline'
              className={'bg-gray-800 text-white text-sm'}
            >
              Signout
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default MobileBar

{
  /* <div className='flex items-center gap-4 sm:hidden cursor-pointer' onClick={() => setOpen((prev) => !prev)}>
        {open ? <IoClose /> : <BsThreeDotsVertical />}
      </div> */
}
