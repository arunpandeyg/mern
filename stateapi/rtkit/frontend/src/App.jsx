import React from "react";
import { Routes, Route } from "react-router";
import Header from "./components/Header";
import About from "./pages/About";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import AddToCart from "./components/AddToCart";
import Products from "./pages/Products";
import SelectedProducts from "./pages/SelectedProducts";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
// import Footer from "./components/Footer";
import { Toaster } from "@/components/ui/sonner"


function App() {
  
  return (
    <div className="bg-purple-300 h-147  text-white">
      <Header />     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/addToCart" element={<AddToCart />} />
        <Route path="/selected" element={<SelectedProducts />} />
      </Routes>
      <Toaster theme="dark" position="top-right" toastOptions={{ duration: 2000 }}/>
      
      {/* <Footer className="fixed bottom-0 w-full " /> */}
    </div>
  );
}

export default App;
