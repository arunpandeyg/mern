import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { signupUser } from '../store/authSlice'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router'

export default function SignupPage () {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [gender, setGender] = useState('')
  const [phone, setPhone] = useState('')
  const [role, setRole] = useState('user')
  const [image, setImage] = useState(null)

  const handleSubmit = e => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('name', name)
    formData.append('email', email)
    formData.append('password', password)
    formData.append('gender', gender)
    formData.append('phone', phone)
    formData.append('role', role)
    formData.append('image', image)

    dispatch(signupUser(formData))
    toast.success('Signup successful!')
    setTimeout(() => {
      navigate('/signin')
    }, 3000)
    
  }

  return (
    <div className=' w-full h-72'>
      <form
        onSubmit={handleSubmit}
        className='space-y-4 max-w-sm items-center mx-auto mt-2 p-6 border border-gray-300 rounded-lg shadow-md bg-white/70'
      >
        <h1 className='text-center '>Signup</h1>
        <div className='flex gap-4'>
          <Input
            placeholder='Name'
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <Input
            type='email'
            placeholder='Email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <Input
            placeholder='Password'
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className='flex gap-4'>
          <Input
            placeholder='Gender'
            value={gender}
            onChange={e => setGender(e.target.value)}
          />

          <Input
            placeholder='Phone'
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />

          <Input
            placeholder='Role'
            value={role}
            onChange={e => setRole(e.target.value)}
          />
        </div>

        <Input
          type='file'
          accept='image/*'
          onChange={e => setImage(e.target.files[0])}
        />
        <div className='flex justify-center items-center'>
          <Button type='submit' className={'mx-auto cursor-pointer'}>
            Signup
          </Button>
          <p className='ml-2 text-sm justify-center'>Already have an account? <Link to='/signin' className='text-orange-500 hover:underline'>Signin</Link></p>
        </div>
      </form>
    </div>
  )
}
