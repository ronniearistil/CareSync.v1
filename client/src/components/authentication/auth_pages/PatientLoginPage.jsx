import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const PatientLoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Logging in...");

    try {
      const response = await axios.post(
        "http://localhost:5555/auth/patients/login", // Backend endpoint
        formData,
        {
          headers: {
            "Content-Type": "application/json", // Explicitly set content type
          },
          withCredentials: true, // Allow credentials like cookies
        }
      );

      toast.dismiss();
      toast.success("Login successful!");
      localStorage.setItem("user", JSON.stringify(response.data));
      window.location.href = "/patients"; // Redirect on success
    } catch (err) {
      toast.dismiss();
      const errorMessage =
        err.response?.data?.error || "Something went wrong. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <Toaster position="top-center" />
      <h1>Patient Login</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <button
          type="submit"
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
          Login
        </button>
      </form>
    </div>
  );
};

export default PatientLoginPage;


