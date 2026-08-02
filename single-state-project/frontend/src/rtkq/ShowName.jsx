import { selectAuth, signout } from "@/service/authSlice";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

const ShowName = () => {
  const { name } = useSelector(selectAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignout = () => {
    dispatch(signout());
    toast.success("Signout successful");
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <div className="bg-gray-300/15 text-gray-700 text-center w-full h-121 gradient-to-br from-gray-300/10 to-gray-600/30 flex flex-col justify-center">
      <div className="flex flex-col items-center gap-2">
        <p>{name}</p>
        <button onClick={() => handleSignout()} className="mb-2 overflow-hidden">Signout</button>
      </div>
    </div>
  );
};
export default ShowName;