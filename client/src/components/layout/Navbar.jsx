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

const Navbar = () => {
    const [anchorElPatients, setAnchorElPatients] = useState(null); // Controls Patients dropdown
    const [anchorElUsers, setAnchorElUsers] = useState(null); // Controls Users dropdown
    const [searchQuery, setSearchQuery] = useState("");

    const handlePatientsMenuOpen = (event) => setAnchorElPatients(event.currentTarget);
    const handlePatientsMenuClose = () => setAnchorElPatients(null);

    const handleUsersMenuOpen = (event) => setAnchorElUsers(event.currentTarget);
    const handleUsersMenuClose = () => setAnchorElUsers(null);

    const handleSearchChange = (event) => setSearchQuery(event.target.value);
    const handleSearchSubmit = () => {
        console.log("Search query:", searchQuery); // Replace with search functionality
    };

    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: "#1976D2", // Primary blue color
                padding: "0.5rem",
            }}
        >
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                {/* Logo */}
                <Typography
                    variant="h4" // Updated to h4 for larger text
                    sx={{
                        fontWeight: "bold",
                        color: "white",
                        cursor: "pointer",
                        fontSize: "2rem", // Explicitly set the font size
                    }}
                    onClick={() => (window.location.href = "/")}
                >
                    CareSync
                </Typography>

                {/* Nav Links */}
                <Box sx={{ display: "flex", gap: 4 }}>
                    {/* Patients Dropdown */}
                    <Button
                        onClick={handlePatientsMenuOpen}
                        sx={{
                            color: "white",
                            textTransform: "none",
                            fontWeight: "bold",
                            fontSize: "1.5rem", // Double the font size
                        }}
                    >
                        Patients
                    </Button>
                    <Menu
                        anchorEl={anchorElPatients}
                        open={Boolean(anchorElPatients)}
                        onClose={handlePatientsMenuClose}
                    >
                        <MenuItem
                            sx={{ fontSize: "1.5rem" }}
                            onClick={() => (window.location.href = "/patients")}
                        >
                            View All Patients
                        </MenuItem>
                        <MenuItem
                            sx={{ fontSize: "1.5rem" }}
                            onClick={() => (window.location.href = "/add-patient")}
                        >
                            Add New Patient
                        </MenuItem>
                        <MenuItem
                            sx={{ fontSize: "1.5rem" }}
                            onClick={() => (window.location.href = "/patients/reports")}
                        >
                            Patient Reports
                        </MenuItem>
                    </Menu>

                    {/* Users Dropdown */}
                    <Button
                        onClick={handleUsersMenuOpen}
                        sx={{
                            color: "white",
                            textTransform: "none",
                            fontWeight: "bold",
                            fontSize: "1.5rem", // Double the font size
                        }}
                    >
                        Users
                    </Button>
                    <Menu
                        anchorEl={anchorElUsers}
                        open={Boolean(anchorElUsers)}
                        onClose={handleUsersMenuClose}
                    >
                        <MenuItem
                            sx={{ fontSize: "1.5rem" }}
                            onClick={() => (window.location.href = "/users")}
                        >
                            View All Users
                        </MenuItem>
                        <MenuItem
                            sx={{ fontSize: "1.5rem" }}
                            onClick={() => (window.location.href = "/add-user")}
                        >
                            Add New User
                        </MenuItem>
                        <MenuItem
                            sx={{ fontSize: "1.5rem" }}
                            onClick={() => (window.location.href = "/users/reports")}
                        >
                            User Reports
                        </MenuItem>
                    </Menu>

                    {/* Other Links */}
                    {/* <Button
                        onClick={() => (window.location.href = "/appointments")}
                        sx={{
                            color: "white",
                            fontSize: "1.5rem",
                        }}
                    >
                        Appointments
                    </Button>
                    <Button
                        onClick={() => (window.location.href = "/analytics")}
                        sx={{
                            color: "white",
                            fontSize: "1.5rem",
                        }}
                    >
                        Analytics
                    </Button> */}
                    <Button
                        onClick={() => (window.location.href = "/about")}
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
                        onChange={handleSearchChange}
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
