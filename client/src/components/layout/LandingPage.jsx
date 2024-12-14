import React from "react";
import { Typography, Button, Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                padding: "2rem",
                backgroundColor: "#F7F7F7", // Background from the theme
            }}
        >
            <Typography
                variant="h2"
                sx={{
                    marginBottom: "1rem",
                    fontWeight: "bold",
                    color: "#1976D2", // Primary blue color
                }}
            >
                Welcome to CareSync
            </Typography>
            <Typography
                variant="h6"
                sx={{ marginBottom: "2rem", color: "#2E2E2E" /* Dark gray text */ }}
            >
                Your one-stop solution for complete healthcare coordination.
            </Typography>
            <Grid container spacing={2} justifyContent="center">
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary" // Primary blue color
                        onClick={() => navigate("/patients")}
                    >
                        View Patients
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary" // Primary blue color
                        onClick={() => navigate("/appointments")}
                    >
                        Manage Appointments
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        variant="outlined"
                        sx={{
                            borderColor: "#1976D2", // Primary blue border
                            color: "#1976D2", // Primary blue text
                        }}
                        onClick={() => navigate("/analytics")}
                    >
                        View Analytics
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default LandingPage;




