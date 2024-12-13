import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { Box, Typography, Link as MuiLink, Container } from '@mui/material';

const Footer = () => (
  <Box
    component="footer"
    sx={{
      backgroundColor: '#4CAF50',
      color: '#fff',
      textAlign: 'center',
      padding: '0.5rem 0', // Reduced padding
      position: 'fixed',
      bottom: 0,
      width: '100%',
      fontSize: '0.75rem', // Smaller font size
    }}
  >
    <Typography>&copy; 2024 CareSync - All Rights Reserved</Typography>
    <Typography sx={{ fontSize: '0.75rem' }}>Empowering Healthcare Coordination for Providers and Patients</Typography>
    <Box sx={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
      <Link href="/about" underline="hover" color="inherit" sx={{ fontSize: '0.75rem' }}>
        About Us
      </Link>
      <Link href="https://www.linkedin.com/in/aristil-mba-pmp/" underline="hover" color="inherit" target="_blank" rel="noopener noreferrer" sx={{ fontSize: '0.75rem' }}>
        Connect on LinkedIn
      </Link>
      <Link href="mailto:contact@caresync.com" underline="hover" color="inherit" sx={{ fontSize: '0.75rem' }}>
        Email Us
      </Link>
      <Link href="https://github.com/ronniearistil/CareSync" underline="hover" color="inherit" target="_blank" rel="noopener noreferrer" sx={{ fontSize: '0.75rem' }}>
        GitHub
      </Link>
    </Box>
  </Box>
);

export default Footer;