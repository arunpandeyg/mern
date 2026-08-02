import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { useDispatch } from 'react-redux'
import { signinUser } from '../store/authSlice'
import { Link, useNavigate } from 'react-router'
import { useState } from 'react'
import { Card } from '../components/ui/card'

export default function SigninPage () {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()

    const res = await dispatch(signinUser({ email, password }))

    if (res.payload?.role === 'admin') navigate('/admin')
    else navigate('/user')
  }

  return (
    <Card className={'w-full max-w-md mx-auto mt-8 p-2 shadow-lg'}>
      <h1 className='text-center text-2xl font-bold '>SignIn</h1>
      <form onSubmit={handleSubmit} className='max-w-sm space-y-4 mx-auto mt-4'>
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
        <div className={'mx-auto text-center p-4'}>
          <Button type='submit' className={'cursor-pointer'}>SignIn</Button>
          <p className='text-sm text-muted-foreground'>
            Don&apos;t have an account?{' '}
            <Link
              className='underline underline-offset-4 hover:text-primary'
              to='/signup'
            >
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </Card>
  )
}
