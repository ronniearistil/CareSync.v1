import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-hot-toast";

const PatientLoginPage = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    toast.loading("Logging in...");

    try {
      const response = await axios.post(
        "http://localhost:5555/auth/patients/login",
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.dismiss();
      toast.success("Login successful!");
      localStorage.setItem("user", JSON.stringify(response.data));
      window.location.href = "/patients";
    } catch (err) {
      toast.dismiss();
      const errorMessage =
        err.response?.data?.error || "Something went wrong. Please try again.";
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h1>Patient Login</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div style={{ marginBottom: "10px" }}>
              <label>Email:</label>
              <Field
                type="email"
                name="email"
                placeholder="Email"
                style={{
                  width: "100%",
                  padding: "8px",
                  marginTop: "5px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
              <ErrorMessage
                name="email"
                component="div"
                style={{ color: "red", marginTop: "4px" }}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label>Password:</label>
              <Field
                type="password"
                name="password"
                placeholder="Password"
                style={{
                  width: "100%",
                  padding: "8px",
                  marginTop: "5px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
              <ErrorMessage
                name="password"
                component="div"
                style={{ color: "red", marginTop: "4px" }}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                padding: "10px 20px",
                backgroundColor: "#1976D2",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                width: "100%",
              }}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PatientLoginPage;



