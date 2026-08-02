import React from 'react'
import { Routes, Route } from 'react-router'
import HomePage from './routes/home/HomePage'
import CreatePage from './routes/create/CreatePage'
import SearchPage from './routes/search/searchPage'
import ProfilePage from './routes/profile/profilePage'
import PostPage from './routes/post/PostPage'
import AuthPage from './routes/auth/AuthPage'
import MainLayout from './routes/layouts/MainLayout'
import {Toaster} from 'sonner'

function App () {
  return (
    <>
      <div className=''>
        <Routes>
          <Route path='/' element={<MainLayout />}>
            <Route path='/' element={<HomePage />} />
            <Route path='/create' element={<CreatePage />} />
            <Route path='/bim/:id' element={<PostPage />} />
            <Route path='/:username' element={<ProfilePage />} />
            <Route path='/search' element={<SearchPage />} />
            <Route path='*' element={<h1>Under Construction</h1>} />
          </Route>
          <Route path='/auth' element={<AuthPage />} />
        </Routes>
        <Toaster position='top-right' />
      </div>
    </>
  )
}

export default App
