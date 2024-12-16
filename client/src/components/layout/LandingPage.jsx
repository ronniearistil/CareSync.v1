// import React from "react";
// import { Typography, Button, Box, Grid } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// 
// const LandingPage = () => {
//     const navigate = useNavigate();
// 
//     return (
//         <Box
//             sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 textAlign: "center",
//                 padding: "2rem",
//                 backgroundColor: "#F7F7F7", // Background from the theme
//             }}
//         >
//             <Typography
//                 variant="h2"
//                 sx={{
//                     marginBottom: "1rem",
//                     fontWeight: "bold",
//                     color: "#1976D2", // Primary blue color
//                 }}
//             >
//                 Welcome to CareSync
//             </Typography>
//             <Typography
//                 variant="h6"
//                 sx={{ marginBottom: "2rem", color: "#2E2E2E" /* Dark gray text */ }}
//             >
//                 Your one-stop solution for complete healthcare coordination.
//             </Typography>
//             <Grid container spacing={2} justifyContent="center">
//                 <Grid item>
//                     <Button
//                         variant="contained"
//                         color="primary" // Primary blue color
//                         onClick={() => navigate("/patients")}
//                     >
//                         View Patients
//                     </Button>
//                 </Grid>
//                 <Grid item>
//                     <Button
//                         variant="contained"
//                         color="primary" // Primary blue color
//                         onClick={() => navigate("/appointments")}
//                     >
//                         Manage Appointments
//                     </Button>
//                 </Grid>
//                 <Grid item>
//                     <Button
//                         variant="outlined"
//                         sx={{
//                             borderColor: "#1976D2", // Primary blue border
//                             color: "#1976D2", // Primary blue text
//                         }}
//                         onClick={() => navigate("/analytics")}
//                     >
//                         View Analytics
//                     </Button>
//                 </Grid>
//             </Grid>
//         </Box>
//     );
// };
// 
// export default LandingPage;


// Testing as of 12/16/2024

import React from "react";
import { Typography, Button, Box, Grid, Paper } from "@mui/material";
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
                padding: "4rem 2rem",
                backgroundColor: "#F7F7F7", // Light gray background
                minHeight: "100vh",
            }}
        >
            {/* Header Section */}
            <Typography
                variant="h2"
                sx={{
                    marginBottom: "1.5rem",
                    fontWeight: "bold",
                    color: "#1976D2", // Primary blue color
                }}
            >
                Welcome to CareSync
            </Typography>
            <Typography
                variant="h6"
                sx={{
                    marginBottom: "3rem",
                    color: "#2E2E2E", // Dark gray text
                    maxWidth: "600px",
                }}
            >
                Your one-stop solution for complete healthcare coordination. Easily manage patients, appointments, and analytics with intuitive tools.
            </Typography>

            {/* Action Cards Section */}
            <Grid container spacing={3} justifyContent="center" sx={{ marginBottom: "2rem" }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Paper
                        elevation={3}
                        sx={{
                            padding: "2rem",
                            textAlign: "center",
                            "&:hover": { boxShadow: "0 8px 16px rgba(0,0,0,0.2)" },
                        }}
                    >
                        <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
                            View Patients
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate("/patients")}
                        >
                            Go to Patients
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Paper
                        elevation={3}
                        sx={{
                            padding: "2rem",
                            textAlign: "center",
                            "&:hover": { boxShadow: "0 8px 16px rgba(0,0,0,0.2)" },
                        }}
                    >
                        <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
                            Manage Appointments
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate("/appointments")}
                        >
                            Go to Appointments
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Paper
                        elevation={3}
                        sx={{
                            padding: "2rem",
                            textAlign: "center",
                            "&:hover": { boxShadow: "0 8px 16px rgba(0,0,0,0.2)" },
                        }}
                    >
                        <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
                            View Analytics
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate("/analytics")}
                        >
                            Go to Analytics
                        </Button>
                    </Paper>
                </Grid>
            </Grid>

            {/* Login and Register Section */}
            <Box sx={{ marginTop: "2rem" }}>
                <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
                    Get Started
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate("/login/user")}
                            sx={{ padding: "0.5rem 1.5rem" }}
                        >
                            User Login
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate("/login/patient")}
                            sx={{ padding: "0.5rem 1.5rem" }}
                        >
                            Patient Login
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => navigate("/register")}
                            sx={{
                                padding: "0.5rem 1.5rem",
                                borderColor: "#1976D2",
                                color: "#1976D2",
                                "&:hover": {
                                    borderColor: "#115293",
                                    color: "#115293",
                                },
                            }}
                        >
                            Register
                        </Button>
                    </Grid>
                </Grid>
            </Box>

            {/* Footer Section */}
            <Box
                sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "1rem",
                    textAlign: "center",
                    backgroundColor: "#1976D2",
                    color: "white",
                }}
            >
                <Typography variant="body2">
                    © {new Date().getFullYear()} CareSync - All Rights Reserved
                </Typography>
            </Box>
        </Box>
    );
};

export default LandingPage;
