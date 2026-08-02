import React, { useState, useEffect } from "react";
import { useSignupMutation } from "../service/signinApi";
import { Link, useNavigate } from "react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import toast from "react-hot-toast";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
  gender: "",
  image: "",
};

const signup = () => {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState(initialState);
  const { name, email, password, confirmPassword, phone, gender, image } =
    formValue;

  const [
    signup,
    {
      data: signupData,
      isSuccess: isSignupSuccess,
      isError: isSignupError,
      error: signupError,
    },
  ] = useSignupMutation();
  const handleSignup = async () => {
    try {
      if (name && email && password && confirmPassword && phone && gender) {
        if (password === confirmPassword) {
          await signup({ name, email, password, phone, gender, image });
          toast.success("Sign Up Successful");
          navigate("/rtkq/signin");
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

  useEffect(() => {
    if (isSignupSuccess) {
      navigate("/rtkq/signin");
    }
  }, [isSignupSuccess]);
  
  useEffect(() => {
    if (isSignupError) {
      toast.error(signupError?.data.message);
    }
  }, [isSignupError]);

  return (
    <div className="bg-gray-300/15 text-gray-700 text-center w-full h-121 gradient-to-br from-gray-300/10 to-gray-600/30 flex flex-col justify-center">
      <Card className="w-96 mx-auto bg-gray-800/50 backdrop-filter backdrop-blur-sm shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer">
        <div className=" flex flex-col p-4">
          <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
          <Form>
            <Input
              type="text"
              name="name"
              placeholder="Name"
              value={name}
              onChange={(e) =>
                setFormValue({ ...formValue, name: e.target.value })
              }
              className={"mb-1"}
            />
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setFormValue({ ...formValue, email: e.target.value })
              }
              className={"mb-1"}
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setFormValue({ ...formValue, password: e.target.value })
              }
              className={"mb-1"}
            />
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) =>
                setFormValue({ ...formValue, confirmPassword: e.target.value })
              }
              className={"mb-1"}
            />
            <Input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) =>
                setFormValue({ ...formValue, phone: e.target.value })
              }
              className={"mb-1"}
            />
            <Input
              type="text"
              name="gender"
              placeholder="Gender"
              value={gender}
              onChange={(e) =>
                setFormValue({ ...formValue, gender: e.target.value })
              }
              className={"mb-1"}
            />
            <Input
              type="file"
              name="image"
              placeholder="Image"
              value={image}
              onChange={(e) =>
                setFormValue({ ...formValue, image: e.target.value })
              }
              className={"mb-1"}
            />
            <Button onClick={() => handleSignup()}>Sign Up</Button>
            <p>
              Already have an account? <Link to="/rtkq/signin">Sign In</Link>
            </p>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default signup;
