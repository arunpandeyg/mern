import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoHomeOutline } from 'react-icons/io5'
import { Link } from 'react-router'
import { TbChartBarPopular } from 'react-icons/tb'
import { IoIosTrendingUp } from 'react-icons/io'
import { VscSignIn } from 'react-icons/vsc'
import { SiGnuprivacyguard } from 'react-icons/si'
import { signoutUser } from '../store/authSlice'
import { Button } from '../components/ui/button'
import { useNavigate } from 'react-router'
import { TfiWrite } from "react-icons/tfi";


const Navbar = () => {
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const signout = async () => {
    await dispatch(signoutUser())
    navigate('/signin')
  }

  // if (!user) return null
  return (
    <div>
    <div className='flex items-center gap-14 bg-gray-800 text-white'>
      <div className='flex items-center gap-4'>
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
        <Link to='/create-story'>
          <TfiWrite />
        </Link>
      </div>
      <div className=''>
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
          // <Link to='/auth'>
          //   <VscSignIn />
          // </Link>
        )}
      </div>
      
    </div>
    
    </div>

  )
}

export default Navbar
