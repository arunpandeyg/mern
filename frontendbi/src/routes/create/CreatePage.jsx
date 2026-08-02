import React from 'react'
import Image from '../../components/image/image'
import { IoCloudUploadOutline } from "react-icons/io5";

const CreatePage = () => {
  return (
    <div className=' gap-5'>
      <div className='flex w-full h-5  justify-end gap-5'>
        <h1 className='text-orange-600 cursor-pointer'>Create Bims</h1>
        <button className='mr-10 text-orange-600 cursor-pointer'>Publish</button>
      </div>

      <div className='flex sm:flex-cols-2 md:flex-row mt-5 gap-5 justify-center'>
        <div className='w-1/3  border border-gray-200 solid rounded-lg relative'>
          <div className=''>
            <IoCloudUploadOutline className='w-10 h-10 mt-10 mx-auto rounded-lg cursor-pointer'/>

            {/* <Image
              path='bims/hero.png '
              alt='Arun Pandey'
              className='w-50 h-50 object-cover rounded-lg '
            /> */}
            <span className='text-sm pl-23 cursor-pointer'>Add Image file</span>
          </div>
          <div className='w-full border border-gray-200 solid rounded-lg text-sm absolute bottom-2 '>
            <small className='p-1'>
              We recommend high quality
               images &lt;20 &lt;200 mb
            </small>
          </div>
        </div>
        <form className='w-1/3 border border-gray-200 solid rounded-lg text-sm gap-2'>
          <div className='flex gap-2'>
            <label className='text-sm'>Title</label>
            <input
              type='text'
              placeholder='Add a title'
              name='title'
              id='title'
              className='w-full border border-gray-200 solid rounded-lg text-sm p-1'
            />
          </div>
          <div className='flex gap-2'>
            <label className='text-sm'>Desc</label>
            <textarea
              type='text'
              placeholder='Add Description'
              name='description'
              id='description'
              className='w-full border border-gray-200 solid rounded-lg text-sm p-1'
            />
          </div>
          <div className='flex gap-2'>
            <label className='text-sm'>Link  </label>
            <input
              type='text'
              placeholder='Add Link'
              name='link'
              id='link'
              className='w-full border border-gray-200 solid rounded-lg text-sm p-1'
            />
          </div>
          <div className='flex gap-2'>
            <label className='text-sm'>Board</label>
            <select name='' id=''>
              <option>Choose a Board</option>
              <option value='1'>Board 1</option>
              <option value='2'>Board 2</option>
              <option value='3'>Board 3</option>
            </select>
          </div>
          <div className='flex flex-col gap-2'>
            <label className='tags'>Tagged Topics</label>
            <input
              type='text'
              placeholder='Add Tag'
              name='tag'
              id='tag'
              className='w-full border border-gray-200 solid rounded-lg text-sm p-1'
            />
            <small>Add up to 5 topics No one will see your tags</small>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreatePage
