// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import { Provider } from 'react-redux'; // Import Redux Provider
// import store from './store/store'; // Import the Redux store
// import './index.css';
// import App from './App.jsx';
// 
// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <Provider store={store}> {/* Wrap App with Provider */}
//       <App />
//     </Provider>
//   </StrictMode>
// );

// Toast Test

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store";
import App from "./App";
import "./index.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for Toastify

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      {/* Add ToastContainer for toast notifications */}
      <ToastContainer
        position="top-right"  // Position of toast
        autoClose={3000}      // Auto-close after 3 seconds
        hideProgressBar       // Hide progress bar
        closeOnClick          // Close toast on click
        pauseOnHover          // Pause toast on hover
        draggable             // Make toast draggable
        theme="colored"       // Theme (can also be "dark" or "light")
        limit={1}             // Prevent duplicate toasts
      />
    </Provider>
  </React.StrictMode>
);