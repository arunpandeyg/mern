import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { selectAuth, signout } from "../features/auth/authSlice";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { toast } from "sonner";

const Signout = () => {
    const { name } = useAppSelector(selectAuth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSignout = () => {
    dispatch(signout());
    toast.success("Logged out Successfully");
    // localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <div>
     <div>
          <h1 className="text-2xl text-white">{name}</h1>
        </div> 

        <div className="flex justify-center items-center mt-18">
          <Button
            onClick={() => handleSignout()}
            className="w-22 text-center bg-orange-600 hover:bg-orange-700 cursor-pointer text-white rounded-md "
          >
            Sign Out
          </Button>
        </div>

    </div>
  )
}

export default Signout
