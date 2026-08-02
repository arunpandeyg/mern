import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { createUser, resetUserState } from '../../features/userSlice'
import { toast } from 'sonner'

const CreateUserPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector(s => s.auth)
  const { loading, error, success } = useSelector(s => s.user)

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    gender: '',
    community: '',
    role: 'user'
  })

  const [file, setFile] = useState(null)

  // 🔐 Admin check
  useEffect(() => {
    if (!user || user.role !== 'admin') {
      toast.error('Access denied')
      navigate('/')
    }
  }, [user, navigate])

  const handleChange = e => {
    const { name, value, files } = e.target

    if (name === 'image') {
      setFile(files[0])
    } else {
      setForm({ ...form, [name]: value })
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const formData = new FormData()

    Object.keys(form).forEach(key => {
      if (form[key]) {
        formData.append(key, form[key])
      }
    })

    if (file) {
      formData.append('image', file)
    }

    try {
      await dispatch(createUser(formData)).unwrap()
      toast.success('User created successfully')
    } catch (err) {
      toast.error(err || 'Create failed')
    }
  }

  // Redirect after success
  useEffect(() => {
    if (!success) return

    dispatch(resetUserState())
    navigate('/admin')
  }, [success, dispatch, navigate])

  return (
    <div className='max-w-lg mx-auto mt-4 p-4 border rounded-lg shadow'>
      <h2 className='text-2xl font-bold mb-4 text-center'>Create User</h2>

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div className='flex flex-cols-2 md:flex-row gap-4'>
          <div className='flex flex-col gap-4'>
            <input
              name='name'
              placeholder='Name'
              onChange={handleChange}
              className='w-full p-1 border rounded-lg'
            />

            <input
              name='email'
              placeholder='Email'
              onChange={handleChange}
              className='w-full p-1 border rounded-lg'
            />

            <input
              name='password'
              type='password'
              placeholder='Password'
              onChange={handleChange}
              className='w-full p-1 border rounded-lg'
            />

            <input
              name='phone'
              placeholder='Phone'
              onChange={handleChange}
              className='w-full p-1 border rounded-lg'
            />
          </div>
          <div className='flex flex-col gap-4'>
            <select
              name='gender'
              onChange={handleChange}
              className='w-full p-1 border rounded-lg'
            >
              <option value=''>Select Gender</option>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
            </select>

            <input
              name='community'
              placeholder='Community'
              onChange={handleChange}
              className='w-full p-1 border rounded-lg'
            />

            <select
              name='role'
              onChange={handleChange}
              className='w-full p-1 border rounded-lg'
            >
              <option value='user'>User</option>
              <option value='admin'>Admin</option>
            </select>

            <input
              type='file'
              name='image'
              onChange={handleChange}
              className='w-full mt-3'
            />
          </div>
        </div>

        <button
          type='submit'
        //   disabled={loading}
          className='w-full bg-orange-500 text-white p-1 rounded-lg cursor-pointer hover:underline'
        >
          {loading ? 'Creating...' : 'Create User'}
        </button>
      </form>

      {error && <p className='text-red-500 mt-3 text-center'>{error}</p>}
    </div>
  )
}

export default CreateUserPage
