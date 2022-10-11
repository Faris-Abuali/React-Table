import { useState } from 'react'
import reactLogo from './assets/react.svg'
import BasicTable from './components/BasicTable'
import './styles/App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <BasicTable />
    </div>
  )
}

export default App
