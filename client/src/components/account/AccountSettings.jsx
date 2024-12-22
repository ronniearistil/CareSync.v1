// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   CircularProgress,
//   Container,
//   Paper,
// } from "@mui/material";
// import toast, { Toaster } from "react-hot-toast";
// 
// const AccountSettings = () => {
//   const [initialValues, setInitialValues] = useState({
//     name: "",
//     email: "",
//     phone_number: "",
//     new_password: "",
//   });
//   const [role, setRole] = useState(""); // Track role to conditionally show phone_number
// 
//   // Fetch user data on mount
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get("http://localhost:5555/auth/me", {
//           withCredentials: true,
//         });
//         const userData = response.data;
// 
//         setInitialValues({
//           name: userData.name || "",
//           email: userData.email || "",
//           phone_number: userData.phone_number || "",
//           new_password: "", // Password field starts blank
//         });
// 
//         setRole(userData.role);
//       } catch (error) {
//         toast.error("Failed to fetch user data.");
//       }
//     };
// 
//     fetchUser();
//   }, []);
// 
//   // Validation schema using Yup
//   const validationSchema = Yup.object().shape({
//     name: Yup.string().required("Name is required"),
//     email: Yup.string().email("Invalid email").required("Email is required"),
//     phone_number: role === "Patient"
//       ? Yup.string()
//           .matches(/^\d{10}$/, "Phone number must be 10 digits")
//           .nullable()
//       : Yup.string().nullable(),
//     new_password: Yup.string()
//       .min(6, "Password must be at least 6 characters")
//       .nullable(),
//   });
// 
//   // Submit handler for account update
//   const handleAccountUpdate = async (values, { setSubmitting }) => {
//     const updatedFields = {};
//     Object.keys(values).forEach((key) => {
//       if (key !== "new_password" && values[key] !== initialValues[key]) {
//         updatedFields[key] = values[key];
//       }
//     });
// 
//     try {
//       await axios.patch("http://localhost:5555/auth/update", updatedFields, {
//         withCredentials: true,
//       });
//       toast.success("Account updated successfully!");
//     } catch (error) {
//       toast.error(error.response?.data?.error || "Failed to update account. Please try again.");
//     } finally {
//       setSubmitting(false);
//     }
//   };
// 
//   // Submit handler for password reset
//   const handlePasswordReset = async (values, { setSubmitting }) => {
//     const { email, new_password } = values;
// 
//     if (!new_password) {
//       toast.error("Please provide a new password.");
//       setSubmitting(false);
//       return;
//     }
// 
//     try {
//       await axios.post("http://localhost:5555/auth/reset_password", { email, new_password }, {
//         withCredentials: true,
//       });
//       toast.success("Password reset successfully!");
//     } catch (error) {
//       toast.error(error.response?.data?.error || "Failed to reset password. Please try again.");
//     } finally {
//       setSubmitting(false);
//     }
//   };
// 
//   return (
//     <Container maxWidth="sm" sx={{ mt: 4 }}>
//       <Toaster position="top-center" />
//       <Paper elevation={3} sx={{ p: 4, borderRadius: "8px" }}>
//         <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold", textAlign: "center" }}>
//           Account Settings
//         </Typography>
// 
//         {/* Formik Form */}
//         <Formik
//           enableReinitialize
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={(values, actions) => {
//             // If new_password exists, handle password reset; otherwise, update account
//             if (values.new_password) {
//               handlePasswordReset(values, actions);
//             } else {
//               handleAccountUpdate(values, actions);
//             }
//           }}
//         >
//           {({ isSubmitting, handleChange, values }) => (
//             <Form>
//               {/* Name */}
//               <Box mb={2}>
//                 <TextField
//                   fullWidth
//                   name="name"
//                   label="Name"
//                   value={values.name}
//                   onChange={handleChange}
//                   error={!!values.errors?.name}
//                   helperText={<ErrorMessage name="name" />}
//                 />
//               </Box>
// 
//               {/* Email */}
//               <Box mb={2}>
//                 <TextField
//                   fullWidth
//                   name="email"
//                   label="Email"
//                   type="email"
//                   value={values.email}
//                   onChange={handleChange}
//                   error={!!values.errors?.email}
//                   helperText={<ErrorMessage name="email" />}
//                 />
//               </Box>
// 
//               {/* Phone Number (Conditional for Patients) */}
//               {role === "Patient" && (
//                 <Box mb={2}>
//                   <TextField
//                     fullWidth
//                     name="phone_number"
//                     label="Phone Number"
//                     value={values.phone_number}
//                     onChange={handleChange}
//                     error={!!values.errors?.phone_number}
//                     helperText={<ErrorMessage name="phone_number" />}
//                   />
//                 </Box>
//               )}
// 
//               {/* Password */}
//               <Box mb={2}>
//                 <TextField
//                   fullWidth
//                   name="new_password"
//                   label="New Password"
//                   type="password"
//                   value={values.new_password}
//                   onChange={handleChange}
//                   error={!!values.errors?.new_password}
//                   helperText={<ErrorMessage name="new_password" />}
//                 />
//               </Box>
// 
//               {/* Submit Button */}
//               <Box textAlign="center">
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   color="primary"
//                   disabled={isSubmitting}
//                   sx={{
//                     width: "100%",
//                     py: 1,
//                     fontSize: "1rem",
//                     borderRadius: "8px",
//                   }}
//                 >
//                   {isSubmitting ? (
//                     <CircularProgress size={24} sx={{ color: "white" }} />
//                   ) : (
//                     "Submit"
//                   )}
//                 </Button>
//               </Box>
//             </Form>
//           )}
//         </Formik>
//       </Paper>
//     </Container>
//   );
// };
// 
// export default AccountSettings;


// Test 

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Container,
  Paper,
} from "@mui/material";
import toast, { Toaster } from "react-hot-toast";

const AccountSettings = () => {
  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    phone_number: "",
    new_password: "",
  });
  const [role, setRole] = useState(""); // Track role to conditionally show phone_number

  // Fetch user data on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:5555/auth/me", {
          withCredentials: true,
        });
        const userData = response.data;

        setInitialValues({
          name: userData.name || "",
          email: userData.email || "",
          phone_number: userData.phone_number || "",
          new_password: "", // Password field starts blank
        });

        setRole(userData.role);
      } catch (error) {
        if (!toast.isActive("fetch-error")) {
          toast.error("Failed to fetch user data.", { id: "fetch-error" });
        }
      }
    };

    fetchUser();
  }, []);

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone_number: role === "Patient"
      ? Yup.string()
          .matches(/\d{10}/, "Phone number must be 10 digits")
          .nullable()
      : Yup.string().nullable(),
    new_password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .nullable(),
  });

  // Submit handler for account update
  const handleAccountUpdate = async (values, { setSubmitting }) => {
    const updatedFields = {};
    Object.keys(values).forEach((key) => {
      if (key !== "new_password" && values[key] !== initialValues[key]) {
        updatedFields[key] = values[key];
      }
    });

    try {
      await axios.patch("http://localhost:5555/auth/update", updatedFields, {
        withCredentials: true,
      });
      toast.success("Account updated successfully!", { id: "update-success" });
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to update account.", { id: "update-error" });
    } finally {
      setSubmitting(false);
    }
  };

  // Submit handler for password reset
  const handlePasswordReset = async (values, { setSubmitting }) => {
    const { email, new_password } = values;

    if (!new_password) {
      toast.error("Please provide a new password.", { id: "password-error" });
      setSubmitting(false);
      return;
    }

    try {
      await axios.post("http://localhost:5555/auth/reset_password", { email, new_password }, {
        withCredentials: true,
      });
      toast.success("Password reset successfully!", { id: "password-success" });
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to reset password.", { id: "password-reset-error" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Toaster position="top-center" />
      <Paper elevation={3} sx={{ p: 4, borderRadius: "8px" }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold", textAlign: "center" }}>
          Account Settings
        </Typography>

        {/* Formik Form */}
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            // If new_password exists, handle password reset; otherwise, update account
            if (values.new_password) {
              handlePasswordReset(values, actions);
            } else {
              handleAccountUpdate(values, actions);
            }
          }}
        >
          {({ isSubmitting, handleChange, values }) => (
            <Form>
              {/* Name */}
              <Box mb={2}>
                <TextField
                  fullWidth
                  name="name"
                  label="Name"
                  value={values.name}
                  onChange={handleChange}
                  error={!!values.errors?.name}
                  helperText={<ErrorMessage name="name" />}
                />
              </Box>

              {/* Email */}
              <Box mb={2}>
                <TextField
                  fullWidth
                  name="email"
                  label="Email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  error={!!values.errors?.email}
                  helperText={<ErrorMessage name="email" />}
                />
              </Box>

              {/* Phone Number (Conditional for Patients) */}
              {role === "Patient" && (
                <Box mb={2}>
                  <TextField
                    fullWidth
                    name="phone_number"
                    label="Phone Number"
                    value={values.phone_number}
                    onChange={handleChange}
                    error={!!values.errors?.phone_number}
                    helperText={<ErrorMessage name="phone_number" />}
                  />
                </Box>
              )}

              {/* Password */}
              <Box mb={2}>
                <TextField
                  fullWidth
                  name="new_password"
                  label="New Password"
                  type="password"
                  value={values.new_password}
                  onChange={handleChange}
                  error={!!values.errors?.new_password}
                  helperText={<ErrorMessage name="new_password" />}
                />
              </Box>

              {/* Submit Button */}
              <Box textAlign="center">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  sx={{
                    width: "100%",
                    py: 1,
                    fontSize: "1rem",
                    borderRadius: "8px",
                  }}
                >
                  {isSubmitting ? (
                    <CircularProgress size={24} sx={{ color: "white" }} />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default AccountSettings;
