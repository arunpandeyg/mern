import SearchPage from '../pages/search/SearchPage'
import logo from '../assets/logo.png'
import { Button } from './ui/Button'
import { Link, useNavigate } from 'react-router'
import { useDispatch, useSelector } from "react-redux";
import { signout } from '../features/authSlice'
import { api } from '../lib/axios'
import { toast } from 'sonner'

const Navbar = () => {
  const navigate = useNavigate()
  const { user } = useSelector((s) => s.auth);
  const dispatch = useDispatch();

  const handleSignout = async () => {
    try {
      await api.post("/auth/signout");
      dispatch(signout());
      toast.success("Logged out");
      navigate("/signin");
    } catch {
      toast.error("Signout failed");
    }
  };
  return (
    <div className='h-12 flex flex-col md:flex-row justify-between items-center p-4 shadow-blue-50 md:border-b'>
      <Link to='/' className='flex items-center gap-2'>
        <img
          src={logo}
          className='w-10 h-10 img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}'
          alt='logo'
        />
        <h1>Arun Pandey CRUD</h1>
      </Link>
      <div className='flex flex-col md:flex-row gap-4 items-center'>
        <div>
          <SearchPage />
        </div>
        <div className='flex gap-4 items-center'>
          <Link to='/'>Home</Link>
          {/* <Link to='/about'>About</Link>
          <Link to='/contact'>Contact</Link> */}
        </div>
        {user ? (
          <div className='flex gap-4 items-center'>
            <p>{user.role}</p>
            <p>{user.name}</p>
            <Button
              onClick={handleSignout}
              className={
                'cursor-pointer bg-orange-500 hover:bg-amber-600 hover:underline'
              }
            >
              Sign Out
            </Button>
          </div>
        ) : ( 
        <div>
          <Button
            onClick={() => navigate('/signin')}
            className={
              'cursor-pointer bg-orange-500 hover:bg-amber-600 hover:underline'
            }
          >
            Sign In
          </Button>
        </div>
        )
        }
      </div>
    </div>
  )
}

export default Navbar
