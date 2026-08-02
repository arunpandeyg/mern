import React from 'react'
import { Link } from 'react-router'

const LandingComp = () => {
  return (
    <div className='relative w-full h-86 items-center justify-center bg-gray-200 shadow-md overflow-hidden'>
      <div className='w-full h-86 '>
        <img src="/s2.png" alt="Story Book"  className='w-full h-full object-cover'/>
      </div>
      <div className='flex flex-col gap-6 items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white'>
        <h1 className='text-4xl font-bold text-center'>
          Welcome to Story Book
        </h1>
        <p className='text-lg text-center'>
          Discover amazing stories from around the world
        </p>
        <div className='flex flex-col sm:flex-row gap-4'>
          <Link  to='/featured'  className='outline-solid bg-orange-500/60 hover:bg-orange-600 text-white font-bold py-1 px-4 rounded'>
            Featured
          </Link>
          {/* <Link  to='/trending'  className='outline-solid bg-green-500/60 hover:bg-green-600 text-white font-bold py-1 px-4 rounded'>
            Trending
          </Link> */}
          <Link  to='/explore'  className='outline-solid bg-yellow-500/60 hover:bg-yellow-600 text-white font-bold py-1 px-4 rounded'>
            Explore
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LandingComp
