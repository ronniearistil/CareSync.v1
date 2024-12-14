import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, role }) => {
  // Check for authentication token in cookies
  const isAuthenticated = document.cookie.includes("access_token_cookie");

  // Get the user's role from localStorage
  const userRole = JSON.parse(localStorage.getItem("user"))?.role;

  // If user is not authenticated, redirect to the appropriate login page
  if (!isAuthenticated) {
    return <Navigate to={role === "Patient" ? "/login/patient" : "/login/user"} />;
  }

  // If role is specified and does not match the user's role, redirect to the home page
  if (role && userRole !== role) {
    return <Navigate to="/" />;
  }

  // If authenticated and role matches (or no role is specified), render the children
  return children;
};

export default PrivateRoute;




