
import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography, CircularProgress } from "@mui/material";
import * as patientApi from "../../../utils/patientApi";
import { showSuccessToast, showErrorToast } from "../../../utils/toastUtils";

const AddPatientForm = ({ mode, onSuccess }) => {
  const { id } = useParams(); // Get patient ID from the URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    date_of_birth: "",
    address: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Debugging the ID from URL
  console.log("Patient ID from route:", id);

  // Fetch patient data if in replace mode
  useEffect(() => {
    if (mode === "replace" && id) {
      const fetchPatient = async () => {
        try {
          const data = await patientApi.fetchPatientById(id);
          console.log("Fetched patient data:", data);
          setFormData(data); // Pre-fill form with fetched data
        } catch (error) {
          console.error("Failed to fetch patient:", error);
          showErrorToast("Failed to load patient details.");
        }
      };

      fetchPatient();
    }
  }, [id, mode]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      // Format date_of_birth to MM/DD/YYYY
      const formattedDate = formData.date_of_birth
        ? new Date(formData.date_of_birth).toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
        : null;
  
      const payload = {
        first_name: formData.first_name?.trim(),
        last_name: formData.last_name?.trim(),
        email: formData.email?.trim(),
        phone_number: formData.phone_number?.replace(/[-\s()]/g, "").trim(),
        date_of_birth: formattedDate, // MM/DD/YYYY format
        address: formData.address?.trim(),
      };
  
      console.log("Payload being sent:", payload); // Debug payload
  
      if (mode === "replace" && id) {
        await patientApi.updatePatient(id, payload); // PUT request
        showSuccessToast("Patient updated successfully!");
      } else {
        await patientApi.createPatient(payload); // POST request
        showSuccessToast("Patient added successfully!");
      }
  
      navigate("/patients");
    } catch (error) {
      console.error("Error while saving patient data:", error.response?.data || error);
      showErrorToast(
        error.response?.data?.error || "Failed to save patient details. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  
  
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: "auto" }}>
      <Typography variant="h4" gutterBottom>
        {mode === "replace" ? "Replace Patient" : "Add Patient"}
      </Typography>

      {/* Form Fields */}
      <TextField
        label="First Name"
        name="first_name"
        value={formData.first_name}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Last Name"
        name="last_name"
        value={formData.last_name}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Phone Number"
        name="phone_number"
        value={formData.phone_number}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Date of Birth"
        name="date_of_birth"
        type="date"
        value={formData.date_of_birth}
        onChange={handleChange}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
        required
      />
      <TextField
        label="Address"
        name="address"
        value={formData.address}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      {mode !== "replace" && (
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
      )}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={isSubmitting}
        sx={{ mt: 2 }}
      >
        {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Save"}
      </Button>
    </Box>
  );
};

export default AddPatientForm;
