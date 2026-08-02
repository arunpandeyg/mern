import { Link } from "react-router";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { selectAuth, signout } from "../features/auth/authSlice";
import { toast } from "sonner";


const Header = () => {
  const { user } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  const handleSignout = () => {
    dispatch(signout());
    localStorage.removeItem("user");
    toast.success("You have been Signed out successful");
  };

  return (
    <div className="flex bg-gray-500 text-sm text-white w-full h-12 px-3 items-center justify-between shadow-md shadow-gray-200 sticky top-0 z-99">
      <Link to="/" className="flex  items-center">
        <img
          src="/p2.png"
          alt="state"
          className="w-10 h-10 rounded-full hover:animate-spin"
        />
        <span>Arun Pandey</span>
      </Link>
      <div className="flex gap-3">
        <div className="flex gap-3">
          <Link to="/" className="flex  items-center">
            Home
          </Link>
          <Link to="/dashboard" className="flex  items-center">
            Dashboard
          </Link>
          <Link to="/profiles" className="flex  items-center">
            Profiles
          </Link>
        </div>
        <div className="flex gap-3">
          <span className="text-yellow-500">{user}</span>
          {user ? (
            <p onClick={() => handleSignout()} className="flex  items-center cursor-pointer hover:text-red-500">
              Sign Out
            </p>
          ) : (
            <Link to="/auth" className="flex  items-center">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
