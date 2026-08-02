import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import { Search } from 'lucide-react'
import AdminLogo from './AdminLogo'

const Navbar = () => {
  const navigate = useNavigate()
  const { auth, setAuth } = useAuth()

  const [profile, setProfile] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProfile = async () => {
      if (!auth?.accessToken) return
      try {
        const res = await axios.get('/api/users/me', {
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`
          },
          withCredentials: true
        })
        setProfile(res.data)
      } catch (error) {
        console.error('Failed to fetch user profile:', error)
        setError('Failed to fetch user profile.')
      }
    }
    fetchProfile()
  }, [auth])

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout', {}, { withCredentials: true })
      setAuth(null)
      navigate('/login') // Redirect to login after logout
    } catch (error) {
      console.error('Logout failed', error)
    }
  }
  return (
    <nav className='bg-gray-800 p-2 text-white'>
      <div className='container mx-auto flex justify-between items-center'>
        <Link to='/' className='text-white mr-4 flex items-center gap-2'>
        <AdminLogo />
          Home
        </Link>
        {/* <div>{auth?.email}</div> */}
        <div>
          {auth?.accessToken ? (
            <>
              <div className='flex items-center justify-center space-x-4'>
                <div className='flex items-center bg-gray-700 rounded-full px-2 py-1'>
                  <input type='text' placeholder='Search...' />
                  <Link to='/search' className='ml-2 text-gray-400 cursor-pointer'>
                    <Search />
                  </Link>
                </div>
                <AdminLogo />                
                <button
                  onClick={handleLogout}
                  className='bg-red-600 px-3 py-1 rounded hover:bg-red-700'
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to='/login' className='text-white mr-4'>
                Login
              </Link>
              {/* <Link to='/register' className='text-white'>
                Register
              </Link> */}
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
