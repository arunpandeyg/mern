import React from 'react'
import { Link, useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { signoutUser } from '../store/authSlice'
import { Button } from '../components/ui/button'

const Header = () => {
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (!user) return null

  const logout = async () => {
    await dispatch(signoutUser())
    navigate('/signin')
  }
  
  return (
    <div className='flex items-center justify-between bg-gray-800 text-white px-3 sticky top-0 z-99 border-b h-12'>
      <Link to='/' className='flex items-center justify-center'>
        <img
          src='/b1.png'
          alt='home'
          className='w-10 h-10 rounded-full hover:animate-spin'
        />
        <p className='text-xl ml-3'>Auth Image App</p>
      </Link>
      <div className='flex items-center justify-center space-x-4'>
        <div className='flex items-center justify-center gap-5'>
          <Link to='/' className='text-sm font-medium hover:underline'>
            Home
          </Link>
          <Link to='/profiles' className='text-sm font-medium hover:underline'>
            Profiles
          </Link>
        </div>
        {user ? (
          <div className='flex items-center gap-4'>
            <span>{user.email}</span>
            <Button variant='outline' onClick={() => dispatch(logout())}>
              Signout
            </Button>
          </div>
        ) : (
          <Link to='/signin'>
            <Button>Signin</Button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Header
