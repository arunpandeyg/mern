import React from 'react'
import { CiShoppingCart } from "react-icons/ci";
import { useSelector } from 'react-redux';
import { Link } from 'react-router';

const AddToCart = () => {
  const cartSelector = useSelector((state) => state.cart.items);
  console.log(cartSelector);
  
  
  return (
    <Link to="/selected" className='flex items-center gap-2 hover:text-purple-700 relative'>
      <CiShoppingCart className='text-white text-2xl bg-purple-500 hover:bg-purple-700 h-8 w-8'/>
      <span className='absolute right-0 top-0 bg-red-500 text-white rounded-full w-3 h-3 flex items-center justify-center text-xs'>{cartSelector.length?cartSelector.length:0}</span>
    </Link>
  )
}

export default AddToCart
