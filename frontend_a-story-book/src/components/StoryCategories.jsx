import React from 'react'
import { Link } from 'react-router'

const StoryCategories = () => {
  return (
    <div>
      {/* <div className='hidden md:flex bg-white rounded-lg p-4 w-full h-10 items-center justify-center shadow-md gap-5'>
        <h1 className=''>Story Categories</h1>
      </div> */}
      <div className='bg-gray-400 text-white rounded-lg h-10 w-full mt-2 pl-2 flex gap-2 items-center justify-center shadow-md '>
        <Link
          to='/stories'
          className='bg-orange-700 text-white px-3 py-1 rounded-full cursor-pointer'
        >
          AllStories
        </Link>
        <Link
          to='/stories?category=politics'
          className='hover:bg-orange-600 text-white px-3 py-1  rounded-full cursor-pointer'
        >
          Politics
        </Link>
        <Link
          to='/stories?category=technology'
          className='hover:bg-orange-600 text-white px-3 py-1  rounded-full cursor-pointer'
        >
          Technology
        </Link>
        <Link
          to='/stories?category=sports'
          className='hover:bg-orange-600 text-white px-3 py-1  rounded-full cursor-pointer'
        >
          Sports
        </Link>
        <Link
          to='/stories?category=entertainment'
          className='hover:bg-orange-600 text-white px-3 py-1  rounded-full cursor-pointer'
        >
          Entertainment
        </Link>
        <Link
          to='/stories?category=science'
          className='hover:bg-orange-600 text-white px-3 py-1  rounded-full cursor-pointer'
        >
          Science
        </Link>
        <Link
          to='/stories?category=social'
          className='hover:bg-orange-600 text-white px-3 py-1  rounded-full cursor-pointer'
        >
          Social
        </Link>
        <Link
          to='/stories?category=commercial'
          className='hover:bg-orange-600 text-white px-3 py-1  rounded-full cursor-pointer'
        >
          Commercial
        </Link>
      </div>
    </div>
  )
}

export default StoryCategories
