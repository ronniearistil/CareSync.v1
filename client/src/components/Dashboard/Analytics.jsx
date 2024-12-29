import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  LinearProgress,
  Button,
  Grid,
  Box,
} from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import GroupIcon from "@mui/icons-material/Group";
import EventIcon from "@mui/icons-material/Event";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const Analytics = () => {
  const [analytics, setAnalytics] = useState({
    active_users: 0,
    total_users: 0,
    active_patients: 0,
    total_patients: 0,
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

  if (loading)
    return <CircularProgress sx={{ margin: "2rem auto", display: "block" }} />;

  const analyticsData = [
    {
      title: "Total Patients",
      value: analytics.total_patients,
      icon: <GroupIcon sx={{ fontSize: 30, color: "#1976D2" }} />, // Blue icon
      buttonLabel: "View Patients",
      link: "/patients",
      color: "primary",
    },
    {
      title: "Active Patients",
      value: analytics.active_patients,
      icon: <GroupIcon sx={{ fontSize: 30, color: "#4CAF50" }} />, // Green icon
      buttonLabel: "View Active",
      link: "/patients?status=active",
      color: "success",
    },
    {
      title: "Active Users",
      value: analytics.active_users,
      icon: <PersonAddIcon sx={{ fontSize: 30, color: "#1976D2" }} />, // Blue icon
      buttonLabel: "View Users",
      link: "/users",
      color: "primary",
    },
    {
      title: "Active Appointments",
      value: analytics.active_appointments,
      icon: <EventIcon sx={{ fontSize: 30, color: "#1976D2" }} />, // Blue icon
      buttonLabel: "View Active",
      link: "/appointments?status=Active",
      color: "primary",
    },
    {
      title: "Canceled Appointments",
      value: analytics.canceled_appointments,
      icon: <ErrorIcon sx={{ fontSize: 30, color: "#F44336" }} />, // Red icon
      buttonLabel: "View Canceled",
      link: "/appointments?status=Cancelled",
      color: "error",
    },
    {
      title: "Overdue Records",
      value: analytics.overdue_records,
      icon: <AssignmentIcon sx={{ fontSize: 30, color: "#FF9800" }} />, // Orange icon
      buttonLabel: "View Overdue",
      link: "/records?status=Overdue",
      color: "warning",
    },
    {
      title: "Completed Procedures",
      value: analytics.completed_procedures,
      icon: <CheckCircleIcon sx={{ fontSize: 30, color: "#4CAF50" }} />, // Green icon
      buttonLabel: "View Completed",
      link: "/records?status=Completed",
      color: "success",
    },
    {
      title: "New Users (Last 30 Days)",
      value: analytics.new_users,
      icon: <PersonAddIcon sx={{ fontSize: 30, color: "#9C27B0" }} />, // Purple icon
      buttonLabel: "View Users",
      link: "/users?filter=new",
      color: "secondary",
    },
  ];

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

        <Grid container spacing={2}>
          {analyticsData.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  padding: "1rem",
                  textAlign: "center",
                  boxShadow: 2,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                  {item.icon}
                </Box>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {item.title}
                </Typography>
                <Typography variant="h5" sx={{ margin: "0.5rem 0" }}>
                  {item.value}
                </Typography>
                <Button
                  size="small"
                  variant="contained"
                  color={item.color}
                  onClick={() => navigate(item.link)}
                >
                  {item.buttonLabel}
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Analytics;














