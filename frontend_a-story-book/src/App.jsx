import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMe } from './store/authSlice'
import { Toaster } from './components/ui/sonner'
import { Routes, Route } from 'react-router'
import MainLayout from './pages/layouts/MainLayout'
import HomePage from './pages/HomePage'
import TrendingPage from './pages/TrendingPage'
import MostPopular from './pages/MostPopular'
import AuthPage from './pages/AuthPage'
import SignupPage from './pages/SignupPage'
import SigninPage from './pages/SigninPage'
import AdminPage from './pages/AdminPage'
import ProtectedRoute from './routes/ProtectedRoute'
import FeaturedStoriesPage from './pages/FeaturedStoriesPage'
import StoriesListPage from './pages/StoriesListPage'
import UserPage from './pages/UserPage'
import CreateStoryPage from './pages/CreateStoryPage'
import SingleStoryPage from './pages/SingleStoryPage'
import CreatedStoriesListPage from './pages/CreatedStoriesListPage'
import UserProfilePage from './pages/user/UserProfilePage'
import UpdateUserPage from './pages/user/UpdateUserPage'

function App () {
  const dispatch = useDispatch()
  const { loading } = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(fetchMe())
  }, [])

  if (loading)
    return (
      <div className='text-center text-2xl font-bold pt-10'>Loading...</div>
    )
  return (
    <div>
      <Toaster
        position='top-right'
        toastOptions={{
          className: 'sonner sonner-toast '
        }}
        duration={3000}
      />
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/trending' element={<TrendingPage />} />
          <Route path='/most-popular' element={<MostPopular />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/signin' element={<SigninPage />} />
          <Route path='/featured' element={<FeaturedStoriesPage />} />
          <Route path='/explore' element={<StoriesListPage />} />
          <Route path='/create-story' element={<CreateStoryPage />} />
          <Route path='/created-list' element={<CreatedStoriesListPage />} />
          <Route path='/stories/:id' element={<SingleStoryPage />} />
          <Route path='/update-user/:id' element={<UpdateUserPage />} />

          <Route
            path='/admin'
            element={
              <ProtectedRoute role='admin'>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/user'
            element={
              <ProtectedRoute role='user'>
                <UserPage />
              </ProtectedRoute>
            }
          />
          <Route path='/user/profile/:id' element={<UserProfilePage />} />
        </Route>
        <Route path='/auth' element={<AuthPage />} />
      </Routes>
    </div>
  )
}

export default App
