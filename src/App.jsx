import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Company from './components/Company'
import { Route, Routes } from 'react-router-dom'
import Review from './components/Review'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
 <Routes>
  <Route path="/" element={<Company/>}/>
  <Route path="/review/:id" element={<Review/>}/>
 </Routes>
    </>
  )
}

export default App
