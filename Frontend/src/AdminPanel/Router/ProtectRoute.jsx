import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useGetMeQuery } from "../../Store/APIS/krsApi";
import toast from "react-hot-toast";

const ProtectRoute = ({ children }) => {
  const location = useLocation();

  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (isError) {
      toast.error("Please login to continue");
      console.error("Authentication Error:", error);
    }
  }, [isError, error]);

  // Loading state
  if (isLoading || isFetching) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">
            Verifying authentication...
          </p>
        </div>
      </div>
    );
  }

  // User not authenticated
  if (isError || !data?.user) {
    return (
      <Navigate
        to="/"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  // User authenticated
  return children;
};

export default ProtectRoute;