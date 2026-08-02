import { useEffect } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router'
import { Toaster } from './components/ui/sonner'
import { useAppDispatch } from './hooks/hooks'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import Dashboard from './pages/Dashboard'
import ProfilesPage from './pages/ProfilesPage'
import PrivacyPolicy from './pages/PrivacyPolicy'
import { setUser } from './features/auth/authSlice'


const App = () => {
  const dispatch = useAppDispatch()
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  useEffect(() => {
    dispatch(setUser(user));
  }, []);

  return (
    <div>     
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />          
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profiles" element={<ProfilesPage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
        </Routes>
        <Footer/>
      </Router>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} theme="dark" style={{ zIndex: 9999 }} className="z-50 mt-4 color='ring-1 ring-black ring-opacity-5'" />     
    </div>
  )
}

export default App
