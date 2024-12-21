import React, { useState } from "react";
import {
  Typography,
  Button,
  Box,
  Grid,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const [openRoleModal, setOpenRoleModal] = useState(false);

  // Open/Close role confirmation modal
  const handleOpenModal = () => setOpenRoleModal(true);
  const handleCloseModal = () => setOpenRoleModal(false);

  // Navigate based on role selection
  const handleRoleSelection = (role) => {
    handleCloseModal();
    if (role === "patient") {
      navigate("/register/patient");
    } else {
      navigate("/register/user");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: "4rem 2rem",
        backgroundColor: "#F7F7F7",
        minHeight: "100vh",
      }}
    >
      {/* Header Section */}
      <Typography
        variant="h2"
        sx={{
          marginBottom: "1.5rem",
          fontWeight: "bold",
          color: "#1976D2",
        }}
      >
        Welcome to CareSync
      </Typography>
      <Typography
        variant="h6"
        sx={{
          marginBottom: "3rem",
          color: "#2E2E2E",
          maxWidth: "600px",
        }}
      >
        Your one-stop solution for complete healthcare coordination. Easily
        manage patients, appointments, and analytics with intuitive tools.
      </Typography>

      {/* Cards Section */}
      <Grid container spacing={3} justifyContent="center" sx={{ marginBottom: "2rem" }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ padding: "2rem", textAlign: "center" }}>
            <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
              View Patients
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/patients")}
            >
              Go to Patients
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ padding: "2rem", textAlign: "center" }}>
            <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
              Manage Appointments
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/appointments")}
            >
              Go to Appointments
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ padding: "2rem", textAlign: "center" }}>
            <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
              View Analytics
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/analytics")}
            >
              Go to Analytics
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* Login Section */}
      <Box sx={{ marginTop: "2rem" }}>
        <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
          Already have an account?
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/login/user")}
              sx={{ padding: "0.5rem 1.5rem" }}
            >
              User Login
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/login/patient")}
              sx={{ padding: "0.5rem 1.5rem" }}
            >
              Patient Login
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Optional: Role Confirmation Modal */}
      <Box sx={{ marginTop: "2rem" }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleOpenModal}
          sx={{
            padding: "0.75rem 2rem",
            borderColor: "#1976D2",
            color: "#1976D2",
            "&:hover": { borderColor: "#115293", color: "#115293" },
          }}
        >
          Get Started
        </Button>
      </Box>
      <Dialog open={openRoleModal} onClose={handleCloseModal}>
        <DialogTitle>Confirm Your Role</DialogTitle>
        <DialogContent>
          <Typography>Please confirm your role to proceed with registration:</Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", padding: "1rem" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleRoleSelection("patient")}
            sx={{ marginRight: "1rem" }}
          >
            I am a Patient
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleRoleSelection("provider")}
          >
            I am a Provider/Admin
          </Button>
        </DialogActions>
      </Dialog>

      {/* Footer */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "1rem",
          textAlign: "center",
          backgroundColor: "#1976D2",
          color: "white",
        }}
      >
        <Typography variant="body2">
          © {new Date().getFullYear()} CareSync - All Rights Reserved
        </Typography>
      </Box>
    </Box>
  );
};

export default LandingPage;
