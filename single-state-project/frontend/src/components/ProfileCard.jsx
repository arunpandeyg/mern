import React from 'react'
import { Card } from './ui/card'


const ProfileCard = () => {

   // Get the first user or an empty object if users is empty 

  return (
    <Card className="w-70 h-88 p-4 mt-12 text-white shadow-lg bg-gray-400/90 backdrop-filter  backdrop-blur-md border border-gray-200 hover:shadow-2xl transition-shadow duration-300 ease-in-out cursor-pointer">     
             
        <div className="flex flex-col items-center ">
            <img src="/kailas-godase.jpg" alt="Profile" className="w-32 h-32 rounded-full mb-4" />
            <h2 className="text-xl font-semibold mb-2">Kailas Godase</h2>
            <p className="text-gray-50">Software Engineer</p>
            <p className="text-gray-50">Phone: +91 (981) 456-7890</p>
            <p className="text-gray-50">Email: kailasgodase@example.com</p>
            <p className="text-gray-50">Company Name: IBM</p>
            <p className="text-gray-50 pb-4">City, State, Country: Mumbai, Maharashtra, India</p>
        </div>
    </Card>
  )
}

export default ProfileCard
