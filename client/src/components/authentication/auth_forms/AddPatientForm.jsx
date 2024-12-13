import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { createPatient } from "../../utils/api";

const AddPatientForm = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        date_of_birth: "",
        address: "",
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createPatient(formData);
            setFormData({
                first_name: "",
                last_name: "",
                email: "",
                phone_number: "",
                date_of_birth: "",
                address: "",
            });
            setError(null);
            if (onSuccess) onSuccess();
        } catch (err) {
            setError("Failed to add patient. Please try again.");
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: "auto" }}>
            <Typography variant="h4" gutterBottom>
                Add Patient
            </Typography>
            {error && <Typography color="error">{error}</Typography>}
            <TextField
                label="First Name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
            />
            <TextField
                label="Last Name"
                name="last_name"
                value={formData.last_name}
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
                label="Phone Number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Date of Birth"
                name="date_of_birth"
                type="date"
                value={formData.date_of_birth}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                required
            />
            <TextField
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
                Add Patient
            </Button>
        </Box>
    );
};

export default AddPatientForm;
