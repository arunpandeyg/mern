import React from 'react'
import { Input } from '../components/ui/input'
import { FaSearch } from 'react-icons/fa'

const Search = () => {
  return (
    <div className='flex items-center gap-2 rounded-md px-2 py-1'>
        <Input placeholder='Search...' />
        <span className='cursor-pointer'><FaSearch /></span>
    </div>
  )
}

export default Search
