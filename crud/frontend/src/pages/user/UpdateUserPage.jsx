// pages/UpdateUserPage.jsx
import { useLocation, useNavigate, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { updateUser, resetUserState } from '../../features/userSlice'
import { Card } from '../../components/ui/card'
import { toast } from 'sonner'

const UpdateUserPage = () => {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { loading, error, success } = useSelector(state => state.user)
  const { user: loggedInUser } = useSelector(state => state.auth)

  const userData = location.state

  // const [form, setForm] = useState({
  //   name: '',
  //   email: '',
  //   password: '',
  //   phone: '',
  //   gender: '',
  //   community: ''
  // })

  

  // ✅ Initialize form safely
  const [form, setForm] = useState({
    name: location.state?.name || '',
    email: location.state?.email || '',
    password: '',
    phone: location.state?.phone || '',
    gender: location.state?.gender || '',
    community: location.state?.community || ''
  })
  const [file, setFile] = useState(null)
  const handleChange = e => {
    const { name, value, files } = e.target

    if (name === 'image') {
      setFile(files[0])
    } else {
      setForm({ ...form, [name]: value })
    }
  }

  // ✅ Submit
  const handleSubmit = async(e) => {
    e.preventDefault()
    console.log("FORM SUBMITTED ✅")
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
      await dispatch(updateUser({ id, formData })).unwrap()
      toast.success('User updated successfully')
    } catch (err) {
      toast.error(err || 'Update failed')
    }
  }

  // ✅ Redirect AFTER success (no extra dispatch)
  useEffect(() => {
    if (!success) return

    toast.success('User updated successfully')
    dispatch(resetUserState())

    if (loggedInUser?.role === 'admin') {
      navigate('/admin')
    } else {
      navigate('/user')
    }
  }, [success])
  // useEffect(() => {
  //   if (success) {
  //     dispatch(resetUserState())

  //     if (loggedInUser?.role === 'admin') {
  //       navigate('/admin')
  //     } else {
  //       navigate('/user')
  //     }
  //   }
  // }, [success, dispatch, navigate, loggedInUser])

  return (
    <Card className='w-full max-w-md mx-auto mt-8 p-4 shadow-lg'>
      <h2 className='text-center text-2xl text-gray-500 font-bold mb-4'>
        Update User
      </h2>

      <form onSubmit={handleSubmit} className='space-y-4 max-w-sm mx-auto'>
        <div className='flex flex-cols-2 md:flex-row gap-4'>
          <div className='flex flex-col gap-4'>
            <input
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder='Name'
              className='w-full rounded-lg p-1 border'
            />

            <input
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder='Email'
              className='w-full rounded-lg p-1 border'
            />

            <input
              name='password'
              type='password'
              onChange={handleChange}
              placeholder='New Password'
              className='w-full rounded-lg p-1 border'
            />
          </div>
          <div className='flex flex-col gap-4'>
            <input
              name='phone'
              value={form.phone}
              onChange={handleChange}
              placeholder='Phone'
              className='w-full rounded-lg p-1 border'
            />

            <select
              name='gender'
              value={form.gender}
              onChange={handleChange}
              className='w-full rounded-lg p-1 border'
            >
              <option value=''>Select Gender</option>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
            </select>

            <input
              name='community'
              value={form.community}
              onChange={handleChange}
              placeholder='Community'
              className='w-full rounded-lg p-1 border'
            />
          </div>
        </div>
        <input type='file' name='image' onChange={handleChange} />

        <button
          type='submit'
          // disabled={loading}
          className='w-full bg-orange-500 text-white p-1 rounded-lg cursor-pointer hover:underline'
        >
          {loading ? 'Updating...' : 'Update User'}
        </button>
        {/* <button
  type="submit"
  // onClick={() => console.log("BUTTON CLICK WORKING")}
  className="w-full bg-black text-white p-2"
>
  Click
</button> */}
      </form>

      {error && <p className='text-red-500 mt-2'>{error}</p>}
    </Card>
  )
}

export default UpdateUserPage

// // pages/UpdateUserPage.jsx
// import { useLocation, useNavigate, useParams } from 'react-router'
// import { useDispatch, useSelector } from 'react-redux'
// import { useState, useEffect } from 'react'
// import { updateUser, resetUserState } from '../../features/userSlice'
// import { Card } from '../../components/ui/card'
// import { toast } from 'sonner'

// const UpdateUserPage = () => {
//   const { id } = useParams()
//   const location = useLocation()
//   const navigate = useNavigate()
//   const dispatch = useDispatch()
//   const { loading, error, success } = useSelector(state => state.user)

//   // Get passed user data
//   const userData = location.state
//   console.log('userData:', userData)
//   const [form, setForm] = useState({
//     name: userData?.name || '',
//     email: userData?.email || '',
//     password: '',
//     phone: userData?.phone || '',
//     gender: userData?.gender || '',
//     community: userData?.community || '',
//     image: userData?.image || '',
//   })

//   //   // Form state
//   //   const [form, setForm] = useState({
//   //     name: "",
//   //     email: "",
//   //     phone: "",
//   //     password: "",
//   //     gender: "",
//   //     image: null,
//   //   });

//   //   // Pre-fill form
//   //   useEffect(() => {
//   //     if (userData) {
//   //       setForm({
//   //         name: userData.name || "",
//   //         email: userData.email || "",
//   //         phone: userData.phone || "",
//   //         password: "",
//   //         gender: userData.gender || "",
//   //         image: null,
//   //       });
//   //     }
//   //   }, [userData]);

//   // Handle input change
//   const handleChange = e => {
//     if (e.target.name === 'image') {
//       setForm({ ...form, image: e.target.files[0] })
//     } else {
//       setForm({ ...form, [e.target.name]: e.target.value })
//     }
//   }

//   // Submit
//   const handleSubmit = e => {
//     e.preventDefault()

//     const formData = new FormData()
//     Object.keys(form).forEach(key => {
//       if (form[key]) {
//         formData.append(key, form[key])
//       }
//     })

//     dispatch(updateUser({ id, formData }))
//   }

//   // Redirect after success
//   useEffect(() => {
//     if (success) {
//       dispatch(resetUserState())
//       const res = dispatch(updateUser({
//         name: form.name,
//         email: form.email,
//         password: form.password,
//         phone: form.phone,
//         gender: form.gender,
//         community: form.community,
//         image: form.image,
//       }))
//       if (res.payload?.role === 'admin') navigate('/admin')
//       else navigate('/user')
//       toast.success("User Updated successfully.")
//     }
//   }, [success, dispatch, navigate])

//   return (
//     <Card className={'w-full max-w-md mx-auto mt-8 p-2 shadow-lg'}>
//       <h2 className={'text-center text-2xl font-bold'}>Update User</h2>

//       <form onSubmit={handleSubmit} className='space-y-4 max-w-sm mx-auto mt-'>
//         <div className='flex flex-cols-2 md:flex-row gap-4'>
//           <div className='flex flex-col gap-4'>
//             <input
//               name='name'
//               value={form.name}
//               onChange={handleChange}
//               placeholder='Name'
//             />

//             <input
//               name='email'
//               value={form.email}
//               onChange={handleChange}
//               placeholder='Email'
//             />

//             <input
//               name='password'
//               type='password'
//               onChange={handleChange}
//               placeholder='New Password'
//             />
//           </div>
//           <div className='flex flex-col gap-4'>
//             <input
//               name='phone'
//               value={form.phone}
//               onChange={handleChange}
//               placeholder='Phone'
//             />

//             <select name='gender' value={form.gender} onChange={handleChange}>
//               <option value=''>Select Gender</option>
//               <option value='male'>Male</option>
//               <option value='female'>Female</option>
//             </select>
//             <input
//               name='community'
//               placeholder='Community'
//               value={form.community}
//               onChange={handleChange}
//             />
//           </div>
//         </div>

//         <input type='file' name='image' onChange={handleChange} />
//         <div className={'mx-auto text-center '}>
//           <button
//             type='submit'
//             disabled={loading}
//             className={'cursor-pointer hover:underline'}
//           >
//             {loading ? 'Updating...' : 'Update User'}
//           </button>
//         </div>
//       </form>

//       {error && <p style={{ color: 'red' }}>{error}</p>}
//     </Card>
//   )
// }

// export default UpdateUserPage
