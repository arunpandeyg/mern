import React from 'react';
import imageUrl from '../assets/ap3.jpg'; // Example image import


function Card() {
  return (
    <div className="flex flex-col  items-center justify-center bg-gray-700 shadow-lg rounded-lg p-6 w-[300px]">
      <h2 className="text-gray-300 text-center mb-5">Arun Pandey</h2>
      <img src={imageUrl}  alt='Title' className="h-[300px] w-[200px] object-cover rounded-lg" />
      <div className="card-content">
        
        <p className="text-gray-300 mt-5">"I am a software Engineer</p>
      </div>
    </div>
  );
}

export default Card;