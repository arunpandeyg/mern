import React from 'react'

const Comment = () => {
  return (
    <div className='p-2 bg-gray-200 rounded-lg mb-4 mt-2'>
      <div className='flex items-center gap-2'>
        <img
          src='/b2.png'
          alt='user'
          className='w-12 h-12 rounded-full object-cover'
        />
        <span className='hover:underline cursor-pointer text-orange-600 text-sm'>
          ArunPandey
        </span>
        <span className='hover:underline cursor-pointer text-orange-600 text-sm'>
          2 days ago
        </span>
      </div>
      <div className='mt-2 mx-auto text-sm text-gray-600 text-justify border border-orange-300 rounded-lg p-2 bg-transparent'>
        <p>
          The source code is available on GitHub. A set of beautifully designed
          components that are ready to use.
        </p>
      </div>
      <div className='mt-2 mx-auto text-sm text-gray-600 text-justify border border-orange-300 rounded-lg p-2 bg-transparent'>
        <p>
          The source code is available on GitHub. A set of beautifully designed
          components that are ready to use.
        </p>
      </div>
      <div className='mt-2 mx-auto text-sm text-gray-600 text-justify border border-orange-300 rounded-lg p-2 bg-transparent'>
        <p>
          The source code is available on GitHub. A set of beautifully designed
          components that are ready to use.
        </p>
      </div>
      <div className='mt-2 mx-auto text-sm text-gray-600 text-justify border border-orange-300 rounded-lg p-2 bg-transparent'>
        <p>
          The source code is available on GitHub. A set of beautifully designed
          components that are ready to use.
        </p>
      </div>
     
    </div>
  )
}

export default Comment
