import React from "react";

const CreateProfilePage = () => {
  return (
    <div className=" items-center h-[475px]">
      <div>
        <h1 className="text-2xl font-bold text-center py-5 text-orange-700">
          Create Profile Page
        </h1>
        <form>          
          <div className="flex gap-3 items-center justify-center">
            {/* <input
                type="text"
                placeholder="User Id"
                className="border border-gray-300 p-2 rounded mb-4 w-64"
              /> */}
            <input
                type="file"
                placeholder="ProfilePicture"
                className="border border-gray-300 p-2 rounded mb-4 w-64"
              />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 overflow-hidden">
            <div className="flex flex-col items-center justify-center ">
              <input
                type="text"
                placeholder="Full Name"
                className="border border-gray-300 p-2 rounded mb-4 w-64"
              />
              <input
                type="email"
                placeholder="Email"
                className="border border-gray-300 p-2 rounded mb-4 w-64"
              />
              <input
                type="password"
                placeholder="Password"
                className="border border-gray-300 p-2 rounded mb-4 w-64"
              />
              <input
                type="text"
                placeholder="Phone Number"
                className="border border-gray-300 p-2 rounded mb-4 w-64"
              />
              <input
                type="text"
                placeholder="Gender"
                className="border border-gray-300 p-2 rounded mb-4 w-64"
              />
            </div>
            <div className="flex flex-col items-center justify-center ">
              <input
                type="text"
                placeholder="Dharma"
                className="border border-gray-300 p-2 rounded mb-4 w-64"
              />
              <input
                type="text"
                placeholder="Varna"
                className="border border-gray-300 p-2 rounded mb-4 w-64"
              />
              <input
                type="text"
                placeholder="Jati"
                className="border border-gray-300 p-2 rounded mb-4 w-64"
              />
              <input
                type="text"
                placeholder="Occupation"
                className="border border-gray-300 p-2 rounded mb-4 w-64"
              />
              <input
                type="text"
                placeholder="Income"
                className="border border-gray-300 p-2 rounded mb-4 w-64"
              />
            </div>
            <div className="flex flex-col items-center justify-center ">
              <input
                type="text"
                placeholder="State"
                className="border border-gray-300 p-2 rounded mb-4 w-64"
              />
              <input
                type="text"
                placeholder="District"
                className="border border-gray-300 p-2 rounded mb-4 w-64"
              />
              <input
                type="text"
                placeholder="Address"
                className="border border-gray-300 p-2 rounded mb-4 w-64"
              />
              <input
                type="text"
                placeholder="Height"
                className="border border-gray-300 p-2 rounded mb-4 w-64"
              />
              <input
                type="text"
                placeholder="Weight"
                className="border border-gray-300 p-2 rounded mb-4 w-64"
              />
            </div>
            <div className="flex flex-col items-center justify-center ">
              <input
                type="text"
                placeholder="Color"
                className="border border-gray-300 p-2 rounded mb-4 w-64"
              />
              <input
                type="text"
                placeholder="DOB"
                className="border border-gray-300 p-2 rounded mb-4 w-64"
              />
              <input
                type="text"
                placeholder="TOB"
                className="border border-gray-300 p-2 rounded mb-4 w-64"
              />
              <input
                type="text"
                placeholder="POB"
                className="border border-gray-300 p-2 rounded mb-4 w-64"
              />
              <input
                type="text"
                placeholder="Age"
                className="border border-gray-300 p-2 rounded mb-4 w-64"
              />
              
            </div>
          </div>
          <button
            type="submit"
            className="bg-orange-500 text-white p-2 rounded w-64 hover:bg-orange-600 transition duration-200  ml-[40%] "
          >
            Create Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProfilePage;
