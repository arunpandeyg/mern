import React from 'react'
import { FaSave } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router';

const PostMenuActions = () => {
  return (
    <div className=''>
        <h1 className='text-center bg-orange-600 text-white px-2 py-1 rounded-full'>Actions</h1>
        <div className='flex items-center justify-between gap-4 mt-4'>
          <Link className='flex items-center gap-2 text-sm'><FaSave />Save</Link>
          <Link className='flex items-center gap-2 text-sm'><MdDelete />Delete</Link>
        </div>
        <h2 className='text-center mt-4 bg-orange-600 text-white px-2 py-1 rounded-full'>Categories</h2>
        <div className='flex flex-col items-center justify-between gap-2 mt-2 text-sm'>
          <Link className='text-gray-600 hover:bg-orange-500 hover:text-white hover:px-2 hover:py-1 hover:rounded-full ease-in-out'>AI</Link>
          <Link className='text-gray-600 hover:bg-orange-500 hover:text-white hover:px-2 hover:py-1 hover:rounded-full ease-in-out'>Technology</Link>
          <Link className='text-gray-600 hover:bg-orange-500 hover:text-white hover:px-2 hover:py-1 hover:rounded-full ease-in-out'>Politics</Link>          
          <Link className='text-gray-600 hover:bg-orange-500 hover:text-white hover:px-2 hover:py-1 hover:rounded-full ease-in-out'>Sports</Link>
          <Link className='text-gray-600 hover:bg-orange-500 hover:text-white hover:px-2 hover:py-1 hover:rounded-full ease-in-out'>Entertainment</Link>
          <Link className='text-gray-600 hover:bg-orange-500 hover:text-white hover:px-2 hover:py-1 hover:rounded-full ease-in-out'>Business</Link> 
          <Link className='text-gray-600 hover:bg-orange-500 hover:text-white hover:px-2 hover:py-1 hover:rounded-full ease-in-out'>Others</Link>          
        </div>
    </div>
  )
}

export default PostMenuActions
