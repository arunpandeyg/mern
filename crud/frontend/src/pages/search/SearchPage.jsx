import  { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { searchUser } from '../../features/userSlice'

const SearchPage = () => {
  const [searchData, setSearchData] = useState('')
  const dispatch = useDispatch()

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   dispatch(searchUser(searchData))
  // }
  useEffect(() => {
    dispatch(searchUser(searchData))
  }, [searchData, dispatch])
  return (
    <div className='flex items-center gap-2'>
      <input
        type='search'
        placeholder='Search'
        aria-label='Search'
        value={searchData}
        onChange={e => setSearchData(e.target.value)}
        className='form-control bg-transparent'
      />
      <span 
      // onSubmit={handleSubmit}
       data-slot='search-icon' className='text-xl text-gray-500 cursor-pointer'>
        <FaSearch />
      </span>
    </div>
  )
}

export default SearchPage
