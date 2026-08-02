import React, { useEffect } from 'react'

const CounterPage = () => {
  const [counter, setCounter] = React.useState(0);
  // let counter = 0;
  const incrementCounter = () => {
     setCounter(counter + 1);
    console.log(counter);
  }
  const decrementCounter = () => {
    setCounter(counter - 1);
    console.log(counter);
  }

  useEffect(() => {
    console.log("Counter updated:", counter);
    // document.title = `Counter: ${counter}`;
   
  }, [counter]);
  return (
    <div className="">
       <h1>{counter}</h1>
       
        <button onClick={incrementCounter}>Increment</button>
        <br />
        <button onClick={decrementCounter}>Decrement</button>
    </div>
  )
}

export default CounterPage
