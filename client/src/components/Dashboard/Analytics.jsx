import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  LinearProgress,
  Button,
} from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Analytics = () => {
  const [analytics, setAnalytics] = useState({
    active_users: 0,
    total_users: 0,
    active_appointments: 0,
    canceled_appointments: 0,
    overdue_records: 0,
    completed_procedures: 0,
    new_users: 0,
  });

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch analytics data
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5555/analytics");
        setAnalytics(response.data);
      } catch (error) {
        toast.error("Failed to fetch analytics.");
        console.error("Analytics fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  // Show loading spinner while data is being fetched
  if (loading) return <CircularProgress sx={{ margin: "2rem auto", display: "block" }} />;

  return (
    <Card
      sx={{
        marginBottom: 3,
        padding: "1rem",
        backgroundColor: "#FFFFFF",
        border: "1px solid #1976D2",
        boxShadow: 3,
      }}
    >
      <CardContent>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: "#1976D2", fontWeight: "bold" }}
        >
          Analytics Overview
        </Typography>

        {/* Active Users */}
        <Typography sx={{ marginBottom: "1rem", fontSize: "1.1rem" }}>
          Active Users: <strong>{analytics.active_users}</strong>
        </Typography>
        <LinearProgress
          variant="determinate"
          value={(analytics.active_users / analytics.total_users) * 100}
          sx={{ height: 10, borderRadius: 5 }}
        />
        <Typography sx={{ marginTop: "0.5rem", fontSize: "0.9rem" }}>
          Total Users: {analytics.total_users}
        </Typography>

        {/* Active Appointments */}
        <Typography sx={{ marginTop: "1.5rem", fontSize: "1.1rem" }}>
          Active Appointments: <strong>{analytics.active_appointments}</strong>
          <Button
            size="small"
            sx={{ marginLeft: 2 }}
            variant="contained"
            color="primary"
            onClick={() => navigate("/appointments?status=Active")}
          >
            View Active
          </Button>
        </Typography>

        {/* Canceled Appointments */}
        <Typography sx={{ marginTop: "1.5rem", fontSize: "1.1rem" }}>
          Canceled Appointments: <strong>{analytics.canceled_appointments}</strong>
          <Button
            size="small"
            sx={{ marginLeft: 2 }}
            variant="contained"
            color="error"
            onClick={() => navigate("/appointments?status=Cancelled")}
          >
            View Canceled
          </Button>
        </Typography>

        {/* Overdue Health Records */}
        <Typography sx={{ marginTop: "1.5rem", fontSize: "1.1rem" }}>
          Overdue Records: <strong>{analytics.overdue_records}</strong>
          <Button
            size="small"
            sx={{ marginLeft: 2 }}
            variant="contained"
            color="warning"
            onClick={() => navigate("/records?status=Overdue")}
          >
            View Overdue
          </Button>
        </Typography>

        {/* Completed Procedures */}
        <Typography sx={{ marginTop: "1.5rem", fontSize: "1.1rem" }}>
          Completed Procedures: <strong>{analytics.completed_procedures}</strong>
          <Button
            size="small"
            sx={{ marginLeft: 2 }}
            variant="contained"
            color="success"
            onClick={() => navigate("/records?status=Completed")}
          >
            View Completed
          </Button>
        </Typography>

        {/* New Users */}
        <Typography sx={{ marginTop: "1.5rem", fontSize: "1.1rem" }}>
          New Users (Last 30 Days): <strong>{analytics.new_users}</strong>
          <Button
            size="small"
            sx={{ marginLeft: 2 }}
            variant="contained"
            color="secondary"
            onClick={() => navigate("/users?filter=new")}
          >
            View Users
          </Button>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Analytics;












