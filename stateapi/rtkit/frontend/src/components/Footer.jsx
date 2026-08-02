import React from 'react'
import { Link } from 'react-router'

const Footer = () => {
  return (
    <div className="h-15 w-full flex text-center justify-between gap-2  bg-purple-500 hover:bg-purple-600 text-white">
      <Link to="/" className="flex items-center gap-2">
        <img
          src="/rtk.png"
          alt=""
          className="h-10 w-30 hover:spin-in rounded-lg"
        />       
      </Link>
      <div>
        <p className="text-center mt-4">© 2026 RTK Practice. All rights reserved.</p>
      </div>
      <div>
        <p className="text-center mt-4">Contact us: +91 9810013821</p>
      </div>
    </div>
  )
}

export default Footer
