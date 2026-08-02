import React from 'react'
import Image from '../../components/image/image'
import { Card } from '@/components/ui/card'

const AuthPage = () => {
  const [isRegister, setIsRegister] = React.useState(false)
  const [error, setError] = React.useState('')
  return (
    <div className='flex justify-center items-center h-screen'>
      <Card className='flex flex-col gap-4 items-center justify-center shadow-lg p-4'>
        <Image
          path='/bims/hero.png'
          alt='Arun Pandey'
          className='w-10 h-10 rounded-full'
        />
        <h1>{isRegister ? 'Sign Up' : 'Sign In'}</h1>
        {isRegister && (
          <input
            type='text'
            id='name'
            name='name'
            required
            placeholder='Name'
            className='w-full outline-none border-none text-sm placeholder:text-orange-600'
          />
        )}
        {isRegister && (
          <input
            type='text'
            id='username'
            name='username'
            required
            placeholder='Username'
            className='w-full outline-none border-none text-sm placeholder:text-orange-600'
          />
        )}
        <input
          type='email'
          id='email'
          name='email'
          required
          placeholder='Email'
          className='w-full outline-none border-none text-sm placeholder:text-orange-600'
        />
        <input
          type='password'
          id='password'
          name='password'
          required
          placeholder='Password'
          className='w-full outline-none border-none text-sm placeholder:text-orange-600'
        />
        {error && <p className='text-red-600'>{error}</p>}
        <button className='bg-orange-600 text-white w-full py-1 rounded-md'>
          {isRegister ? 'Sign Up' : 'Sign In'}
        </button>
        {isRegister ? (
          <p>
            Already have an account?{' '}
            <span
              className='text-orange-600 cursor-pointer'
              onClick={() => setIsRegister(false)}
            >
              Sign In
            </span>
          </p>
        ) : (
          <p>
            Don't have an account?{' '}
            <span
              className='text-orange-600 cursor-pointer'
              onClick={() => setIsRegister(true)}
            >
              Sign Up
            </span>
          </p>
        )}
      </Card>
    </div>
  )
}

export default AuthPage
