import React from 'react'
import { Link } from 'react-router'
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import PostMenuActions from '../components/PostMenuActions';
import Commercial from '../components/commercial/Commercial';
import Comments from '../components/Comments';



const SingleStoryPage = () => {
  return (
    <div className='container mx-auto flex flex-col h-screen gap-4'>
      {/* Details */}
      <div className='flex gap-4'>
        <div className='hidden md:block 2/5 p-5 mt-2'>
          <img src='/g.png' alt='ganesh' className='w-100  rounded-lg' />
        </div>
        <div className='lg:3/5 flex flex-col gap-4 p-5'>
          <h1>
            A set of beautifully designed components that are ready to use.
          </h1>
          <div className='flex items-center gap-2 text-gray-400 text-sm lg:text-base mb-1'>
            {' '}
            <span>Written by</span>
            <Link className='hover:underline cursor-pointer text-orange-600'>
              Ganesh
            </Link>
            <span>On</span>
            <Link className='hover:underline cursor-pointer text-orange-600'>
              Technology
            </Link>
            <span>2 Days Ago</span>
          </div>
          <p className='text-gray-500 text-sm lg:text-base'>
            The source code is available on GitHub. A set of beautifully
            designed components that are ready to use.
          </p>
          <div className='flex items-center gap-2'>
            <div className='text-gray-400 text-sm bg-green-200 w-max h-20 flex items-center justify-center rounded-lg'>
            <Commercial />
          </div>
            <div className='text-gray-400 text-sm bg-green-200 w-max h-20 flex items-center justify-center rounded-lg'>
            <Commercial />
          </div>
            <div className='text-gray-400 text-sm bg-green-200 w-max h-20 flex items-center justify-center rounded-lg'>
            <Commercial />
          </div>
          </div>
          
        </div>
      </div>
      {/* content */}
      <div className='flex flex-col md:flex-row gap-4 text-justify'>
        {/* text */}
        <div className=''>
          <p>
            The source code is available on GitHub. A set of beautifully
            designed components that are ready to use. The source code is
            available on GitHub. A set of beautifully designed components that
            are ready to use.
          </p>
          <p>
            The source code is available on GitHub. A set of beautifully
            designed components that are ready to use. The source code is
            available on GitHub. A set of beautifully designed components that
            are ready to use.
          </p>
          <p>
            The source code is available on GitHub. A set of beautifully
            designed components that are ready to use. The source code is
            available on GitHub. A set of beautifully designed components that
            are ready to use.
          </p>
          <p>
            The source code is available on GitHub. A set of beautifully
            designed components that are ready to use. The source code is
            available on GitHub. A set of beautifully designed components that
            are ready to use.
          </p>
          <p>
            The source code is available on GitHub. A set of beautifully
            designed components that are ready to use. The source code is
            available on GitHub. A set of beautifully designed components that
            are ready to use.
          </p>
          <p>
            The source code is available on GitHub. A set of beautifully
            designed components that are ready to use. The source code is
            available on GitHub. A set of beautifully designed components that
            are ready to use.
          </p>
          <p>
            The source code is available on GitHub. A set of beautifully
            designed components that are ready to use. The source code is
            available on GitHub. A set of beautifully designed components that
            are ready to use.
          </p>
          <p>
            The source code is available on GitHub. A set of beautifully
            designed components that are ready to use. The source code is
            available on GitHub. A set of beautifully designed components that
            are ready to use.
          </p>
          <p>
            The source code is available on GitHub. A set of beautifully
            designed components that are ready to use. The source code is
            available on GitHub. A set of beautifully designed components that
            are ready to use.
          </p>
        </div>
        {/* menu */}
        <div className=' px-4 h-max sticky top-8 self-start bg-white rounded-lg shadow-md w-full md:w-1/3'>
          <h2 className='text-lg font-semibold mb-4 text-center bg-orange-600 text-white px-2 py-1 rounded-full'>Author</h2>
          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-2'>
              <img
                src='/b2.png'
                alt='user'
                className='w-12 h-12 rounded-full object-cover'
              />
              <Link
                to='/profile'
                className='hover:underline cursor-pointer text-orange-600 text-sm'
              >
                ArunPandey
              </Link>
            </div>

            <p className='text-sm text-gray-500 text-justify'>
              A set of beautifully designed components that are ready to use.
            </p>
            <div className='flex gap-4 mt-4 text-justify'>
              <Link><FaFacebook /></Link>
              <Link><FaTwitter /></Link>
              <Link><FaLinkedin /></Link>
              <Link><FaInstagram /></Link>
            </div>
              <div className='flex mt-4'>
                <PostMenuActions />
              </div>
              
          </div>
        </div>
      </div>
      <Comments />
    </div>
  )
}

export default SingleStoryPage
