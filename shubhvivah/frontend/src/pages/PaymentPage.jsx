import React from 'react'

const PaymentPage = () => {
  return (
    <div>
      <div className='flex justify-center items-center w-full h-[478px]'>
        <div className='bg-white p-6 rounded-lg shadow-lg w-96'>
          <h2 className='text-2xl text-center text-orange-600 font-bold mb-4'>Payment Details</h2>
          <form>
            <div className='mb-4'>
              <label className='block text-sm text-orange-600 font-medium mb-2'>Card Number</label>
              <input type='text' className='w-full p-2 border border-gray-300 rounded' placeholder='1234 5678 9012 3456' />
            </div>
            <div className='mb-4'>
              <label className='block text-sm text-orange-600 font-medium mb-2'>Expiry Date</label>
              <input type='text' className='w-full p-2 border border-gray-300 rounded' placeholder='MM/YY' />
            </div>
            <div className='mb-4'>
              <label className='block text-sm text-orange-600 font-medium mb-2'>CVV</label>
              <input type='text' className='w-full p-2 border border-gray-300 rounded' placeholder='123' />
            </div>
            <button type='submit' className='w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600'>Pay Now</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PaymentPage
