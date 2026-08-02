import { useLocation, useNavigate, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { updateUser, resetUserState } from '../../store/userSlice'
import { Card } from '../../components/ui/card'

const UserProfilePage = () => {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { loading, error, success } = useSelector(state => state.user)

  // Get passed user data
  const userData = location.state

  const [form, setForm] = useState({
    name: userData?.name || '',
    email: userData?.email || '',
    password: '',
    phone: userData?.phone || '',
    community: userData?.community || '',
    gender: userData?.gender || '',

    image: null
  })

  //   // Form state
  //   const [form, setForm] = useState({
  //     name: "",
  //     email: "",
  //     phone: "",
  //     password: "",
  //     gender: "",
  //     image: null,
  //   });

  //   // Pre-fill form
  //   useEffect(() => {
  //     if (userData) {
  //       setForm({
  //         name: userData.name || "",
  //         email: userData.email || "",
  //         phone: userData.phone || "",
  //         password: "",
  //         gender: userData.gender || "",
  //         image: null,
  //       });
  //     }
  //   }, [userData]);

  // Handle input change
  const handleChange = e => {
    if (e.target.name === 'image') {
      setForm({ ...form, image: e.target.files[0] })
    } else {
      setForm({ ...form, [e.target.name]: e.target.value })
    }
  }

  // Submit
  const handleSubmit = e => {
    e.preventDefault()

    const formData = new FormData()
    Object.keys(form).forEach(key => {
      if (form[key]) {
        formData.append(key, form[key])
      }
    })

    dispatch(updateUser({ id, formData }))
  }

  // Redirect after success
  useEffect(() => {
    if (success) {
      dispatch(resetUserState())
      navigate('/users')
    }
  }, [success, dispatch, navigate])

  return (
    <Card className={'w-full max-w-md mx-auto mt-8 p-2 shadow-lg'}>
      <h2 className={'text-center text-2xl font-bold'}>Update User</h2>

      <form onSubmit={handleSubmit} className='space-y-4 max-w-sm mx-auto mt-'>
        <div className='flex flex-cols-2 md:flex-row gap-4'>
          <div className='flex flex-col gap-4'>
            <input
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder='Name'
            />

            <input
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder='Email'
            />

            <input
              name='password'
              type='password'
              onChange={handleChange}
              placeholder='New Password'
            />
          </div>
          <div className='flex flex-col gap-4'>
            <input
              name='phone'
              value={form.phone}
              onChange={handleChange}
              placeholder='Phone'
            />
            
            <select name='gender' value={form.gender} onChange={handleChange}>
              <option value=''>Select Gender</option>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
            </select>
            
            <input
              name='community'
              placeholder='Community'
              value={form.community}
              onChange={handleChange}
            />

          </div>
        </div>
        <input type='file' name='image' onChange={handleChange} />

        <button type='submit' disabled={loading} className='hover:bg-orange-500 hover:text-white cursor-pointer border border-orange-500 rounded-lg shadow-b-md w-full py-2'>
          {loading ? 'Updating...' : 'Update User'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </Card>
  )
}

export default UserProfilePage

// import React, { useEffect } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { useParams } from 'react-router'
// import { fetchUserById } from '../../store/userSlice'

// const UserProfilePage = () => {
//   const dispatch = useDispatch()
//   const { id } = useParams()
//   const user = useSelector((state) => state.user.entities.find((user) => user.id === id))
//   console.log("UserProfilePage user:", user)
//   useEffect(() => {
//     dispatch(fetchUserById(id))
//   }, [dispatch, id])

//   if (!user) {
//     return <div>Loading...</div>
//   }

//   return (
//     <div>
//       <h1>User ProfilePage</h1>
//       <div>
//         <img src={user.image} alt={user.name} />
//       </div>
//       <p>Name: {user.name}</p>
//       <p>Email: {user.email}</p>
//       {/* Add more user data as needed */}
//     </div>
//   )
// }

// export default UserProfilePage
