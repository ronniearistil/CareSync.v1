// import React, { useState } from "react";
// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   MenuItem,
//   Alert,
//   CircularProgress,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom"; // For navigation
// import * as userApi from "../../../utils/userApi";
// 
// const AddUserForm = ({ onSuccess }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "Provider",
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
//       await userApi.createUser(formData); // Call createUser directly
//       setSuccessMessage("User added successfully!");
//       setFormData({
//         name: "",
//         email: "",
//         password: "",
//         role: "Provider",
//       });
//       if (onSuccess) onSuccess();
//       navigate("/dashboard"); // Redirect to dashboard after adding user
//     } catch (err) {
//       setError(
//         `Failed to add user. Error: ${
//           err.response?.data?.error || err.message
//         }`
//       );
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
//         Add User
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
//         label="Name"
//         name="name"
//         value={formData.name}
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
//         label="Password"
//         name="password"
//         type="password"
//         value={formData.password}
//         onChange={handleChange}
//         fullWidth
//         margin="normal"
//         required
//       />
//       <TextField
//         label="Role"
//         name="role"
//         value={formData.role}
//         onChange={handleChange}
//         select
//         fullWidth
//         margin="normal"
//         required
//       >
//         <MenuItem value="Provider">Provider</MenuItem>
//         <MenuItem value="Admin">Admin</MenuItem>
//       </TextField>
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
//           "Add User"
//         )}
//       </Button>
//     </Box>
//   );
// };
// 
// export default AddUserForm;



// Put Functionalitity Test. 

import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as userApi from "../../../utils/userApi";
import { toast } from "react-hot-toast"; // Import Hot Toast

const AddUserForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Provider",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await userApi.createUser(formData); // Call API to create user
      toast.success("User added successfully!"); // Success notification

      // Reset the form
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "Provider",
      });

      if (onSuccess) onSuccess(); // Callback for success
      navigate("/dashboard"); // Navigate after success
    } catch (err) {
      toast.error(
        `Failed to add user: ${
          err.response?.data?.error || "An unexpected error occurred."
        }`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 400, mx: "auto", mt: 4 }}
    >
      <Typography variant="h4" gutterBottom>
        Add User
      </Typography>

      <TextField
        label="Name"
        name="name"
        value={formData.name}
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
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Role"
        name="role"
        value={formData.role}
        onChange={handleChange}
        select
        fullWidth
        margin="normal"
        required
      >
        <MenuItem value="Provider">Provider</MenuItem>
        <MenuItem value="Admin">Admin</MenuItem>
      </TextField>

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
          "Add User"
        )}
      </Button>
    </Box>
  );
};

export default AddUserForm;
