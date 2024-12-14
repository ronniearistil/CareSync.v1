import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import * as userApi from "../../utils/userApi"; 

const Users = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const data = await userApi.fetchUsers(); // Use the API utility function
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
                setError("Failed to fetch users. Please try again.");
            }
        };

        loadUsers();
    }, []);

    if (error) {
        return (
            <Box sx={{ padding: "2rem" }}>
                <Typography variant="h6" color="error">
                    {error}
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ padding: "2rem" }}>
            <Typography variant="h3" sx={{ marginBottom: "2rem", fontWeight: "bold" }}>
                Users
            </Typography>
            {users.length === 0 ? (
                <Typography variant="body1">No users found.</Typography>
            ) : (
                users.map((user) => (
                    <Box
                        key={user.id}
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "1rem",
                            padding: "1rem",
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                        }}
                    >
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                                {user.name}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                {user.email}
                            </Typography>
                        </Box>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => (window.location.href = `/users/${user.id}`)}
                        >
                            View Details
                        </Button>
                    </Box>
                ))
            )}
        </Box>
    );
};

export default Users;


