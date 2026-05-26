import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NavBar from '../Components/Common/NavBar'
import HomePage from '../Pages/HomePage'
import Footer from '../Components/Common/Footer'
import ProductPage from '../Pages/ProductPage'
import ContactPage from '../Pages/ContactPage'
import ProductDetailsPage from '../Pages/ProductDetailsPage'
import ProfilePage from '../Pages/ProfilePage'
import BillingPage from "../Pages/BillingPage"

const KRSRouter = () => {
    return (
        <div>
            <NavBar />
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/products' element={<ProductPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path='/product/:id' element={<ProductDetailsPage />} />
                <Route path='/profile' element={<ProfilePage />} />
                <Route path='/billing' element={<BillingPage />} />
            </Routes>
            <Footer />
        </div>
    )
}

export default KRSRouter