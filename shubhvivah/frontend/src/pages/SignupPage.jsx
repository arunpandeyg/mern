import React from 'react'
import { Link } from 'react-router'

const SignupPage = () => {
  return (
    <div className=' items-center h-[470px]'>
     
      <div >
        <h1 className='text-2xl font-bold text-center  py-10 text-orange-700'>Sign up Page</h1>  
        <form  className='flex flex-col items-center justify-center'>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                <input
                type="text"
                placeholder="Full Name"
                className="border border-gray-300 p-2 rounded mb-4 w-64"
                />
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
                <input
                type="text"
                placeholder="Phone Number"
                className="border border-gray-300 p-2 rounded mb-4 w-64"
                />
                <input
                type="text"
                placeholder="Gender"
                className="border border-gray-300 p-2 rounded mb-4 w-64"
                />
                
            </div>
            <button
                type="submit"
                className="bg-orange-500 text-white p-2 rounded w-64 hover:bg-orange-600 transition duration-200"
                >
                Sign Up
                </button>
                <p className='text-sm mt-4'>Already have an account? <Link to="/signin" className='text-orange-600 hover:underline'>Sign In</Link></p>
        </form>      
      </div>
    </div>
  )
}

export default SignupPage
