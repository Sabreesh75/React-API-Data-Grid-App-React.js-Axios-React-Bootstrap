import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import DisplayProducts from './displayProducts'
import AddProduct from './addProduct'
import UpdateProduct from './pages/updateProduct'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<DisplayProducts/>}></Route>
        <Route path='/addProduct' element={<AddProduct/>}></Route>
        <Route path='/updateProduct/:id' element={<UpdateProduct/>}></Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
