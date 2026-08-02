import { useEffect, useState } from 'react'
import { api } from '../../lib/axios'
import UserCard from '../../components/UserCard'
import { Link } from 'react-router'

const AdminPage = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    api.get('/users').then(res => setUsers(res.data.users))
  }, [])
  return (
    <div>
      <div className='flex md:flex-row items-center justify-around gap-2 mx-auto mt-5'>
        <h1 className='text-center text-2xl font-bold'>Admin Dashboard</h1>
        <Link to='/create' className='text-center  right-0 border-0 bg-orange-500 text-white active:bg-orange-600 font-bold text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150'>Create User</Link>
      </div>

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
