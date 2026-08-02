import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useState, useEffect } from "react";
import { useNavigation } from "react-router";
import { useSigninMutation, useSignupMutation } from "../service/authApi";
import { toast } from "react-hot-toast";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
  gender: "",
  image: "",
};
const AuthPage = () => {
  const [formData, setFormData] = useState(initialState);
  const [showRegister, setShowRegister] = useState(false);
  const { name, email, password, confirmPassword, phone, gender, image } =
    formData;
  const navigation = useNavigation();

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
      signupError,
    },
  ] = useSignupMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignin = async () => {
    if (email && password) {
      await signin({ email, password });
    } else {
      toast.error("Please fill in all required fields");
    }
  };

  useEffect(() => {
    if (isSigninSuccess) {
      toast.success("Signed in successfully");
      navigation("/home");
    }
  }, [isSigninSuccess]);

  const handleSignup = async () => {
    if (
      name &&
      email &&
      password &&
      confirmPassword &&
      phone &&
      gender &&
      image
    ) {
      await signup({
        name,
        email,
        password,
        confirmPassword,
        phone,
        gender,
        image,
      });
    } else {
      toast.error("Please fill in all required fields");
    }
  };

  useEffect(() => {
    if (isSignupSuccess) {
      toast.success("Signed up successfully");
      navigation("/home");
    }
  }, [isSignupSuccess]);

  const handleToggle = () => {
    setShowRegister(!showRegister);
  };

  return (
    <div className="bg-gray-300/15 text-gray-700 text-center  w-full h-118 ">
      <Card className="w-96 p-4 mx-auto mt-3 text-white shadow-lg bg-gray-700/50 backdrop-filter backdrop-blur-sm ">
        {showRegister ? (
          <div>
            <h2 className="text-xl mb-4">Register</h2>
            <form className="flex flex-col gap-2">
              <Input
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={handleChange}
              />
              <Input
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={handleChange}
              />
              <Input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
              />
              <Input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
              />

              <Input
                type="text"
                placeholder="Phone"
                value={phone}
                name="phone"
                onChange={handleChange}
              />
              <Input
                type="text"
                placeholder="Gender"
                value={gender}
                name="gender"
                onChange={handleChange}
              />
              <Input
                type="file"
                placeholder="Image"
                value={image}
                name="image"
                onChange={handleChange}
              />
              <button
                onClick={() => handleSignup()}
                type="submit"
                className=" text-sm text-white hover:text-orange-600 underline"
              >
                Sign Up
              </button>
            </form>
          </div>
        ) : (
          <div className="flex flex-col ">
            <h2 className="text-2xl mb-4">Login</h2>
            <form className="flex flex-col gap-4">
              <Input type="email" placeholder="Email" />
              <Input type="password" placeholder="Password" />
              <button
                onClick={() => handleSignin()}
                type="submit"
                className=" text-sm text-white hover:text-orange-600 underline"
              >
                Sign In
              </button>
            </form>
          </div>
        )}

        <Button
          className=" text-sm text-white hover:text-orange-600 underline"
          onClick={() => setShowRegister(!showRegister)}
        >
          {showRegister
            ? "Already have an account? Login"
            : "Don't have an account? Register"}
        </Button>
      </Card>
    </div>
  );
};

export default AuthPage;
