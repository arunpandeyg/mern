import React from 'react'
import { Link } from 'react-router'


function Header() {
  return (
    <header className='flex justify-between items-center p-4 bg-blue-500 text-white'>
      <Link to="/"><h1 className='text-3xl font-bold '>Arun Pandey</h1></Link>
        <nav>           
          <ul className='flex space-x-4'>
            <Link to='/'> <li> Home</li> </Link>
            <Link to='/about'> <li>About</li> </Link>
            <Link to='/service'> <li>Services</li> </Link>
            <Link to='/contact'> <li>Contact</li> </Link>
          </ul>
        </nav>
    </header>
  )
}

export default Header
