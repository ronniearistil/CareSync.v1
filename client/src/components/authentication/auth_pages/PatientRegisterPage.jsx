import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const PatientRegisterPage = () => {
  // Validation Schema
  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone_number: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    date_of_birth: Yup.string().required("Date of birth is required"),
    address: Yup.string().required("Address is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  // Handle Form Submission
const handleSubmit = async (values, { setSubmitting, resetForm }) => {
  try {
    // Prevent duplicate toast messages
    if (!toast.isActive("user-success")) {
      const payload = {
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        phone_number: values.phone_number,
        date_of_birth: values.date_of_birth,
        address: values.address,
        password: values.password,
      };

      await axios.post("http://localhost:5555/auth/register", payload);

      // Single toast message with ID
      toast.success("User account created successfully!", { id: "user-success" });

      resetForm();
    }
  } catch (err) {
    toast.error(err.response?.data?.error || "Failed to register user.");
  } finally {
    setSubmitting(false);
  }
};

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <Toaster position="top-center" />
      <h1 style={{ textAlign: "center", marginBottom: "1rem", color: "#1976D2" }}>
        Patient Sign Up
      </h1>
      <Formik
        initialValues={{
          first_name: "",
          last_name: "",
          email: "",
          phone_number: "",
          date_of_birth: "",
          address: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            {/* First Name */}
            <div style={{ marginBottom: "10px" }}>
              <Field
                name="first_name"
                placeholder="First Name"
                style={{ width: "100%", padding: "8px" }}
              />
              <ErrorMessage name="first_name" component="div" style={{ color: "red" }} />
            </div>

            {/* Last Name */}
            <div style={{ marginBottom: "10px" }}>
              <Field
                name="last_name"
                placeholder="Last Name"
                style={{ width: "100%", padding: "8px" }}
              />
              <ErrorMessage name="last_name" component="div" style={{ color: "red" }} />
            </div>

            {/* Email */}
            <div style={{ marginBottom: "10px" }}>
              <Field
                name="email"
                type="email"
                placeholder="Email"
                style={{ width: "100%", padding: "8px" }}
              />
              <ErrorMessage name="email" component="div" style={{ color: "red" }} />
            </div>

            {/* Phone Number */}
            <div style={{ marginBottom: "10px" }}>
              <Field
                name="phone_number"
                placeholder="Phone Number"
                style={{ width: "100%", padding: "8px" }}
              />
              <ErrorMessage name="phone_number" component="div" style={{ color: "red" }} />
            </div>

            {/* Date of Birth */}
            <div style={{ marginBottom: "10px" }}>
              <Field
                name="date_of_birth"
                type="date"
                style={{ width: "100%", padding: "8px" }}
              />
              <ErrorMessage name="date_of_birth" component="div" style={{ color: "red" }} />
            </div>

            {/* Address */}
            <div style={{ marginBottom: "10px" }}>
              <Field
                name="address"
                placeholder="Address"
                style={{ width: "100%", padding: "8px" }}
              />
              <ErrorMessage name="address" component="div" style={{ color: "red" }} />
            </div>

            {/* Password */}
            <div style={{ marginBottom: "10px" }}>
              <Field
                name="password"
                type="password"
                placeholder="Password"
                style={{ width: "100%", padding: "8px" }}
              />
              <ErrorMessage name="password" component="div" style={{ color: "red" }} />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: "100%",
                padding: "10px",
                backgroundColor: "#1976D2",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              {isSubmitting ? "Submitting..." : "Sign Up"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PatientRegisterPage;


