import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";

const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth();

    // Debugging: Log to see the value of isAuthenticated
    useEffect(() => {
        console.log("isAuthenticated in ProtectedRoute: ", isAuthenticated);
    }, [isAuthenticated]);

    return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
