import React from 'react'
import Search from './Search'
import { Link } from 'react-router'
import {Label} from '../components/ui/label'
import {Input} from '../components/ui/input'


const SideMenu = () => {
  return (
    <div className='flex flex-col gap-2 text-sm sticky top-0'>
      <Search />
      <h2 className='text-center text-sm'>Filter</h2>
      <div className='flex flex-col  gap-2 text-sm '>
       <Label>
        <Input type='radio' name='sort' value='newest' className='appearance-none w-4 h-4 border-[1.5px] border-orange-500 checked:bg-orange-400 rounded cursor-pointer mr-2 ' />
        Newest
       </Label>
       <Label>
        <Input type='radio' name='sort' value='newest' className='appearance-none w-4 h-4 border-[1.5px] border-orange-500 checked:bg-orange-400 rounded cursor-pointer mr-2 ' />
        Newest
       </Label>
       <Label>
        <Input type='radio' name='sort' value='popular' className='appearance-none w-4 h-4 border-[1.5px] border-orange-500 checked:bg-orange-400 rounded cursor-pointer mr-2 ' />
        Most Popular
       </Label>
       <Label>
        <Input type='radio' name='sort' value='trending' className='appearance-none w-4 h-4 border-[1.5px] border-orange-500 checked:bg-orange-400 rounded cursor-pointer mr-2 ' />
        Trending
       </Label>
       <Label>
        <Input type='radio' name='sort' value='oldest' className='appearance-none w-4 h-4 border-[1.5px] border-orange-500 checked:bg-orange-400 rounded cursor-pointer mr-2 ' />
        Oldest
       </Label>
      </div>
      <h2 className='text-center text-sm'>Categories</h2>
      <div className='flex flex-col items-center justify-between gap-2 text-sm '>
        <Link
          to='/stories'
          className='text-gray-600 hover:bg-orange-500 hover:text-white hover:px-2 hover:py-1 hover:rounded-full ease-in-out'
        >
          All
        </Link>
        <Link
          to='/stories?category=politics'
          className='text-gray-600 hover:bg-orange-500 hover:text-white hover:px-2 hover:py-1 hover:rounded-full ease-in-out'
        >
          Politics
        </Link>
        <Link
          to='/stories?category=technology'
          className='text-gray-600 hover:bg-orange-500 hover:text-white hover:px-2 hover:py-1 hover:rounded-full ease-in-out'
        >
          Technology
        </Link>
        <Link
          to='/stories?category=sports'
          className='text-gray-600 hover:bg-orange-500 hover:text-white hover:px-2 hover:py-1 hover:rounded-full ease-in-out'
        >
          Sports
        </Link>
        <Link
          to='/stories?category=entertainment'
          className='text-gray-600 hover:bg-orange-500 hover:text-white hover:px-2 hover:py-1 hover:rounded-full ease-in-out'
        >
          Entertainment
        </Link>
        <Link
          to='/stories?category=business'
          className='text-gray-600 hover:bg-orange-500 hover:text-white hover:px-2 hover:py-1 hover:rounded-full ease-in-out'
        >
          Business
        </Link>
        <Link
          to='/stories?category=others'
          className='text-gray-600 hover:bg-orange-500 hover:text-white hover:px-2 hover:py-1 hover:rounded-full ease-in-out'
        >
          Others
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

export default SideMenu
