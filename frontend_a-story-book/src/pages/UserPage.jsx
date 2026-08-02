import React from 'react'
import { useSelector } from 'react-redux'
import UserCard from '../components/UserCard'

const UserPage = () => {
    const {user} = useSelector((state) => state.auth);
  return (
    <div className='flex flex-col items-center justify-center gap-2 mx-auto'>
      <h1 className='text-center text-2xl font-bold mt-8'>User Dashboard</h1>
      <UserCard user={user} />
    </div>
  )
}

export default UserPage
