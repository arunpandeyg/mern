import React from "react";
import { Link } from "react-router";
import { GoSignIn } from "react-icons/go";
import Search from "./Search";

const Navbar = () => {
  return (
    <div className="flex justify-between  p-2 bg-orange-600 text-white">
      <Link to="/" className="flex gap-3 text-center justify-center">
        <img
          src="food.png"
          className="w-10 h-10 rounded-full hover:animate-spin"
          alt=""
        />{" "}
        <h1 className="text-2xl font-bold">Local Food</h1>
      </Link>
      <div>       
        <Search />
      </div>
      <Link to="/signin" className="flex gap-3  text-2xl font-bold">
        {/* <GoSignIn className="text-2xl font-bold mt-2 " /> */}
        Sign In
      </Link>
    </div>
  );
};

export default Navbar;
