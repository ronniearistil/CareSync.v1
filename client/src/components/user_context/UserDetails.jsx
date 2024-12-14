import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import * as userApi from "../../utils/userApi";

const UserDetails = () => {
  const { id } = useParams(); // Get user ID from URL
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null); // For sandwich menu
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await userApi.fetchUserById(id); // Fetch user by ID
        setUser(data);
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
    console.log("Edit user:", user);
    handleMenuClose();
  };

  const handleDelete = async () => {
    try {
      await userApi.deleteUser(id);
      alert("User deleted successfully!");
      window.location.href = "/users"; // Redirect back to users list
    } catch (error) {
      console.error("Failed to delete user:", error);
      alert("Failed to delete user. Please try again.");
    }
    handleMenuClose();
  };

  const handleReplace = () => {
    console.log("Replace user:", user);
    handleMenuClose();
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
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          {user.name}
        </Typography>
        <IconButton onClick={handleMenuOpen}>
          <MoreVertIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={handleEdit}>Edit</MenuItem>
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
          <MenuItem onClick={handleReplace}>Replace</MenuItem>
        </Menu>
      </Box>
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
        <strong>Date Joined:</strong> {new Date(user.date_joined).toLocaleDateString()}
      </Typography>
    </Box>
  );
};

export default UserDetails;

