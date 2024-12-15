// import React, { useState, useEffect } from "react";
// import { Box, TextField, Button, Typography, MenuItem } from "@mui/material";
// import * as appointmentApi from "../../utils/appointmentApi";
// import * as userApi from "../../utils/userApi";
// 
// const AddAppointmentForm = () => {
//     const [formData, setFormData] = useState({
//         date: "",
//         time: "",
//         status: "Scheduled",
//         location: "",
//         user_id: "",
//     });
// 
//     const [users, setUsers] = useState([]);
//     const [error, setError] = useState(null);
// 
//     // Fetch users (patients/providers)
//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 const data = await userApi.fetchUsers();
//                 setUsers(data);
//             } catch (err) {
//                 console.error("Error fetching users:", err);
//                 setError("Failed to load users.");
//             }
//         };
// 
//         fetchUsers();
//     }, []);
// 
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };
// 
//     const handleSubmit = async () => {
//         try {
//             await appointmentApi.createAppointment(formData); // POST request to backend
//             alert("Appointment created successfully!");
//             window.location.href = "/appointments/calendar"; // Redirect to calendar
//         } catch (err) {
//             console.error("Failed to create appointment:", err);
//             alert("Failed to create appointment. Please try again.");
//         }
//     };
// 
//     if (error) {
//         return <Typography color="error">{error}</Typography>;
//     }
// 
//     return (
//         <Box sx={{ padding: "2rem", maxWidth: "500px", margin: "0 auto" }}>
//             <Typography
//                 variant="h4"
//                 sx={{ marginBottom: "2rem", fontWeight: "bold", textAlign: "center" }}
//             >
//                 Add Appointment
//             </Typography>
//             <TextField
//                 name="date"
//                 label="Date"
//                 type="date"
//                 InputLabelProps={{ shrink: true }}
//                 value={formData.date}
//                 onChange={handleInputChange}
//                 fullWidth
//                 sx={{ marginBottom: "1rem" }}
//             />
//             <TextField
//                 name="time"
//                 label="Time"
//                 type="time"
//                 InputLabelProps={{ shrink: true }}
//                 value={formData.time}
//                 onChange={handleInputChange}
//                 fullWidth
//                 sx={{ marginBottom: "1rem" }}
//             />
//             <TextField
//                 name="status"
//                 label="Status"
//                 select
//                 value={formData.status}
//                 onChange={handleInputChange}
//                 fullWidth
//                 sx={{ marginBottom: "1rem" }}
//             >
//                 <MenuItem value="Scheduled">Scheduled</MenuItem>
//                 <MenuItem value="Completed">Completed</MenuItem>
//                 <MenuItem value="Cancelled">Cancelled</MenuItem>
//             </TextField>
//             <TextField
//                 name="location"
//                 label="Location"
//                 value={formData.location}
//                 onChange={handleInputChange}
//                 fullWidth
//                 sx={{ marginBottom: "1rem" }}
//             />
//             <TextField
//                 name="user_id"
//                 label="Assign to Patient"
//                 select
//                 value={formData.user_id}
//                 onChange={handleInputChange}
//                 fullWidth
//                 sx={{ marginBottom: "1rem" }}
//             >
//                 {users.map((user) => (
//                     <MenuItem key={user.id} value={user.id}>
//                         {user.name}
//                     </MenuItem>
//                 ))}
//             </TextField>
//             <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleSubmit}
//                 sx={{ width: "100%", padding: "0.75rem" }}
//             >
//                 Add Appointment
//             </Button>
//         </Box>
//     );
// };
// 
// export default AddAppointmentForm;

// Working Version as of 12/15
// import React, { useState, useEffect } from "react";
// import { Box, TextField, Button, MenuItem, Typography, Select } from "@mui/material";
// import * as appointmentApi from "../../utils/appointmentApi";
// import * as userApi from "../../utils/userApi";
// 
// const AddAppointment = () => {
//   const [formValues, setFormValues] = useState({
//     date: "",
//     time: "",
//     location: "",
//     status: "Scheduled",
//     user_id: "",
//   });
// 
//   const [users, setUsers] = useState([]); // Store users for the dropdown
//   const [error, setError] = useState("");
// 
//   // Fetch users for the dropdown
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const data = await userApi.fetchUsers(); // Fetch all users
//         setUsers(data);
//       } catch (err) {
//         console.error("Failed to fetch users:", err);
//         setError("Unable to load users. Please try again later.");
//       }
//     };
// 
//     fetchUsers();
//   }, []);
// 
//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
// 
//     // Validate required fields
//     if (!formValues.date || !formValues.time || !formValues.status || !formValues.user_id) {
//       setError("Please fill in all required fields.");
//       return;
//     }
// 
//     // Prepare payload
//     const payload = {
//       date: formValues.date,
//       time: formValues.time,
//       location: formValues.location || null, // Optional field
//       status: formValues.status,
//       user_id: parseInt(formValues.user_id, 10),
//     };
// 
//     try {
//       const response = await appointmentApi.createAppointment(payload);
//       alert("Appointment successfully created!");
//       console.log("New Appointment:", response);
//     } catch (err) {
//       console.error("Failed to create appointment:", err);
//       setError("Failed to create appointment. Please check your inputs.");
//     }
//   };
// 
//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormValues((prev) => ({ ...prev, [name]: value }));
//   };
// 
//   return (
//     <Box sx={{ maxWidth: "500px", margin: "0 auto", padding: "2rem", boxShadow: 3 }}>
//       <Typography variant="h5" sx={{ marginBottom: "1rem", textAlign: "center" }}>
//         Add Appointment
//       </Typography>
// 
//       {error && <Typography color="error">{error}</Typography>}
// 
//       <form onSubmit={handleSubmit}>
//         {/* Date Field */}
//         <TextField
//           label="Date"
//           name="date"
//           type="date"
//           value={formValues.date}
//           onChange={handleChange}
//           InputLabelProps={{ shrink: true }}
//           fullWidth
//           sx={{ marginBottom: "1rem" }}
//           required
//         />
// 
//         {/* Time Field */}
//         <TextField
//           label="Time"
//           name="time"
//           type="time"
//           value={formValues.time}
//           onChange={handleChange}
//           InputLabelProps={{ shrink: true }}
//           fullWidth
//           sx={{ marginBottom: "1rem" }}
//           required
//         />
// 
//         {/* Location Field */}
//         <TextField
//           label="Location"
//           name="location"
//           value={formValues.location}
//           onChange={handleChange}
//           fullWidth
//           sx={{ marginBottom: "1rem" }}
//         />
// 
//         {/* Status Dropdown */}
//         <Select
//           name="status"
//           value={formValues.status}
//           onChange={handleChange}
//           fullWidth
//           sx={{ marginBottom: "1rem" }}
//           required
//         >
//           <MenuItem value="Scheduled">Scheduled</MenuItem>
//           <MenuItem value="Completed">Completed</MenuItem>
//           <MenuItem value="Cancelled">Cancelled</MenuItem>
//           <MenuItem value="Rescheduled">Rescheduled</MenuItem>
//         </Select>
// 
//         {/* User Dropdown */}
//         <Select
//           name="user_id"
//           value={formValues.user_id}
//           onChange={handleChange}
//           fullWidth
//           sx={{ marginBottom: "1rem" }}
//           required
//         >
//           <MenuItem value="">Select a User</MenuItem>
//           {users.map((user) => (
//             <MenuItem key={user.id} value={user.id}>
//               {user.name || `User ID: ${user.id}`}
//             </MenuItem>
//           ))}
//         </Select>
// 
//         {/* Submit Button */}
//         <Button variant="contained" color="primary" type="submit" fullWidth>
//           Add Appointment
//         </Button>
//       </form>
//     </Box>
//   );
// };
// 
// export default AddAppointment;

// Add Appointment by Provider and Patient Debugging 

import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
} from "@mui/material";
import * as patientApi from "../../utils/patientApi";
import * as userApi from "../../utils/userApi";
import * as appointmentApi from "../../utils/appointmentApi";

const AddAppointmentForm = () => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    status: "Scheduled",
    location: "",
    user_id: "", // Renamed from provider_id
    patient_id: "",
  });

  const [patients, setPatients] = useState([]);
  const [providers, setProviders] = useState([]);
  const [error, setError] = useState("");

  // Fetch Providers and Patients
  useEffect(() => {
    const loadProviders = async () => {
      try {
        const users = await userApi.fetchUsers();
        const providerList = users.filter((user) => user.role === "Provider");
        setProviders(providerList);
      } catch (err) {
        console.error("Error fetching providers:", err);
      }
    };

    const loadPatients = async () => {
      try {
        const patientList = await patientApi.fetchPatients();
        setPatients(patientList);
      } catch (err) {
        console.error("Error fetching patients:", err);
        setError("Failed to fetch patients.");
      }
    };

    loadProviders();
    loadPatients();
  }, []);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const payload = { ...formData };
      console.log("Submitting appointment payload:", payload);
      await appointmentApi.createAppointment(payload);
      alert("Appointment created successfully!");
      setFormData({
        date: "",
        time: "",
        status: "Scheduled",
        location: "",
        user_id: "",
        patient_id: "",
      });
    } catch (err) {
      console.error("Failed to create appointment:", err);
      setError("Failed to create appointment. Please try again.");
    }
  };

  return (
    <Box sx={{ padding: "2rem", maxWidth: "500px", margin: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Add Appointment
      </Typography>
      {error && <Typography color="error">{error}</Typography>}

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          type="date"
          label="Date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          InputLabelProps={{ shrink: true }}
          margin="normal"
        />
        <TextField
          fullWidth
          type="time"
          label="Time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
          InputLabelProps={{ shrink: true }}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <MenuItem value="Scheduled">Scheduled</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
            <MenuItem value="Rescheduled">Rescheduled</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Provider</InputLabel>
          <Select
            name="user_id" // Updated from provider_id
            value={formData.user_id}
            onChange={handleChange}
            required
          >
            <MenuItem value="">Select Provider</MenuItem>
            {providers.map((provider) => (
              <MenuItem key={provider.id} value={provider.id}>
                {provider.name || `Provider ${provider.id}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Patient</InputLabel>
          <Select
            name="patient_id"
            value={formData.patient_id}
            onChange={handleChange}
            required
          >
            <MenuItem value="">Select Patient</MenuItem>
            {patients.map((patient) => (
              <MenuItem key={patient.id} value={patient.id}>
                {patient.name || `Patient ${patient.id}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: "1rem" }}
          fullWidth
        >
          Add Appointment
        </Button>
      </form>
    </Box>
  );
};

export default AddAppointmentForm;
