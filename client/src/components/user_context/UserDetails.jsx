// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Box, Typography, IconButton, Menu, MenuItem } from "@mui/material";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import * as userApi from "../../utils/userApi";
// 
// const UserDetails = () => {
//   const { id } = useParams(); // Get user ID from URL
//   const [user, setUser] = useState(null);
//   const [anchorEl, setAnchorEl] = useState(null); // For sandwich menu
//   const [error, setError] = useState(null);
// 
//   useEffect(() => {
//     const loadUser = async () => {
//       try {
//         const data = await userApi.fetchUserById(id); // Fetch user by ID
//         setUser(data);
//       } catch (error) {
//         console.error("Error fetching user:", error);
//         setError("Failed to load user details. Please try again.");
//       }
//     };
// 
//     loadUser();
//   }, [id]);
// 
//   const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
//   const handleMenuClose = () => setAnchorEl(null);
// 
//   const handleEdit = () => {
//     console.log("Edit user:", user);
//     handleMenuClose();
//   };
// 
//   const handleDelete = async () => {
//     try {
//       await userApi.deleteUser(id);
//       alert("User deleted successfully!");
//       window.location.href = "/users"; // Redirect back to users list
//     } catch (error) {
//       console.error("Failed to delete user:", error);
//       alert("Failed to delete user. Please try again.");
//     }
//     handleMenuClose();
//   };
// 
//   const handleReplace = () => {
//     console.log("Replace user:", user);
//     handleMenuClose();
//   };
// 
//   if (error) {
//     return (
//       <Box sx={{ padding: "2rem" }}>
//         <Typography variant="h6" color="error">
//           {error}
//         </Typography>
//       </Box>
//     );
//   }
// 
//   if (!user) {
//     return (
//       <Box sx={{ padding: "2rem" }}>
//         <Typography>Loading user details...</Typography>
//       </Box>
//     );
//   }
// 
//   return (
//     <Box sx={{ padding: "2rem" }}>
//       <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//         <Typography variant="h3" sx={{ fontWeight: "bold" }}>
//           {user.name}
//         </Typography>
//         <IconButton onClick={handleMenuOpen}>
//           <MoreVertIcon />
//         </IconButton>
//         <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
//           <MenuItem onClick={handleEdit}>Edit</MenuItem>
//           <MenuItem onClick={handleDelete}>Delete</MenuItem>
//           <MenuItem onClick={handleReplace}>Replace</MenuItem>
//         </Menu>
//       </Box>
//       <Typography variant="body1" sx={{ marginTop: "1rem" }}>
//         <strong>Email:</strong> {user.email}
//       </Typography>
//       <Typography variant="body1">
//         <strong>Role:</strong> {user.role}
//       </Typography>
//       <Typography variant="body1">
//         <strong>User ID:</strong> {user.id}
//       </Typography>
//       <Typography variant="body1">
//         <strong>Date Joined:</strong> {new Date(user.date_joined).toLocaleDateString()}
//       </Typography>
//     </Box>
//   );
// };
// 
// export default UserDetails;


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import * as userApi from "../../utils/userApi";

const UserDetails = () => {
  const { id } = useParams(); // Get user ID from URL
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null); // For sandwich menu
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Edit dialog state
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false); // Delete confirmation dialog state
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await userApi.fetchUserById(id); // Fetch user by ID
        setUser(data);
        setEditData(data); // Initialize edit data
      } catch (error) {
        console.error("Error fetching user:", error);
        setError("Failed to load user details. Please try again.");
      }
    };

    loadUser();
  }, [id]);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleEdit = () => {
    setIsEditing(true);
    handleMenuClose();
  };

  const handleEditSubmit = async () => {
    try {
      await userApi.updateUser(id, editData); // Submit updated data
      setUser(editData); // Update displayed data
      setIsEditing(false);
      alert("User updated successfully!");
    } catch (error) {
      console.error("Failed to update user:", error);
      alert("Failed to update user. Please try again.");
    }
  };

  const handleDelete = async () => {
    try {
      await userApi.deleteUser(id); // Delete the user
      alert("User deleted successfully!");
      navigate("/users"); // Redirect back to users list
    } catch (error) {
      console.error("Failed to delete user:", error);
      alert("Failed to delete user. Please try again.");
    }
    setIsDeleteConfirmationOpen(false);
    handleMenuClose();
  };

  const handleReplace = () => {
    navigate(`/replace-user/${id}`); // Navigate to replace user page
    handleMenuClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
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

  if (!user) {
    return (
      <Box sx={{ padding: "2rem" }}>
        <Typography>Loading user details...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: "2rem" }}>
      {/* Go Back Button */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/users")}
        sx={{ marginBottom: "1rem" }}
      >
        Back to Users List
      </Button>

      {/* Header with User Name and Menu */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          {user.name}
        </Typography>
        <IconButton onClick={handleMenuOpen} sx={{ fontSize: "2rem" }}>
          <MoreVertIcon fontSize="large" />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          sx={{
            "& .MuiMenuItem-root": {
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              padding: "1rem",
              fontSize: "1rem",
              transition: "background-color 0.2s ease",
            },
            "& .MuiMenuItem-root:hover": {
              backgroundColor: "#e0e0e0", // Hover color
            },
          }}
        >
          <MenuItem onClick={handleEdit}>
            <EditIcon color="primary" />
            Edit
          </MenuItem>
          <MenuItem onClick={() => setIsDeleteConfirmationOpen(true)}>
            <DeleteIcon color="error" />
            Delete
          </MenuItem>
          <MenuItem onClick={handleReplace}>
            <SwapHorizIcon color="action" />
            Replace
          </MenuItem>
        </Menu>
      </Box>

      {/* User Details */}
      <Typography variant="body1" sx={{ marginTop: "1rem" }}>
        <strong>Email:</strong> {user.email}
      </Typography>
      <Typography variant="body1">
        <strong>Role:</strong> {user.role}
      </Typography>
      <Typography variant="body1">
        <strong>User ID:</strong> {user.id}
      </Typography>
      <Typography variant="body1">
        <strong>Date Joined:</strong>{" "}
        {user.date_joined ? new Date(user.date_joined).toLocaleDateString() : "N/A"}
      </Typography>

      {/* Edit Dialog */}
      <Dialog open={isEditing} onClose={() => setIsEditing(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit User Details</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            name="name"
            value={editData.name || ""}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={editData.email || ""}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Role"
            name="role"
            value={editData.role || ""}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditing(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEditSubmit} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={isDeleteConfirmationOpen}
        onClose={() => setIsDeleteConfirmationOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this user? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteConfirmationOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserDetails;
