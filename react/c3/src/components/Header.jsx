import React from 'react'
import { Link } from 'react-router'
import Button from './Button'



function Header() {
  return (
    <header className='flex justify-between items-center p-3 bg-blue-500 text-white'>
      <Link to='/'><h1 className='text-3xl font-bold '>ArunPandey</h1></Link>
        <nav>           
          <ul className='flex space-x-4'>
            <Link to='/'> <li> Home</li> </Link>
            <Link to='/about'> <li>About</li> </Link>
            <Link to='/service'> <li>Services</li> </Link>
            <Link to='/contact'> <li>Contact</li> </Link>
          </ul>
        </nav>
        <Link to='/signin'>
          <Button/>
        </Link>
    </header>
  )
}

export default Header
