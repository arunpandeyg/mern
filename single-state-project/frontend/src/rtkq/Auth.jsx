import React, { useState, useEffect } from "react";
import { useSigninMutation, useSignupMutation } from "../service/signinApi";
import { useNavigate } from "react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "@/service/authSlice";


const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
  gender: "",
  image: "",
};
const Auth = () => {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState(initialState);
  const [showSignup, setShowSignup] = useState(false);
  const dispatch = useDispatch();
  const { name, email, password, confirmPassword, phone, gender, image } =
    formValue;

  const [
    signin,
    {
      data: signinData,
      isSuccess: isSigninSuccess,
      isError: isSigninError,
      error: signinError,
    },
  ] = useSigninMutation();
  const [
    signup,
    {
      data: signupData,
      isSuccess: isSignupSuccess,
      isError: isSignupError,
      error: signupError,
    },
  ] = useSignupMutation();

  const handleSignin = async () => {
    if (email && password) {
      await signin({ email, password });      
    } else {
      toast.error("Please fill in all required fields");
    }
  };
  
  const handleSignup = async () => {
  try {
    if (name && email && password && confirmPassword && phone && gender) {
      if (password === confirmPassword) {
        await signup({ name, email, password, phone, gender, image });
        toast.success("Sign Up Successful");
        setShowSignup(false);
      } else {
        toast.error("Passwords do not match");
      }
    } else {
      toast.error("Please fill in all required fields");
    }
  } catch (error) {
    console.error(error);
    toast.error("Failed to sign up");
  }
};

  const handleToggle = () => {
    setShowSignup(!showSignup);
  };

  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (isSigninSuccess) {
      toast.success("Sign In Successful");
      dispatch(setUser({
        user: signinData.user,
        token: signinData.token,
      }));
      setTimeout(() => {
        navigate("/rtkq/dashboard");
      }, 3000);
      
    }
    if (isSignupSuccess) {
      toast.success("Sign Up Successful");
      navigate("/rtkq/signin");
      setShowSignup(false);
    }
  }, [isSigninSuccess, isSignupSuccess]);

  useEffect(() => {
    if (isSigninError) {
      toast.error("Sign In Failed");
    }
    if (isSignupError) {
      toast.error("Sign Up Failed");
    }
  }, [isSigninError, isSignupError]);
  
  return (
    <div className="bg-gray-300/15 text-gray-700 text-center w-full h-121 gradient-to-br from-gray-300/10 to-gray-600/30 flex flex-col justify-center">
      <Card className="w-96 mx-auto bg-gray-800/50 backdrop-filter backdrop-blur-sm shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer">
        {!showSignup ? "Sign In" : "Sign Up"}
        <Form>
          <div className=" flex flex-col p-4">
            {!showSignup ? (
              <>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formValue.email}
                  onChange={(e) =>
                    setFormValue({ ...formValue, email: e.target.value })
                  }
                  className="mb-2"
                />
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formValue.password}
                  onChange={(e) =>
                    setFormValue({ ...formValue, password: e.target.value })
                  }
                  className="mb-2"
                />
              </>
            ) : (
              <>
                <Input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formValue.name}
                  onChange={(e) =>
                    setFormValue({ ...formValue, name: e.target.value })
                  }
                  className="mb-2"
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formValue.email}
                  onChange={(e) =>
                    setFormValue({ ...formValue, email: e.target.value })
                  }
                  className="mb-2"
                />
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formValue.password}
                  onChange={(e) =>
                    setFormValue({ ...formValue, password: e.target.value })
                  }
                  className="mb-2"
                />
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formValue.confirmPassword}
                  onChange={(e) =>
                    setFormValue({
                      ...formValue,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="mb-2"
                />
                <Input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  value={formValue.phone}
                  onChange={(e) =>
                    setFormValue({ ...formValue, phone: e.target.value })
                  }
                  className="mb-2"
                />
                <Input
                  type="text"
                  name="gender"
                  placeholder="Gender"
                  value={formValue.gender}
                  onChange={(e) =>
                    setFormValue({ ...formValue, gender: e.target.value })
                  }
                  className="mb-2"
                />
                <Input
                  type="file"
                  accept="image/*"
                  multiple={false}
                  name="image"
                  placeholder="Image"
                  value={formValue.image}
                  onChange={(e) =>
                    setFormValue({ ...formValue, image: e.target.value })
                  }
                  className="mb-2"
                />
              </>
            )}
            {!showSignup ? (
              <>
                <Button onClick={() => handleSignin()}>Sign In</Button>
                <p className="mt-5">
                  Don't have an account?{" "}
                  <Button
                    className={"bg-gray-300/15"}
                    onClick={() => setShowSignup(true)}
                  >
                    Sign Up
                  </Button>
                </p>
              </>
            ) : (
              <>
                <Button onClick={() => handleSignup()}>Sign Up</Button>
                <p className="mt-3">
                  Already have an account?{" "}
                  <Button
                    className={"bg-gray-300/15"}
                    onClick={() => setShowSignup(false)}
                  >
                    Sign In
                  </Button>
                </p>
              </>
            )}
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Auth;
