import { Link } from "react-router"


const Footer = () => {
  return (
    <div className='flex bg-gray-500 text-sm text-white w-full h-12 px-3 items-center justify-between shadow-md shadow-gray-200'>
          <Link to="/" className="flex  items-center">
          <img src="/pen.png" alt="state" className="w-10 h-10 rounded-full " />       
        </Link>
        <div>
          <p>Copyright &copy; 2026 All rights reserved</p>
        </div>
        <Link to="/privacy">
          <p>Privacy Policy</p>
        </Link>
      </div>
  )
}

export default Footer
