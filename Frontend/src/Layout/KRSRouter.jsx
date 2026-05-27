import React from "react";
import { Route, Routes } from "react-router-dom";

import NavBar from "../Components/Common/NavBar";
import Footer from "../Components/Common/Footer";

import HomePage from "../Pages/HomePage";
import ProductPage from "../Pages/ProductPage";
import ContactPage from "../Pages/ContactPage";
import ProductDetailsPage from "../Pages/ProductDetailsPage";
import BillingPage from "../Pages/BillingPage";

// ADMIN ROUTER
import PanelRouter from "../AdminPanel/Router/PanelRouter";

const KRSRouter = () => {
  return (
    <Routes>

      {/* USER WEBSITE ROUTES */}
      <Route
        path="/*"
        element={
          <>
            <NavBar />

            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/product/:id" element={<ProductDetailsPage />} />
              <Route path="/billing" element={<BillingPage />} />
            </Routes>

            <Footer />
          </>
        }
      />

      {/* ADMIN PANEL ROUTES */}
      <Route path="/admin/*" element={<PanelRouter />} />
    </Routes>
  );
};

export default KRSRouter;