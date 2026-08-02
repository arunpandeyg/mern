import React from 'react'
// import LeftBar from '../components/leftBar/LeftBar'
import TopBar from '../../components/topBar/TopBar'
import { Outlet } from 'react-router'


const MainLayout = () => {
  return (
    <div>
      <div className=''>
        <div className=''>
          {/* <LeftBar /> */}
        </div>
        <div className=''>
          <TopBar />
          <Outlet />
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