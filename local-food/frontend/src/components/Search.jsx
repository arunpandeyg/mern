import React from 'react'
import { Input } from './ui/input'
import { CiSearch } from "react-icons/ci";

const Search = () => {
  return (
    <div className='flex items-center gap-2 rounded-md px-3'>
        <Input type="text" className="flex-2 border-white focus-outline-none placeholder:text-white" placeholder="Search..." />
        <CiSearch className="text-3xl font-bold"/>
    </div>
  )
}

export default Search
