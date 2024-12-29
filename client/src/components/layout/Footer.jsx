import React from "react";
import { Link } from "react-router-dom"; 
import { Box, Typography } from "@mui/material";

const Footer = () => (
  <Box
    component="footer"
    sx={{
      backgroundColor: "#1976D2", 
      textAlign: "center",
      padding: "0.5rem 0",
      position: "fixed",
      bottom: 0,
      width: "100%",
    }}
  >
    <Typography sx={{ color: "#FFFFFF", fontWeight: "bold", fontSize: "0.9rem" }}>
      &copy; 2024 CareSynq - All Rights Reserved
    </Typography>
    <Typography sx={{ color: "#FFFFFF", fontSize: "0.75rem", marginBottom: "0.25rem" }}>
      Empowering Healthcare Coordination for Providers and Patients
    </Typography>
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: "1rem",
        marginTop: "0.25rem", 
      }}
    >
      {/* Navigation Links */}
      <Link
        to="/about"
        style={{
          textDecoration: "none",
          color: "#FFFFFF", 
          fontSize: "0.75rem",
        }}
      >
        About Us
      </Link>
      <a
        href="https://www.linkedin.com/in/aristil-mba-pmp/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          textDecoration: "none",
          color: "#FFFFFF",
          fontSize: "0.75rem",
        }}
      >
        Connect on LinkedIn
      </a>
      <a
        href="mailto:contact@caresync.com"
        style={{
          textDecoration: "none",
          color: "#FFFFFF",
          fontSize: "0.75rem",
        }}
      >
        Email Us
      </a>
      <a
        href="https://github.com/ronniearistil/CareSynq.git"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          textDecoration: "none",
          color: "#FFFFFF", 
          fontSize: "0.75rem",
        }}
      >
        GitHub
      </a>
    </Box>
  </Box>
);

export default Footer;



