import GalleryItem from "../galleryItem/GalleryItem";
import "./gallery.css";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import Skeleton from "../skeleton/skeleton";

// TEMPORARY
// const items = [
//   {
//     id: 1,
//     media: "/bims/bim1.jpeg",
//     width: 1260,
//     height: 1000,
//   },
//   {
//     id: 2,
//     media: "/bims/bim2.jpeg",
//     width: 1260,
//     height: 1400,
//   },
//   {
//     id: 3,
//     media: "/bims/bim3.jpeg",
//     width: 1260,
//     height: 1400,
//   },
//   {
//     id: 4,
//     media: "/bims/bim4.jpeg",
//     width: 1260,
//     height: 1000,
//   },
//   {
//     id: 5,
//     media: "/bims/bim5.jpeg",
//     width: 1260,
//     height: 1243,
//   },
//   {
//     id: 6,
//     media: "/bims/bim6.jpeg",
//     width: 1260,
//     height: 1568,
//   },
//   {
//     id: 7,
//     media: "/bims/bim7.jpeg",
//     width: 1260,
//     height: 1234,
//   },
//   {
//     id: 8,
//     media: "/bims/bim8.jpeg",
//     width: 1260,
//     height: 1400,
//   },
//   {
//     id: 9,
//     media: "/bims/bim9.jpeg",
//     width: 1260,
//     height: 1000,
//   },
//   {
//     id: 10,
//     media: "/bims/bim10.jpeg",
//     width: 1260,
//     height: 1000,
//   },
//   {
//     id: 11,
//     media: "/bims/bim11.jpeg",
//     width: 1260,
//     height: 1000,
//   },
//   {
//     id: 12,
//     media: "/bims/bim12.jpeg",
//     width: 1260,
//     height: 1400,
//   },
//   {
//     id: 13,
//     media: "/bims/bim13.jpeg",
//     width: 1260,
//     height: 1400,
//   },
//   {
//     id: 14,
//     media: "/bims/bim14.jpeg",
//     width: 1260,
//     height: 1600,
//   },
//   {
//     id: 15,
//     media: "/bims/bim15.jpeg",
//     width: 1260,
//     height: 1000,
//   },
//   {
//     id: 16,
//     media: "/bims/bim16.jpeg",
//     width: 1260,
//     height: 1260,
//   },
//   {
//     id: 17,
//     media: "/bims/bim17.jpeg",
//     width: 1260,
//     height: 1000,
//   },
//   {
//     id: 18,
//     media: "/bims/bim18.jpeg",
//     width: 1260,
//     height: 1260,
//   },
//   {
//     id: 19,
//     media: "/bims/bim19.jpeg",
//     width: 1260,
//     height: 1400,
//   },
//   {
//     id: 20,
//     media: "/bims/bim20.jpeg",
//     width: 1260,
//     height: 1260,
//   },
//   {
//     id: 21,
//     media: "/bims/bim21.jpeg",
//     width: 1260,
//     height: 1400,
//   },
//   {
//     id: 22,
//     media: "/bims/bim22.jpeg",
//     width: 1260,
//     height: 1890,
//   },
//   {
//     id: 23,
//     media: "/bims/bim23.jpeg",
//     width: 1260,
//     height: 1260,
//   },
//   {
//     id: 24,
//     media: "/bims/bim24.jpeg",
//     width: 1260,
//     height: 1260,
//   },
//   {
//     id: 25,
//     media: "/bims/bim25.jpeg",
//     width: 1260,
//     height: 1260,
//   },
//   {
//     id: 26,
//     media: "/bims/bim26.jpeg",
//     width: 1260,
//     height: 1260,
//   },
//   {
//     id: 27,
//     media: "/bims/bim27.jpeg",
//     width: 1260,
//     height: 1260,
//   },
// ];

const fetchBims = async ({ pageParam, search, userId, boardId }) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_ENDPOINT}/bims?cursor=${pageParam}&search=${
      search || ""
    }&userId=${userId || ""}&boardId=${boardId || ""}`
  );
  return res.data;
};

const Gallery = ({ search, userId, boardId }) => {
  const { data, fetchNextPage, hasNextPage, status } = useInfiniteQuery({
    // queryKey: ["bims"],
    // FIXED QUERY KEY
    queryKey: ["bims", search, userId, boardId],
    queryFn: ({ pageParam = 0 }) =>
      fetchBims({ pageParam, search, userId, boardId }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  });

  // FIXED: ADD SKELETON LOADING
  // if (status === "pending") return "Loading...";
  if (status === "pending") return <Skeleton/>;
  if (status === "error") return "Something went wrong...";

  const allBims = data?.pages.flatMap((page) => page.bims) || [];

  return (
    <InfiniteScroll
      dataLength={allBims.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={<h4>Loading more bims</h4>}
      endMessage={<h3>All Posts Loaded!</h3>}
    >
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-4 z-0">
        {allBims?.map((item) => (
          <GalleryItem key={item._id} item={item} />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default Gallery;









// import React from 'react'
// import axios from 'axios'
// import GalleryItem from '../galleryItem/GalleryItem'
// import {
//   useQuery,
//   useMutation,
//   useQueryClient,
//   useInfiniteQuery
// } from '@tanstack/react-query'

// //temp //TEMPORARY
// const items = [
//   {
//     id: 1,
//     media: "/bims/bim1.jpeg",
//     width: 1260,
//     height: 1000,
//   },
//   {
//     id: 2,
//     media: "/bims/bim2.jpeg",
//     width: 1260,
//     height: 1400,
//   },
//   {
//     id: 3,
//     media: "/bims/bim3.jpeg",
//     width: 1260,
//     height: 1400,
//   },
//   {
//     id: 4,
//     media: "/bims/bim4.jpeg",
//     width: 1260,
//     height: 1000,
//   },
//   {
//     id: 5,
//     media: "/bims/bim5.jpeg",
//     width: 1260,
//     height: 1243,
//   },
//   {
//     id: 6,
//     media: "/bims/bim6.jpeg",
//     width: 1260,
//     height: 1568,
//   },
//   {
//     id: 7,
//     media: "/bims/bim7.jpeg",
//     width: 1260,
//     height: 1234,
//   },
//   {
//     id: 8,
//     media: "/bims/bim8.jpeg",
//     width: 1260,
//     height: 1400,
//   },
//   {
//     id: 9,
//     media: "/bims/bim9.jpeg",
//     width: 1260,
//     height: 1000,
//   },
//   {
//     id: 10,
//     media: "/bims/bim10.jpeg",
//     width: 1260,
//     height: 1000,
//   },
//   {
//     id: 11,
//     media: "/bims/bim11.jpeg",
//     width: 1260,
//     height: 1000,
//   },
//   {
//     id: 12,
//     media: "/bims/bim12.jpeg",
//     width: 1260,
//     height: 1400,
//   },
//   {
//     id: 13,
//     media: "/bims/bim13.jpeg",
//     width: 1260,
//     height: 1400,
//   },
//   {
//     id: 14,
//     media: "/bims/bim14.jpeg",
//     width: 1260,
//     height: 1600,
//   },
//   {
//     id: 15,
//     media: "/bims/bim15.jpeg",
//     width: 1260,
//     height: 1000,
//   },
//   {
//     id: 16,
//     media: "/bims/bim16.jpeg",
//     width: 1260,
//     height: 1260,
//   },
//   {
//     id: 17,
//     media: "/bims/bim17.jpeg",
//     width: 1260,
//     height: 1000,
//   },
//   {
//     id: 18,
//     media: "/bims/bim18.jpeg",
//     width: 1260,
//     height: 1260,
//   },
//   {
//     id: 19,
//     media: "/bims/bim19.jpeg",
//     width: 1260,
//     height: 1400,
//   },
//   {
//     id: 20,
//     media: "/bims/bim20.jpeg",
//     width: 1260,
//     height: 1260,
//   },
//   {
//     id: 21,
//     media: "/bims/bim21.jpeg",
//     width: 1260,
//     height: 1400,
//   },
//   {
//     id: 22,
//     media: "/bims/bim22.jpeg",
//     width: 1260,
//     height: 1890,
//   },
//   {
//     id: 23,
//     media: "/bims/bim23.jpeg",
//     width: 1260,
//     height: 1260,
//   },
//   {
//     id: 24,
//     media: "/bims/bim24.jpeg",
//     width: 1260,
//     height: 1260,
//   },
//   {
//     id: 25,
//     media: "/bims/bim25.jpeg",
//     width: 1260,
//     height: 1260,
//   },
//   {
//     id: 26,
//     media: "/bims/bim26.jpeg",
//     width: 1260,
//     height: 1260,
//   },
//   {
//     id: 27,
//     media: "/bims/bim27.jpeg",
//     width: 1260,
//     height: 1260,
//   },
// ];

// const fetchBims = async () => {
//   const res = await axios.get("http://localhost:5000/bims");
//   return res.data;
// }

// const Gallery = () => {
//   const {isPending, error, data} = useQuery({
//     queryKey: ["bims"],
//     // queryFn: () => fetch("http://localhost:5000/bims").then((res) => res.json()),
//     queryFn: fetchBims,
//   })

//   if(error) {
//     return <h1 className='text-center justify-center'>{`'An Error Occurred: ${error.message}`}</h1>  
//   }

//   if(isPending) {
//     return <h1 className='text-center justify-center'>Loading...</h1>
//   }
//   // console.log("Gallery Data:", data)
//   const items = data || [] // Fallback to an empty array if data is undefined
//   console.log("Gallery Items:", items)

//   return (
//     <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-4 z-0" >
      
//      {items.map((item) => (
//         <GalleryItem key={item.id} item={item} />
//       ))}
//     </div>
//   )
// }

// export default Gallery
