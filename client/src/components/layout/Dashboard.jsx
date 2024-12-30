import React, { useState } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import Analytics from "../Dashboard/Analytics";
import AppointmentCalendar from "../dashboard/AppointmentCalendar";

const Dashboard = () => {
  const [showAnalytics, setShowAnalytics] = useState(true);
  const [showAppointments, setShowAppointments] = useState(false);

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

      <Stack direction="row" spacing={2} mb={4}>
        <Button
          variant="contained"
          onClick={() => setShowAnalytics((prev) => !prev)}
        >
          {showAnalytics ? "Hide Analytics" : "Show Analytics"}
        </Button>
        <Button
          variant="contained"
          onClick={() => setShowAppointments((prev) => !prev)}
        >
          {showAppointments ? "Hide Appointments" : "Show Appointments"}
        </Button>
      </Stack>

      {showAnalytics && <Analytics />}
      {showAppointments && <AppointmentCalendar />}
    </Box>
  );
};

export default Dashboard;
