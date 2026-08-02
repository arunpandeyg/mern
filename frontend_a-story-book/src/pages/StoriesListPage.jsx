import React from 'react'
import StoryCategories from '../components/StoryCategories'
import StoryListItem from '../components/StoryListItem'

const StoriesListPage = () => {
  return (
    <div>
      <div className=' flex flex-col bg-gray-200 text-gray-500 rounded-lg h-10 w-full gap-2 shadow-md mx-auto'>
        <StoryCategories />
      </div>
      <div className='flex flex-col gap-4 mt-4 mb-4'>
        <h1 className='text-gray-600 mx-auto mt-2'>Recent Stories</h1>
        <StoryListItem />
      </div>
    </div>
  )
}

export default StoriesListPage
