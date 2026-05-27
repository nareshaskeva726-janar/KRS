import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "../MainLayout/Layout";
import Products from "../Pages/Products";
import ProductsHistory from "../Pages/ProductsHistory";
import DashBoard from "../Pages/DashBoard"
import NotificationPage from "../Pages/NotificationPage";

import ProtectRoute from "../Router/ProtectRoute";

const PanelRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectRoute>
            <Layout />
          </ProtectRoute>
        }
      >
        {/* DEFAULT ADMIN PAGE */}
        <Route index element={<Navigate to="products" />} />
        <Route path="dashboard" element={<DashBoard />} />
        <Route path="products" element={<Products />} />
        <Route path="products-history" element={<ProductsHistory />} />
        <Route path="notifications" element={<NotificationPage />} />
      </Route>
    </Routes>
  );
};

export default PanelRouter;