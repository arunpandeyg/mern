import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useAppDispatch } from "../hooks/hooks";
import { setUser } from "../features/auth/authSlice";
import {
  useSigninMutation,
  useSignupMutation,
} from "../service/authApi";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
  gender: "",
  image: null as File | null, // ✅ File, not string
};

const AuthPage = () => {
  const [formValue, setFormValue] = useState(initialState);
  const {
    name,
    email,
    password,
    confirmPassword,
    phone,
    gender,
    image,
  } = formValue;

  const [showSignup, setShowSignup] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [
    signin,
    { data: signinData, isSuccess: isSigninSuccess },
  ] = useSigninMutation();

  const [
    signup,
    { data: signupData, isSuccess: isSignupSuccess },
  ] = useSignupMutation();

  // ===============================
  // HANDLE INPUT CHANGE
  // ===============================
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === "image" && files) {
      setFormValue({ ...formValue, image: files[0] }); // ✅ File
    } else {
      setFormValue({ ...formValue, [name]: value });
    }
  };

  // ===============================
  // SIGN IN
  // ===============================
  const handleSignin = async () => {
    if (!email || !password) {
      return toast.error("Please enter email and password");
    }

    try {
      await signin({ email, password }).unwrap();
    } catch (err: any) {
      toast.error(err?.data?.message || "Signin failed");
    }
  };

  // ===============================
  // SIGN UP
  // ===============================
  const handleSignup = async () => {
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    if (!image) {
      return toast.error("Please upload an image");
    }

    // ✅ Convert formValue → FormData (THIS WAS MISSING)
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phone", phone);
    formData.append("gender", gender);
    formData.append("image", image);

    try {
      await signup(formData).unwrap();
    } catch (err: any) {
      toast.error(err?.data?.message || "Signup failed");
    }
  };

  // ===============================
  // EFFECTS
  // ===============================
  useEffect(() => {
    if (isSignupSuccess && signupData) {
      toast.success("Signup successful");
      localStorage.setItem("user", JSON.stringify(signupData.user));
      dispatch(setUser(signupData.user));
      navigate("/");
    }

    if (isSigninSuccess && signinData) {
      toast.success("Signin successful");
      localStorage.setItem("user", JSON.stringify(signinData.user));
      dispatch(setUser(signinData.user));
      navigate("/");
    }
  }, [
    isSignupSuccess,
    isSigninSuccess,
    signupData,
    signinData,
    dispatch,
    navigate,
  ]);

  // ===============================
  // UI
  // ===============================
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-6 rounded-lg w-80">
        <h2 className="text-xl text-center mb-4">
          {showSignup ? "Sign Up" : "Sign In"}
        </h2>

        {showSignup && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={handleChange}
            className="input"
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
          className="input"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
          className="input"
        />

        {showSignup && (
          <>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleChange}
              className="input"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={phone}
              onChange={handleChange}
              className="input"
            />

            <input
              type="text"
              name="gender"
              placeholder="Gender"
              value={gender}
              onChange={handleChange}
              className="input"
            />

            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="input"
            />
          </>
        )}

        <button
          onClick={showSignup ? handleSignup : handleSignin}
          className="bg-green-600 w-full py-2 mt-4 rounded"
        >
          {showSignup ? "Sign Up" : "Sign In"}
        </button>

        <p className="text-sm mt-3 text-center">
          {showSignup ? (
            <>
              Already have an account?{" "}
              <span
                className="text-orange-400 cursor-pointer"
                onClick={() => setShowSignup(false)}
              >
                Sign In
              </span>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <span
                className="text-orange-400 cursor-pointer"
                onClick={() => setShowSignup(true)}
              >
                Sign Up
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthPage;










// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router";
// import { Card } from "../components/ui/card";
// import { useSigninMutation, useSignupMutation } from "../service/authApi";
// import { toast } from "sonner";
// import { useAppDispatch } from "../hooks/hooks";
// import { setUser } from "../features/auth/authSlice";

// const initialState = {
//   name: "",
//   email: "",
//   password: "",
//   confirmPassword: "",
//   phone: "",
//   gender: "",
//   image: "",
// };

// const AuthPage = () => {
//   const [formValue, setFormValue] = useState(initialState);
//   const { name, email, password, confirmPassword, phone, gender, image } =
//     formValue;
//   const [showSignup, setShowSignup] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();

//   const [
//     signin,
//     {
//       data: signinData,
//       isSuccess: isSigninSuccess,
//       isError: isSigninError,
//       error: signinError,
//     },
//   ] = useSigninMutation();

//   const [
//     signup,
//     {
//       data: signupData,
//       isSuccess: isSignupSuccess,
//       isError: isSignupError,
//       error: signupError,
//     },
//   ] = useSignupMutation();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormValue({
//       ...formValue,
//       [e.target.name]: e.target.value,
//     });    
//   };

//   const handleSignin = async () => {
//     if (email && password) {
//       await signin({ email, password });
//       console.log(signinData);
//     } else {
//       toast.error("Please enter email and password");
//     }
//   };
//   const handleSignup = async () => {
//     if (password !== confirmPassword) {
//       return toast.error("Passwords do not match");
//     }
//     if (
//       name &&
//       email &&
//       password &&
//       confirmPassword &&
//       phone &&
//       gender &&
//       image
//     ) {
//       const res = await signup({
//         name,
//         email,
//         password,
//         phone,
//         gender,
//         image,
//       });
//       console.log(res);
//     } else {
//       toast.error("Please fill all the fields");
//     }
//   };

//   useEffect(() => {
//     if (isSignupSuccess) {
//       toast.success("Signup successful");
//       localStorage.setItem("user", JSON.stringify(signupData.user));    
//       dispatch(setUser(signupData.user));
//       navigate("/");
//     }
//     if (isSigninSuccess) {
//       toast.success("Signin successful");
//       localStorage.setItem("user", JSON.stringify(signinData.user));
//       dispatch(setUser(signinData.user));
//       navigate("/");
//     }
//   }, [isSignupSuccess, isSigninSuccess]);


//   return (
//     <div className="bg-gray- text-white text-center w-full h-auto  gradient-to-br from-gray-300 to-gray-600/30 flex flex-col justify-center mb-5.5">
//       <Card className="w-76 h-auto  mx-auto text-white text-xl bg-gray-800 not-first:shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out">
//         <div className=" flex flex-col pl-4 pr-4 items-center">
//           <h2 className="text-2xl uppercase mb-4">
//             {!showSignup ? "Sign In" : "Sign Up"}
//           </h2>
//           {showSignup && (
//             <>
//               <div>
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="Name"
//                   value={name}
//                   onChange={handleChange}
//                   className="w-58 rounded mb-2 border-none bg-gray-700 text-sm"
//                 />
//               </div>
//             </>
//           )}
//           <div>
//             <input
//               type="email"
//               name="email"
//               placeholder="email@example.com"
//               value={email}
//               onChange={handleChange}
//               className="w-58 rounded mb-4 border-none bg-gray-700 text-sm"
//             />
//           </div>
//           <div>
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={password}
//               onChange={handleChange}
//               className="w-58 rounded mb-4 border-none bg-gray-700 text-sm"
//             />
//           </div>
//           {showSignup && (
//             <>
//               <div className="">
//                 <div>
//                   <input
//                     type="password"
//                     name="confirmPassword"
//                     placeholder="Confirm Password"
//                     value={confirmPassword}
//                     onChange={handleChange}
//                     className="w-58 rounded mb-2 border-none bg-gray-700 text-sm"
//                   />
//                 </div>
//                 <div>
//                   <input
//                     type="text"
//                     name="phone"
//                     placeholder="Phone"
//                     value={phone}
//                     onChange={handleChange}
//                     className="w-58 rounded mb-2 border-none bg-gray-700 text-sm"
//                   />
//                 </div>
//                 <div>
//                   <input
//                     type="text"
//                     name="gender"
//                     placeholder="Gender"
//                     value={gender}
//                     onChange={handleChange}
//                     className="w-58 rounded mb-2 border-none bg-gray-700 text-sm"
//                   />
//                 </div>
//                 <div>
//                   <input
//                     type="text"
//                     name="image"
//                     placeholder="Image"
//                     value={image}
//                     onChange={handleChange}
//                     className="w-58 rounded mb-2 border-none bg-gray-700 text-sm"
//                   />
//                 </div>
//               </div>
//             </>
//           )}
//           {!showSignup ? (
//             <button
//               type="button"
//               onClick={() => handleSignin()}
//               className="bg-green-600 rounded w-30 cursor-pointer mt-5"
//             >
//               Sign In
//             </button>
//           ) : (
//             <button
//               type="button"
//               onClick={() => handleSignup()}
//               className="bg-green-600 rounded w-30 cursor-pointer mt-5"
//             >
//               Sign Up
//             </button>
//           )}
//         </div>
//         <div className="text-sm ">
//           {!showSignup ? (
//             <p>
//               Don't have an account?{" "}
//               <span
//                 className="cursor-pointer underline text-orange-600"
//                 onClick={() => setShowSignup(true)}
//               >
//                 Sign Up
//               </span>
//             </p>
//           ) : (
//             <p>
//               Already have an account?{" "}
//               <span
//                 className="cursor-pointer underline text-orange-600"
//                 onClick={() => setShowSignup(false)}
//               >
//                 Sign In
//               </span>
//             </p>
//           )}
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default AuthPage;
