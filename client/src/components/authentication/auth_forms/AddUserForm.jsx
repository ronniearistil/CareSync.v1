import React, { useState } from "react";
import { Box, TextField, Button, Typography, MenuItem } from "@mui/material";
import { createUser } from "../../utils/api";

const AddUserForm = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "Provider",
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createUser(formData);
            setFormData({
                name: "",
                email: "",
                password: "",
                role: "Provider",
            });
            setError(null);
            if (onSuccess) onSuccess();
        } catch (err) {
            setError("Failed to add user. Please try again.");
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: "auto" }}>
            <Typography variant="h4" gutterBottom>
                Add User
            </Typography>
            {error && <Typography color="error">{error}</Typography>}
            <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
            />
            <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
            />
            <TextField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
            />
            <TextField
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                select
                fullWidth
                margin="normal"
                required
            >
                <MenuItem value="Provider">Provider</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
            </TextField>
            <Button type="submit" variant="contained" color="primary">
                Add User
            </Button>
        </Box>
    );
};

export default AddUserForm;
