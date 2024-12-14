import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useParams } from "react-router-dom";

const UserDetails = () => {
    const { id } = useParams(); // Get the user ID from the URL
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch user details from the API
        fetch(`http://localhost:5555/api/users/${id}`) // Replace with your actual endpoint
            .then((response) => response.json())
            .then((data) => setUser(data))
            .catch((error) => console.error("Error fetching user details:", error));
    }, [id]);

    if (!user) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Box sx={{ padding: "2rem" }}>
            <Typography variant="h3" sx={{ marginBottom: "2rem", fontWeight: "bold" }}>
                User Details
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Name: {user.name}
            </Typography>
            <Typography variant="body1">Email: {user.email}</Typography>
            <Typography variant="body1">Role: {user.role}</Typography>
            {/* Add additional user details here */}
            <Button
                variant="contained"
                sx={{ marginTop: "1rem" }}
                onClick={() => window.history.back()}
            >
                Back to Users
            </Button>
        </Box>
    );
};

export default UserDetails;
