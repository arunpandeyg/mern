import React from 'react'
import { Toaster } from "@/components/ui/sonner"
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import {Routes, Route} from 'react-router'
import HomePage from './pages/HomePage'
import SigninPage from './pages/users/SigninPage'


function App() {
  

  return (
    <>
      <div className='sticky top-0 z-50'> 
        <Navbar />     
      </div>
      
      <div>
       <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signin' element={<SigninPage />} />
       </Routes>
      </div>
      
      <div>
        <Footer />
      </div>
      <Toaster position="top-right" toastOptions={{ duration: 2000 }} theme="dark" />
    </>
  )
}

export default App
