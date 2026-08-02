import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router";
import { useSignout } from "@/hooks/useSignout";
import { useMe } from "@/hooks/useMe";

export default function Navbar() {
  const { user } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const { data, isLoading } = useMe();
  const { mutate: signout } = useSignout();
  
  if (!user) return null;
  if (isLoading) return null;

  return (
    <nav className="w-full h-12 flex justify-between p-4 border-b text-white navbar navbar-expand-lg navbar-light bg-gray-600 hover:bg-gray-700">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          Home
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/profile">
                Profile
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/signin">
                Signin
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="flex nav-link" to="/signout">
                <span>{data?.data.name}</span>
                <button onClick={() => signout()}>Signout</button>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/signup">
                Signup
              </NavLink>
            </li>
          </ul>
          <div>
            <span className="font-semibold">Hi, {user.name}</span>

            {user.role === "ADMIN" && (
              <span className="ml-2 text-xs bg-red-100 px-2 py-1 rounded">
                ADMIN
              </span>
            )}
          </div>

          <button onClick={() => dispatch(signout())}>Signout</button>
        </div>
      </div>
    </nav>
  );
}




// import React from 'react';
// import { useSelector, useDispatch } from "react-redux";
// import { signout } from "../store/authSlice";

// const Navbar = () => {
//   const { user } = useSelector((s) => s.auth);
//   const dispatch = useDispatch();

//   if (!user) return null;

//   return (
//     <nav className="w-full h-15 flex justify-between p-4 border-b text-white bg-gray-800           hover:bg-gray-900 sticky top-0 z-99">
//       <div>
//         <span className="font-semibold">
//           Hi, {user.name}
//         </span>

//         {user.role === "ADMIN" && (
//           <span className="ml-2 text-xs bg-red-100 px-2 py-1 rounded">
//             ADMIN
//           </span>
//         )}
//       </div>

//       <button onClick={() => dispatch(signout())}>
//         Sign out
//       </button>
//     </nav>
//   );
// }

// export default Navbar;