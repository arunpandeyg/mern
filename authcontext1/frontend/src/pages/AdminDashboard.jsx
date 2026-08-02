import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import AdminLogo from '../components/AdminLogo'

const AdminDashboard = () => {
  const { auth, setAuth } = useAuth()
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUsers = async () => {
      if (!auth?.accessToken) return
      try {
        const res = await axios.get(`/api/users?page=${page}&limit=2`, {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`
          },
          withCredentials: true
        })
        setUsers(res.data.users)
        setTotalPages(res.data.totalPages)
      } catch (error) {
        console.error('Failed to fetch users:', error)
        setError('Failed to fetch users.')
      }
    }
    fetchUsers()
  }, [page, auth])

  const handleCreate = async () => {
    navigate(`/admin/create`)
  }
  const handleUpdate = async id => {
    navigate(`/admin/users/${id}/edit`)
  }

  const handleDelete = async id => {
    try {
      await axios.delete(`/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`
        },
        withCredentials: true
      })
      //   refetch users
      const res = await axios.get(`/api/users?page=${page}&limit=2`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`
        },
        withCredentials: true
      })

      if (res.data.users.length === 0 && page > 1) {
        setPage(page - 1) // Go back a page if the current page is empty
      } else {
        setUsers(res.data.users)
        setTotalPages(res.data.totalPages)
      }
    } catch (error) {
      console.error('Failed to delete user:', error)
      setError('Failed to delete user.')
    }
  }

  return (
    <div className='container mx-auto mt- p-6'>
      <h2 className='text-2xl font-bold mb-4 text-center'>Admin Dashboard</h2>
      {error && <p className='text-red-500 mb-4'>{error}</p>}
      <div className='flex items-center justify-between mb-'>
        <h3 className='text-xl font-semibold mb-4'>User Management</h3>
        <button
          onClick={() => handleCreate()}
          className='bg-green-500 text-white text-sm px-2 py-1 rounded-lg hover:bg-green-700'
        >
          Create User
        </button>
      </div>
      
      <ul className='space-y- items-center justify-center'>
        {users?.map(user => (
          <li
            key={user._id}
            className='bg-gray-100 p-1 rounded shadow flex items-center justify-between'
          >
            <div className='inline-flex items-center  gap-2 text-sm font-medium shadow-lg rounded-lg bg-gray-100 max-w-md p-1'>
              <img
                src={user.image}
                alt={user.name}
                className='w-8 h-8 rounded-full'
              />
              {/* <AdminLogo />  */}
              {user.username} ({user.email}) - {user.role}
            </div>
            {user.role !== 'admin' && (
              <div className='inline-flex items-center justify-center'>
                
                <button
                  onClick={() => handleUpdate(user._id)}
                  className='ml-4 bg-orange-400 text-white text-sm px-2 py-1 rounded-lg hover:bg-orange-700'
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className='ml-4 bg-red-500 text-white text-sm px-2 py-1 rounded-lg hover:bg-red-700'
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
      {/* Pagination buttons */}
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            className={`px-3 py-1 rounded mr-2 shadow-lg ${
              page === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setPage(index + 1)}
            key={index}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

export default AdminDashboard
