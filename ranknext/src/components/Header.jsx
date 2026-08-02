import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-3 bg-orange-700 sticky z-99">
      <div>
        <Link href="/" className="flex items-center space-x-4">
          <img src="/hero.png" alt="logo" className="w-10 h-10 rounded-full" />
          <h1 className="text-2xl font-bold hover:underline text-white">
            Arun Pandey
          </h1>
        </Link>
      </div>
      <div className="flex gap-4">
        <Link className="text-2xl text-white hover:underline" href="/">
          Home
        </Link>
        <Link className="text-2xl text-white hover:underline" href="/about">
          About
        </Link>
      </div>
      <Link className="text-2xl text-white hover:underline" href={"/signin"}>
        Sign In
      </Link>
    </div>
  );
};

export default Navbar;
