import React from "react";

const BioCard = () => {
  return (
    <div className="flex justify-center items-center w-full h-[478px]">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl text-center text-orange-600 font-bold mb-4">
          Bio Card
        </h2>
        <img
          className="w-full h-32 object-cover rounded mb-4"
          src="/profile.jpg"
          alt="Profile"
        />
        <p className="text-gray-800 text-lg font-semibold mb-2">Name</p>
        <p className="text-gray-600 mb-4">Software Engineer</p>
        <p className="text-gray-700 mb-4">Income</p>
        <p className="text-gray-700 mb-4">Category</p>

        <div className="flex justify-between items-center">
          <button className="bg-orange-500 text-white p-2 rounded hover:bg-orange-600">
            Edit
          </button>
          <button className="bg-red-500 text-white p-2 rounded hover:bg-red-600">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default BioCard;
