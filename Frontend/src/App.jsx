import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NavBar from './Components/Common/NavBar'
import HomePage from './Pages/HomePage'
import Footer from './Components/Common/Footer'
import ProductPage from './Pages/ProductPage'
import Categories from './Pages/Categories'
import ContactPage from './Pages/ContactPage'
import WishList from './Pages/WishList'
import AboutPage from './Pages/AboutPage'
import CartPage from './Pages/CartPage'

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/shop' element={<ProductPage />} />
        <Route path='/categories' element={<Categories />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path='/about-us' element={<AboutPage />} />
        <Route path='/wish-list' element={<WishList />} />
        <Route path='/cart' element={<CartPage />} />

      </Routes>
      <Footer />
    </div>
  )
}

export default App