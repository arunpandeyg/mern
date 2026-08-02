import React, { useEffect } from 'react'

const UseEffect = () => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts');
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
      }, []);
  return (
    <div>
        <h1>Use Effect Page</h1>
    </div>
  )
}

export default UseEffect
