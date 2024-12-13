import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { Box, Typography } from '@mui/material';

const Footer = () => (
  <Box
    component="footer"
    sx={{
      backgroundColor: '#4CAF50',
      color: '#fff',
      textAlign: 'center',
      padding: '0.5rem 0', // Reduced padding for smaller size
      position: 'fixed',
      bottom: 0,
      width: '100%',
      fontSize: '0.75rem', // Consistent font size
    }}
  >
    <Typography>&copy; 2024 CareSync - All Rights Reserved</Typography>
    <Typography sx={{ fontSize: '0.75rem' }}>
      Empowering Healthcare Coordination for Providers and Patients
    </Typography>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: '0.5rem',
        marginTop: '0.25rem',
      }}
    >
      {/* Navigation Links */}
      <Link
        to="/about"
        style={{
          textDecoration: 'none',
          color: 'inherit',
          fontSize: '0.75rem',
        }}
      >
        About Us
      </Link>
      <a
        href="https://www.linkedin.com/in/aristil-mba-pmp/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          textDecoration: 'none',
          color: 'inherit',
          fontSize: '0.75rem',
        }}
      >
        Connect on LinkedIn
      </a>
      <a
        href="mailto:contact@caresync.com"
        style={{
          textDecoration: 'none',
          color: 'inherit',
          fontSize: '0.75rem',
        }}
      >
        Email Us
      </a>
      <a
        href="https://github.com/ronniearistil/CareSync"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          textDecoration: 'none',
          color: 'inherit',
          fontSize: '0.75rem',
        }}
      >
        GitHub
      </a>
    </Box>
  </Box>
);

export default Footer;
