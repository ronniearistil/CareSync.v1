import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { Toaster } from "react-hot-toast";
import theme from "./Theme";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/layout/Dashboard";
import Patients from "./components/patient_context/Patients";
import PatientDetails from "./components/patient_context/PatientDetails";
import AddPatientForm from "./components/authentication/auth_forms/AddPatientForm";
import AddUserForm from "./components/authentication/auth_forms/AddUserForm";
import Appointments from "./components/Dashboard/Appointments";
import AppointmentCalendar from "./components/Dashboard/AppointmentCalendar";
import AddAppointment from "./components/Dashboard/AddAppointment";
import Analytics from "./components/Dashboard/Analytics";
import News from "./components/news_container/News";
import About from "./pages/About";
import RegisterPage from "./components/authentication/auth_pages/UserRegisterPage";
import PatientRegisterPage from "./components/authentication/auth_pages/PatientRegisterPage";
import UserRegisterPage from "./components/authentication/auth_pages/UserRegisterPage";
import PasswordResetPage from "./components/authentication/auth_pages/UserPasswordResetPage";
import PatientPasswordReset from "./components/authentication/auth_pages/PatientLoginPage";
import Footer from "./components/layout/Footer";
import LandingPage from "./components/layout/LandingPage";
import PatientLoginPage from "./components/authentication/auth_pages/PatientLoginPage";
import UserLoginPage from "./components/authentication/auth_pages/UserLoginPage";
import Users from "./components/user_context/Users";
import UserDetails from "./components/user_context/UserDetails";
import CareDetails from "./components/patient_context/CareDetails";
import RecommendationsDashboard from './components/Dashboard/RecommendationsDashboard';
import PatientRecommendations from "./components/recommendations/PatientRecommendations";
import RecommendationList from './components/recommendations/RecommendationList';
import AccountSettings from "./components/account/AccountSettings"; 

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
    sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #F0F4F8 0%, #D9E2EC 50%, #BCCCDC 100%)",
        backgroundSize: "400% 400%",
        animation: "gradientBG 10s ease infinite", // Faster animation for visibility
    }}
>
    <style>
        {`
        @keyframes gradientBG {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        `}
    </style>

                <Router>
                    <Toaster position="top-right" reverseOrder={false} />
                    <Navbar />
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/login/user" element={<UserLoginPage />} />
                        <Route path="/login/patient" element={<PatientLoginPage />} />
                        
                        {/* Role-Based Registration */}
                        <Route path="/register/patient" element={<PatientRegisterPage />} />
                        <Route path="/register/user" element={<UserRegisterPage />} />

                        <Route path="/reset-password" element={<PasswordResetPage />} />

                        {/* Replace Patient */}
                        <Route path="/replace-patient/:id" element={<AddPatientForm mode="replace" />} />
                        <Route path="/patients/reset-password" element={<PatientPasswordReset />} />
                        <Route path="/patients/:patientId/care-details" element={<CareDetails />} />

                        {/* Protected Routes */}
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/patients" element={<Patients />} />
                        <Route path="/patients/:id" element={<PatientDetails />} />
                        <Route path="/providers/:id" element={<UserDetails />} />
                        <Route path="/add-patient" element={<AddPatientForm />} />
                        <Route path="/add-user" element={<AddUserForm />} />
                        <Route path="/appointments" element={<Appointments />} />
                        <Route path="/appointments/calendar" element={<AppointmentCalendar />} />
                        <Route path="/appointments/add" element={<AddAppointment />} />
                        <Route path="/analytics" element={<Analytics />} />
                        <Route path="/news" element={<News />} />
                        <Route path="/account" element={<AccountSettings />} />
                        <Route path="/dashboard/recommendations" element={<RecommendationsDashboard userId={1} />} />
                        
                        <Route path="/recommendations" element={<RecommendationList />} />
                        <Route path="/patients/recommendations" element={<PatientRecommendations />} />
                        
                        {/* User Routes */}
                        <Route path="/users" element={<Users />} />
                        <Route path="/users/:id" element={<UserDetails />} />
                    </Routes>
                    <Footer />
                </Router>
            </Box>
        </ThemeProvider>
    );
};

export default App;




// Testing Protected Routes 12/16/2024 - Will optimize later. 

// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { ThemeProvider, CssBaseline } from "@mui/material";
// import theme from "./theme";
// import Navbar from "./components/layout/Navbar";
// import Footer from "./components/layout/Footer";
// import PrivateRoute from "./components/authentication/PrivateRoute";
// 
// import LandingPage from "./components/layout/LandingPage";
// import About from "./pages/About";
// import UserLoginPage from "./components/authentication/auth_pages/UserLoginPage";
// import PatientLoginPage from "./components/authentication/auth_pages/PatientLoginPage";
// import RegisterPage from "./components/authentication/auth_pages/RegisterPage";
// import PasswordResetPage from "./components/authentication/auth_pages/PasswordResetPage";
// import Dashboard from "./components/layout/Dashboard";
// import Patients from "./components/patient_context/Patients";
// import PatientDetails from "./components/patient_context/PatientDetails";
// import AddPatientForm from "./components/authentication/auth_forms/AddPatientForm";
// import Appointments from "./components/dashboard/Appointments";
// import AppointmentCalendar from "./components/dashboard/AppointmentCalendar";
// import AddAppointment from "./components/dashboard/AddAppointment";
// import Analytics from "./components/dashboard/Analytics";
// 
// const App = () => {
//     return (
//         <ThemeProvider theme={theme}>
//             <CssBaseline />
//             <Router>
//                 <Navbar />
//                 <Routes>
//                     {/* Public Routes */}
//                     <Route path="/" element={<LandingPage />} />
//                     <Route path="/about" element={<About />} />
//                     <Route path="/login/user" element={<UserLoginPage />} />
//                     <Route path="/login/patient" element={<PatientLoginPage />} />
//                     <Route path="/register" element={<RegisterPage />} />
//                     <Route path="/reset-password" element={<PasswordResetPage />} />
// 
//                     {/* Protected Routes */}
//                     <Route
//                         path="/dashboard"
//                         element={
//                             <PrivateRoute role="Admin">
//                                 <Dashboard />
//                             </PrivateRoute>
//                         }
//                     />
//                     <Route
//                         path="/patients"
//                         element={
//                             <PrivateRoute role="Patient">
//                                 <Patients />
//                             </PrivateRoute>
//                         }
//                     />
//                     <Route
//                         path="/patients/:id"
//                         element={
//                             <PrivateRoute role="Patient">
//                                 <PatientDetails />
//                             </PrivateRoute>
//                         }
//                     />
//                     <Route
//                         path="/add-patient"
//                         element={
//                             <PrivateRoute role="Admin">
//                                 <AddPatientForm />
//                             </PrivateRoute>
//                         }
//                     />
//                     <Route
//                         path="/appointments"
//                         element={
//                             <PrivateRoute>
//                                 <Appointments />
//                             </PrivateRoute>
//                         }
//                     />
//                     <Route
//                         path="/appointments/calendar"
//                         element={
//                             <PrivateRoute>
//                                 <AppointmentCalendar />
//                             </PrivateRoute>
//                         }
//                     />
//                     <Route
//                         path="/appointments/add"
//                         element={
//                             <PrivateRoute>
//                                 <AddAppointment />
//                             </PrivateRoute>
//                         }
//                     />
//                     <Route
//                         path="/analytics"
//                         element={
//                             <PrivateRoute role="Admin">
//                                 <Analytics />
//                             </PrivateRoute>
//                         }
//                     />
//                 </Routes>
//                 <Footer />
//             </Router>
//         </ThemeProvider>
//     );
// };
// 
// export default App;

// MVP TEST

// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { ThemeProvider, CssBaseline } from "@mui/material";
// import { Toaster } from "react-hot-toast";
// import theme from "./theme";
// import Navbar from "./components/layout/Navbar";
// import Footer from "./components/layout/Footer";
// import PrivateRoute from "./components/authentication/PrivateRoute";
// 
// // Public Pages
// import LandingPage from "./components/layout/LandingPage";
// import About from "./pages/About";
// import UserLoginPage from "./components/authentication/auth_pages/UserLoginPage";
// import PatientLoginPage from "./components/authentication/auth_pages/PatientLoginPage";
// import UserRegisterPage from "./components/authentication/auth_pages/UserRegisterPage";
// import PatientRegisterPage from "./components/authentication/auth_pages/PatientRegisterPage";
// import PasswordResetPage from "./components/authentication/auth_pages/PasswordResetPage";
// 
// // Protected Pages
// import Dashboard from "./components/layout/Dashboard";
// import Patients from "./components/patient_context/Patients";
// import PatientDetails from "./components/patient_context/PatientDetails";
// import AddPatientForm from "./components/authentication/auth_forms/AddPatientForm";
// import Appointments from "./components/dashboard/Appointments";
// import AppointmentCalendar from "./components/dashboard/AppointmentCalendar";
// import AddAppointment from "./components/dashboard/AddAppointment";
// import Analytics from "./components/dashboard/Analytics";
// import AccountSettings from "./components/account/AccountSettings";
// 
// const App = () => {
//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Toaster position="top-right" reverseOrder={false} /> {/* Toaster globally */}
//       <Router>
//         <Navbar />
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/login/user" element={<UserLoginPage />} />
//           <Route path="/login/patient" element={<PatientLoginPage />} />
//           <Route path="/register/user" element={<UserRegisterPage />} />
//           <Route path="/register/patient" element={<PatientRegisterPage />} />
//           <Route path="/reset-password" element={<PasswordResetPage />} />
// 
//           {/* Protected Routes */}
//           <Route
//             path="/dashboard"
//             element={
//               <PrivateRoute role="Admin">
//                 <Dashboard />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/patients"
//             element={
//               <PrivateRoute role="Admin">
//                 <Patients />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/patients/:id"
//             element={
//               <PrivateRoute role="Admin">
//                 <PatientDetails />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/add-patient"
//             element={
//               <PrivateRoute role="Admin">
//                 <AddPatientForm />
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
//             path="/appointments/calendar"
//             element={
//               <PrivateRoute>
//                 <AppointmentCalendar />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/appointments/add"
//             element={
//               <PrivateRoute>
//                 <AddAppointment />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/analytics"
//             element={
//               <PrivateRoute role="Admin">
//                 <Analytics />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/account"
//             element={
//               <PrivateRoute>
//                 <AccountSettings />
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
