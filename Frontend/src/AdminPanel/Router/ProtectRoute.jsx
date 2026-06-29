import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectRoute = ({ children }) => {
  const location = useLocation();

  const storedUser = JSON.parse(localStorage.getItem("user"));

  // if no user → redirect to login
  if (!storedUser) {
    return (
      <Navigate
        to="/"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return children;
};

export default ProtectRoute;