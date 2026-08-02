import React, { useState } from 'react'
import { Button } from '../components/ui/button'
import StoriesListPage from './StoriesListPage'
import StoryListItem from '../components/StoryListItem'
import StoryCategories from '../components/StoryCategories'
import SideMenu from '../components/SideMenu'

//postListPage
const CreatedStoriesListPage = () => {
  const [open, setOpen] = useState(false)
  return (
    <div className=''>
      <h1 className='text-gray-600 text-center mt-2'>Created Stories</h1>
      <div className='flex flex-col gap-4'>
        <div className=' flex flex-col bg-gray-200 text-gray-500 rounded-lg h-10 w-full gap-2 shadow-md mx-auto'>
          <StoryCategories />
        </div>
        <Button onClick={() => setOpen(!open)} className={'md:hidden w-max h-8 text-center justify-end text-white bg-orange-500'}>
          {open ? 'Close' : 'Filter or Search'}
        </Button>
        <div>
          <div className='flex flex-col-reverse md:flex-row gap-4 mb-3'>
            <div className='w-[80%] p-3'>
              <StoryListItem />
            </div>
            <div className={`${open ? 'block' : 'hidden'} md:block w-[20%] p-3`}>
              <SideMenu />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatedStoriesListPage
