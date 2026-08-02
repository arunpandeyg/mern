import React from 'react'
import { Link } from 'react-router'

const FeaturedStoriesPage = () => {
  return (
    <div className='flex flex-col md:flex-row lg:flex-row shadow-md gap-5 mt-4'>
      <div className='w-full lg:w-1/2 flex flex-col gap-4'>
        {/* image */}
        <img src='/b1.png' alt='b' className='rounded-3xl object-cover' />
        {/* details */}
        <div className='flex items-center gap-2'>
          <h1 className='text-sm lg:text-lg'>01</h1>
          <span>2 Days Ago</span>
          <Link
            to='/stories/1'
            className='text-orange-500 hover:underline lg:text-lg'
          >
            Technology
          </Link>
        </div>
        {/* title */}
        <Link to='test' className='text-sm lg:text-lg font-semibold'>
          The source code is available on GitHub. A set of beautifully designed
          components that are ready to use. The source code is available on
          GitHub.
        </Link>
      </div>
      <div className='w-full lg:w-1/2 flex flex-col items-center gap-4'>
        <div className='md:h-1/3 flex justify-between gap-2'>
          <img
            src='/b2.png'
            alt='b'
            className='rounded-3xl object-cover w-1/3 aspect-video'
          />
          <div className='w-2/3 '>
            <div className='flex items-center gap-2 text-sm lg:text-base mb-1'>
              <h1 className='font-semibold lg:text-lg'>01</h1>
              <span className='text-sm text-gray-500'>2 Days Ago</span>
              <Link
                to='/stories/1'
                className='text-orange-500 hover:underline lg:text-lg'
              >
                Politics
              </Link>
            </div>
            <Link to='test' className='text-sm lg:text-lg font-semibold'>
              The source code is available on GitHub. A set of beautifully
              designed components that are ready to use.
            </Link>
          </div>
        </div>
        <div className='md:h-1/3 flex justify-between gap-2'>
          <img
            src='/b2.png'
            alt='b'
            className='rounded-3xl object-cover w-1/3 aspect-video'
          />
          <div className='w-2/3 '>
            <div className='flex items-center gap-2 text-sm lg:text-base mb-1'>
              <h1 className='font-semibold lg:text-lg'>02</h1>
              <span className='text-sm text-gray-500'>3 Days Ago</span>
              <Link
                to='/stories/1'
                className='text-orange-500 hover:underline lg:text-lg'
              >
                Politics
              </Link>
            </div>
            <Link to='test' className='text-sm lg:text-lg font-semibold'>
              The source code is available on GitHub. A set of beautifully
              designed components that are ready to use.
            </Link>
          </div>
        </div>
        <div className='md:h-1/3 flex justify-between gap-2'>
          <img
            src='/b2.png'
            alt='b'
            className='rounded-3xl object-cover w-1/3 aspect-video'
          />
          <div className='w-2/3 '>
            <div className='flex items-center gap-2 text-sm lg:text-base mb-1'>
              <h1 className='font-semibold lg:text-lg'>03</h1>
              <span className='text-sm text-gray-500'>5 Days Ago</span>
              <Link
                to='/stories/1'
                className='text-orange-500 hover:underline lg:text-lg'
              >
                Politics
              </Link>
            </div>
            <Link to='test' className='text-sm lg:text-lg font-semibold'>
              The source code is available on GitHub. A set of beautifully
              designed components that are ready to use.
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturedStoriesPage
