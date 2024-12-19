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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchResults, setQuery, clearSearch } from "../../store/slices/searchSlice";
import toast from "react-hot-toast";
import logout from "../authentication/Logout";

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

  // Fetch user details
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:5555/auth/me", {
          credentials: "include",
        });
        const userData = await response.json();
        setUserName(userData.name || "Guest");
      } catch (error) {
        toast.error("Failed to fetch user profile.");
      }
    };
    fetchUser();
  }, []);

  // Dropdown Handlers
  const handleMenuOpen = (setter) => (event) => setter(event.currentTarget);
  const handleMenuClose = (setter) => () => setter(null);

  // Search Handlers
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
    <AppBar position="static" sx={{ backgroundColor: "#1976D2", padding: "1rem" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo */}
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", color: "white", cursor: "pointer", fontSize: "3rem" }}
          onClick={() => navigate("/")}
        >
          CareSync
        </Typography>

        {/* Nav Links */}
        <Box sx={{ display: "flex", gap: 4 }}>
          {/* Patients Dropdown */}
          <Button
            onClick={handleMenuOpen(setAnchorElPatients)}
            sx={{ color: "white", textTransform: "none", fontWeight: "bold", fontSize: "2rem" }}
          >
            Patients
          </Button>
          <Menu anchorEl={anchorElPatients} open={Boolean(anchorElPatients)} onClose={handleMenuClose(setAnchorElPatients)}>
            <MenuItem sx={{ fontSize: "1.5rem" }} onClick={() => navigate("/patients")}>
              View All Patients
            </MenuItem>
            <MenuItem sx={{ fontSize: "1.5rem" }} onClick={() => navigate("/add-patient")}>
              Add New Patient
            </MenuItem>
            <MenuItem sx={{ fontSize: "1.5rem" }} onClick={() => navigate("/patients/reports")}>
              Patient Reports
            </MenuItem>
          </Menu>

          {/* Users Dropdown */}
          <Button
            onClick={handleMenuOpen(setAnchorElUsers)}
            sx={{ color: "white", textTransform: "none", fontWeight: "bold", fontSize: "2rem" }}
          >
            Users
          </Button>
          <Menu anchorEl={anchorElUsers} open={Boolean(anchorElUsers)} onClose={handleMenuClose(setAnchorElUsers)}>
            <MenuItem sx={{ fontSize: "1.5rem" }} onClick={() => navigate("/users")}>
              View All Users
            </MenuItem>
            <MenuItem sx={{ fontSize: "1.5rem" }} onClick={() => navigate("/add-user")}>
              Add New User
            </MenuItem>
            <MenuItem sx={{ fontSize: "1.5rem" }} onClick={() => navigate("/users/reports")}>
              User Reports
            </MenuItem>
          </Menu>

          {/* Appointments Dropdown */}
          <Button
            onClick={handleMenuOpen(setAnchorElAppointments)}
            sx={{ color: "white", textTransform: "none", fontWeight: "bold", fontSize: "2rem" }}
          >
            Appointments
          </Button>
          <Menu anchorEl={anchorElAppointments} open={Boolean(anchorElAppointments)} onClose={handleMenuClose(setAnchorElAppointments)}>
            <MenuItem sx={{ fontSize: "1.5rem" }} onClick={() => navigate("/appointments/calendar")}>
              Calendar
            </MenuItem>
            <MenuItem sx={{ fontSize: "1.5rem" }} onClick={() => navigate("/appointments/add")}>
              Add Appointment
            </MenuItem>
          </Menu>

          {/* About */}
          <Button onClick={() => navigate("/about")} sx={{ color: "white", fontSize: "1.5rem" }}>
            About
          </Button>
        </Box>

        {/* Search Bar */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, position: "relative" }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search..."
            value={query}
            onChange={(e) => dispatch(setQuery(e.target.value))}
            sx={{ backgroundColor: "white", borderRadius: "4px", width: "300px", fontSize: "1.5rem" }}
          />
          <Button
            variant="contained"
            sx={{ backgroundColor: "#005bb5", color: "white", height: "50px" }}
            onClick={handleSearchSubmit}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : <SearchIcon fontSize="large" />}
          </Button>

          {/* Search Results */}
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

        {/* Profile Dropdown */}
        <Box>
          <Button onClick={handleMenuOpen(setAnchorElProfile)} sx={{ color: "white", fontSize: "1.5rem", fontWeight: "bold" }}>
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



// Token set up Test. 12/17/2024

// import React, { useState, useEffect } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Box,
//   Button,
//   Menu,
//   MenuItem,
//   TextField,
//   List,
//   ListItem,
//   ListItemText,
//   CircularProgress,
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import { useNavigate } from "react-router-dom";
// import { searchGlobal } from "../../utils/searchApi";
// import toast from "react-hot-toast";
// import logout from "../authentication/Logout";
// 
// 
// const Navbar = () => {
//   const navigate = useNavigate();
//   const [anchorElPatients, setAnchorElPatients] = useState(null);
//   const [anchorElUsers, setAnchorElUsers] = useState(null);
//   const [anchorElAppointments, setAnchorElAppointments] = useState(null);
//   const [anchorElProfile, setAnchorElProfile] = useState(null); // Profile dropdown state
// 
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [userName, setUserName] = useState("Guest"); // Default name
// 
// 
//   // Fetch user details
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await fetch("http://localhost:5555/auth/me", {
//           credentials: "include", // Sends cookies
//         });
//         const userData = await response.json();
//         setUserName(userData.name || "Guest"); // Update user's name
//       } catch (error) {
//         toast.error("Failed to fetch user profile.");
//       }
//     };
// 
//     fetchUser();
//   }, []);
// 
//   // Handlers for dropdowns
//   const handleMenuOpen = (setter) => (event) => setter(event.currentTarget);
//   const handleMenuClose = (setter) => () => setter(null);
// 
//   // Search functionality
//   const handleSearchSubmit = async () => {
//     if (!searchQuery.trim()) {
//       console.error("Search query is empty");
//       return;
//     }
// 
//     setLoading(true);
//     try {
//       const results = await searchGlobal(searchQuery); // Call the search API
//       setSearchResults(results.results || []); // Store results in state
//       setShowDropdown(true); // Show dropdown on search
//     } catch (error) {
//       console.error("Search failed:", error);
//     } finally {
//       setLoading(false);
//     }
//   };
// 
//   // Navigate to the full search results page
//   const handleViewAllResults = () => {
//     navigate("/search-results", { state: { results: searchResults } });
//     setShowDropdown(false); // Hide dropdown
//   };
// 
//   // Profile Menu Handlers
//   const handleProfileMenu = (event) => setAnchorElProfile(event.currentTarget);
//   const handleProfileClose = () => setAnchorElProfile(null);
// 
//   return (
//     <AppBar
//       position="static"
//       sx={{
//         backgroundColor: "#1976D2",
//         padding: "1rem",
//       }}
//     >
//       <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
//         {/* Logo */}
//         <Typography
//           variant="h4"
//           sx={{
//             fontWeight: "bold",
//             color: "white",
//             cursor: "pointer",
//             fontSize: "3rem",
//           }}
//           onClick={() => navigate("/")}
//         >
//           CareSync
//         </Typography>
// 
//         {/* Nav Links */}
//         <Box sx={{ display: "flex", gap: 4 }}>
//           {/* Patients Dropdown */}
//           <Button
//             onClick={handleMenuOpen(setAnchorElPatients)}
//             sx={{
//               color: "white",
//               textTransform: "none",
//               fontWeight: "bold",
//               fontSize: "2rem",
//             }}
//           >
//             Patients
//           </Button>
//           <Menu
//             anchorEl={anchorElPatients}
//             open={Boolean(anchorElPatients)}
//             onClose={handleMenuClose(setAnchorElPatients)}
//           >
//             <MenuItem sx={{ fontSize: "1.5rem" }} onClick={() => navigate("/patients")}>
//               View All Patients
//             </MenuItem>
//             <MenuItem sx={{ fontSize: "1.5rem" }} onClick={() => navigate("/add-patient")}>
//               Add New Patient
//             </MenuItem>
//             <MenuItem sx={{ fontSize: "1.5rem" }} onClick={() => navigate("/patients/reports")}>
//               Patient Reports
//             </MenuItem>
//           </Menu>
// 
//           {/* Users Dropdown */}
//           <Button
//             onClick={handleMenuOpen(setAnchorElUsers)}
//             sx={{
//               color: "white",
//               textTransform: "none",
//               fontWeight: "bold",
//               fontSize: "2rem",
//             }}
//           >
//             Users
//           </Button>
//           <Menu
//             anchorEl={anchorElUsers}
//             open={Boolean(anchorElUsers)}
//             onClose={handleMenuClose(setAnchorElUsers)}
//           >
//             <MenuItem sx={{ fontSize: "1.5rem" }} onClick={() => navigate("/users")}>
//               View All Users
//             </MenuItem>
//             <MenuItem sx={{ fontSize: "1.5rem" }} onClick={() => navigate("/add-user")}>
//               Add New User
//             </MenuItem>
//             <MenuItem sx={{ fontSize: "1.5rem" }} onClick={() => navigate("/users/reports")}>
//               User Reports
//             </MenuItem>
//           </Menu>
// 
//           {/* Appointments Dropdown */}
//           <Button
//             onClick={handleMenuOpen(setAnchorElAppointments)}
//             sx={{
//               color: "white",
//               textTransform: "none",
//               fontWeight: "bold",
//               fontSize: "2rem",
//             }}
//           >
//             Appointments
//           </Button>
//           <Menu
//             anchorEl={anchorElAppointments}
//             open={Boolean(anchorElAppointments)}
//             onClose={handleMenuClose(setAnchorElAppointments)}
//           >
//             <MenuItem
//               sx={{ fontSize: "1.5rem" }}
//               onClick={() => navigate("/appointments/calendar")}
//             >
//               Calendar
//             </MenuItem>
//             <MenuItem sx={{ fontSize: "1.5rem" }} onClick={() => navigate("/appointments/add")}>
//               Add Appointment
//             </MenuItem>
//           </Menu>
// 
//           {/* About Page */}
//           <Button onClick={() => navigate("/about")} sx={{ color: "white", fontSize: "1.5rem" }}>
//             About
//           </Button>
//         </Box>
// 
//         {/* Search Bar */}
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1, position: "relative" }}>
//           <TextField
//             variant="outlined"
//             size="small"
//             placeholder="Search..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             sx={{
//               backgroundColor: "white",
//               borderRadius: "4px",
//               width: "300px",
//               fontSize: "1.5rem",
//             }}
//           />
//           <Button
//             variant="contained"
//             sx={{
//               backgroundColor: "#005bb5",
//               color: "white",
//               height: "50px",
//             }}
//             onClick={handleSearchSubmit}
//             disabled={loading}
//           >
//             {loading ? <CircularProgress size={24} color="inherit" /> : <SearchIcon fontSize="large" />}
//           </Button>
// 
//           {/* Dropdown Search Results */}
//           {showDropdown && (
//             <List
//               sx={{
//                 position: "absolute",
//                 top: "60px",
//                 left: "0",
//                 backgroundColor: "white",
//                 boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
//                 borderRadius: "4px",
//                 width: "300px",
//                 zIndex: 10,
//                 maxHeight: "300px",
//                 overflowY: "auto",
//               }}
//             >
//               {searchResults.length > 0 ? (
//                 <>
//                   {searchResults.map((result) => (
//                     <ListItem
//                       key={result.id}
//                       sx={{ borderBottom: "1px solid #ddd", cursor: "pointer" }}
//                       onClick={() => navigate(result.route)}
//                     >
//                       <ListItemText
//                         primary={result.first_name || result.name}
//                         secondary={result.email}
//                       />
//                     </ListItem>
//                   ))}
//                   <ListItem onClick={handleViewAllResults}>
//                     <Typography variant="body1" sx={{ fontWeight: "bold", textAlign: "center" }}>
//                       View All Results
//                     </Typography>
//                   </ListItem>
//                 </>
//               ) : (
//                 <ListItem>
//                   <Typography variant="body2" color="textSecondary">
//                     No results found
//                   </Typography>
//                 </ListItem>
//               )}
//             </List>
//           )}
//         </Box>
// 
//         {/* Profile Dropdown */}
//         <Box>
//         <Button
//     onClick={handleProfileMenu}
//     sx={{
//         color: "white",
//         textTransform: "none",
//         fontSize: "1.5rem", // Match font size
//         fontWeight: "bold", // Match font weight
//       }}
// >
//     {userName}
// </Button>
// 
//           <Menu
//             anchorEl={anchorElProfile}
//             open={Boolean(anchorElProfile)}
//             onClose={handleProfileClose}
//           >
// <MenuItem onClick={() => navigate("/account")}>Account Settings</MenuItem>
// <MenuItem
//   onClick={() => {
//     handleProfileClose(); // Close the dropdown
//     logout(navigate); // Call the logout function
//   }}
// >
//   Logout
// </MenuItem>
// 
//           </Menu>
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };
// 
// export default Navbar;
