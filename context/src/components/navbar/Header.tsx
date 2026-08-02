import { Link } from "react-router"


const Header = () => {
    const isSignedIn = false;
  return (
    <div className="flex justify-between p-2 bg-purple-950 hover:bg-purple-900 text-white text-2xl font-black">
      <Link to="/">
      <img src="rtk.png" alt="redux toolkit" className="w-30 h-10 rounded-lg" />
      </Link>
      <div className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <div>
        {
          isSignedIn ? <Link to="/signout">Signout</Link> : <Link to="/signin">Signin</Link>
        }        
        
      </div>
    </div>
  )
}

export default Header
