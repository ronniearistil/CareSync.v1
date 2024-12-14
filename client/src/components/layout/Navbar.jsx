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
    const [anchorEl, setAnchorEl] = useState(null); // Controls dropdown menus
    const [searchQuery, setSearchQuery] = useState("");

    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

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
                        onClick={handleMenuOpen}
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
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem
                            sx={{ fontSize: "1.5rem" }} // Adjust size for dropdown items
                            onClick={() => (window.location.href = "/patients")}
                        >
                            View All Patients
                        </MenuItem>
                        <MenuItem
                            sx={{ fontSize: "1.5rem" }} // Adjust size for dropdown items
                            onClick={() => (window.location.href = "/add-patient")}
                        >
                            Add New Patient
                        </MenuItem>
                        <MenuItem
                            sx={{ fontSize: "1.5rem" }} // Adjust size for dropdown items
                            onClick={() => (window.location.href = "/patients/reports")}
                        >
                            Patient Reports
                        </MenuItem>
                    </Menu>

                    {/* Other Links */}
                    <Button
                        onClick={() => (window.location.href = "/add-user")}
                        sx={{
                            color: "white",
                            fontSize: "1.5rem", // Double the font size
                        }}
                    >
                        Add User
                    </Button>
                    <Button
                        onClick={() => (window.location.href = "/appointments")}
                        sx={{
                            color: "white",
                            fontSize: "1.5rem", // Double the font size
                        }}
                    >
                        Appointments
                    </Button>
                    <Button
                        onClick={() => (window.location.href = "/analytics")}
                        sx={{
                            color: "white",
                            fontSize: "1.5rem", // Double the font size
                        }}
                    >
                        Analytics
                    </Button>
                    <Button
                        onClick={() => (window.location.href = "/about")}
                        sx={{
                            color: "white",
                            fontSize: "1.5rem", // Double the font size
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
                            fontSize: "1.5rem", // Double the font size for search bar
                        }}
                    />
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#005bb5", // A darker shade of blue for hover
                            color: "white",
                            height: "50px", // Slightly taller button for proportion
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










