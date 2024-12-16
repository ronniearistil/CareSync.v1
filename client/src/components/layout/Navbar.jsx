import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorElPatients, setAnchorElPatients] = useState(null);
  const [anchorElUsers, setAnchorElUsers] = useState(null);
  const [anchorElAppointments, setAnchorElAppointments] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Handlers for dropdowns
  const handleMenuOpen = (setter) => (event) => setter(event.currentTarget);
  const handleMenuClose = (setter) => () => setter(null);

  // Search functionality
  const handleSearchSubmit = () => {
    console.log("Search query:", searchQuery);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#1976D2",
        padding: "0.5rem",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "white",
            cursor: "pointer",
            fontSize: "2rem",
          }}
          onClick={() => navigate("/")}
        >
          CareSync
        </Typography>

        {/* Nav Links */}
        <Box sx={{ display: "flex", gap: 4 }}>
          {/* Patients Dropdown */}
          <Button
            onClick={handleMenuOpen(setAnchorElPatients)}
            sx={{
              color: "white",
              textTransform: "none",
              fontWeight: "bold",
              fontSize: "1.5rem",
            }}
          >
            Patients
          </Button>
          <Menu
            anchorEl={anchorElPatients}
            open={Boolean(anchorElPatients)}
            onClose={handleMenuClose(setAnchorElPatients)}
          >
            <MenuItem
              sx={{ fontSize: "1.5rem" }}
              onClick={() => navigate("/patients")}
            >
              View All Patients
            </MenuItem>
            <MenuItem
              sx={{ fontSize: "1.5rem" }}
              onClick={() => navigate("/add-patient")}
            >
              Add New Patient
            </MenuItem>
            <MenuItem
              sx={{ fontSize: "1.5rem" }}
              onClick={() => navigate("/patients/reports")}
            >
              Patient Reports
            </MenuItem>
          </Menu>

          {/* Users Dropdown */}
          <Button
            onClick={handleMenuOpen(setAnchorElUsers)}
            sx={{
              color: "white",
              textTransform: "none",
              fontWeight: "bold",
              fontSize: "1.5rem",
            }}
          >
            Users
          </Button>
          <Menu
            anchorEl={anchorElUsers}
            open={Boolean(anchorElUsers)}
            onClose={handleMenuClose(setAnchorElUsers)}
          >
            <MenuItem
              sx={{ fontSize: "1.5rem" }}
              onClick={() => navigate("/users")}
            >
              View All Users
            </MenuItem>
            <MenuItem
              sx={{ fontSize: "1.5rem" }}
              onClick={() => navigate("/add-user")}
            >
              Add New User
            </MenuItem>
            <MenuItem
              sx={{ fontSize: "1.5rem" }}
              onClick={() => navigate("/users/reports")}
            >
              User Reports
            </MenuItem>
          </Menu>

          {/* Appointments Dropdown */}
          <Button
            onClick={handleMenuOpen(setAnchorElAppointments)}
            sx={{
              color: "white",
              textTransform: "none",
              fontWeight: "bold",
              fontSize: "1.5rem",
            }}
          >
            Appointments
          </Button>
          <Menu
            anchorEl={anchorElAppointments}
            open={Boolean(anchorElAppointments)}
            onClose={handleMenuClose(setAnchorElAppointments)}
          >
            <MenuItem
              sx={{ fontSize: "1.5rem" }}
              onClick={() => navigate("/appointments/calendar")}
            >
              Calendar
            </MenuItem>
            <MenuItem
              sx={{ fontSize: "1.5rem" }}
              onClick={() => navigate("/appointments/add")}
            >
              Add Appointment
            </MenuItem>
          </Menu>

          {/* About Page */}
          <Button
            onClick={() => navigate("/about")}
            sx={{
              color: "white",
              fontSize: "1.5rem",
            }}
          >
            About
          </Button>
        </Box>

        {/* Search Bar */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              backgroundColor: "white",
              borderRadius: "4px",
              width: "200px",
              fontSize: "1.5rem",
            }}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#005bb5",
              color: "white",
              height: "50px",
            }}
            onClick={handleSearchSubmit}
          >
            <SearchIcon fontSize="large" />
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
