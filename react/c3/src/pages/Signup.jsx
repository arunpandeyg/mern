import React from "react";
import { Link } from "react-router";

function Signup() {
    return (
        <div className="flex flex-col justify-center items-center h-[472px]">
            <h1 className="text-gray-600 text-2xl mb-10">Signup</h1>
            <card className="h-[300px] w-[400px] bg-white shadow-md rounded-lg p-6 border border-gray-200 flex flex-col items-center justify-center">
                <input type="text" placeholder="User Name" className="p-2 border border-gray-300 rounded mb-4" />
                <input type="email" placeholder="Email" className="p-2 border border-gray-300 rounded mb-4" />
                <input type="password" placeholder="Password" className="p-2 border border-gray-300 rounded mb-4" />
                <Link to='/' className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600">
                    Signup
                </Link>
                <p className="mt-4 text-gray-600 text-sm">Already a member? <Link to='/signin' className="text-orange-500 hover:underline"> Signin  </Link></p>
            </card>
        </div>
    );
}
export default Signup;