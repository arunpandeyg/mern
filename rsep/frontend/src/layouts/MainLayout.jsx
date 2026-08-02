import React from 'react'
import Header from '@/components/Header'
import { Outlet } from 'react-router'
import Footer from '@/components/Footer'


const MainLayout = () => {
  return (
    <div>
      <div className=''>
        <div className=''>
         
        </div>
        <div className=''>
          {/* <Header /> */}
          <Outlet />
          <Footer/>
        </div>
      </div>
    </div>
  )
}

export default MainLayout

// {
//   <div>
//       <div className='flex'>
//         <div className='w-1/21'>
//           {/* <LeftBar /> */}
//         </div>
//         <div className='w-4/4'>
//           <TopBar />
//           <Outlet />
//         </div>
//       </div>
//     </div>
// }