
import {Routes, Route} from 'react-router'
import HomePage from './pages/home/HomePage'
import AboutPage from './pages/home/AboutPage'
import ContactPage from './pages/home/ContactPage'
import SigninPage from './pages/user/SigninPage'
import SignupPage from './pages/user/SignupPage'
import SignoutPage from './pages/user/SignoutPage'
import Header from './components/navbar/Header'
import Footer from './components/navbar/Footer'
import { Toaster } from './components/ui/sonner'


function App() {
  

  return (
    <>

    <div className="w-full h-147 bg-purple-200">
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/about" element={<AboutPage/>}/>
        <Route path="/contact" element={<ContactPage/>}/>
        <Route path="/signin" element={<SigninPage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/signout" element={<SignoutPage/>}/>
      </Routes>
      <Toaster position='top-right' duration={2000} theme='dark' />
      <Footer/>
    </div>
      
    </>
  )
}

export default App
