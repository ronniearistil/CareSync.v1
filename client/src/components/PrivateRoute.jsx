import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = document.cookie.includes("access_token_cookie"); // Check for the token in cookies
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;



