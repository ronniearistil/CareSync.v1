import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const Analytics = () => {
  const data = {
    active_users: 50,
    total_users: 100,
  };

  return (
    <Card sx={{ marginBottom: 3 }}>
      <CardContent>
        <Typography variant="h2" gutterBottom>
          Analytics
        </Typography>
        <Typography>Active Users: {data.active_users}</Typography>
        <Typography>Total Users: {data.total_users}</Typography>
      </CardContent>
    </Card>
  );
};

export default Analytics;





