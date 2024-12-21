// MVP TEST 

import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, role }) => {
  const token = localStorage.getItem("access_token");
  const user = JSON.parse(localStorage.getItem("user") || "{}"); // Fallback to empty object
  const userRole = user.role;

  // Debugging logs
  console.log("Token:", token);
  console.log("User:", user);
  console.log("User Role:", userRole);

  if (!token) {
    return <Navigate to={role ? `/login/${role.toLowerCase()}` : "/login/user"} />;
  }

  if (role && userRole !== role) {
    console.warn(`Access denied. Required role: ${role}, but user role is: ${userRole}`);
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;

