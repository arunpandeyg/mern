import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMe } from './store/authSlice'
import LoaderOverlay from './components/LoaderOverlay'
import { Routes, Route } from 'react-router'
import { Toaster } from './components/ui/sonner'
import MainLayout from './layouts/MainLayout'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import SigninPage from './pages/SigninPage'
import UserPage from './pages/UserPage'
import AdminPage from './pages/AdminPage'
import ProfilePage from './pages/ProfilePage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import DonorsPage from './pages/DonorsPage'
import DonatePage from './pages/DonatePage'
import WorksPage from './pages/WorksPage'
import BoardMembersPage from './pages/BoardMembersPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import ProtectedRoute from './middlewares/ProtectedRoute'

function App () {
  const dispatch = useDispatch()
  const { loading } = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(fetchMe())
  }, [])

  if (loading) return <div className='text-center justify-center text-2xl'>Loading...</div>
  return (
    <>
      <div>
        <Navbar />
        {loading && <LoaderOverlay />}
        <Routes>
          <Route path='/' element={<MainLayout />}>
            <Route path='/' element={<HomePage />} />
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
            <Route path='/about' element={<AboutPage />} />
            <Route path='/contact' element={<ContactPage />} />
            <Route path='/donors' element={<DonorsPage />} />
            <Route path='/donate' element={<DonatePage />} />
            <Route path='/works' element={<WorksPage />} />
            <Route path='/board' element={<BoardMembersPage />} />
            <Route path='/privacy' element={<PrivacyPolicyPage />} />
          </Route>
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/signin' element={<SigninPage />} />
        </Routes>
        <Toaster
          position='top-right'
          toastOptions={{
            duration: 3000,
            style: { background: '#333', color: '#fff' },
            success: { style: { background: '#333', color: '#fff' } },
            error: { style: { background: '#333', color: '#fff' } },
            loading: { style: { background: '#333', color: '#fff' } }
          }}
        />
      </div>
    </>
  )
}

export default App
