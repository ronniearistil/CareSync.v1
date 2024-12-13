import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import LogoutButton from "../authentication/LogoutButton"; 

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ backgroundColor: "#4CAF50" }}>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          CareSync
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/dashboard">
            Dashboard
          </Button>
          <Button color="inherit" component={Link} to="/patients">
            Patients
          </Button>
          <Button color="inherit" component={Link} to="/appointments">
            Appointments
          </Button>
          <Button color="inherit" component={Link} to="/news">
            News
          </Button>
          <Button color="inherit" component={Link} to="/about">
            About
          </Button>
          <LogoutButton /> {/* Logout Button */}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;


