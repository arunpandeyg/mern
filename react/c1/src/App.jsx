import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import {  Routes, Route } from "react-router";
import About from './pages/About';
import Service from './pages/Service';
import Contact from './pages/Contact';
import Missiles from './pages/Missiles';

function App() {
  

  return (
    <>
      <Header/>
      <div >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Service />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/missiles" element={<Missiles />} />
          </Routes>
        
      </div>
      <Footer/>
    </>
  )
}

export default App
