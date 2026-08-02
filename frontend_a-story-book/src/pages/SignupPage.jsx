import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { signupUser } from '../store/authSlice'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import { Card } from '../components/ui/card'
import { Link } from 'react-router'

export default function SignupPage () {
  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [gender, setGender] = useState('')
  const [community, setCommunity] = useState('')

  const [image, setImage] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('name', name)
    formData.append('email', email)
    formData.append('password', password)
    formData.append('phone', phone)
    formData.append('gender', gender)
    formData.append('community', community)
    formData.append('image', image)

    dispatch(signupUser(formData))
    toast.success('Signup successful! Please signin to continue.')
    navigate('/signin')
  }

  return (
    <Card className={'w-full max-w-md mx-auto mt-5 p-2 shadow-lg'}>
      <h1 className={'text-center text-2xl font-bold'}>SignUp</h1>
      <form onSubmit={handleSubmit} className='space-y-4 max-w-sm mx-auto mt-'>
        <div className='flex flex-cols-2 md:flex-row gap-4'>
          <div className='flex flex-col gap-4'>
            <Input
              placeholder='Name'
              value={name}
              onChange={e => setName(e.target.value)}
            />

            <Input
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
          <div className='flex flex-col gap-4'>
            <Input
              placeholder='Phone'
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />

            <Input
              placeholder='Gender'
              value={gender}
              onChange={e => setGender(e.target.value)}
            />

            <Input
              placeholder='Community'
              value={community}
              onChange={e => setCommunity(e.target.value)}
            />
          </div>
        </div>
        <Input
          type='file'
          accept='image/*'
          onChange={e => setImage(e.target.files[0])}
        />
        <div className={'mx-auto text-center '}>
          <Button type='submit' className={'cursor-pointer'}>
            SignUp
          </Button>
          <p className='text-sm text-muted-foreground'>
            Already have an account? <Link to='/signin' className='text-primary hover:underline'>SignIn</Link>
          </p>
        </div>
      </form>
    </Card>
  )
}
