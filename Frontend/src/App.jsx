import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NavBar from './Components/Common/NavBar'
import HomePage from './Pages/HomePage'
import Footer from './Components/Common/Footer'
import ProductPage from './Pages/ProductPage'
import ContactPage from './Pages/ContactPage'
import CartPage from './Pages/CartPage'
import ProductDetailsPage from './Pages/ProductDetailsPage'
import ProfilePage from './Pages/ProfilePage'

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/products' element={<ProductPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/product/:id' element={<ProductDetailsPage />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App