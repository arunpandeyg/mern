import React from 'react'

const Search = () => {
  return (
    <div className='flex justify-center items-center w-full h-[478px]'>      
      <div >
        <h1 className='text-2xl font-bold tex-center text-orange-600 ml-22 '>Search</h1>
        <form className='mt-4'>
          <input 
            type='text' 
            placeholder='Search...' 
            className='w-full p-2 border border-gray-300 rounded'
          />
          <button 
            type='submit' 
            className='mt-2 w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600'
          >
            Search
          </button>
        </form>
      </div>
    </div>
  )
}

export default Search
