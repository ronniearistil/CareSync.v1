import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const Analytics = () => {
  const data = {
    active_users: 50,
    total_users: 100,
  };

  return (
    <Card
      sx={{
        marginBottom: 3,
        backgroundColor: "#FFFFFF", // White background
        border: "1px solid #1976D2", // Blue border
      }}
    >
      <CardContent>
        <Typography
          variant="h2"
          gutterBottom
          sx={{
            color: "#1976D2", // Primary blue color for headings
          }}
        >
          Analytics
        </Typography>
        <Typography sx={{ color: "#2E2E2E" /* Dark gray text */ }}>
          Active Users: {data.active_users}
        </Typography>
        <Typography sx={{ color: "#2E2E2E" /* Dark gray text */ }}>
          Total Users: {data.total_users}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Analytics;







