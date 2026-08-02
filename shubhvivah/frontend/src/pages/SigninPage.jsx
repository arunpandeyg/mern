import React from 'react'
import { Link } from 'react-router'

const SigninPage = () => {
    
  return (
    <div className=' items-center h-[470px]'>     
      <div >
        <h1 className='text-2xl font-bold text-center py-10 text-orange-700'>Sign in Page</h1>
        <form >
            <div className='flex flex-col items-center justify-center '>
                <input
                type="email"
                placeholder="Email"
                className="border border-gray-300 p-2 rounded mb-4 w-64"
                />
                <input
                type="password"
                placeholder="Password"
                className="border border-gray-300 p-2 rounded mb-4 w-64"
                />
                <button
                type="submit"
                className="bg-orange-500 text-white p-2 rounded w-64 hover:bg-orange-600 transition duration-200"
                >
                Sign In
                </button>
                <p className='text-sm mt-4'>Don't have an account? <Link to="/signup" className='text-orange-600 hover:underline'>Sign Up</Link></p>
            </div>
        </form>
      </div>
    </div>
  )
}

export default SigninPage
