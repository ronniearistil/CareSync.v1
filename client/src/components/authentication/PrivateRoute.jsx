// import React from "react";
// import { Navigate } from "react-router-dom";
// 
// const PrivateRoute = ({ children, role }) => {
//   // Check for authentication token in cookies
//   const isAuthenticated = document.cookie.includes("access_token_cookie");
// 
//   // Get the user's role from localStorage
//   const userRole = JSON.parse(localStorage.getItem("user"))?.role;
// 
//   // If user is not authenticated, redirect to the appropriate login page
//   if (!isAuthenticated) {
//     return <Navigate to={role === "Patient" ? "/login/patient" : "/login/user"} />;
//   }
// 
//   // If role is specified and does not match the user's role, redirect to the home page
//   if (role && userRole !== role) {
//     return <Navigate to="/" />;
//   }
// 
//   // If authenticated and role matches (or no role is specified), render the children
//   return children;
// };
// 
// export default PrivateRoute;



// Debugging private routes

import React from "react";
import { Navigate } from "react-router-dom";

// PrivateRoute for Users and Patients
const PrivateRoute = ({ children, role }) => {
  // Check for authentication token in cookies
  const isAuthenticated = document.cookie.includes("access_token_cookie");

  // Retrieve user and patient roles separately
  const user = JSON.parse(localStorage.getItem("user")); // User data: Admin/Provider
  const patient = JSON.parse(localStorage.getItem("patient")); // Patient data

  // Redirect to login page if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={role === "Patient" ? "/login/patient" : "/login/user"} />;
  }

  // Role-based access for User (Admin/Provider)
  if (role && user && user.role !== role) {
    return <Navigate to="/" />;
  }

  // If role is "Patient," ensure patient is logged in
  if (role === "Patient" && !patient) {
    return <Navigate to="/login/patient" />;
  }

  return children;
};

export default PrivateRoute;
