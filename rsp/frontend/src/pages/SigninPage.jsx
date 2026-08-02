import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { signinUser } from '../store/authSlice'
import { useNavigate, Link } from 'react-router'
import { useState } from 'react'


export default function SigninPage () {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading } = useSelector(state => state.auth)
  const { error } = useSelector(state => state.auth)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    const res = await dispatch(signinUser({ email, password }))    
    if (res.payload?.role === 'admin') navigate('/admin')
    else navigate('/user')
  }
  {
    error && <p className='text-red-500'>{error}</p>
  }

  return (
    <div className='relative w-full h-64'>
      <form
        onSubmit={handleSubmit}
        className='max-w-sm space-y-4 mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-md bg-dark/70'
      >
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
        <div  className='flex justify-center gap-4 items-center'>
          <Button type='submit' disabled={loading}>
            {loading ? 'Signing in...' : 'Signin'}
          </Button>
          <p className='text-sm'>
            Don&apos;t have an account?{' '}
            <Link to='/signup' className='text-orange-500 hover:underline'>
              Signup
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}
