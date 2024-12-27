import React from "react";
import { Box, Typography } from "@mui/material";
import Analytics from "../dashboard/Analytics";
import AppointmentCalendar from "../dashboard/AppointmentCalendar";

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
