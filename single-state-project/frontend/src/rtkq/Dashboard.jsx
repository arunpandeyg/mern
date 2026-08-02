import { selectAuth } from '@/service/authSlice'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router';

const Dashboard = () => {
  const {name} = useSelector(selectAuth);
  const navigate = useNavigate();
  return (
    <div className="bg-gray-300/15 text-gray-700 text-center w-full h-121 gradient-to-br from-gray-300/10 to-gray-600/30 flex flex-col justify-center">
      <h1>Dashboard</h1>
    </div>
  )
}

export default Dashboard
