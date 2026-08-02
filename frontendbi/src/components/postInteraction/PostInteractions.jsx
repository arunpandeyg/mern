import React from 'react'
import { AiOutlineLike } from "react-icons/ai";
import { IoIosMore } from 'react-icons/io'
import { CiShare2 } from 'react-icons/ci'
import { IoSaveOutline } from "react-icons/io5";

const PostInteractions = () => {
  return (
    <div className='relative'>
      <div className=' text-white py-1 px-2 rounded-full absolute top-2 right-2 '>
        <button className='bg-orange-500 hover:bg-orange-600 hover:transform hover:scale-110 duration-300 ease-in-out rounded-full p-1 mr-3'>
          <AiOutlineLike />
        </button>
        <button className='bg-orange-500 hover:bg-orange-600 hover:transform hover:scale-110 duration-300 ease-in-out rounded-full p-1 mr-3'>
          <CiShare2 />
        </button>
        <button className='bg-orange-500 hover:bg-orange-600 hover:transform hover:scale-110 duration-300 ease-in-out rounded-full p-1'>
          <IoIosMore />
        </button>
        <button className='bg-orange-500 hover:bg-orange-600 hover:transform hover:scale-110 duration-300 ease-in-out rounded-full ml-3  p-1'>
          <IoSaveOutline />
        </button>
      </div>
    </div>
  )
}

export default PostInteractions
