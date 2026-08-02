import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className=' text-center  text-xl p-3 text-white bg-orange-700 sticky z-99'>
      <p>&copy; All rights reserved <Link href='/'>Arun Pandey</Link></p>
    </div>
  )
}

export default Footer
