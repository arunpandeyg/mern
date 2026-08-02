import React from 'react'
import Comment from './Comment'

const Comments = () => {
  return (
    <div className='flex flex-col lg:w-3/4'>
      <h1 className='text-gray-500 underline'>Comments</h1>
      <div className='flex items-center justify-between gap-4 w-full'>
        <textarea type="text" placeholder='Write a comment...' className='w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-600'/>
        <button className=' bg-orange-600 hover:bg-orange-700 text-white px-5 py-1 rounded-full cursor-pointer'>Send</button>
      </div>
      <Comment />
    </div>
  )
}

export default Comments
