import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

const AdminLogo = () => {
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
  return (
    <div>
      {profile && (
        <div>
          <img
            src={`https://ui-avatars.com/api/?name=${profile.username}&background=random&size=128`}
            alt='User Avatar'
            className='w-10 h-10 rounded-full mx-auto bg-orange-600 text-white font-bold flex items-center justify-center'
          />
        </div>
      )}
    </div>
  )
}

export default AdminLogo
