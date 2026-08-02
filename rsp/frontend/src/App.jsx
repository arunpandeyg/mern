import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMe } from './store/authSlice'
import { Routes, Route } from 'react-router'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import SigninPage from './pages/SigninPage'
import ProfilePage from './pages/ProfilePage'
import PrivacyPage from './pages/PrivacyPage'
import { Toaster } from 'sonner'
import UserPage from './pages/UserPage'
import AdminPage from './pages/AdminPage'
import ProtectedRoute from './routes/ProtectedRoute'
import Navbar from './components/Navbar'
import LoaderOverlay from './components/LoaderOverlay'

function App () {
  const dispatch = useDispatch()
  const { loading } = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(fetchMe())
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <>
      <div className=''>
        <Navbar /> 
        {/* Global loader overlay */}
        {loading && <LoaderOverlay />}      
         {/* {loading && (
        <div className="fixed inset-0 bg-white/70 grid place-items-center z-50">
          Loading...
        </div>
      )} */}
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/signin' element={<SigninPage />} />
          <Route
            path='/user'
            element={
              <ProtectedRoute role='user'>
                <UserPage />
              </ProtectedRoute>
            }
          />

          <Route
            path='/admin'
            element={
              <ProtectedRoute role='admin'>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/privacy' element={<PrivacyPage />} />
        </Routes>
        <Toaster />
        <Footer />
      </div>
    </>
  )
}

export default App
