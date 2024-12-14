// 
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { ThemeProvider, CssBaseline } from "@mui/material";
// import theme from "./theme";
// import Navbar from "./components/layout/Navbar";
// import Dashboard from "./components/layout/Dashboard";
// import Patients from "./components/patient_context/Patients";
// import PatientDetails from "./components/patient_context/PatientDetails";
// import AddPatientForm from "./components/authentication/auth_forms/AddPatientForm";
// import AddUserForm from "./components/authentication/auth_forms/AddUserForm";
// import Appointments from "./components/dashboard/Appointments";
// import News from "./components/news_container/News";
// import About from "./pages/About";
// import LoginPage from "./components/authentication/auth_pages/LoginPage";
// import RegisterPage from "./components/authentication/auth_pages/RegisterPage";
// import PasswordResetPage from "./components/authentication/auth_pages/PasswordResetPage";
// import PrivateRoute from "./components/PrivateRoute";
// import Footer from "./components/layout/Footer";
// 
// const App = () => {
//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Router>
//         <Navbar />
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/about" element={<About />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/register" element={<RegisterPage />} />
//           <Route path="/reset-password" element={<PasswordResetPage />} />
// 
//           {/* Protected Routes */}
//           <Route
//             path="/"
//             element={
//               <PrivateRoute>
//                 <Dashboard />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/patients"
//             element={
//               <PrivateRoute>
//                 <Patients />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/patients/:id"
//             element={
//               <PrivateRoute>
//                 <PatientDetails />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/add-patient"
//             element={
//               <PrivateRoute>
//                 <AddPatientForm />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/add-user"
//             element={
//               <PrivateRoute>
//                 <AddUserForm />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/appointments"
//             element={
//               <PrivateRoute>
//                 <Appointments />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/news"
//             element={
//               <PrivateRoute>
//                 <News />
//               </PrivateRoute>
//             }
//           />
//         </Routes>
//         <Footer />
//       </Router>
//     </ThemeProvider>
//   );
// };
// 
// export default App;
// import LandingPage from "./components/layout/LandingPage";

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/layout/Dashboard";
import Patients from "./components/patient_context/Patients";
import PatientDetails from "./components/patient_context/PatientDetails";
import AddPatientForm from "./components/authentication/auth_forms/AddPatientForm";
import AddUserForm from "./components/authentication/auth_forms/AddUserForm";
import Appointments from "./components/dashboard/Appointments";
import Analytics from "./components/dashboard/Analytics";
import News from "./components/news_container/News";
import About from "./pages/About";
import LoginPage from "./components/authentication/auth_pages/LoginPage";
import RegisterPage from "./components/authentication/auth_pages/RegisterPage";
import PasswordResetPage from "./components/authentication/auth_pages/PasswordResetPage";
import PrivateRoute from "./components/PrivateRoute";
import Footer from "./components/layout/Footer";
import LandingPage from "./components/layout/LandingPage";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/reset-password" element={<PasswordResetPage />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/patients"
            element={
              <PrivateRoute>
                <Patients />
              </PrivateRoute>
            }
          />
          <Route
            path="/patients/:id"
            element={
              <PrivateRoute>
                <PatientDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-patient"
            element={
              <PrivateRoute>
                <AddPatientForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-user"
            element={
              <PrivateRoute>
                <AddUserForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/appointments"
            element={
              <PrivateRoute>
                <Appointments />
              </PrivateRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <PrivateRoute>
                <Analytics />
              </PrivateRoute>
            }
          />
          <Route
            path="/news"
            element={
              <PrivateRoute>
                <News />
              </PrivateRoute>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;
