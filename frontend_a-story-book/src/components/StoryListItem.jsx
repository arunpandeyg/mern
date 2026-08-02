import React from 'react'
import { Link } from 'react-router'

const StoryListItem = () => {
  return (
    <div className='container mx-auto flex flex-col md:flex-row gap-4'>
      {/* image */}
      <div>
        <img
          src='/b1.png'
          alt='b'
          className='sm:hidden md:block rounded-2xl object-cover md:w-48 md:h-32 lg:w-1/3'
        />
      </div>
      {/* details */}
      <div className='flex flex-col gap-2 lg:w-2/3'>
        <Link to='/stories/1' className='text-sm text-gray-500 hover:underline'>
          A set of beautifully designed components that are ready to use.
        </Link>
        <div className='flex items-center gap-2 text-sm'>
          <span className='text-sm'>Written By</span>
          <Link to='/author' className='text-gray-500 hover:underline'>
            Author Name
          </Link>
          <span className='text-gray-600'>On</span>
          <Link to='/date' className='text-gray-500 hover:underline'>
            Tech
          </Link>
          <span className='text-gray-600'>2 days ago</span>
        </div>
        <p className='text-gray-600 text-sm'>
          This is a brief description of the story. It provides a summary of the content and key points.
          This is a brief description of the story. It provides a summary of the content and key points.
        </p>
        <Link to='/stories/1' className='text-sm text-gray-500 hover:underline'>
          Read More
        </Link>
      </div>
    </div>
  )
}

export default StoryListItem
