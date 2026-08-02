import React from "react";
import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CreateProfilePage from "./pages/CreateProfilePage";
import SearchPage from "./pages/SearchPage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import SignoutPage from "./pages/SignoutPage";
import ContactPage from "./pages/ContactPage";
import PaymentPage from "./pages/PaymentPage";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/create" element={<CreateProfilePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signout" element={<SignoutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
