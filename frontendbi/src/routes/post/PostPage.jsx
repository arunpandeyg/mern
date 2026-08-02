import React from 'react'
import Image from '../../components/image/image'
import PostInteractions from '@/components/postInteraction/PostInteractions'
import { Link } from 'react-router'
import { FaArrowLeft } from 'react-icons/fa'
import Comments from '@/components/comments/Comments'


const PostPage = () => {
  return (
    <div>
      <div className='container flex flex-col md:flex-row mx-auto gap-5 mt-10'>
        <div className='w-1/2 bg-transparent'>
          <Image
            path='bims/bharat.png'
            alt='Arun Pandey'
            className={'w-full h-full object-cover '}
          />
        </div>
        <div className='w-1/2 bg-gray-100'>
          <PostInteractions />
          <Link to='/bim*' className='flex items-center gap-2 ml-2 mt-2'>
            <Image
              path='bims/hero.png'
              alt='Arun Pandey'
              className={'w-10 h-10 rounded-full'}
            />
            <span>Arun Pandey</span>
          </Link>
          <Comments />
        </div>
      </div>
      <FaArrowLeft className='bg-orange-500 hover:bg-orange-600 rounded-full p-1 cursor-pointer hover:transform hover:scale-110 duration-300 ease-in-out text-2xl text-white mx-auto mt-5 ' />
    </div>
  )
}

export default PostPage
