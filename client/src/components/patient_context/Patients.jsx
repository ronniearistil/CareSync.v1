import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import * as patientApi from "../../utils/patientApi";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPatients = async () => {
      try {
        const data = await patientApi.fetchPatients(); // Use the API utility function
        setPatients(data);
      } catch (error) {
        console.error("Error fetching patients:", error);
        setError("Failed to load patients. Please try again.");
      }
    };

    loadPatients();
  }, []);

  if (error) {
    return (
      <Box sx={{ padding: "2rem" }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: "2rem" }}>
      <Typography variant="h3" sx={{ marginBottom: "2rem", fontWeight: "bold" }}>
        Patients
      </Typography>
      {patients.length === 0 ? (
        <Typography variant="body1">No patients found.</Typography>
      ) : (
        patients.map((patient) => (
          <Box
            key={patient.id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem",
              padding: "1rem",
              border: "1px solid #ddd",
              borderRadius: "8px",
            }}
          >
            <Box>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {patient.first_name} {patient.last_name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {patient.email}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {patient.phone_number}
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() => (window.location.href = `/patients/${patient.id}`)}
            >
              View Details
            </Button>
          </Box>
        ))
      )}
    </Box>
  );
};

export default Patients;


