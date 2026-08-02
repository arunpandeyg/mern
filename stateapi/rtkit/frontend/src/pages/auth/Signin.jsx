import React, {useRef, useEffect, useState} from 'react'
import {useNavigate} from 'react-router'
import {useDispatch, useSelector} from 'react-redux'
import { setCredentials } from '@/reduxtk/auth/AuthSlice'
import { useSigninMutation } from '@/app/api/apiSlice'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Link } from 'react-router'

const Signin = () => {
  const useRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [signingIn, {isLoading}] = useSigninMutation();
  const [signin, {data, isLoading, isSuccess, isError, error}] = useSigninMutation();
  const {user: signinUser, status, error: signinError} = useSelector((state) => state.signinUser);

  useEffect(() => {
    useRef.current.focus();
  },[]);

  useEffect(()=>{
    setErrMsg('');
  },[user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await signin({user, pwd}).unwrap();
      dispatch(setCredentials({...userData, user}));
      setUser('')
      setPwd('')
      navigate('/');
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg(err.data?.message, 'Sign In Failed');
      }
      errRef.current.focus();
    }
  }

  const handleUserInput = (e) => setUser(e.target.value);
  const handlePwdInput = (e) => setPwd(e.target.value);

  return (
    <div className='flex flex-col max-w-md mx-auto mt-10'>
        <h1 className='text-3xl font-bold text-center'>Signin</h1>
        <Card className='flex flex-col gap-4 p-6 mt-6 bg-purple-300 shadow-lg transform-3d hover:scale-105 transition duration-300 ease-in-out'>
          <Input type='email' placeholder='Email'/>
          <Input type='password' placeholder='Password'/>
          <Button className="bg-orange-600 hover:bg-orange-700">Signin</Button>
          <div>New User? <Link to='/signup' className='text-blue-500 underline'>Signup</Link></div>
          
          
        </Card>
    </div>
  )
}

export default Signin
