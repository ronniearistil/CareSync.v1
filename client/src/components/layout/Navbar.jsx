import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Menu,
  MenuItem,
  TextField,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchResults, setQuery, clearSearch } from "../../store/slices/searchSlice";
import toast from "react-hot-toast";
import logout from "../authentication/logout";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { query, results, loading } = useSelector((state) => state.search);

  const [anchorElPatients, setAnchorElPatients] = useState(null);
  const [anchorElUsers, setAnchorElUsers] = useState(null);
  const [anchorElAppointments, setAnchorElAppointments] = useState(null);
  const [anchorElProfile, setAnchorElProfile] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userName, setUserName] = useState("Guest");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Fetch user session and role
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:5555/auth/me", {
          credentials: "include",
        });

        if (response.ok) {
          const userData = await response.json();

          const firstName = userData.name.split(" ")[0];
          if (userData.role === "Patient") {
            setUserName(`Welcome Back, ${firstName}`);
          } else if (["Provider", "Admin"].includes(userData.role)) {
            setUserName(`Welcome Back, ${firstName}!`);
          } else {
            setUserName("Welcome, Please Login");
          }
        } else {
          setUserName("Welcome, Please Login");
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        setUserName("Welcome, Please Login");
        toast.error("Failed to fetch user profile.");
      }
    };

    fetchUser();
  }, []);

  const handleMenuOpen = (setter) => (event) => setter(event.currentTarget);
  const handleMenuClose = (setter) => () => setter(null);

  const handleSearchSubmit = () => {
    if (!query.trim()) return;
    dispatch(fetchSearchResults(query));
    setShowDropdown(true);
  };

  const handleViewAllResults = () => {
    navigate("/search-results", { state: { results } });
    setShowDropdown(false);
    dispatch(clearSearch());
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976D2" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Logo */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            color: "white",
            cursor: "pointer",
            fontSize: "2rem",
            "&:hover": { color: "#64B5F6" },
          }}
          onClick={() => navigate("/")}
        >
          CareSynq
        </Typography>

        {/* Mobile Menu */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          sx={{ display: { xs: "block", sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        {mobileMenuOpen && (
          <Box
            sx={{
              position: "absolute",
              top: "64px",
              left: 0,
              width: "100%",
              backgroundColor: "#1976D2",
              zIndex: 10,
              display: { xs: "flex", sm: "none" },
              flexDirection: "column",
            }}
          >
            <Button onClick={() => navigate("/patients")} sx={{ color: "white", fontWeight: "bold", textTransform: "none" }}>
              Patients
            </Button>
            <Button onClick={() => navigate("/users")} sx={{ color: "white", fontWeight: "bold", textTransform: "none" }}>
              Users
            </Button>
            <Button onClick={() => navigate("/appointments")} sx={{ color: "white", fontWeight: "bold", textTransform: "none" }}>
              Appointments
            </Button>
            <Button onClick={() => navigate("/dashboard")} sx={{ color: "white", fontWeight: "bold", textTransform: "none" }}>
              Dashboard
            </Button>
            <Button onClick={() => navigate("/about")} sx={{ color: "white", fontWeight: "bold", textTransform: "none" }}>
              About
            </Button>
          </Box>
        )}

        {/* Desktop Menu */}
        <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 4 }}>
          <Button
            onClick={handleMenuOpen(setAnchorElPatients)}
            sx={{ color: "white", fontWeight: "bold", textTransform: "none", fontSize: "1.5rem" }}
          >
            Patients
          </Button>
          <Menu anchorEl={anchorElPatients} open={Boolean(anchorElPatients)} onClose={handleMenuClose(setAnchorElPatients)}>
            <MenuItem onClick={() => navigate("/patients")}>View All Patients</MenuItem>
            <MenuItem onClick={() => navigate("/add-patient")}>Add New Patient</MenuItem>
          </Menu>

          <Button
            onClick={handleMenuOpen(setAnchorElUsers)}
            sx={{ color: "white", fontWeight: "bold", textTransform: "none", fontSize: "1.5rem" }}
          >
            Users
          </Button>
          <Menu anchorEl={anchorElUsers} open={Boolean(anchorElUsers)} onClose={handleMenuClose(setAnchorElUsers)}>
            <MenuItem onClick={() => navigate("/users")}>View All Users</MenuItem>
            <MenuItem onClick={() => navigate("/add-user")}>Add New User</MenuItem>
          </Menu>

          <Button
            onClick={handleMenuOpen(setAnchorElAppointments)}
            sx={{ color: "white", fontWeight: "bold", textTransform: "none", fontSize: "1.5rem" }}
          >
            Appointments
          </Button>
          <Menu anchorEl={anchorElAppointments} open={Boolean(anchorElAppointments)} onClose={handleMenuClose(setAnchorElAppointments)}>
            <MenuItem onClick={() => navigate("/appointments/calendar")}>Calendar</MenuItem>
            <MenuItem onClick={() => navigate("/appointments/add")}>Add Appointment</MenuItem>
          </Menu>

          <Button sx={{ color: "white", fontWeight: "bold", textTransform: "none", fontSize: "1.5rem" }} onClick={() => navigate("/dashboard")}>
            Dashboard
          </Button>
          <Button sx={{ color: "white", fontWeight: "bold", textTransform: "none", fontSize: "1.5rem" }} onClick={() => navigate("/about")}>
            About
          </Button>
        </Box>

        {/* Search and Profile */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, position: "relative" }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search..."
            value={query}
            onChange={(e) => dispatch(setQuery(e.target.value))}
            sx={{ backgroundColor: "white", borderRadius: "4px", width: "200px" }}
          />
          <Button
            variant="contained"
            sx={{ backgroundColor: "#005bb5", color: "white" }}
            onClick={handleSearchSubmit}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : <SearchIcon />}
          </Button>

          {showDropdown && results.length > 0 && (
            <List
              sx={{
                position: "absolute",
                top: "60px",
                left: "0",
                backgroundColor: "white",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                borderRadius: "4px",
                width: "300px",
                zIndex: 10,
                maxHeight: "300px",
                overflowY: "auto",
              }}
            >
              {results.map((result) => (
                <ListItem
                  key={result.id}
                  sx={{ borderBottom: "1px solid #ddd", cursor: "pointer" }}
                  onClick={() => navigate(result.route)}
                >
                  <ListItemText primary={result.first_name || result.name} secondary={result.email} />
                </ListItem>
              ))}
              <ListItem onClick={handleViewAllResults}>
                <Typography variant="body1" sx={{ fontWeight: "bold", textAlign: "center" }}>
                  View All Results
                </Typography>
              </ListItem>
            </List>
          )}
        </Box>

        <Box>
          <Button
            onClick={handleMenuOpen(setAnchorElProfile)}
            sx={{
              color: "white",
              fontSize: "1.5rem",
              fontWeight: "bold",
              textTransform: "none",
            }}
          >
            {userName}
          </Button>

          <Menu anchorEl={anchorElProfile} open={Boolean(anchorElProfile)} onClose={handleMenuClose(setAnchorElProfile)}>
            <MenuItem onClick={() => navigate("/account")}>Account Settings</MenuItem>
            <MenuItem
              onClick={() => {
                handleMenuClose(setAnchorElProfile);
                logout(navigate);
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;


