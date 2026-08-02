import { useState } from 'react'
import {Button} from './components/ui/Button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        
       
        <Button
          className="counter bg-orange-500 text-white px-4 py-2 rounded-md"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </Button>
      </section>

     

      
    </>
  )
}

export default App
