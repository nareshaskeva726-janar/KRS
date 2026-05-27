import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useGetMeQuery } from "../../Store/APIS/krsApi";
import toast from "react-hot-toast";

const ProtectRoute = ({ children }) => {
  const { data, isLoading, isError } = useGetMeQuery();

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (isError || !data?.user) {
    toast.error("Unauthorized access");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectRoute;