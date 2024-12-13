import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Box, Button, Menu, MenuItem, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Navbar = () => {
    const [anchorEl, setAnchorEl] = useState(null); // Controls dropdown menus
    const [searchQuery, setSearchQuery] = useState("");

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = () => {
        console.log("Search query:", searchQuery); // Replace with search functionality
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: "#4CAF50", padding: "0.5rem 0" }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {/* Logo */}
                <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "#FFFFFF", cursor: "pointer" }}
                    onClick={() => (window.location.href = "/")}
                >
                    CareSync
                </Typography>

                {/* Nav Links with Dropdown Menus */}
                <Box sx={{ display: "flex", gap: 2 }}>
                    {/* Patients Menu */}
                    <Button
                        onClick={handleMenuOpen}
                        sx={{ color: "white", textTransform: "none", fontWeight: "bold" }}
                    >
                        Patients
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={() => (window.location.href = "/patients")}>
                            View All Patients
                        </MenuItem>
                        <MenuItem onClick={() => (window.location.href = "/add-patient")}>
                            Add New Patient
                        </MenuItem>
                        <MenuItem onClick={() => (window.location.href = "/patients/reports")}>
                            Patient Reports
                        </MenuItem>
                    </Menu>

                    {/* Users Menu */}
                    <Button
                        onClick={() => (window.location.href = "/add-user")}
                        sx={{ color: "white", textTransform: "none", fontWeight: "bold" }}
                    >
                        Add User
                    </Button>

                    {/* Appointments */}
                    <Button
                        sx={{ color: "white", textTransform: "none", fontWeight: "bold" }}
                        onClick={() => (window.location.href = "/appointments")}
                    >
                        Appointments
                    </Button>

                    {/* Analytics */}
                    <Button
                        sx={{ color: "white", textTransform: "none", fontWeight: "bold" }}
                        onClick={() => (window.location.href = "/analytics")}
                    >
                        Analytics
                    </Button>

                    {/* About */}
                    <Button
                        sx={{ color: "white", textTransform: "none", fontWeight: "bold" }}
                        onClick={() => (window.location.href = "/about")}
                    >
                        About
                    </Button>
                </Box>

                {/* Search Bar */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <TextField
                        placeholder="Search..."
                        variant="outlined"
                        size="small"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        sx={{
                            backgroundColor: "white",
                            borderRadius: "4px",
                            width: "200px",
                        }}
                    />
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: "#388E3C", color: "white", height: "40px" }}
                        onClick={handleSearchSubmit}
                    >
                        <SearchIcon />
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;







