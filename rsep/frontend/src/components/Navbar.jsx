import { useSelector, useDispatch } from 'react-redux'
import { signoutUser } from '../store/authSlice'
import { Button } from '../components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '../components/ui/dropdown-menu'
import { Link } from 'react-router'
import { Menu } from 'lucide-react'
import { useState } from 'react'

export default function Navbar () {
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)

  return (
    <header className='w-full h-12  sticky top-0 z-40 bg-gray-800 text-white border-b'>
      <div className='max-w-6xl mx-auto px-4 py-1 flex items-center justify-between'>
        {/* Logo */}
        <Link to='/' className='flex items-center justify-center'>
          <img
            src='/b1.png'
            alt='home'
            className='w-10 h-10 rounded-full hover:animate-spin'
          />
          <p className='text-xl ml-3'>RSEP</p>
        </Link>

        {/* Desktop Menu */}
        <div className='hidden md:flex items-center gap-4'>
          {!user && (
            <Link to='/signin'>
              <Button>Signin</Button>
            </Link>
          )}

          {user && (
            <>
              {user.role === 'admin' && (
                <Link to='/admin'>
                  <Button variant='ghost'>Admin</Button>
                </Link>
              )}

              <Link to='/user'>
                <Button variant='ghost'>Profile</Button>
              </Link>

              {/* Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='outline' className={'bg-gray-800 text-white'}>{user.email}</Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align='end'>
                  <DropdownMenuItem asChild>
                    <Link to='/user'>My Profile</Link>
                  </DropdownMenuItem>

                  {user.role === 'admin' && (
                    <DropdownMenuItem asChild>
                      <Link to='/admin'>Admin Panel</Link>
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuItem
                    onClick={() => dispatch(signoutUser())}
                    className='text-red-500'
                  >
                    Signout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant='ghost'
          className='md:hidden'
          onClick={() => setOpen(!open)}
        >
          <Menu />
        </Button>
      </div>

      {/* Mobile Nav */}
      {open && (
        <div className='md:hidden border-t px-4 py-3 space-y-2'>
          {!user && (
            <Link to='/signin' onClick={() => setOpen(false)}>
              <Button className='w-full'>Signin</Button>
            </Link>
          )}

          {user && (
            <>
              <Link to='/user' onClick={() => setOpen(false)}>
                <Button variant='ghost' className='w-full'>
                  Profile
                </Button>
              </Link>

              {user.role === 'admin' && (
                <Link to='/admin' onClick={() => setOpen(false)}>
                  <Button variant='ghost' className='w-full'>
                    Admin
                  </Button>
                </Link>
              )}

              <Button
                variant='destructive'
                className='w-full'
                onClick={() => {
                  dispatch(signoutUser())
                  setOpen(false)
                }}
              >
                Signout
              </Button>
            </>
          )}
        </div>
      )}
    </header>
  )
}
