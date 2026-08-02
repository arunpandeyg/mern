import React from 'react'
import { Link } from 'react-router'
import { CiShare2 } from 'react-icons/ci'
import { IoIosMore } from 'react-icons/io'
import Image from '../image/image'

const GalleryItem = ({ item }) => {
  const optimizedHeight = (372 * item.height) / item.width
  return (
    <div
      className=' w-full h-auto rounded-lg overflow-hidden shadow-md hover:transform hover:scale-105 duration-300 group relative'
      style={{ gridRowEnd: `span ${Math.ceil(item.height / 100)}` }}
    >
      <Image
        urlEndpoint={import.meta.env.VITE_URL_IK_ENDPOINT}
        path={item.media}
        alt='ArunPandey'
        w={372}
        h={optimizedHeight}
        className='w-full h-full object-cover'
      />

      {/* <img src={item.media} alt={`Gallery Item ${item.id}`} /> */}
      <Link
        to={`/bim/${item.id}`}
        className=' hidden absolute top-0 left-0 w-full h-full bg-black opacity-0 hover:opacity-50'
      />
      <button className='hidden group-hover:block absolute top-2 right-2 bg-orange-500 hover:bg-orange-600 text-white py-1 px-3 rounded-lg'>
        Save
      </button>
      <div className='hidden group-hover:block absolute bottom-2 right-2 text-white py-1 px-2 rounded-full'>
        <button className='bg-orange-500 hover:bg-orange-600 rounded-full p-1 mr-5'>
          <CiShare2 />
        </button>
        <button className='bg-orange-500 hover:bg-orange-600 rounded-full p-1'>
          <IoIosMore />
        </button>
      </div>
    </div>
  )
}

export default GalleryItem


