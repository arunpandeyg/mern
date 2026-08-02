import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { resetSignupState, signupUser } from '@/reduxtk/SignupSlice'
import { toast } from "sonner"

const Signup = () => {
  const [input, setInput] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
const {user, status, error} = useSelector((state) => state.signupUser);
const dispatch = useDispatch();
const navigate = useNavigate();

const changeHandler = (e) => { 
  setInput({...input, [e.target.name]: e.target.value});
}
const submitHandler = (e) => {
  e.preventDefault();
  console.log('Form submitted', input);
  // Dispatch signup action here
  dispatch(signupUser(input));
 
}
useEffect(() => {
  if (status === 'succeeded' && user) {
    toast.success('Signup successful:', user);
    console.log('Signup successful:', user);
    setTimeout(() => {
      dispatch(resetSignupState());
      navigate('/signin');
    } , 2000);
    
  } else if (status === 'failed' && error) {
    toast.error('Signup failed:', error);
    console.log('Signup failed:', error);
  }
}, [status, user, error, navigate, dispatch]);


  return (
    <div className='w-full h- flex flex-col max-w-md mx-auto mt-10 bg-purple-300 '>
        <h1 className='text-3xl font-bold text-center'>SignUp</h1>
        <Card className='flex flex-col gap-4 p-6 mt-6 bg-purple-300 shadow-lg transform-3d hover:scale-105 transition duration-300 ease-in-out'>
          <Input onChange={changeHandler} id='name' name='name' type='text' placeholder='Name'/>
          <Input onChange={changeHandler} id='email' name='email' type='email' placeholder='Email'/>
          <Input onChange={changeHandler} id='phone' name='phone' type='tel' placeholder='Phone Number'/>
          <Input onChange={changeHandler} id='password' name='password' type='password' placeholder='Password'/>
          <Button onSubmit={submitHandler} className="bg-orange-600 hover:bg-orange-700 cursor-pointer">Signup</Button>
          <div className='mb-2'>Already User? <Link to='/signin' className='text-blue-500 underline'>Signin</Link></div>
          
          
        </Card>
    </div>
  )
}

export default Signup
