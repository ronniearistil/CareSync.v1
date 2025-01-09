import React, { useState } from "react";
import { Container, Typography, Box, List, ListItem, ListItemIcon, ListItemText, Button, Collapse, Link } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const About = () => {
  const [showEngineerInfo, setShowEngineerInfo] = useState(false);

  return (
    <Container
      maxWidth="md"
      sx={{
        padding: "3rem",
        backgroundColor: "#FFFFFF",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        marginTop: "2rem", // Adds spacing from the top
        marginBottom: "2rem", // Adds spacing at the bottom
      }}
    >
      {/* Main Heading */}
      <Typography
        variant="h2"
        sx={{ fontWeight: "bold", marginBottom: "2rem", color: "primary.main", textAlign: "center" }}
      >
        About CareSynq
      </Typography>

      {/* Introduction */}
      <Typography
        variant="body1"
        sx={{ marginBottom: "2rem", lineHeight: 1.8, color: "text.primary", fontSize: "1rem" }}
      >
        CareSynq is a comprehensive healthcare management platform designed to transform how providers and patients collaborate. 
        It goes beyond scheduling, offering advanced features such as analytics, goal tracking, and care recommendations. 
        CareSynq empowers providers with data-driven insights and enables patients to actively manage their health journey.
      </Typography>

      {/* Footer Links from Removed Footer */}
      <Typography
        variant="body2"
        sx={{
          textAlign: "center",
          color: "text.secondary",
          marginBottom: "1rem",
          fontSize: "0.9rem",
        }}
      >
        Empowering Healthcare Coordination for Providers and Patients
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "1.5rem",
          flexWrap: "wrap", // Wrap links on smaller screens
        }}
      >
        <Link
          href="https://www.linkedin.com/in/aristil-mba-pmp/"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ textDecoration: "none", color: "primary.main", fontSize: "1rem" }}
        >
          Connect on LinkedIn
        </Link>
        <Link
          href="mailto:contact@caresync.com"
          sx={{ textDecoration: "none", color: "primary.main", fontSize: "1rem" }}
        >
          Email Us
        </Link>
        <Link
          href="https://github.com/ronniearistil"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ textDecoration: "none", color: "primary.main", fontSize: "1rem" }}
        >
          GitHub
        </Link>
      </Box>

      {/* For Providers Section */}
      <Box sx={{ marginBottom: "2rem", padding: "1.5rem", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", marginBottom: "1rem", color: "primary.main", fontSize: "1.5rem" }}
        >
          For Providers
        </Typography>
        <List>
          {[
            "Manage patient health records.",
            "View recommendations for care milestones.",
            "Schedule and monitor follow-ups.",
            "Access analytics to identify health trends.",
            "Collaborate through shared care plans.",
            "Gain insights into patient engagement and outcomes.",
          ].map((item, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <CheckCircleIcon sx={{ color: "success.main" }} />
              </ListItemIcon>
              <ListItemText primary={item} sx={{ fontSize: "1rem" }} />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* For Patients Section */}
      <Box sx={{ padding: "1.5rem", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", marginBottom: "1rem", color: "primary.main", fontSize: "1.5rem" }}
        >
          For Patients
        </Typography>
        <List>
          {[
            "Track health records and milestones.",
            "Get reminders for tasks and appointments.",
            "Monitor progress with dashboards.",
            "Collaborate with providers on care plans.",
            "Access personalized recommendations for better health outcomes.",
          ].map((item, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <CheckCircleIcon sx={{ color: "success.main" }} />
              </ListItemIcon>
              <ListItemText primary={item} sx={{ fontSize: "1rem" }} />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Engineer Information Toggle */}
      <Box mt={4} textAlign="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowEngineerInfo(!showEngineerInfo)}
          sx={{ fontSize: "1rem", padding: "0.5rem 1rem" }}
        >
          {showEngineerInfo ? "Hide Engineer Details" : "Meet the Engineer"}
        </Button>

        <Collapse in={showEngineerInfo} timeout="auto" unmountOnExit>
          <Box
            mt={3}
            p={3}
            borderRadius="8px"
            boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
            bgcolor="#F9F9F9"
          >
            <Typography
              variant="h4"
              gutterBottom
              sx={{ fontWeight: "bold", fontSize: "1.5rem", color: "primary.main" }}
            >
              About the Engineer
            </Typography>
            <Typography variant="body1" paragraph sx={{ fontSize: "1rem", color: "text.primary" }}>
              Ronnie Aristil is a software engineer with expertise in JavaScript, React, Python, Flask, SQL, and PostgreSQL. 
              He specializes in building scalable web applications and APIs, leveraging SQLAlchemy for efficient database modeling and data management.
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "1rem", color: "text.primary" }}>
              He combines technical expertise with business acumen to build software solutions that streamline workflows, improve performance, and drive impact across diverse industries.
            </Typography>
          </Box>
        </Collapse>
      </Box>
    </Container>
  );
};

export default About;





