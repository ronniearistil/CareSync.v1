import React from "react";
import { Box, Typography } from "@mui/material";
import Analytics from "../components/Dashboard/Analytics";
import AppointmentCalendar from "../components/Dashboard/AppointmentCalendar";

const Dashboard = () => {
  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        padding: 4,
        color: "text.primary",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h1" gutterBottom>
        Dashboard
      </Typography>
      <Analytics />
      <AppointmentCalendar />
    </Box>
  );
};

export default Dashboard;



