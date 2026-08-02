import React from 'react'
import {Routes, Route} from 'react-router'
import Home from '@/pages/Home'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Signin from '@/pages/Signin'
import Signup from '@/pages/Signup'
import Signout from '@/pages/Signout'
import Profile from '@/pages/Profile'


function App() {
 

  return (
    <>
    <Header />
      <Routes>
        
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signout' element={<Signout />} />
        <Route path='/profile/:id' element={<Profile />} />
        
      </Routes>
      <Footer />
    </>
  )
}

export default App
