import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-hot-toast";

const UserLoginPage = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        "http://localhost:5555/auth/user/login",
        {
          email: values.email,
          password: values.password,
        },
        { withCredentials: true }
      );

      localStorage.setItem("user", JSON.stringify(response.data));
      toast.success("Login successful!");
      window.location.href = "/dashboard";
    } catch (err) {
      toast.error(err.response?.data?.error || "Invalid login credentials.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h1>User Login</h1>
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
                style={{ width: "100%", padding: "8px", marginTop: "5px" }}
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
                style={{ width: "100%", padding: "8px", marginTop: "5px" }}
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
                cursor: "pointer",
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

export default UserLoginPage;




