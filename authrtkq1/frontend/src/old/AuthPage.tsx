import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useSigninMutation, useSignupMutation } from "../service/authApi";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import { useAppDispatch } from "../hooks/hooks";
import { setUser } from "../features/auth/authSlice.ts";


interface MyError {
  data: {
    message: string;
  };
}

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
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [formValue, setFormValue] = useState(initialState);
  const [showSignup, setShowSignup] = useState(false);
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

  const [
    signin,
    {
      data: signinData,
      isSuccess: isSigninSuccess,
      isError: isSigninError,
      error: signinError,
    },
  ] = useSigninMutation();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }
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
      toast.error("Please fill all the fields");
    }
  };
  const handleSignin = async () => {
    if (email && password) {
      await signin({ email, password });
      console.log(signinData);
    } else {
      toast.error("Please enter email and password");
    }
  };

  useEffect(() => {
    if (isSigninSuccess) {
      toast.success("Signed in successfully");
      dispatch(setUser({ name: signinData?.name, token: signinData.token }));

      navigate("/");
    }
    if (isSignupSuccess) {
      toast.success("Signed up successfully");
      dispatch(setUser({ name: signupData?.name, token: signupData.token }));

      navigate("/");
    }
  }, [isSigninSuccess, isSignupSuccess]);

  useEffect(() => {
    if (isSigninError) {
      toast.error((signinError as MyError)?.data.message);
    }
    if (isSignupError) {
      toast.error((signupError as MyError)?.data.message);
    }
  }, [isSigninError, isSignupError]);
  return (
    <div className="bg-gray-400 text-white text-center w-full h-74 gradient-to-br from-gray-300 to-gray-600/30 flex flex-col justify-center">
      <Card className="w-76 h-70 mx-auto text-white text-xl bg-gray-800 not-first:shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out">
        {!showSignup ? "Sign In" : "Sign Up"}
        <form>
          <div className=" flex flex-col pl-4 pr-4">
            {showSignup && (
              <>
                <Input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formValue.name}
                  onChange={handleChange}
                  className="mb-2"
                />
                <Input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  value={formValue.phone}
                  onChange={handleChange}
                  className="mb-2"
                />
                <Input
                  type="text"
                  name="gender"
                  placeholder="Gender"
                  value={formValue.gender}
                  onChange={handleChange}
                  className="mb-2"
                />
                <Input
                  type="file"
                  accept="image/*"
                  multiple={false}
                  name="image"
                  placeholder="Image"
                  value={formValue.image}
                  onChange={handleChange}
                  className="mb-2"
                />
              </>
            )}

            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formValue.email}
              onChange={handleChange}
              className="mb-3"
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formValue.password}
              onChange={handleChange}
              className="mb-"
            />
            {showSignup && (
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formValue.confirmPassword}
                onChange={handleChange}
                className="mb-2"
              />
            )}

            {!showSignup ? (
              <>
                <Button
                  onClick={() => handleSignin()}
                  className="mt-3 text-xl  text-center  justify-center bg-orange-600 hover:bg-orange-700 cursor-pointer text-white rounded-md "
                >
                  Sign In
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => handleSignup()}
                  className="mt-3 text-xl  text-center  justify-center bg-orange-600 hover:bg-orange-700 cursor-pointer text-white rounded-md "
                >
                  Sign Up
                </Button>
              </>
            )}
            <div>
              {!showSignup ? (
                <p className="mt-3 text-sm">
                  Don't have an account?{" "}
                  <Button
                    className={"bg-gray-300/15"}
                    onClick={() => setShowSignup(true)}
                  >
                    Sign Up
                  </Button>
                </p>
              ) : (
                <p className="mt-3 text-sm">
                  Already have an account?{" "}
                  <Button
                    className={"bg-gray-300/15"}
                    onClick={() => setShowSignup(false)}
                  >
                    Sign In
                  </Button>
                </p>
              )}
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AuthPage;
