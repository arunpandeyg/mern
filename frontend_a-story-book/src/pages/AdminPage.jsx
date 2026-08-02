import React, { useEffect, useState } from 'react'
import { api } from '../components/lib/axios'
import UserCard from '../components/UserCard'
// import { Link } from 'react-router'

const AdminPage = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    api.get('/users').then(res => setUsers(res.data.users))
  }, [])
  return (
    <div>
      <h1 className='text-center text-2xl font-bold mt-5'>Admin Dashboard</h1>
      <div className='grid grid-cols-3 gap-4 mt-4'>
        {users.map(u => (
          // <Link to={`/user/profile/${u._id}`} key={u._id} className='block'>
          <UserCard key={u._id} user={u} />
          // </Link>
        ))}
      </div>
    </div>
  )
}

export default AdminPage
