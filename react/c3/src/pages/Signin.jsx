import React from "react";
import {Link} from 'react-router'

function Signin() {
    return <div className="flex flex-col justify-center items-center h-[472px]">
       <h1 className="text-gray-600 text-2xl mb-10">Signin</h1> 
       <card className="h-[300px] w-[400px] bg-white shadow-md rounded-lg p-6 border border-gray-200 flex flex-col items-center justify-center">
         <input type="text" placeholder="User Name" className="p-2 border border-gray-300 rounded mb-4" />
         <input type="password" placeholder="Password" className="p-2 border border-gray-300 rounded mb-4"/>
           <Link to='/' className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600">
            Signin
            </Link>
            <p className="mt-4 text-gray-600 text-sm">Not a member? <Link to='/signup' className="text-orange-500 hover:underline"> Signup  </Link></p>
       </card>
        </div>;
}

export default Signin;