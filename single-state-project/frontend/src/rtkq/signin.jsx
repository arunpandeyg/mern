import React, { useState, useEffect } from "react";
import { useSigninMutation } from "../service/signinApi";
import { Link, useNavigate } from "react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "@/service/authSlice";

const initialState = {
  
  email: "",
  password: "", 
};

const signin = () => {
     const navigate = useNavigate();
      const [formValue, setFormValue] = useState(initialState);
      const dispatch = useDispatch();
      const { email, password} =
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

      const handleSignin = async () => {
    if (email && password) {
      await signin({ email, password });      
    } else {
      toast.error("Please fill in all required fields");
    }
  };

  useEffect(() => {
    if (isSigninSuccess) {
      toast.success("Sign In Successful");
       dispatch(setUser({
              user: signinData.user,
              token: signinData.token,
            }));
      setTimeout(() => {
        navigate("/");
      }, 3000);      
     
    }
  }, [isSigninSuccess]);

  useEffect(() => {
    if (isSigninError) {
      toast.error(signinError?.data.message);
    }
  }, [isSigninError]);
      
  return (
    <div className="bg-gray-300/15 text-gray-700 text-center w-full h-121 gradient-to-br from-gray-300/10 to-gray-600/30 flex flex-col justify-center">
      <Card className="w-96 mx-auto bg-gray-800/50 backdrop-filter backdrop-blur-sm shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer">
      <div className=" flex flex-col p-4">
        <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
        <Form >
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setFormValue({ ...formValue, email: e.target.value })}
              className={'mb-4'}
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setFormValue({ ...formValue, password: e.target.value })}
                className={'mb-4'}
            />
            <Button onClick={handleSignin}>Sign In</Button>
            <p>Don't have an account? <Link to="/rtkq/signup">Sign Up</Link></p>
        </Form>
      </div>

      </Card>
    </div>
  )
}

export default signin
