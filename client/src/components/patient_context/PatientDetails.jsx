import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import * as patientApi from "../../utils/patientApi";

const PatientDetails = () => {
  const { id } = useParams(); // Get patient ID from URL
  const [patient, setPatient] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null); // For sandwich menu
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPatient = async () => {
      try {
        const data = await patientApi.fetchPatientById(id); // Fetch patient by ID
        setPatient(data);
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
    console.log("Edit patient:", patient);
    handleMenuClose();
  };

  const handleDelete = async () => {
    try {
      await patientApi.deletePatient(id);
      alert("Patient deleted successfully!");
      window.location.href = "/patients"; // Redirect back to patients list
    } catch (error) {
      console.error("Failed to delete patient:", error);
      alert("Failed to delete patient. Please try again.");
    }
    handleMenuClose();
  };

  const handleReplace = () => {
    console.log("Replace patient:", patient);
    handleMenuClose();
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
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          {patient.first_name} {patient.last_name}
        </Typography>
        <IconButton onClick={handleMenuOpen}>
          <MoreVertIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={handleEdit}>Edit</MenuItem>
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
          <MenuItem onClick={handleReplace}>Replace</MenuItem>
        </Menu>
      </Box>
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
        <strong>Last Visit:</strong> {patient.last_visit ? new Date(patient.last_visit).toLocaleDateString() : "No visits yet"}
      </Typography>
    </Box>
  );
};

export default PatientDetails;



