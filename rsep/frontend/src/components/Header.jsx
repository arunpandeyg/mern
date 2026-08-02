import React from 'react'
import { Link } from 'react-router'

const Header = () => {
  return (
    <div className='flex justify-between p-2'>
      <div>
        <Link to='/'>
          <img src='/b1.png' alt='logo' className='w-8 h-8 rounded-full' />
        </Link>
      </div>
      <div className='flex gap-4'>
        <Link to='/donate'>Donate</Link>
        <Link to='/donors'>Donors</Link>
        <Link to='/works'>Works</Link>
        <Link to='/board'>Board</Link>
      </div>
      <div>
        <Link to='/signin'>SignIn</Link>{' '}
      </div>
    </div>
  )
}

export default Header
