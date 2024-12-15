// import React, { useState } from "react";
// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   Alert,
//   CircularProgress,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom"; // For navigation
// import * as patientApi from "../../../utils/patientApi";
// 
// const AddPatientForm = ({ onSuccess }) => {
//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     phone_number: "",
//     date_of_birth: "",
//     address: "",
//   });
//   const [error, setError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
// 
//   const navigate = useNavigate(); // Initialize navigation
// 
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };
// 
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setError(null);
//     setSuccessMessage(null);
//     try {
//       await patientApi.createPatient(formData);
//       setFormData({
//         first_name: "",
//         last_name: "",
//         email: "",
//         phone_number: "",
//         date_of_birth: "",
//         address: "",
//       });
//       setSuccessMessage("Patient added successfully!");
//       if (onSuccess) onSuccess();
//       navigate("/patients"); // Redirect to patients page
//     } catch (err) {
//       const errorMessage =
//         err.response?.data?.error || "Failed to add patient. Please try again.";
//       setError(errorMessage);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
// 
//   return (
//     <Box
//       component="form"
//       onSubmit={handleSubmit}
//       sx={{ maxWidth: 400, mx: "auto" }}
//     >
//       <Typography variant="h4" gutterBottom>
//         Add Patient
//       </Typography>
//       {error && (
//         <Alert severity="error" sx={{ mb: 2 }}>
//           {error}
//         </Alert>
//       )}
//       {successMessage && (
//         <Alert severity="success" sx={{ mb: 2 }}>
//           {successMessage}
//         </Alert>
//       )}
//       <TextField
//         label="First Name"
//         name="first_name"
//         value={formData.first_name}
//         onChange={handleChange}
//         fullWidth
//         margin="normal"
//         required
//       />
//       <TextField
//         label="Last Name"
//         name="last_name"
//         value={formData.last_name}
//         onChange={handleChange}
//         fullWidth
//         margin="normal"
//         required
//       />
//       <TextField
//         label="Email"
//         name="email"
//         value={formData.email}
//         onChange={handleChange}
//         fullWidth
//         margin="normal"
//         required
//       />
//       <TextField
//         label="Phone Number"
//         name="phone_number"
//         value={formData.phone_number}
//         onChange={handleChange}
//         fullWidth
//         margin="normal"
//       />
//       <TextField
//         label="Date of Birth"
//         name="date_of_birth"
//         type="date"
//         value={formData.date_of_birth}
//         onChange={handleChange}
//         fullWidth
//         margin="normal"
//         InputLabelProps={{ shrink: true }}
//         required
//       />
//       <TextField
//         label="Address"
//         name="address"
//         value={formData.address}
//         onChange={handleChange}
//         fullWidth
//         margin="normal"
//       />
//       <Button
//         type="submit"
//         variant="contained"
//         color="primary"
//         fullWidth
//         disabled={isSubmitting}
//         sx={{ mt: 2 }}
//       >
//         {isSubmitting ? (
//           <CircularProgress size={24} color="inherit" />
//         ) : (
//           "Add Patient"
//         )}
//       </Button>
//     </Box>
//   );
// };
// 
// export default AddPatientForm;



import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // For navigation
import * as patientApi from "../../../utils/patientApi";

const AddPatientForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    date_of_birth: "",
    address: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate(); // Initialize navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      // Format data to match backend schema
      const payload = {
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
        email: formData.email.trim(),
        phone_number: formData.phone_number.replace(/[-\s()]/g, "").trim(), // Normalize phone number
        date_of_birth: new Date(formData.date_of_birth).toLocaleDateString("en-US"), // Convert to MM/DD/YYYY
        address: formData.address.trim(),
        password: formData.password.trim(),
      };

      console.log("Submitting payload:", payload); // Debugging log

      await patientApi.createPatient(payload);

      // Reset form upon success
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        date_of_birth: "",
        address: "",
        password: "",
      });

      setSuccessMessage("Patient added successfully!");
      if (onSuccess) onSuccess();

      // Redirect to the patients page
      navigate("/patients");
    } catch (err) {
      // Handle error messages
      const errorMessage =
        err.response?.data?.errors ||
        err.response?.data?.error ||
        "Failed to add patient. Please try again.";
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 400, mx: "auto" }}
    >
      <Typography variant="h4" gutterBottom>
        Add Patient
      </Typography>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {typeof error === "object"
            ? Object.values(error).join(", ")
            : error}
        </Alert>
      )}

      {/* Success Alert */}
      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}

      {/* First Name */}
      <TextField
        label="First Name"
        name="first_name"
        value={formData.first_name}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />

      {/* Last Name */}
      <TextField
        label="Last Name"
        name="last_name"
        value={formData.last_name}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />

      {/* Email */}
      <TextField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />

      {/* Phone Number */}
      <TextField
        label="Phone Number"
        name="phone_number"
        value={formData.phone_number}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      {/* Date of Birth */}
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

      {/* Address */}
      <TextField
        label="Address"
        name="address"
        value={formData.address}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />

      {/* Password */}
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

      {/* Submit Button */}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={isSubmitting}
        sx={{ mt: 2 }}
      >
        {isSubmitting ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Add Patient"
        )}
      </Button>
    </Box>
  );
};

export default AddPatientForm;
