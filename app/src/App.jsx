import { useState } from 'react'
import './App.css'
import Example from './components/Example';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="relative bg-x-gradient-grey-200-grey-200-50-white-50">
      < Example />
    </div>
  )
}

export default App
