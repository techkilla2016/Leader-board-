import React from 'react'
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom'
import './css/style.css'
import Home from './page/home'
import Table from './page/table'



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashbord' element={<Table />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
