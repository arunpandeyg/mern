import { Routes, Route } from 'react-router'
import MainLayout from './pages/layouts/MainLayout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import SigninPage from './pages/user/SigninPage'
import SignupPage from './pages/user/SignupPage'
import SearchPage from './pages/search/SearchPage'
import ProtectedRoute from './routes/ProtectedRoute'
import AdminPage from './pages/admin/AdminPage'
import UserPage from './pages/user/UserPage'
import UpdateUserPage from './pages/user/UpdateUserPage'
import CreateUserPage from './pages/user/CreateUserPage'

function App () {
  return (
    <>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/signin' element={<SigninPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/update/:id' element={<UpdateUserPage />} />
          <Route path='create' element={<CreateUserPage />} />

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
        </Route>
      </Routes>
    </>
  )
}

export default App
