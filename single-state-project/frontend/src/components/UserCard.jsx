import React from 'react'
import { Card } from './ui/card';
import { Link } from 'react-router';

const UserCard = ({users}) => {
    const {image, name, phone, email, company, city, state, country} = users;
  return (
    <Card className="w-70 h-98 p-4 mt-12 text-white shadow-lg bg-gray-400/90 backdrop-filter  backdrop-blur-md border border-gray-200 hover:shadow-2xl transition-shadow duration-300 ease-in-out cursor-pointer">     
             
        <div className="flex flex-col items-center ">
            <img src={image} alt="Profile" className="w-32 h-32 rounded-full mb-4" />
            <h2 className="text-xl font-semibold mb-2">{name}</h2>
            <p className="text-gray-50">Software Engineer</p>
            <p className="text-gray-50">Phone: {phone}</p>
            <p className="text-gray-50">Email: {email}</p>
            <p className="text-gray-50">Company Name: {company}</p>
            <p className="text-gray-50 pb-4">City, State, Country: {city}, {state}, {country}</p>
            <Link to="/users" className="text-gray-50 w-20 p-2 border border-gray-200 bg:gray-50 hover:bg-gray-100 hover:text-gray-600 rounded-lg ">Back</Link>
        </div>
    </Card>
  )
}

export default UserCard
