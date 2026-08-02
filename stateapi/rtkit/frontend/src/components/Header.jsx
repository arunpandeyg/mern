import React from "react";
import { Link } from "react-router";
import AddToCart from "./AddToCart";

function Header() {
  const isUserLoggedIn = true; // Replace with actual authentication logic
  return (
    <div className="h-15 w-full flex items-center justify-between gap-4 p-4 bg-purple-500 hover:bg-purple-600">
      <Link to="/" className="flex items-center gap-2">
        <img
          src="/rtk.png"
          alt=""
          className="h-10 w-30 hover:spin-in rounded-lg"
        />
        <span className="text-white font-bold text-xl">RTK Practice</span>
      </Link>
      <div className="flex items-center gap-4">
        <Link to="/" className="text-white font-bold text-xl">
          Home
        </Link>
        <Link to="/about" className="text-white font-bold text-xl">
          About
        </Link>
        <Link to="/products" className="text-white font-bold text-xl">
          Product
        </Link>
        <Link to="/contact" className="text-white font-bold text-xl">
          Contact
        </Link>
        <Link to="/addToCart" className="text-white font-bold text-xl">
        <AddToCart />
      </Link>
      </div>
      {isUserLoggedIn ? (
        <Link to="/signin" className="text-white font-bold text-xl">
        Sign In
      </Link>
      ) : (
        <Link to="/signup" className="text-white font-bold text-xl">
          Sign Out
        </Link>
      )}
      
      
    </div>
  );
}

export default Header;
