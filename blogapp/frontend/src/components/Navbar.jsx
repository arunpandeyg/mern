import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
const Navbar = () => {
  const { user, logoutUser } = useContext(StoreContext);
  return (
    <nav className="bg-white p-2 sticky top-0">
      <div className="flex justify-between items-center ">
        {/* logo */}
        <div className="flex gap-2 items-center text-center justify-center">
          <Link to={"/"} className="w-10 h-10 rounded-full ">
            <img src={assets.logo} alt="" className="w-10 h-10 rounded-full" />
          </Link>
          <p className="hidden sm:block text-xl">
            Arun <span className="font-bold text-xl">Pandey</span>
          </p>
        </div>

        {/* center content */}
        <ul className="hidden sm:flex gap-5 text-xl font-normal justify-center items-center text-gray-700">
          <Link
            to="/"
            className="cursor-pointer hover:text-orange-500 duration-300"
          >
            Home
          </Link>
          <Link
            to="/blogs"
            className="cursor-pointer hover:text-orange-500 duration-300"
          >
            Stories
          </Link>
          <Link
            to="/about"
            className="cursor-pointer hover:text-orange-500 duration-300"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="cursor-pointer hover:text-orange-500 duration-300"
          >
            Contact
          </Link>
        </ul>

        {user ? (
          <div className="flex gap-2">
            <Link
              to={"/dashboard"}
              className="bg-black px-3 py-1 rounded-full text-white"
            >
              Dashboard
            </Link>
            <button
              onClick={logoutUser}
              className="bg-orange-500 text-white px-3 py-1 rounded-full cursor-pointer hover:bg-orange-600 duration-300"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to={"/login"}
            className="bg-orange-500 text-white px-4 py-1 rounded-full cursor-pointer hover:bg-orange-600 duration-300"
          >
            Signin
          </Link>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
