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
// import AppointmentCalendar from "./components/dashboard/AppointmentCalendar"; // Import AppointmentCalendar
// import Analytics from "./components/dashboard/Analytics";
// import News from "./components/news_container/News";
// import About from "./pages/About";
// import RegisterPage from "./components/authentication/auth_pages/RegisterPage";
// import PasswordResetPage from "./components/authentication/auth_pages/PasswordResetPage";
// import Footer from "./components/layout/Footer";
// import LandingPage from "./components/layout/LandingPage";
// import PatientLoginPage from "./components/authentication/auth_pages/PatientLoginPage";
// import UserLoginPage from "./components/authentication/auth_pages/UserLoginPage";
// import Users from "./components/user_context/Users"; // New Users Component
// import UserDetails from "./components/user_context/UserDetails"; // New UserDetails Component
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
//                     <Route path="/dashboard" element={<Dashboard />} />
//                     <Route path="/patients" element={<Patients />} />
//                     <Route path="/patients/:id" element={<PatientDetails />} />
//                     <Route path="/add-patient" element={<AddPatientForm />} />
//                     <Route path="/add-user" element={<AddUserForm />} />
//                     <Route path="/appointments" element={<Appointments />} />
//                     <Route path="/appointments/calendar" element={<AppointmentCalendar />} /> {/* Calendar Route */}
//                     <Route path="/analytics" element={<Analytics />} />
//                     <Route path="/news" element={<News />} />
//                     
// 
//                     {/* New User Routes */}
//                     <Route path="/users" element={<Users />} />
//                     <Route path="/users/:id" element={<UserDetails />} />
//                 </Routes>
//                 <Footer />
//             </Router>
//         </ThemeProvider>
//     );
// };
// 
// export default App;


// Add Appointment Debugging

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
import AppointmentCalendar from "./components/dashboard/AppointmentCalendar";
import AddAppointment from "./components/dashboard/AddAppointment"; // AddAppointment Component
import Analytics from "./components/dashboard/Analytics";
import News from "./components/news_container/News";
import About from "./pages/About";
import RegisterPage from "./components/authentication/auth_pages/RegisterPage";
import PasswordResetPage from "./components/authentication/auth_pages/PasswordResetPage";
import Footer from "./components/layout/Footer";
import LandingPage from "./components/layout/LandingPage";
import PatientLoginPage from "./components/authentication/auth_pages/PatientLoginPage";
import UserLoginPage from "./components/authentication/auth_pages/UserLoginPage";
import Users from "./components/user_context/Users";
import UserDetails from "./components/user_context/UserDetails";

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
                    <Route path="/login/user" element={<UserLoginPage />} />
                    <Route path="/login/patient" element={<PatientLoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/reset-password" element={<PasswordResetPage />} />

                    {/* Protected Routes */}
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/patients" element={<Patients />} />
                    <Route path="/patients/:id" element={<PatientDetails />} />
                    <Route path="/add-patient" element={<AddPatientForm />} />
                    <Route path="/add-user" element={<AddUserForm />} />
                    <Route path="/appointments" element={<Appointments />} />
                    <Route path="/appointments/calendar" element={<AppointmentCalendar />} />
                    <Route path="/appointments/add" element={<AddAppointment />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/news" element={<News />} />

                    {/* User Routes */}
                    <Route path="/users" element={<Users />} />
                    <Route path="/users/:id" element={<UserDetails />} />
                </Routes>
                <Footer />
            </Router>
        </ThemeProvider>
    );
};

export default App;
