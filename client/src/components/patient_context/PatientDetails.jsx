// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Box, Typography, IconButton, Menu, MenuItem } from "@mui/material";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import * as patientApi from "../../utils/patientApi";
// 
// const PatientDetails = () => {
//   const { id } = useParams(); // Get patient ID from URL
//   const [patient, setPatient] = useState(null);
//   const [anchorEl, setAnchorEl] = useState(null); // For sandwich menu
//   const [error, setError] = useState(null);
// 
//   useEffect(() => {
//     const loadPatient = async () => {
//       try {
//         const data = await patientApi.fetchPatientById(id); // Fetch patient by ID
//         setPatient(data);
//       } catch (error) {
//         console.error("Error fetching patient:", error);
//         setError("Failed to load patient details. Please try again.");
//       }
//     };
// 
//     loadPatient();
//   }, [id]);
// 
//   const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
//   const handleMenuClose = () => setAnchorEl(null);
// 
//   const handleEdit = () => {
//     console.log("Edit patient:", patient);
//     handleMenuClose();
//   };
// 
//   const handleDelete = async () => {
//     try {
//       await patientApi.deletePatient(id);
//       alert("Patient deleted successfully!");
//       window.location.href = "/patients"; // Redirect back to patients list
//     } catch (error) {
//       console.error("Failed to delete patient:", error);
//       alert("Failed to delete patient. Please try again.");
//     }
//     handleMenuClose();
//   };
// 
//   const handleReplace = () => {
//     console.log("Replace patient:", patient);
//     handleMenuClose();
//   };
// 
//   if (error) {
//     return (
//       <Box sx={{ padding: "2rem" }}>
//         <Typography variant="h6" color="error">
//           {error}
//         </Typography>
//       </Box>
//     );
//   }
// 
//   if (!patient) {
//     return (
//       <Box sx={{ padding: "2rem" }}>
//         <Typography>Loading patient details...</Typography>
//       </Box>
//     );
//   }
// 
//   return (
//     <Box sx={{ padding: "2rem" }}>
//       <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//         <Typography variant="h3" sx={{ fontWeight: "bold" }}>
//           {patient.first_name} {patient.last_name}
//         </Typography>
//         <IconButton onClick={handleMenuOpen}>
//           <MoreVertIcon />
//         </IconButton>
//         <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
//           <MenuItem onClick={handleEdit}>Edit</MenuItem>
//           <MenuItem onClick={handleDelete}>Delete</MenuItem>
//           <MenuItem onClick={handleReplace}>Replace</MenuItem>
//         </Menu>
//       </Box>
//       <Typography variant="body1" sx={{ marginTop: "1rem" }}>
//         <strong>Email:</strong> {patient.email}
//       </Typography>
//       <Typography variant="body1">
//         <strong>Phone Number:</strong> {patient.phone_number}
//       </Typography>
//       <Typography variant="body1">
//         <strong>Address:</strong> {patient.address}
//       </Typography>
//       <Typography variant="body1">
//         <strong>Patient ID:</strong> {patient.id}
//       </Typography>
//       <Typography variant="body1">
//         <strong>Provider(s):</strong> {patient.providers?.map((p) => p.name).join(", ") || "None"}
//       </Typography>
//       <Typography variant="body1">
//         <strong>Last Visit:</strong> {patient.last_visit ? new Date(patient.last_visit).toLocaleDateString() : "No visits yet"}
//       </Typography>
//     </Box>
//   );
// };
// 
// export default PatientDetails;


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import * as patientApi from "../../utils/patientApi";

const PatientDetails = () => {
  const { id } = useParams(); // Get patient ID from URL
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null); // For sandwich menu
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Edit dialog state
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false); // Delete confirmation dialog state
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const loadPatient = async () => {
      try {
        const data = await patientApi.fetchPatientById(id); // Fetch patient by ID
        setPatient(data);
        setEditData(data); // Initialize edit data
      } catch (error) {
        console.error("Error fetching patient:", error);
        setError("Failed to load patient details. Please try again.");
      }
    };

    loadPatient();
  }, [id]);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleEdit = () => {
    setIsEditing(true);
    handleMenuClose();
  };

  const handleEditSubmit = async () => {
    try {
      await patientApi.updatePatient(id, editData); // Submit updated data
      setPatient(editData); // Update displayed data
      setIsEditing(false);
      alert("Patient updated successfully!");
    } catch (error) {
      console.error("Failed to update patient:", error);
      alert("Failed to update patient. Please try again.");
    }
  };

  const handleDelete = async () => {
    try {
      await patientApi.deletePatient(id); // Delete the patient
      alert("Patient deleted successfully!");
      navigate("/patients"); // Redirect back to patients list
    } catch (error) {
      console.error("Failed to delete patient:", error);
      alert("Failed to delete patient. Please try again.");
    }
    setIsDeleteConfirmationOpen(false);
    handleMenuClose();
  };

  const handleReplace = () => {
    navigate(`/replace-patient/${id}`); // Navigate to replace patient page
    handleMenuClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  if (error) {
    return (
      <Box sx={{ padding: "2rem" }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!patient) {
    return (
      <Box sx={{ padding: "2rem" }}>
        <Typography>Loading patient details...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: "2rem" }}>
      {/* Go Back Button */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/patients")}
        sx={{ marginBottom: "1rem" }}
      >
        Back to Patients List
      </Button>

      {/* Header with Patient Name and Menu */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          {patient.first_name} {patient.last_name}
        </Typography>
        <IconButton onClick={handleMenuOpen} sx={{ fontSize: "2rem" }}>
          <MoreVertIcon fontSize="large" />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          sx={{
            "& .MuiMenuItem-root": {
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              padding: "1rem",
              fontSize: "1rem",
              transition: "background-color 0.2s ease",
            },
            "& .MuiMenuItem-root:hover": {
              backgroundColor: "#e0e0e0", // Hover color
            },
          }}
        >
          <MenuItem onClick={handleEdit}>
            <EditIcon color="primary" />
            Edit
          </MenuItem>
          <MenuItem onClick={() => setIsDeleteConfirmationOpen(true)}>
            <DeleteIcon color="error" />
            Delete
          </MenuItem>
          <MenuItem onClick={handleReplace}>
            <SwapHorizIcon color="action" />
            Replace
          </MenuItem>
        </Menu>
      </Box>

      {/* Patient Details */}
      <Typography variant="body1" sx={{ marginTop: "1rem" }}>
        <strong>Email:</strong> {patient.email}
      </Typography>
      <Typography variant="body1">
        <strong>Phone Number:</strong> {patient.phone_number}
      </Typography>
      <Typography variant="body1">
        <strong>Address:</strong> {patient.address}
      </Typography>
      <Typography variant="body1">
        <strong>Patient ID:</strong> {patient.id}
      </Typography>
      <Typography variant="body1">
        <strong>Provider(s):</strong> {patient.providers?.map((p) => p.name).join(", ") || "None"}
      </Typography>
      <Typography variant="body1">
        <strong>Last Visit:</strong>{" "}
        {patient.last_visit ? new Date(patient.last_visit).toLocaleDateString() : "No visits yet"}
      </Typography>

      {/* Edit Dialog */}
      <Dialog open={isEditing} onClose={() => setIsEditing(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Patient Details</DialogTitle>
        <DialogContent>
          <TextField
            label="First Name"
            name="first_name"
            value={editData.first_name || ""}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            name="last_name"
            value={editData.last_name || ""}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={editData.email || ""}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone Number"
            name="phone_number"
            value={editData.phone_number || ""}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditing(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEditSubmit} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={isDeleteConfirmationOpen}
        onClose={() => setIsDeleteConfirmationOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this patient? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteConfirmationOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PatientDetails;
