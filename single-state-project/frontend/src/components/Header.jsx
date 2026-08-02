import ShowName from "@/rtkq/ShowName";
import React from "react";
import { Link } from "react-router";

const Header = () => {
  return (
    <div className="flex bg-gray-300 text-gray-700 w-full h-15 text-center justify-between px-3 font-bold text-2xl shadow-md shadow-gray-200">
      <Link to="/" className="flex gap-4 my-3">
        <img src="/state.png" alt="state" className="w-10 h-10" />
        <h1>Home</h1>
      </Link>
      <div className="flex gap-4 items-center justify-between">
        <div>
          <Link to="/localstorage/local">Local Storage</Link>
        </div>
        <div>
          <Link to="/context/context">Context</Link>
        </div>
        <div>
          <Link to="/rtk/rtk">RTK</Link>
        </div>
        <div>
          <Link to="/rtkq/signin">RTKQ</Link>
        </div>
        <div>
          <Link to="/zustand/zustand">Zustand</Link>
        </div>
        <div>
          <ShowName />
        </div>        
        <div>
          <Link to="/rtkq/signin">Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
